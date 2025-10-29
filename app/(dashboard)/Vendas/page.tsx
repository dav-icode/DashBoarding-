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
import { Plus, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateSale } from "@/components/create-sale";

export default async function VendasPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Buscar vendas
  const sales = await db.sale.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      project: {
        include: {
          client: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  // Buscar projetos para o select do CreateSale
  const projects = await db.project.findMany({
    where: {
      client: {
        userId: session.user.id,
      },
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  // Calcular total recebido
  const totalRecebido = sales.reduce((sum, s) => sum + s.amount, 0);

  // Calcular recebido no mês atual
  const hoje = new Date();
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const recebidoMesAtual = sales
    .filter((s) => new Date(s.date) >= inicioMes)
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <Card className="p-6 min-h-screen mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vendas</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie seus recebimentos e pagamentos
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Venda
            </Button>
          </DialogTrigger>
          <CreateSale projects={projects} />
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  R${" "}
                  {totalRecebido.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <p className="text-sm text-zinc-400">Total Recebido</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  R${" "}
                  {recebidoMesAtual.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <p className="text-sm text-zinc-400">Este Mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {sales.length}
                </div>
                <p className="text-sm text-zinc-400">Total de Vendas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Vendas */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Histórico de Vendas</CardTitle>
          <CardDescription>
            Lista completa de vendas e recebimentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">
                Nenhuma venda cadastrada ainda
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Primeira Venda
                  </Button>
                </DialogTrigger>
                <CreateSale projects={projects} />
              </Dialog>
            </div>
          ) : (
            <div className="space-y-3">
              {sales.map((sale) => (
                <Card key={sale.id} className="bg-zinc-800 border-zinc-700">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Título - Projeto ou Venda Avulsa */}
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {sale.project ? (
                              <>
                                {sale.project.name}
                                <span className="text-sm text-zinc-500 ml-2 font-normal">
                                  • {sale.project.client.name}
                                </span>
                              </>
                            ) : (
                              "Venda Avulsa"
                            )}
                          </h3>
                        </div>

                        {/* Descrição */}
                        {sale.description && (
                          <p className="text-sm text-zinc-400 mb-3">
                            {sale.description}
                          </p>
                        )}

                        {/* Data */}
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(sale.date).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Valor em Destaque */}
                      <div className="text-right">
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30 text-lg px-3 py-1">
                          + R${" "}
                          {sale.amount.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Card>
  );
}
