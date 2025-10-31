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
import { createProject } from "@/lib/actions/project";

interface AddProjectDialogProps {
  clientId?: string; // ← AGORA É OPCIONAL
  clients?: { id: string; name: string; company: string | null }[]; // ← LISTA DE CLIENTES
}

export function AddProjectDialog({ clientId, clients }: AddProjectDialogProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Planning");
  const [selectedClientId, setSelectedClientId] = useState(clientId || ""); // ← NOVO STATE
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ VALIDA SE TEM CLIENTE SELECIONADO
    const finalClientId = clientId || selectedClientId;

    if (!finalClientId) {
      alert("Erro: Selecione um cliente!");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("clientId", finalClientId); // ← USA O CLIENTE CORRETO
    formData.append("status", status);

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
    <DialogContent className="sm:max-w-lg bg-zinc-900/95 border-zinc-800 text-white max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Adicionar Projeto</DialogTitle>
        <DialogDescription>
          Preencha os dados do novo projeto.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {/* ✅ SELECT DE CLIENTE - SÓ APARECE SE NÃO TIVER clientId FIXO */}
          {!clientId && clients && clients.length > 0 && (
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente *</Label>
              <Select
                value={selectedClientId}
                onValueChange={setSelectedClientId}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.company || client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="name">Nome do Projeto *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Website Redesign"
              required
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              name="description"
              placeholder="Descrição do projeto"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status *</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="Planning">Planejamento</SelectItem>
                <SelectItem value="In Progress">Em Progresso</SelectItem>
                <SelectItem value="Completed">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Valor (R$)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="startDate">Data de Início</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="deadline">Prazo de Entrega</Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="progress">Progresso (%)</Label>
            <Input
              id="progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              defaultValue="0"
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
