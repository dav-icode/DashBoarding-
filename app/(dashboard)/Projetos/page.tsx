import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FolderKanban,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Prisma } from "@prisma/client";

// Tipo do projeto com relacionamentos
type ProjetoComRelacionamentos = Prisma.ProjectGetPayload<{
  include: { client: true; sales: true };
}>;

export default async function ProjetosPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/Login");
  }

  // Buscar projetos
  const projetos: ProjetoComRelacionamentos[] = await db.project.findMany({
    include: {
      client: true,
      sales: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calcular estatísticas
  const stats = {
    total: projetos.length,
    inProgress: projetos.filter((p) => p.status === "In Progress").length,
    completed: projetos.filter((p) => p.status === "Completed").length,
    planning: projetos.filter((p) => p.status === "Planning").length,
  };

  // Função para calcular valor recebido
  const calcularRecebido = (projeto: ProjetoComRelacionamentos) => {
    return projeto.sales.reduce((acc, sale) => acc + sale.amount, 0);
  };

  // Função para obter badge de status
  const getStatusBadge = (status: string) => {
    const styles = {
      "In Progress": "bg-blue-600/20 text-blue-400 border-blue-600/30",
      Completed: "bg-green-600/20 text-green-400 border-green-600/30",
      Planning: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
    };
    return styles[status as keyof typeof styles] || "";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Clock className="h-3 w-3" />;
      case "Completed":
        return <CheckCircle2 className="h-3 w-3" />;
      case "Planning":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 flex gap-6 w-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg  rounded-tl-none border border-s-white/5 border-t-black/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projetos</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie todos os seus projetos e acompanhe o progresso
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-sm text-zinc-400 mt-1">Total de Projetos</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-blue-950/30 backdrop-blur-xl border-blue-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-400">
              {stats.inProgress}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Em Progresso</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-green-950/30 backdrop-blur-xl border-green-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-400">
              {stats.completed}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Concluídos</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-yellow-950/30 backdrop-blur-xl border-yellow-900/30">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-400">
              {stats.planning}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Planejamento</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Projetos */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Todos os Projetos</CardTitle>
          <CardDescription>
            Lista completa de projetos cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projetos.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">
                Nenhum projeto cadastrado ainda
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Projeto
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {projetos.map((projeto) => {
                const recebido = calcularRecebido(projeto);
                const aReceber = (projeto.price || 0) - recebido;
                const percentualPago = projeto.price
                  ? (recebido / projeto.price) * 100
                  : 0;

                return (
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
                            {getStatusIcon(projeto.status)}
                            <span className="ml-1">{projeto.status}</span>
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

                    {/* Barra de progresso de pagamento */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">
                          Recebido: R$ {recebido.toFixed(2)}
                        </span>
                        <span className="text-zinc-400">
                          Total: R$ {(projeto.price || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 transition-all"
                          style={{ width: `${percentualPago}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-purple-400">
                          {percentualPago.toFixed(0)}% pago
                        </span>
                        {aReceber > 0 && (
                          <span className="text-yellow-400">
                            A receber: R$ {aReceber.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </Card>
  );
}