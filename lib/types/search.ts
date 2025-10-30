export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "cliente" | "projeto" | "venda" | "tarefa" | "fatura";
  url: string;
  match: string; // Texto que deu match na busca
  icon: string; // Nome do ícone lucide-react
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  query: string;
}

export type SearchCategory =
  | "all"
  | "cliente"
  | "projeto"
  | "venda"
  | "tarefa"
  | "fatura";
