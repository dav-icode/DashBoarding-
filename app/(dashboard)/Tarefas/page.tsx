import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  ListTodo,
  MoreVertical,
  Calendar,
  User,
} from "lucide-react";
import { AddTaskDialog } from "@/components/create-task";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const TasksPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const client = await db.client.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <Card className="p-6 h-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tarefas</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie suas tarefas e prioridades
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          <AddTaskDialog clientId={client?.id || ""} />
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-700/50 flex items-center justify-center">
                <ListTodo className="h-5 w-5 text-zinc-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">15</div>
                <p className="text-sm text-zinc-400">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-blue-950/30 backdrop-blur-xl border-blue-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">8</div>
                <p className="text-sm text-zinc-400">Em andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-yellow-950/30 backdrop-blur-xl border-yellow-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">4</div>
                <p className="text-sm text-zinc-400">Pendente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-green-950/30 backdrop-blur-xl border-green-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">3</div>
                <p className="text-sm text-zinc-400">Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl w-[600px]">
        <CardContent className="pt-6">
          <div className="flex gap-3 items-center">
            {/* Select Projeto */}
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px] bg-zinc-800 text-zinc-100 border-zinc-700">
                <SelectValue placeholder="Todos Projetos" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="todos">Todos Projetos</SelectItem>
                <SelectItem value="ecommerce">E-commerce Premium</SelectItem>
                <SelectItem value="crm">Sistema CRM</SelectItem>
                <SelectItem value="app">App Mobile</SelectItem>
                <SelectItem value="dashboard">Dashboard Analytics</SelectItem>
              </SelectContent>
            </Select>

            {/* Select Prioridade */}
            <Select defaultValue="todas">
              <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="alta">
                  <span className="mr-2">🔴</span> Alta
                </SelectItem>
                <SelectItem value="media">
                  <span className="mr-2">🟡</span> Média
                </SelectItem>
                <SelectItem value="baixa">
                  <span className="mr-2">🟢</span> Baixa
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Toggle Group */}
            <ToggleGroup
              type="single"
              defaultValue="todas"
              className="bg-zinc-800 border border-zinc-700 rounded-lg"
            >
              <ToggleGroupItem value="todas" className="text-xs px-3">
                Todas
              </ToggleGroupItem>
              <ToggleGroupItem value="minhas" className="text-xs px-3">
                Só Minhas
              </ToggleGroupItem>
              <ToggleGroupItem value="urgentes" className="text-xs px-3">
                Urgentes
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Quadro Kanban</CardTitle>
          <CardDescription>
            Arraste e solte tarefas entre as colunas
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* TO DO */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-300 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-zinc-500" />
                  TO DO
                  <Badge variant="secondary" className="ml-1">
                    4
                  </Badge>
                </h3>
              </div>

              <div className="space-y-3">
                {/* Task Card 1 */}
                <Card className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-red-600/20 text-red-400 border-red-600/30 text-xs">
                        Alta
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Corrigir bug no checkout
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">
                      Erro ao finalizar compra com cartão
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-purple-400 border-purple-400/30"
                      >
                        E-commerce
                      </Badge>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        <span>Hoje</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Task Card 2 */}
                <Card className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs">
                        Média
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Criar logo da marca
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">
                      3 variações de cores
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-blue-400 border-blue-400/30"
                      >
                        Branding
                      </Badge>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <User className="h-3 w-3" />
                        <span>Você</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Task Card 3 */}
                <Card className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-green-600/20 text-green-400 border-green-600/30 text-xs">
                        Baixa
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Documentar API
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">
                      Swagger + Postman collection
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-400/30"
                      >
                        CRM
                      </Badge>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        <span>5 dias</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* DOING */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  DOING
                  <Badge variant="secondary" className="ml-1">
                    8
                  </Badge>
                </h3>
              </div>

              <div className="space-y-3">
                <Card className="bg-zinc-800 border-blue-700/50 hover:border-blue-600 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-red-600/20 text-red-400 border-red-600/30 text-xs">
                        Alta
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Implementar autenticação
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">
                      JWT + refresh tokens
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-purple-400 border-purple-400/30"
                      >
                        App Mobile
                      </Badge>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Clock className="h-3 w-3" />
                        <span>2h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-blue-700/50 hover:border-blue-600 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs">
                        Média
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Setup banco de dados
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">
                      PostgreSQL + Prisma
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-purple-400 border-purple-400/30"
                      >
                        E-commerce
                      </Badge>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <User className="h-3 w-3" />
                        <span>Você</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* REVIEW */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-yellow-400 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  REVIEW
                  <Badge variant="secondary" className="ml-1">
                    3
                  </Badge>
                </h3>
              </div>

              <div className="space-y-3">
                <Card className="bg-zinc-800 border-yellow-700/50 hover:border-yellow-600 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30 text-xs">
                        Média
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Testar API de pagamentos
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">Stripe sandbox</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-400/30"
                      >
                        CRM
                      </Badge>
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        <span>Amanhã</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* DONE */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-400 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  DONE
                  <Badge variant="secondary" className="ml-1">
                    3
                  </Badge>
                </h3>
              </div>

              <div className="space-y-3">
                <Card className="bg-zinc-800 border-green-700/50 hover:border-green-600 transition-all cursor-pointer opacity-70">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-green-600/20 text-green-400 border-green-600/30 text-xs">
                        Baixa
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2 line-through">
                      Criar página de login
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">
                      NextAuth + Google OAuth
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-blue-400 border-blue-400/30"
                      >
                        Website
                      </Badge>
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Concluído</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-green-700/50 hover:border-green-600 transition-all cursor-pointer opacity-70">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-red-600/20 text-red-400 border-red-600/30 text-xs">
                        Alta
                      </Badge>
                      <Button className="text-zinc-500 hover:text-zinc-300 bg-black/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2 line-through">
                      Setup Vercel
                    </h4>
                    <p className="text-xs text-zinc-400 mb-3">Deploy CI/CD</p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="text-purple-400 border-purple-400/30"
                      >
                        E-commerce
                      </Badge>
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Ontem</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
};

export default TasksPage;
