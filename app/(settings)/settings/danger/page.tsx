import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";

export default function SettingsDangerPage() {
  return (
    <div className="space-y-6 w-[75vw]">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Zona de Perigo</h2>
        <p className="text-zinc-400 mt-1">
          Ações irreversíveis que afetam permanentemente sua conta
        </p>
      </div>

      {/* Aviso */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-red-950/20 border border-red-900/50 w-[75w]">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-400">
            Atenção: Essas ações são irreversíveis
          </p>
          <p className="text-xs text-red-300/70 mt-1">
            Tenha certeza do que está fazendo antes de prosseguir
          </p>
        </div>
      </div>

      {/* Card de Excluir Conta */}
      <Card className="border-red-900/50 bg-zinc-900/50 backdrop-blur-xl p-5 w-[75w]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-500" />
            <CardTitle className="text-white">Excluir Conta</CardTitle>
          </div>
          <CardDescription>
            Excluir permanentemente sua conta e todos os seus dados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
            <p className="text-sm text-zinc-300 mb-4">
              Ao excluir sua conta, você perderá:
            </p>
            <ul className="space-y-1 text-sm text-zinc-400 flex gap-2 flex-col">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Todos os seus projetos e dados
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Histórico de vendas e clientes
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Acesso à plataforma
              </li>
            </ul>
          </div>

          <div className="flex justify-end mt-5">
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir minha conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
