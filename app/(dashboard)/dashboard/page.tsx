import RevenueChart from "@/components/RevenueChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  getMonthlyRevenue,
  getActiveProjectsCount,
  getActiveClients,
  getPendingPaymentsCount,
  getActiveProjects,
  getMonthlyRevenueChart,
} from "@/lib/queries/dashboard";
import { AlertTriangleIcon } from "lucide-react";

const DashboardPage = async () => {
  const revenue = await getMonthlyRevenue();
  const activeProjects = await getActiveProjectsCount();
  const activeClients = await getActiveClients();
  const pendingPayments = await getPendingPaymentsCount();
  const projects = await getActiveProjects();
  const revenueChart = await getMonthlyRevenueChart();

  return (
    <Card className="p-6 h-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20 ">
      {/* Header */}
      <CardContent className="p-4 mb-2">
        <h1 className="text-3xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-gray-400 opacity-80 text-sm mt-2">
          Visão geral dos seus projetos e finanças
        </p>
      </CardContent>

      {/* Cards de Métricas */}
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <p className="text-gray-400 text-sm mb-2">Receita do Mês</p>
          <h3 className="text-3xl font-bold text-white mb-2">{`R$ ${revenue}`}</h3>
          <p className="text-green-400 text-sm">+12% vs mês anterior</p>
        </div>

        {/* Card 2 */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <p className="text-gray-400 text-sm mb-2">Projetos Ativos</p>
          <h3 className="text-3xl font-bold text-white mb-2">{`${activeProjects}`}</h3>
          <p className="text-blue-400 text-sm">3 finalizados este mês</p>
        </div>

        {/* Card 3 */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <p className="text-gray-400 text-sm mb-2">Clientes Ativos</p>
          <h3 className="text-3xl font-bold text-white mb-2">{`${activeClients}`}</h3>
          <p className="text-purple-400 text-sm">2 novos este mês</p>
        </div>

        {/* Card 4 */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <p className="text-gray-400 text-sm mb-2">A Receber</p>
          <h3 className="text-3xl font-bold text-white mb-2">{`R$ ${pendingPayments}`}</h3>
          <p className="text-yellow-400 text-sm">4 pagamentos pendentes</p>
        </div>
      </CardContent>

      {/* Gráfico + Projetos */}
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Receita (2/3 da largura) */}
        <div className="lg:col-span-2 bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <RevenueChart data={revenueChart} />
        </div>

        {/* Projetos Ativos (1/3 da largura) */}
        <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700">
          <h2 className="text-xl font-bold text-white mb-4">Projetos Ativos</h2>
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="pb-4 border-b border-zinc-700 last:border-0 last:pb-0"
                >
                  <h3 className="font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400">
                    {project.client?.name || "Sem cliente"}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {project.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhum projeto ativo.</p>
          )}
        </div>
      </CardContent>

      {/* Alertas/Próximos Vencimentos */}
      <CardContent className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mx-5">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertTriangleIcon /> Notificações
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Alerta 1 */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg">
            <p className="text-yellow-400 font-semibold">Projeto: App Mobile</p>
            <p className="text-gray-300 text-sm">Entrega atrasada em 2 dias</p>
          </div>

          {/* Alerta 2 */}
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
            <p className="text-blue-400 font-semibold">
              Pagamento: Tech Solutions
            </p>
            <p className="text-gray-300 text-sm">R$ 4.250 - Vence em 3 dias</p>
          </div>

          {/* Alerta 3 */}
          <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
            <p className="text-purple-400 font-semibold">Reunião: StartupX</p>
            <p className="text-gray-300 text-sm">
              Amanhã às 14h - Review do projeto
            </p>
          </div>

          {/* Alerta 4 */}
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <p className="text-green-400 font-semibold">
              Pagamento: Costa E-commerce
            </p>
            <p className="text-gray-300 text-sm">
              R$ 9.250 - Recebido hoje! 🎉
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
