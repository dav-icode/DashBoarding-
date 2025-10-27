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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function VendasPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/Login");
  }

  // Buscar vendas
  const vendas = await db.sale.findMany({
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

  // Calcular estatísticas
  const totalRecebido = vendas.reduce((acc, v) => acc + v.amount, 0);
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
  const vendasMesAtual = vendas.filter((v) => {
    const data = new Date(v.date);
    return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
  });
  const recebidoMesAtual = vendasMesAtual.reduce((acc, v) => acc + v.amount, 0);

  return (
    <Card className="p-6 flex gap-6 w-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg  rounded-tl-none border border-s-white/5 border-t-black/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vendas</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie seus recebimentos e pagamentos
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Venda
        </Button>
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
                  R$ {totalRecebido.toFixed(2)}
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
                  R$ {recebidoMesAtual.toFixed(2)}
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
                  {vendas.length}
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
          {vendas.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">
                Nenhuma venda cadastrada ainda
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Primeira Venda
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {vendas.map((venda) => (
                <div
                  key={venda.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-600/20 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        R$ {venda.amount.toFixed(2)}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        {venda.description}
                      </p>
                      {venda.project && (
                        <p className="text-xs text-zinc-500 mt-1">
                          Projeto: {venda.project.name} •{" "}
                          {venda.project.client.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-300">
                      {format(new Date(venda.date), "dd 'de' MMMM, yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {format(new Date(venda.date), "HH:mm")}
                    </p>
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
