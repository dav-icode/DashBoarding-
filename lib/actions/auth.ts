"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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

export async function requestPasswordReset(email: string) {
  if (!email) {
    return { error: "Email é obrigatório" };
  }

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Por segurança, não avisa que o email não existe
    return { success: true };
  }

  // Gerar token único
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

  // Salvar no banco
  await db.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  // TODO: ENVIAR EMAIL AQUI
  // const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  // await sendEmail(email, resetUrl);

  console.log(`Reset URL: http://localhost:3000/reset-password/${resetToken}`);

  return { success: true };
}

export async function resetPassword(token: string, newPassword: string) {
  if (!token || !newPassword) {
    return { error: "Token e senha são obrigatórios" };
  }

  const user = await db.user.findUnique({
    where: { resetToken: token },
  });

  if (!user || !user.resetTokenExpiry) {
    return { error: "Token inválido ou expirado" };
  }

  // Verificar se token expirou
  if (user.resetTokenExpiry < new Date()) {
    return { error: "Token expirado. Solicite um novo link." };
  }

  // Hash da nova senha
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Atualizar senha e limpar token
  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return { success: true };
}
