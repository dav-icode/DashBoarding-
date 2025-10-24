import { db } from "@/lib/db";

export async function getMonthlyRevenue() {
  if (!db.sale) {
    throw new Error("Modelo 'sale' não encontrado no banco de dados.");
  }
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const revenue = await db.sale.aggregate({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return revenue._sum.amount || 0; // soma total ou 0 se for nulo
}

export async function getActiveProjectsCount() {
  if (!db.project) {
    throw new Error("Modelo 'project' não encontrado no banco de dados.");
  }
  const count = await db.project.count({
    where: {
      status: "active",
    },
  });
  return count || 0;
}

export async function getActiveClients() {
  if (!db.client) {
    throw new Error("Modelo 'client' não encontrado no banco de dados.");
  }

  const count = await db.client.count({
    where: {
      projects: {
        some: {
          status: "in progress",
        },
      },
    },
  });

  return count || 0;
}

export async function getPendingPaymentsCount() {
  if (!db.sale) {
    throw new Error("Modelo 'sale' não encontrado no banco de dados.");
  }

  const count = await db.sale.aggregate({
    _sum: {
      amount: true,
    },
  });

  return count._sum.amount || 0;
}
export async function getActiveProjects() {
  if (!db.project) {
    throw new Error("Modelo 'project' não encontrado no banco de dados.");
  }

  const projects = await db.project.findMany({
    where: {
      status: "IN_PROGRESS",
    },
    include: {
      client: true, // inclui os dados do cliente
    },
    orderBy: {
      createdAt: "desc", // mais recentes primeiro
    },
    take: 4, // limite de 4 projetos
  });

  return projects;
}

export async function getMonthlyRevenueChart() {
  if (!db.sale) {
    throw new Error("Modelo 'sale' não encontrado no banco de dados.");
  }

  const now = new Date();
  const last6Months = [];

  // Gera os últimos 6 meses
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const revenue = await db.sale.aggregate({
      where: {
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });

    // Nome do mês em português
    const monthName = date.toLocaleDateString("pt-BR", { month: "short" });

    last6Months.push({
      month: monthName.charAt(0).toUpperCase() + monthName.slice(1), // Capitaliza
      revenue: revenue._sum.amount || 0,
    });
  }

  return last6Months;
}
