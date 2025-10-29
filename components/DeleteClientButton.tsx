"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteClient } from "@/lib/actions/delete-client";

export function DeleteClientButton({
  clientId,
  clientName,
}: {
  clientId: string;
  clientName: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(
      `Tem certeza que deseja deletar "${clientName}"?\n\n` +
        `Todos os projetos deste cliente também serão deletados!\n\n` +
        `Esta ação não pode ser desfeita.`
    );

    if (!confirmed) return;

    setLoading(true);

    const result = await deleteClient(clientId);

    if (result?.error) {
      alert(result.error);
      setLoading(false);
      return;
    }

    if (!result?.error) {
      router.push("/Clientes");
      router.refresh();
    }
  };

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      disabled={loading}
      className="w-full border-red-900 text-red-400 hover:bg-red-950 hover:text-red-300"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {loading ? "Deletando..." : "Deletar Cliente"}
    </Button>
  );
}
