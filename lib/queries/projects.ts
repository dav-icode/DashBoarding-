import { redirect } from "next/navigation";
import { db } from "../db";
import { auth } from "../auth";

export default async function getProjects() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const projetos = await db.project.findMany({
    where: {
      client: {
        userId: session.user.id, // ← Só projetos de clientes desse usuário
      },
    },
    include: {
      client: true, // ← Inclui dados do cliente
      sales: true, // ← Inclui vendas/pagamentos do projeto
    },
    orderBy: {
      createdAt: "desc", // ← Mais recentes primeiro
    },
  });

  return projetos;
}
