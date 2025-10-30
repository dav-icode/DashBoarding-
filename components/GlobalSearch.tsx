"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Loader2,
  Users,
  Briefcase,
  DollarSign,
  CheckSquare,
  FileText,
} from "lucide-react";
import { useGlobalSearch } from "../hooks/useGlobalSearch";
import { SearchResult } from "@/lib/types/search";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const iconMap = {
  Users,
  Briefcase,
  DollarSign,
  CheckSquare,
  FileText,
};

const typeColors = {
  cliente: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  projeto: "bg-purple-600/20 text-purple-400 border-purple-600/30",
  venda: "bg-green-600/20 text-green-400 border-green-600/30",
  tarefa: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  fatura: "bg-red-600/20 text-red-400 border-red-600/30",
};

const typeLabels = {
  cliente: "Cliente",
  projeto: "Projeto",
  venda: "Venda",
  tarefa: "Tarefa",
  fatura: "Fatura",
};

export default function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { query, setQuery, results, isLoading, clearSearch } = useGlobalSearch({
    debounceMs: 300,
    minQueryLength: 2,
  });

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    clearSearch();
  };

  const handleClear = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  // Atalho de teclado: Ctrl+K ou Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        setIsOpen(false);
        clearSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [clearSearch]);

  // Navegação com teclado (setas)
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
      }
    };

    document.addEventListener("keydown", handleArrowKeys);
    return () => document.removeEventListener("keydown", handleArrowKeys);
  }, [isOpen, results, selectedIndex, handleResultClick]);

  // Click fora para fechar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      
      {/* Input de Busca */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 pointer-events-none z-10" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Buscar em todo o dashboard... (Ctrl+K)"
          className="w-full h-12 pl-12 pr-12 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-lg"
        />
        {query && (
          <Button
            variant={"ghost"}
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all z-10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Dropdown de Resultados */}
      {isOpen && (query.length >= 2 || results.length > 0) && (
        <Card className="absolute top-[52px] left-0 w-full bg-zinc-900/98 backdrop-blur-xl border border-zinc-700/50 rounded-lg shadow-2xl z-[100] max-h-[500px] overflow-hidden">
          <div className="overflow-y-auto max-h-[500px]">
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
                <span className="ml-3 text-zinc-400 text-sm">Buscando...</span>
              </div>
            )}

            {/* Resultados */}
            {!isLoading && results.length > 0 && (
              <div className="py-2">
                <div className="text-xs text-zinc-500 px-4 py-2 font-medium border-b border-zinc-800">
                  {results.length} resultado{results.length > 1 ? "s" : ""}{" "}
                  encontrado{results.length > 1 ? "s" : ""}
                </div>
                <div className="p-2 space-y-1">
                  {results.map((result, index) => {
                    const Icon =
                      iconMap[result.icon as keyof typeof iconMap] || Search;
                    const isSelected = index === selectedIndex;

                    return (
                      <Button
                        type="button"
                        variant="ghost"
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full text-left p-3 rounded-lg transition-all group ${
                          isSelected
                            ? "bg-purple-600/20 border border-purple-500/30 shadow-md"
                            : "hover:bg-zinc-800/60 border border-transparent"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Ícone */}
                          <div
                            className={`h-10 w-10 rounded-lg ${
                              typeColors[result.type as keyof typeof typeColors]
                            } flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? "scale-105" : ""
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          {/* Conteúdo */}
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-semibold text-white text-base truncate">
                                {result.title}
                              </span>
                              <Badge
                                className={`text-xs shrink-0 ${
                                  typeColors[
                                    result.type as keyof typeof typeColors
                                  ]
                                }`}
                              >
                                {
                                  typeLabels[
                                    result.type as keyof typeof typeLabels
                                  ]
                                }
                              </Badge>
                            </div>
                            <p className="text-sm text-zinc-400 truncate leading-relaxed">
                              {result.description}
                            </p>
                            {result.match && (
                              <p className="text-xs text-zinc-500 mt-1.5 font-medium">
                                {result.match}
                              </p>
                            )}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && query.length >= 2 && results.length === 0 && (
              <div className="py-16 text-center">
                <Search className="h-14 w-14 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-400 font-semibold text-lg">
                  Nenhum resultado encontrado
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                  Tente buscar por outro termo
                </p>
              </div>
            )}

            {/* Hint de Navegação */}
            {results.length > 0 && (
              <div className="border-t border-zinc-800 bg-zinc-900/50 px-4 py-2.5 flex items-center justify-between text-xs text-zinc-500 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono">
                      ↑↓
                    </kbd>
                    navegar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono">
                      ↵
                    </kbd>
                    selecionar
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono">
                    ESC
                  </kbd>
                  fechar
                </span>
              </div>
            )}

          </div>
        </Card>
      )}

    </div>
  );
}
