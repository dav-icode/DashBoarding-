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
import { updateInfoProject } from "@/lib/actions/update-info-client";

interface UpdateProjectProps {
  client: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    company: string | null;
  };
}

export const UpdateProject = ({ client }: UpdateProjectProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await updateInfoProject(formData);

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
        <DialogTitle>Adicionar Cliente</DialogTitle>
        <DialogDescription>
          Preencha os dados do novo cliente.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={client.id} />
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nome do cliente"
              required
              defaultValue={client.name}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="cliente@exemplo.com"
              required
              defaultValue={client.email || ""}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(99) 99999-9999"
              required
              defaultValue={client.phone || ""}
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              name="company"
              placeholder="Ex: ACME Inc."
              defaultValue={client.company || ""}
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
};

export default UpdateProject;
