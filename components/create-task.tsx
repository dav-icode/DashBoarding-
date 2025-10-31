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
import { createTask } from "@/lib/actions/task";

interface AddTaskDialogProps {
  projectId?: string; // ← OPCIONAL (se vier de página de projeto específico)
  projects?: { id: string; name: string; client: { name: string } }[]; // ← LISTA DE PROJETOS
}

export function AddTaskDialog({ projectId, projects }: AddTaskDialogProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("todo");
  const [prioridade, setPrioridade] = useState("media");
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ VALIDA PROJETO
    const finalProjectId = projectId || selectedProjectId;

    if (!finalProjectId) {
      alert("Selecione um projeto!");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("projectId", finalProjectId); // ← PASSA projectId
    formData.append("status", status);
    formData.append("prioridade", prioridade);

    const result = await createTask(formData);

    setLoading(false);

    if (result.error) {
      alert(result.error);
      return;
    }

    alert("Tarefa criada com sucesso!");
    router.refresh();
  };

  return (
    <DialogContent className="sm:max-w-lg bg-zinc-900/95 border-zinc-800 text-white">
      <DialogHeader>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogDescription>
          Crie uma nova tarefa para o projeto.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {/* ✅ SELECT DE PROJETO - SÓ APARECE SE NÃO TIVER projectId FIXO */}
          {!projectId && projects && projects.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="project">Projeto *</Label>
              <Select
                value={selectedProjectId}
                onValueChange={setSelectedProjectId}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Selecione um projeto" />
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
          )}

          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Tarefa *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Implementar login"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              name="description"
              placeholder="Descrição da tarefa"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="todo">A Fazer</SelectItem>
                  <SelectItem value="doing">Em Progresso</SelectItem>
                  <SelectItem value="review">Em Revisão</SelectItem>
                  <SelectItem value="done">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="prioridade">Prioridade *</Label>
              <Select value={prioridade} onValueChange={setPrioridade}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={loading}>
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
