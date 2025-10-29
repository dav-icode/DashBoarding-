import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import getProjects from "@/lib/queries/projects";
import { Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FolderKanban, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddProjectDialog } from "@/components/create-project";
import { db } from "@/lib/db";

type ProjetoComRelacionamentos = Prisma.ProjectGetPayload<{
  include: { client: true; sales: true };
}>;

type ProjetoProcessado = ProjetoComRelacionamentos & {
  recebido: number;
  aReceber: number;
  percentualPago: number;
};

export default async function ProjetosPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const projetos = await getProjects();
  const client = await db.client.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  // ⭐ FUNÇÕES AUXILIARES
  const calcularRecebido = (projeto: ProjetoComRelacionamentos): number => {
    return projeto.sales.reduce((sum, sale) => sum + sale.amount, 0);
  };

  const calcularAReceber = (projeto: ProjetoComRelacionamentos): number => {
    const recebido = calcularRecebido(projeto);
    return (projeto.price || 0) - recebido;
  };

  const calcularPercentualPago = (
    projeto: ProjetoComRelacionamentos
  ): number => {
    if (!projeto.price || projeto.price === 0) return 0;
    const recebido = calcularRecebido(projeto);
    return (recebido / projeto.price) * 100;
  };

  // ⭐ PROCESSAR PROJETOS
  const projetosProcessados: ProjetoProcessado[] = projetos.map((projeto) => ({
    ...projeto,
    recebido: calcularRecebido(projeto),
    aReceber: calcularAReceber(projeto),
    percentualPago: calcularPercentualPago(projeto),
  }));

  // ⭐ CALCULAR ESTATÍSTICAS
  const stats = {
    total: projetos.length,
    inProgress: projetos.filter((p) => p.status === "In Progress").length,
    completed: projetos.filter((p) => p.status === "Completed").length,
    planning: projetos.filter((p) => p.status === "Planning").length,
  };

  // ⭐ CALCULAR TOTAIS
  const totais = {
    valorTotal: projetos.reduce((sum, p) => sum + (p.price || 0), 0),
    valorRecebido: projetosProcessados.reduce((sum, p) => sum + p.recebido, 0),
    valorAReceber: projetosProcessados.reduce((sum, p) => sum + p.aReceber, 0),
  };

  // ⭐ FUNÇÕES DE ESTILO
  const getStatusBadge = (status: string): string => {
    const styles: Record<string, string> = {
      "In Progress": "bg-blue-600/20 text-blue-400 border-blue-600/30",
      Completed: "bg-green-600/20 text-green-400 border-green-600/30",
      Planning: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
    };
    return styles[status] || "bg-zinc-600/20 text-zinc-400 border-zinc-600/30";
  };

  return (
    <Card className="p-6 h-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projetos</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie todos os seus projetos e acompanhe o progresso
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          </DialogTrigger>
          <AddProjectDialog clientId={client?.id || ""} />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-sm text-zinc-400 mt-1">Total de Projetos</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-blue-950/30 border-blue-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-400">
              {stats.inProgress}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Em Progresso</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-green-950/30 border-green-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">
              {stats.completed}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Concluídos</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-yellow-950/30 border-yellow-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-400">
              {stats.planning}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Planejamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Totais Financeiros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">
              R${" "}
              {totais.valorTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Valor Total</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-green-950/30 border-green-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">
              R${" "}
              {totais.valorRecebido.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Valor Recebido</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-yellow-950/30 border-yellow-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-400">
              R${" "}
              {totais.valorAReceber.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-sm text-zinc-400 mt-1">A Receber</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Projetos */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-white">Todos os Projetos</CardTitle>
          <CardDescription>
            Lista completa de projetos cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projetosProcessados.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">
                Nenhum projeto cadastrado ainda
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Projeto
                  </Button>
                </DialogTrigger>
                <AddProjectDialog clientId={client?.id || ""} />
              </Dialog>
            </div>
          ) : (
            <div className="space-y-4">
              {projetosProcessados.map((projeto) => (
                <div
                  key={projeto.id}
                  className="p-4 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-white text-lg">
                          {projeto.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={getStatusBadge(projeto.status)}
                        >
                          {projeto.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {projeto.description}
                      </p>
                      <p className="text-xs text-zinc-500 mt-2">
                        Cliente: {projeto.client.name}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700"
                    >
                      Ver detalhes
                    </Button>
                  </div>

                  {/* Barra de progresso */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">
                        Recebido: R$ {projeto.recebido.toFixed(2)}
                      </span>
                      <span className="text-zinc-400">
                        Total: R$ {(projeto.price || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 transition-all"
                        style={{ width: `${projeto.percentualPago}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-purple-400">
                        {projeto.percentualPago.toFixed(0)}% pago
                      </span>
                      {projeto.aReceber > 0 && (
                        <span className="text-yellow-400">
                          A receber: R$ {projeto.aReceber.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Card>
  );
}
