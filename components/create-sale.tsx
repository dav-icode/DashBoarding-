"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { createSale } from "@/lib/actions/sale";

interface CreateSaleProps {
  projects: Array<{
    id: string;
    name: string;
    client: {
      name: string;
    };
  }>;
}

export function CreateSale({ projects }: CreateSaleProps) {
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Adiciona o projectId se foi selecionado
    if (projectId) {
      formData.append("projectId", projectId);
    }

    const result = await createSale(formData);

    if (result.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.refresh();
  };

  return (
    <DialogContent className="sm:max-w-lg bg-zinc-900/95 border-zinc-800 text-white">
      <DialogHeader>
        <DialogTitle>Registrar Venda/Pagamento</DialogTitle>
        <DialogDescription>
          Registre um recebimento de pagamento
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {/* Valor */}
          <div className="grid gap-2">
            <Label htmlFor="amount">Valor (R$) *</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          {/* Data */}
          <div className="grid gap-2">
            <Label htmlFor="date">Data do Pagamento *</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          {/* Projeto (Opcional) */}
          <div className="grid gap-2">
            <Label htmlFor="project">Projeto Relacionado</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Selecione um projeto (opcional)" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} - {project.client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Descrição */}
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Ex: Entrada 50%, Parcela 2/3, Pagamento final..."
              className="bg-zinc-800 border-zinc-700 resize-none"
              rows={3}
            />
          </div>

          {/* Método de Pagamento (Opcional Extra) */}
          <div className="grid gap-2">
            <Label htmlFor="method">Método de Pagamento</Label>
            <Select name="method">
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Selecione o método" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="transfer">Transferência</SelectItem>
                <SelectItem value="card">Cartão</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="cash">Dinheiro</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button
              className="bg-zinc-800 hover:bg-zinc-700"
              type="button"
              variant="outline"
              disabled={loading}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Registrar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
