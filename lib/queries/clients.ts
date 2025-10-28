import { auth } from "../auth";
import { db } from "../db";

export async function getClients() {
  const session = await auth();
  const clientes = await db.client.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      projects: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return clientes;
}

export async function totalClientes() {
  const clients = await getClients();
  return clients.length;
}

export async function clientesAtivos() {
  const clientes = await getClients();
  return clientes.filter((cliente) => cliente.projects.length > 0).length;
}
export async function totalProjetos() {
  const clientes = await getClients();
  return clientes.reduce((acc, cliente) => acc + cliente.projects.length, 0);
}
