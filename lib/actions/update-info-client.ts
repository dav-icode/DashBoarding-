"use server";

import { auth } from "../auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function updateInfoProject(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string | null;
  const project = formData.get("project") as string | null;

  if (!id) {
    return { error: "ID do cliente não encontrado" };
  }

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return { error: "Nome, email e telefone são obrigatórios" };
  }

  try {
    const updatedClient = await db.client.update({
      where: {
        id: id,
      },
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company?.trim() || null,
      },
    });

    revalidatePath(`/Clientes/${id}`);
    return { success: true, client: updatedClient };
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    return { error: "Erro ao atualizar cliente" };
  }
}
