"use server";

import { auth } from "../auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  // Pega os dados do form
  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const status = formData.get("status") as string | null;
  const price = formData.get("price") as string | null;
  const clientId = formData.get("clientId") as string | null;
  const progress = formData.get("progress") as string | null;
  const startDate = formData.get("startDate") as string | null;
  const deadline = formData.get("deadline") as string | null;

  // Validações
  if (!name?.trim() || !clientId) {
    return { error: "Nome e ID do cliente são obrigatórios" };
  }

  try {
    const newProject = await db.project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        status: status?.trim() || "Planning",
        price: price ? parseFloat(price) : null,
        progress: progress ? parseInt(progress) : 0,
        startDate: startDate ? new Date(startDate) : null,
        deadline: deadline ? new Date(deadline) : null,
        clientId: clientId,
      },
    });

    revalidatePath(`/Clientes/${clientId}`);
    return { success: true, data: newProject };
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return { error: "Erro ao criar projeto" };
  }
}
