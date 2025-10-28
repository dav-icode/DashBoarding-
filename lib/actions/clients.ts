"use server";

import { auth } from "../auth";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export async function createClient(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Usuário não autenticado." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string | null;
  const project = formData.get("project") as string | null;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return { error: "Nome, email e telefone são obrigatórios" };
  }

  try {
    if (project?.trim()) {
      const newClient = await db.client.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company?.trim() || null,
          userId: session.user.id,
          projects: {
            create: {
              name: project.trim(),
              description: "",
              status: "Planning",
            },
          },
        },
      });
      
      revalidatePath("/Clientes");
      return { success: true, client: newClient };
    } else {
      const newClient = await db.client.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company?.trim() || null,
          userId: session.user.id,
        },
      });
      
      revalidatePath("/Clientes");
      return { success: true, client: newClient };
    }
  } catch (error) {
    console.error("Erro completo:", error);
    return { error: "Erro ao criar cliente" };
  }
}