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
  Calendar,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  User,
} from "lucide-react";

const CalendarioPage = () => {
  return (
    <Card className="p-6 h-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Calendário</h1>
          <p className="text-zinc-400 mt-1">
            Visualize todos os seus deadlines e entregas
          </p>
        </div>

        <Button className="bg-purple-600 hover:bg-purple-700">
          <Calendar className="h-4 w-4 mr-2" />
          Hoje
        </Button>
      </div>

      {/* Alertas - Próximos Deadlines */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <CardTitle className="text-white">
              Próximos Deadlines (7 dias)
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* Alerta 1 - HOJE */}
            <div className="flex items-center justify-between p-4 bg-red-950/30 rounded-lg border border-red-900/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">E-commerce Premium</p>
                  <p className="text-sm text-zinc-400">
                    Entrega parcial do checkout
                  </p>
                </div>
              </div>
              <Badge className="bg-red-600/20 text-red-400 border-red-600/30">
                HOJE
              </Badge>
            </div>

            {/* Alerta 2 - AMANHÃ */}
            <div className="flex items-center justify-between p-4 bg-yellow-950/30 rounded-lg border border-yellow-900/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Website Review</p>
                  <p className="text-sm text-zinc-400">
                    Revisão final com cliente
                  </p>
                </div>
              </div>
              <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                Amanhã
              </Badge>
            </div>

            {/* Alerta 3 - 5 DIAS */}
            <div className="flex items-center justify-between p-4 bg-blue-950/30 rounded-lg border border-blue-900/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Sistema ERP</p>
                  <p className="text-sm text-zinc-400">
                    Checkpoint de progresso
                  </p>
                </div>
              </div>
              <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                Em 5 dias
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendário Mensal */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Novembro 2025</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-zinc-700">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Grid do Calendário */}
          <div className="space-y-2">
            {/* Header dos dias da semana */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
                <div
                  key={dia}
                  className="text-center text-sm font-semibold text-zinc-400 py-2"
                >
                  {dia}
                </div>
              ))}
            </div>

            {/* Dias do mês */}
            <div className="grid grid-cols-7 gap-2">
              {/* Dias vazios do início */}
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>
              <div className="aspect-square"></div>

              {/* Dia 1 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">1</div>
              </div>

              {/* Dia 2 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">2</div>
              </div>

              {/* Dia 3 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">3</div>
              </div>

              {/* Dia 4 - COM EVENTOS (HOJE - ATRASADO) */}
              <div className="aspect-square p-2 bg-red-950/30 rounded-lg border-2 border-red-600 hover:border-red-500 cursor-pointer transition-all">
                <div className="text-sm font-bold text-red-400 mb-1">4</div>
                <div className="space-y-1">
                  <div className="h-1 w-full bg-red-500 rounded" />
                  <div className="h-1 w-full bg-yellow-500 rounded" />
                </div>
              </div>

              {/* Dia 5 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">5</div>
              </div>

              {/* Dia 6 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">6</div>
              </div>

              {/* Dia 7 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">7</div>
              </div>

              {/* Dia 8 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">8</div>
              </div>

              {/* Dia 9 */}
              <div className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all">
                <div className="text-sm text-zinc-400">9</div>
              </div>

              {/* Dia 10 - COM EVENTO */}
              <div className="aspect-square p-2 bg-yellow-950/30 rounded-lg border border-yellow-600/50 hover:border-yellow-500 cursor-pointer transition-all">
                <div className="text-sm font-semibold text-yellow-400 mb-1">
                  10
                </div>
                <div className="h-1 w-full bg-yellow-500 rounded" />
              </div>

              {/* Continua dias 11-30... (pode repetir o padrão) */}
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i + 11}
                  className="aspect-square p-2 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-all"
                >
                  <div className="text-sm text-zinc-400">{i + 11}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Dia Selecionado */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">
            Detalhes do Dia - 4 de Novembro
          </CardTitle>
          <CardDescription>2 eventos neste dia</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Evento 1 */}
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      App Mobile Urgente
                    </p>
                    <p className="text-sm text-zinc-400">
                      Cliente: TechCorp Brasil
                    </p>
                  </div>
                </div>
                <Badge className="bg-red-600/20 text-red-400 border-red-600/30">
                  ATRASADO há 5 dias
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Progresso: 60%</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Você</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-zinc-700"
              >
                Ver Projeto →
              </Button>
            </div>

            {/* Evento 2 */}
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Sistema CRM</p>
                    <p className="text-sm text-zinc-400">
                      Cliente: TechCorp Brasil
                    </p>
                  </div>
                </div>
                <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                  Deadline Hoje
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>Progresso: 40%</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Você</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-zinc-700"
              >
                Ver Projeto →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legenda */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm text-zinc-400">Atrasado</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-zinc-400">Hoje/Próximo</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm text-zinc-400">Futuro</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-zinc-400">Concluído</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
};

export default CalendarioPage;
