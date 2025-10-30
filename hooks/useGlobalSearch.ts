"use client";

import { useState, useEffect, useCallback } from "react";
import {
  SearchResult,
  SearchResponse,
  SearchCategory,
} from "../lib/types/search";

interface UseGlobalSearchProps {
  debounceMs?: number;
  minQueryLength?: number;
}

export function useGlobalSearch({
  debounceMs = 300,
  minQueryLength = 2,
}: UseGlobalSearchProps = {}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função de busca com debounce
  const performSearch = useCallback(
    async (searchQuery: string, searchCategory: SearchCategory) => {
      if (searchQuery.trim().length < minQueryLength) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: searchQuery,
          category: searchCategory,
        });

        const response = await fetch(`/api/search?${params}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar");
        }

        const data: SearchResponse = await response.json();
        setResults(data.results);
      } catch (err) {
        setError("Erro ao realizar busca. Tente novamente.");
        setResults([]);
        console.error("Erro na busca:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [minQueryLength]
  );

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query, category);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, category, debounceMs, performSearch]);

  // Função para limpar busca
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    isLoading,
    error,
    clearSearch,
  };
}
