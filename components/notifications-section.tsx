import { Notification } from "@/lib/types/notifications";
import { Card, CardContent } from "./ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

interface NotificationsSectionProps {
  notifications: Notification[];
}

export function NotificationsSection({
  notifications,
}: NotificationsSectionProps) {
  // Mapa de estilos por cor
  const getColorClasses = (color: string) => {
    const colorMap = {
      red: "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20",
      yellow:
        "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20",
      blue: "bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20",
      purple:
        "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20",
      green:
        "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20",
      gray: "bg-gray-500/10 border-gray-500/30 text-gray-400 hover:bg-gray-500/20",
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Notificações
          </h2>

          {/* Badge com contador */}
          {notifications.length > 0 && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {notifications.length}
            </span>
          )}
        </div>

        {/* Lista de Notificações */}
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-zinc-400">Nenhuma notificação no momento ✅</p>
            <p className="text-zinc-500 text-sm mt-2">Tudo está em dia!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              const baseClasses = `
                border p-4 rounded-lg transition-all cursor-pointer
                ${getColorClasses(notif.color)}
              `;

              // ⭐ CONDITIONAL RENDERING - Mais limpo!
              return notif.actionUrl ? (
                // Se tem URL, renderiza Link
                <Link
                  key={notif.id}
                  href={notif.actionUrl}
                  className={baseClasses}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 flex shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{notif.title}</p>
                      <p className="text-gray-300 text-sm mt-1">
                        {notif.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                // Se não tem URL, renderiza div
                <div key={notif.id} className={baseClasses}>
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 flex shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{notif.title}</p>
                      <p className="text-gray-300 text-sm mt-1">
                        {notif.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
