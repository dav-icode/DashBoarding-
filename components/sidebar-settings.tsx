"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Shield, Palette, Trash2 } from "lucide-react";

const settingsItems = [
  {
    title: "Perfil",
    href: "/settings",
    icon: User,
    description: "Informações pessoais",
  },
  {
    title: "Segurança",
    href: "/settings/security",
    icon: Shield,
    description: "Senha e autenticação",
  },
  {
    title: "Aparência",
    href: "/settings/appearance",
    icon: Palette,
    description: "Tema e personalização",
  },
  {
    title: "Zona de Perigo",
    href: "/settings/danger",
    icon: Trash2,
    description: "Excluir conta",
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {settingsItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
              isActive
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 mt-0.5 shrink-0 transition-transform group-hover:scale-110",
                isActive ? "text-white" : "text-zinc-500"
              )}
            />
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "font-medium text-sm",
                  isActive ? "text-white" : "text-zinc-300"
                )}
              >
                {item.title}
              </div>
              <div
                className={cn(
                  "text-xs mt-0.5",
                  isActive ? "text-purple-100" : "text-zinc-500"
                )}
              >
                {item.description}
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
