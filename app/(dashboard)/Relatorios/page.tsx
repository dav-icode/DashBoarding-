import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Target,
  FileDown,
  Award,
  Clock,
  Activity,
} from "lucide-react";

const RelatoriosPage = () => {
  return (
    <Card className="p-6 h-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20">
  
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Relatórios</h1>
          <p className="text-zinc-400 mt-1">
            Análises e insights do seu negócio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-zinc-700">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">R$ 230.000</div>
                <p className="text-sm text-zinc-400">Faturamento Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-blue-950/30 backdrop-blur-xl border-blue-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  R$ 15.300
                </div>
                <p className="text-sm text-zinc-400">Ticket Médio</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-yellow-950/30 backdrop-blur-xl border-yellow-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">8</div>
                <p className="text-sm text-zinc-400">Projetos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-green-950/30 backdrop-blur-xl border-green-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">68%</div>
                <p className="text-sm text-zinc-400">Taxa Conversão</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Principal - Faturamento */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">
            Faturamento dos Últimos 6 Meses
          </CardTitle>
          <CardDescription>
            Comparativo entre valores recebidos e a receber
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-zinc-800/50 rounded-lg border border-zinc-700 flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500 font-semibold">
                Gráfico de Linha (Recharts)
              </p>
              <p className="text-zinc-600 text-sm mt-1">
                Mai • Jun • Jul • Ago • Set • Out
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid 2 Colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Top 5 Clientes */}
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">

          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-white">Top 5 Clientes</CardTitle>
            </div>
            <CardDescription>Clientes com maior faturamento</CardDescription>
          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {/* Cliente 1 */}
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">TechCorp Brasil</p>
                    <p className="text-xs text-zinc-500">3 projetos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-400">R$ 45.000</p>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 border-purple-400/30 text-purple-400"
                  >
                    19.6%
                  </Badge>
                </div>
              </div>

              {/* Cliente 2 */}
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">StartupX</p>
                    <p className="text-xs text-zinc-500">2 projetos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-400">R$ 32.000</p>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 border-blue-400/30 text-blue-400"
                  >
                    13.9%
                  </Badge>
                </div>
              </div>

              {/* Cliente 3 */}
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-600/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">E-commerce Plus</p>
                    <p className="text-xs text-zinc-500">2 projetos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400">R$ 28.000</p>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 border-green-400/30 text-green-400"
                  >
                    12.2%
                  </Badge>
                </div>
              </div>

              {/* Cliente 4 */}
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-600/20 flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Clínica Vida</p>
                    <p className="text-xs text-zinc-500">1 projeto</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-400">R$ 18.000</p>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 border-yellow-400/30 text-yellow-400"
                  >
                    7.8%
                  </Badge>
                </div>
              </div>

              {/* Cliente 5 */}
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-600/20 flex items-center justify-center">
                    <span className="text-zinc-400 font-bold text-sm">5</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">FitGym</p>
                    <p className="text-xs text-zinc-500">1 projeto</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-zinc-400">R$ 15.000</p>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 border-zinc-400/30 text-zinc-400"
                  >
                    6.5%
                  </Badge>
                </div>
              </div>

            </div>

          </CardContent>

        </Card>

        {/* Projetos por Status */}
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">

          <CardHeader>
            <CardTitle className="text-white">Projetos por Status</CardTitle>
            <CardDescription>Distribuição atual dos projetos</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-[400px] bg-zinc-800/50 rounded-lg border border-zinc-700 flex items-center justify-center">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 font-semibold">
                  Gráfico de Pizza (Recharts)
                </p>
                <div className="flex items-center gap-4 justify-center mt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-zinc-500">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-xs text-zinc-500">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-xs text-zinc-500">Planning</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

        </Card>
      </div>

      {/* Métricas de Performance */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Métricas de Performance</CardTitle>
          <CardDescription>Indicadores chave do seu negócio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Métrica 1 */}
            <div className="p-6 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-sm text-zinc-400">Tempo Médio de Entrega</p>
              </div>
              <p className="text-3xl font-bold text-white">42 dias</p>
              <p className="text-xs text-zinc-500 mt-2">
                ↓ 5 dias vs mês anterior
              </p>
            </div>

            {/* Métrica 2 */}
            <div className="p-6 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-sm text-zinc-400">Projetos por Mês</p>
              </div>
              <p className="text-3xl font-bold text-white">3.2</p>
              <p className="text-xs text-zinc-500 mt-2">
                ↑ 0.4 vs mês anterior
              </p>
            </div>

            {/* Métrica 3 */}
            <div className="p-6 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-sm text-zinc-400">Taxa de Recebimento</p>
              </div>
              <p className="text-3xl font-bold text-white">63%</p>
              <p className="text-xs text-zinc-500 mt-2">↑ 8% vs mês anterior</p>
            </div>
          </div>
        </CardContent>
        
      </Card>
    </Card>
  );
};

export default RelatoriosPage;
