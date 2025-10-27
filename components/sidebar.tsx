"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog,
  ChevronDown,
  ChevronRight,
  Package,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  useEffect(() => {
    if (isExpanded) {
      // Mostra conteúdo DEPOIS da animação terminar (300ms)
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Carregando ...</div>;
  }

  if (!session) {
    return <div>Não autenticado</div>;
  }

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((m) => m !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`${
        isExpanded ? "w-72" : "w-20"
      } fixed left-0 top-0 transition-all duration-300 ease-in-out bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800/50 p-5 flex flex-col shadow-2xl rounded-tr-2xl h-screen z-50`}
    >
      {isExpanded ? (
        <div className="flex flex-col items-start w-full h-full">
          {/* Header */}
          <div
            className={`mb-10 pb-6 border-b border-zinc-800/50 w-full transition-opacity duration-600 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Footer User */}
            <div
              className={`pt-5 mt-auto border-t border-zinc-800/50 flex items-center gap-3 w-full transition-opacity duration-200 ${
                showContent ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={`${session.user?.image || "/default-avatar.png"}`}
                alt="Avatar"
                width={40}
                height={40}
                className="w-11 h-11 bg-linear-to-br from-purple-500 to-purple-700 rounded-full flex shrink-0 items-center justify-center shadow-lg"
              />

              <div className="overflow-hidden flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {session.user?.name}
                </p>
                <p className="text-zinc-500 text-xs truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Nav com scroll */}
          <nav
            className={`flex flex-col w-full gap-5 flex-1 overflow-y-auto no-scrollbar transition-opacity duration-200 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link
              href="/"
              className="group w-full px-3 py-2.5 rounded-lg hover:bg-zinc-800/60 hover:text-white flex items-center gap-3 transition-all duration-200"
            >
              <LayoutDashboard className="h-5 w-5 flex shrink-0 group-hover:scale-110 transition-transform text-zinc-400" />
              <span className="font-medium text-zinc-400 text-sm whitespace-nowrap">
                Dashboard
              </span>
            </Link>

            {/* Operações - Com Sub-menu */}
            <Collapsible
              open={openMenus.includes("operacoes")}
              onOpenChange={() => toggleMenu("operacoes")}
            >
              <CollapsibleTrigger className="group text-zinc-400 w-full px-3 py-2.5 rounded-lg hover:bg-zinc-800/60 hover:text-white flex items-center justify-between transition-all duration-200">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 flex shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-sm whitespace-nowrap">
                    Operações
                  </span>
                </div>
                {openMenus.includes("operacoes") ? (
                  <ChevronDown className="h-4 w-4 transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="ml-9 mt-1 space-y-0.5 border-l-2 border-zinc-800 pl-3">
                <Link
                  href="/Clientes"
                  className="block px-3 py-2 text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/40 rounded-md transition-all duration-200 whitespace-nowrap"
                >
                  Clientes
                </Link>
                <Link
                  href="/Projetos"
                  className="block px-3 py-2 text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/40 rounded-md transition-all duration-200 whitespace-nowrap"
                >
                  Projetos
                </Link>
                <Link
                  href="/Vendas"
                  className="block px-3 py-2 text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/40 rounded-md transition-all duration-200 whitespace-nowrap"
                >
                  Vendas
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* Settings - Link Normal */}
            <Link
              href="/settings"
              className="group text-zinc-400 w-full px-3 py-2.5 rounded-lg hover:bg-zinc-800/60 hover:text-white flex items-center gap-3 transition-all duration-200"
            >
              <Settings className="h-5 w-5 flex shrink-0 group-hover:scale-110 text-zinc-400 transition-transform" />
              <span className="font-medium text-sm text-zinc-400 whitespace-nowrap">
                Settings
              </span>
            </Link>
          </nav>

          {/* Logout FORA do nav - fixo no final, não scrolla */}
          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={`group text-zinc-400 px-3 py-2.5 rounded-lg hover:bg-red-950/40 justify-center w-full hover:text-red-400 flex items-center gap-3 transition-all duration-200 mt-4 ${
              showContent ? "opacity-100" : "opacity-0"
            }`}
          >
            <LogOut className="h-5 w-5 flex shrink-0 group-hover:scale-110 transition-transform text-zinc-400" />
            <span className="font-medium text-sm whitespace-nowrap text-zinc-400">
              Logout
            </span>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full mt-5">
          {/* User Avatar quando colapsado */}
          <div className="w-full flex fixed justify-center">
            <Image
              src={`${session.user?.image || "/default-avatar.png"}`}
              alt="Avatar"
              width={40}
              height={40}
              className="w-11 h-11 bg-linear-to-br from-purple-500 to-purple-700 rounded-full flex shrink-0 items-center justify-center shadow-lg"
            />
          </div>

          {/* Ícones quando colapsado */}
          <nav className="flex flex-col items-center mt-27 gap-5 overflow-y-auto no-scrollbar">
            <div className="group p-2.5 rounded-lg hover:bg-zinc-800/60 transition-all duration-200">
              <LayoutDashboard className="text-zinc-300 group-hover:text-white h-5 w-5 group-hover:scale-110 transition-all" />
            </div>
            <div className="group p-2.5 rounded-lg hover:bg-zinc-800/60 transition-all duration-200">
              <Package className="text-zinc-300 group-hover:text-white h-5 w-5 group-hover:scale-110 transition-all" />
            </div>
            <div className="group p-2.5 rounded-lg hover:bg-zinc-800/60 transition-all duration-200">
              <Settings className="text-zinc-300 group-hover:text-white h-5 w-5 group-hover:scale-110 transition-all" />
            </div>
            <div className="group p-2.5 rounded-lg hover:bg-red-950/40 fixed bottom-4 transition-all duration-200">
              <LogOut className="text-zinc-300 group-hover:text-red-400 h-5 w-5 group-hover:scale-110 transition-all" />
            </div>
          </nav>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
