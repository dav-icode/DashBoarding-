import { LucideIcon } from "lucide-react";

// Tipos de notificação possíveis
export type NotificationType =
  | "project_overdue" // Projeto atrasado
  | "deadline_soon" // Deadline próximo
  | "payment_pending" // Pagamento pendente
  | "payment_received" // Pagamento recebido hoje
  | "project_no_progress" // Projeto sem progresso há dias
  | "client_inactive"; // Cliente sem contato há tempo

// Cores do tema para cada tipo
export type NotificationColor =
  | "red"
  | "yellow"
  | "blue"
  | "purple"
  | "green"
  | "gray";

// Interface da notificação
export interface Notification {
  id: string;
  type: NotificationType;
  color: NotificationColor;
  icon: LucideIcon;
  title: string;
  description: string;
  priority: number; // 1 = mais importante, 5 = menos importante
  relatedId?: string; // ID do projeto/cliente relacionado
  actionUrl?: string; // Link para onde clicar
  createdAt: Date;
}

// Configuração de cada tipo de notificação
export interface NotificationConfig {
  color: NotificationColor;
  priority: number;
  iconName: string;
}

// Mapa de configurações por tipo
export const NOTIFICATION_CONFIGS: Record<
  NotificationType,
  NotificationConfig
> = {
  project_overdue: {
    color: "red",
    priority: 1, // MAIS URGENTE
    iconName: "AlertTriangle",
  },
  deadline_soon: {
    color: "yellow",
    priority: 2,
    iconName: "Clock",
  },
  payment_pending: {
    color: "purple",
    priority: 3,
    iconName: "DollarSign",
  },
  project_no_progress: {
    color: "gray",
    priority: 4,
    iconName: "TrendingDown",
  },
  payment_received: {
    color: "green",
    priority: 5, // MENOS URGENTE (é positivo)
    iconName: "CheckCircle",
  },
  client_inactive: {
    color: "blue",
    priority: 4,
    iconName: "UserX",
  },
};
