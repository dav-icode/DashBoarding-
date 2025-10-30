import { db } from "../db";
import {
  Notification,
  NotificationType,
  NOTIFICATION_CONFIGS,
} from "../types/notifications";
import {
  AlertTriangle,
  Clock,
  DollarSign,
  CheckCircle,
  TrendingDown,
  UserX,
} from "lucide-react";

// Mapa de ícones (para não importar dinamicamente)
const ICON_MAP = {
  AlertTriangle,
  Clock,
  DollarSign,
  CheckCircle,
  TrendingDown,
  UserX,
};

/**
 * Gera todas as notificações inteligentes para o usuário
 * @param userId - ID do usuário logado
 * @returns Array de notificações ordenadas por prioridade
 */
export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  const hoje = new Date();
  const notificacoes: Notification[] = [];

  // ====================================
  // 1️⃣ BUSCAR PROJETOS DO USUÁRIO
  // ====================================
  const projetos = await db.project.findMany({
    where: {
      client: {
        userId: userId,
      },
    },
    include: {
      client: true,
      sales: true, // Para calcular valores recebidos
    },
  });

  // ====================================
  // 2️⃣ BUSCAR VENDAS RECENTES
  // ====================================
  const vendasRecentes = await db.sale.findMany({
    where: {
      userId: userId,
      date: {
        gte: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()), // Hoje
      },
    },
    include: {
      project: {
        include: {
          client: true,
        },
      },
    },
  });

  // ====================================
  // 3️⃣ BUSCAR CLIENTES INATIVOS
  // ====================================
  const clientes = await db.client.findMany({
    where: {
      userId: userId,
    },
    include: {
      projects: {
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
    },
  });

  // ====================================
  // 4️⃣ GERAR NOTIFICAÇÕES
  // ====================================

  // 🔴 Projetos ATRASADOS
  projetos.forEach((projeto) => {
    if (
      projeto.deadline &&
      new Date(projeto.deadline) < hoje &&
      projeto.status !== "Completed"
    ) {
      const diasAtraso = Math.floor(
        (hoje.getTime() - new Date(projeto.deadline).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      notificacoes.push(
        createNotification(
          "project_overdue",
          `Projeto: ${projeto.name}`,
          `Atrasado há ${diasAtraso} dia${diasAtraso > 1 ? "s" : ""}`,
          projeto.id,
          `/Projetos/${projeto.id}`
        )
      );
    }
  });

  // 🟡 Projetos com DEADLINE PRÓXIMO (7 dias)
  projetos.forEach((projeto) => {
    if (projeto.deadline && projeto.status !== "Completed") {
      const diasRestantes = Math.floor(
        (new Date(projeto.deadline).getTime() - hoje.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (diasRestantes > 0 && diasRestantes <= 7) {
        notificacoes.push(
          createNotification(
            "deadline_soon",
            `Projeto: ${projeto.name}`,
            `Entrega em ${diasRestantes} dia${diasRestantes > 1 ? "s" : ""}`,
            projeto.id,
            `/Projetos/${projeto.id}`
          )
        );
      }
    }
  });

  // 🟣 PAGAMENTOS PENDENTES
  projetos.forEach((projeto) => {
    if (projeto.price) {
      // Calcular valor já recebido
      const recebido = projeto.sales.reduce(
        (sum, sale) => sum + sale.amount,
        0
      );
      const aReceber = projeto.price - recebido;

      if (aReceber > 0) {
        notificacoes.push(
          createNotification(
            "payment_pending",
            `Pagamento: ${projeto.client.name}`,
            `R$ ${aReceber.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })} pendente - ${projeto.name}`,
            projeto.id,
            `/Clientes/${projeto.client.id}`
          )
        );
      }
    }
  });

  // 🟢 PAGAMENTOS RECEBIDOS HOJE
  vendasRecentes.forEach((venda) => {
    notificacoes.push(
      createNotification(
        "payment_received",
        "Pagamento Recebido! 🎉",
        `R$ ${venda.amount.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })} ${venda.project ? `- ${venda.project.name}` : ""}`,
        venda.id,
        "/Vendas"
      )
    );
  });

  // ⚪ Projetos SEM PROGRESSO (atualizados há mais de 7 dias)
  projetos.forEach((projeto) => {
    if (projeto.status === "In Progress") {
      const diasSemUpdate = Math.floor(
        (hoje.getTime() - new Date(projeto.updatedAt).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (diasSemUpdate > 7) {
        notificacoes.push(
          createNotification(
            "project_no_progress",
            `Projeto: ${projeto.name}`,
            `Sem atualizações há ${diasSemUpdate} dias`,
            projeto.id,
            `/Projetos/${projeto.id}`
          )
        );
      }
    }
  });

  // 🔵 Clientes INATIVOS (sem projeto novo há 60 dias)
  clientes.forEach((cliente) => {
    if (cliente.projects.length > 0) {
      const ultimoProjeto = cliente.projects[0];
      const diasInativo = Math.floor(
        (hoje.getTime() - new Date(ultimoProjeto.updatedAt).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (diasInativo > 60) {
        notificacoes.push(
          createNotification(
            "client_inactive",
            `Cliente: ${cliente.name}`,
            `Sem projeto novo há ${Math.floor(diasInativo / 30)} meses`,
            cliente.id,
            `/Clientes/${cliente.id}`
          )
        );
      }
    }
  });

  // ====================================
  // 5️⃣ ORDENAR POR PRIORIDADE E LIMITAR
  // ====================================
  return notificacoes
    .sort((a, b) => a.priority - b.priority) // Menor número = maior prioridade
    .slice(0, 6); // Máximo de 6 notificações
}

/**
 * Função auxiliar para criar notificação
 */
function createNotification(
  type: NotificationType,
  title: string,
  description: string,
  relatedId?: string,
  actionUrl?: string
): Notification {
  const config = NOTIFICATION_CONFIGS[type];
  const icon = ICON_MAP[config.iconName as keyof typeof ICON_MAP];

  return {
    id: `${type}-${relatedId || Date.now()}`,
    type,
    color: config.color,
    icon,
    title,
    description,
    priority: config.priority,
    relatedId,
    actionUrl,
    createdAt: new Date(),
  };
}
