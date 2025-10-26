"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validação básica
  if (!name || !email || !password) {
    return { error: "Todos os campos são obrigatórios" };
  }

  if (password.length < 6) {
    return { error: "A senha deve ter no mínimo 6 caracteres" };
  }

  // Verificar se email já existe
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email já cadastrado" };
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar usuário
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}
