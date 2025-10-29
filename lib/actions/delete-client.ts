"use server";

import { auth } from "../auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function deleteClient(clientId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  try {
    const client = await db.client.findFirst({
      where: {
        id: clientId,
        userId: session.user.id,
      },
    });

    if (!client) {
      return { error: "Cliente não encontrado ou sem permissão." };
    }

    await db.project.deleteMany({
      where: {
        clientId: clientId,
      },
    });

    await db.client.delete({
      where: {
        id: clientId,
      },
    });

    revalidatePath("/Clientes");
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    return { error: "Erro ao deletar cliente" };
  }
}
