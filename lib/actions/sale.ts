"use server";

import { auth } from "../auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createSale(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  // Pegar dados do formulário
  const amount = formData.get("amount") as string;
  const date = formData.get("date") as string;
  const description = formData.get("description") as string | null;
  const projectId = formData.get("projectId") as string | null;
  const method = formData.get("method") as string | null;

  // Validações
  if (!amount || !date) {
    return { error: "Valor e data são obrigatórios" };
  }

  const amountNumber = parseFloat(amount);
  if (isNaN(amountNumber) || amountNumber <= 0) {
    return { error: "Valor deve ser maior que zero" };
  }

  try {
    // Se tem projectId, verifica se o projeto pertence ao usuário
    if (projectId) {
      const project = await db.project.findFirst({
        where: {
          id: projectId,
          client: {
            userId: session.user.id,
          },
        },
      });

      if (!project) {
        return { error: "Projeto não encontrado ou sem permissão" };
      }
    }

    // Criar a venda
    const newSale = await db.sale.create({
      data: {
        amount: amountNumber,
        date: new Date(date),
        description: description?.trim() || null,
        projectId: projectId || null,
        userId: session.user.id,
      },
    });

    revalidatePath("/Vendas");
    revalidatePath("/dashboard");
    if (projectId) {
      revalidatePath(`/Projetos/${projectId}`);
    }

    return { success: true, data: newSale };
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    return { error: "Erro ao registrar venda" };
  }
}
