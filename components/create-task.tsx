"use client";

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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/actions/project"; // ← importa a action

interface AddProjectDialogProps {
  clientId: string;
}

export function AddTaskDialog({ clientId }: AddProjectDialogProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [demanda, setDemanda] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("clientId", clientId); // ← adiciona o clientId
    formData.append("status", status); // ← adiciona o status

    const result = await createProject(formData);

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
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogDescription>Preencha os dados da Tarefa.</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Tarefa *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: feature-1"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              name="description"
              placeholder="Descrição da Tarefa"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className="flex flex-row justify-between mx-20 py-3">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="Planning">Pendente</SelectItem>
                  <SelectItem value="In Progress">Em Progresso</SelectItem>
                  <SelectItem value="Completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Demanda</Label>
              <Select value={demanda} onValueChange={setDemanda}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Media">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2 mb-2">
            <Label htmlFor="name">Nome do Projeto *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Ecommerce"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="deadline">Data de Entrega</Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              className="bg-zinc-800 border-zinc-700"
            />
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
            {loading ? "Salvando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
