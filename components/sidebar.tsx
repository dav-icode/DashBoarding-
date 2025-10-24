"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog,
  ChevronDown,
  ChevronRight,
  Users,
  Building2,
  Package,
  Truck,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);

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
        isExpanded ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out bg-zinc-800 p-4 flex flex-col min-h-screen rounded-tr-3xl rounded-br-3xl overflow-hidden`}
    >
      {isExpanded ? (
        <div className="flex flex-col items-start w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">DashBoard</h1>
          </div>

          <nav className="flex flex-col w-full gap-2 border-b border-zinc-700 pb-[275px]">
            <Link
              href="/dashboard"
              className="text-gray-300 w-full p-3 rounded-xl hover:bg-zinc-700 flex items-center gap-3 transition-all"
            >
              <LayoutDashboard className="h-5 w-5 flex shrink-0" />
              <span className="font-semibold">Dashboard</span>
            </Link>

            {/* Cadastros - Com Sub-menu */}
            <Collapsible
              open={openMenus.includes("cadastros")}
              onOpenChange={() => toggleMenu("cadastros")}
            >
              <CollapsibleTrigger className="text-gray-300 w-full p-3 rounded-xl hover:bg-zinc-700 flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <UserCog className="h-5 w-5 flex shrink-0" />
                  <span className="font-semibold">Cadastros</span>
                </div>
                {openMenus.includes("cadastros") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="ml-8 mt-1 space-y-1">
                <Link
                  href="/unidades"
                  className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
                >
                  Unidades
                </Link>
                <Link
                  href="/produtos"
                  className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
                >
                  Produtos
                </Link>
                <Link
                  href="/clientes"
                  className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
                >
                  Clientes
                </Link>
                <Link
                  href="/fornecedores"
                  className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
                >
                  Fornecedores
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* Operações - Com Sub-menu */}
            <Collapsible
              open={openMenus.includes("operacoes")}
              onOpenChange={() => toggleMenu("operacoes")}
            >
              <CollapsibleTrigger className="text-gray-300 w-full p-3 rounded-xl hover:bg-zinc-700 flex items-center justify-between transition-all">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 flex shrink-0" />
                  <span className="font-semibold">Operações</span>
                </div>
                {openMenus.includes("operacoes") ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="ml-8 mt-1 space-y-1">
                <Link
                  href="/vendas"
                  className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
                >
                  Vendas
                </Link>
                <Link
                  href="/estoque"
                  className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
                >
                  Estoque
                </Link>
                <Link
                  href="/compras"
                  className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
                >
                  Compras
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* Settings - Link Normal */}
            <Link
              href="/settings"
              className="text-gray-300 w-full p-3 rounded-xl hover:bg-zinc-700 flex items-center gap-3 transition-all"
            >
              <Settings className="h-5 w-5 flex shrink-0" />
              <span className="font-semibold">Settings</span>
            </Link>

            {/* Logout - Link Normal */}
            <Link
              href="/logout"
              className="text-gray-300 w-full p-3 rounded-xl hover:bg-zinc-700 flex items-center gap-3 transition-all"
            >
              <LogOut className="h-5 w-5 flex shrink-0" />
              <span className="font-semibold">Logout</span>
            </Link>
          </nav>

          {/* Footer User */}
          <div className="pt-4 flex items-center gap-3 fixed bottom-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex shrink-0" />
            <div className="overflow-hidden">
              <p className="text-white font-semibold text-sm truncate">
                Davi Franco
              </p>
              <p className="text-gray-400 text-xs truncate">Admin</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {/* Header Colapsado */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">DB</h1>
          </div>

          {/* Ícones quando colapsado */}
          <nav className="flex flex-col items-center w-full gap-10">
            <LayoutDashboard className="text-neutral-200 h-5 w-5" />
            <UserCog className="text-neutral-200 h-5 w-5" />
            <Package className="text-neutral-200 h-5 w-5" />
            <Settings className="text-neutral-200 h-5 w-5" />
            <LogOut className="text-neutral-200 h-5 w-5" />
          </nav>

          {/* User Avatar quando colapsado */}
          <div className="mb-auto pt-4 border-t border-zinc-700 flex items-center justify-center fixed bottom-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
