"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { db } from "../db";

export async function createTask(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  // ✅ PEGA OS DADOS DO FORM
  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const status = formData.get("status") as string | null;
  const prioridade = formData.get("prioridade") as string | null;
  const projectId = formData.get("projectId") as string | null; // ← projectId DIRETO

  // ✅ VALIDAÇÕES
  if (!name?.trim()) {
    return { error: "Nome da tarefa é obrigatório" };
  }

  if (!projectId || projectId === "null" || projectId === "undefined") {
    return { error: "Projeto é obrigatório" };
  }

  try {
    // ✅ VERIFICA SE O PROJETO EXISTE E PERTENCE A UM CLIENTE DO USUÁRIO
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        client: {
          userId: session.user.id, // ← Garante que o usuário tem acesso
        },
      },
    });

    if (!project) {
      return { error: "Projeto não encontrado ou sem permissão" };
    }

    // ✅ CRIA A TAREFA
    const newTask = await db.task.create({
      data: {
        nome: name.trim(),
        descricao: description?.trim() || null,
        status: status?.trim() || "todo",
        prioridade: prioridade?.trim() || "media",
        projetoId: projectId, // ← Conecta direto pelo ID
      },
    });

    // ✅ ATUALIZA O CACHE
    revalidatePath("/Tarefas");
    revalidatePath(`/Projetos/${projectId}`);

    return { success: true, data: newTask };
  } catch (error) {
    console.error("❌ Erro ao criar tarefa:", error);
    return {
      error: error instanceof Error ? error.message : "Erro ao criar tarefa",
    };
  }
}
