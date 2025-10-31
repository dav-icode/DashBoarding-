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
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  ListTodo,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { AddTaskDialog } from "@/components/create-task";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const TasksPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // ✅ BUSCA TODOS OS PROJETOS COM CLIENTE
  const projects = await db.project.findMany({
    where: {
      client: {
        userId: session.user.id,
      },
    },
    include: {
      client: {
        select: { name: true },
      },
    },
    orderBy: { name: "asc" },
  });

  // ✅ BUSCA TODAS AS TAREFAS COM PROJETO E CLIENTE
  const tasks = await db.task.findMany({
    where: {
      projeto: {
        client: {
          userId: session.user.id,
        },
      },
    },
    include: {
      projeto: {
        include: {
          client: {
            select: { name: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // ✅ CALCULAR ESTATÍSTICAS REAIS
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    doing: tasks.filter((t) => t.status === "doing").length,
    review: tasks.filter((t) => t.status === "review").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  // ✅ AGRUPAR TAREFAS POR STATUS
  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo"),
    doing: tasks.filter((t) => t.status === "doing"),
    review: tasks.filter((t) => t.status === "review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  // ✅ FUNÇÃO PARA BADGE DE PRIORIDADE
  const getPriorityBadge = (prioridade: string) => {
    const styles = {
      alta: "bg-red-600/20 text-red-400 border-red-600/30",
      media: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      baixa: "bg-green-600/20 text-green-400 border-green-600/30",
    };
    return (
      styles[prioridade as keyof typeof styles] ||
      "bg-zinc-600/20 text-zinc-400 border-zinc-600/30"
    );
  };

  return (
    <Card className="p-6 h-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tarefas</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie suas tarefas e prioridades
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Tarefa
            </Button>
          </DialogTrigger>
          {/* ✅ PASSA LISTA DE PROJETOS */}
          <AddTaskDialog projects={projects} />
        </Dialog>
      </div>

      {/* Stats - DADOS REAIS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-700/50 flex items-center justify-center">
                <ListTodo className="h-5 w-5 text-zinc-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {stats.total}
                </div>
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
                <div className="text-2xl font-bold text-blue-400">
                  {stats.doing}
                </div>
                <p className="text-sm text-zinc-400">Em andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-yellow-950/30 backdrop-blur-xl border-yellow-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {stats.todo}
                </div>
                <p className="text-sm text-zinc-400">Pendente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-green-950/30 backdrop-blur-xl border-green-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.done}
                </div>
                <p className="text-sm text-zinc-400">Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board - DADOS REAIS */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Quadro Kanban</CardTitle>
          <CardDescription>
            {tasks.length === 0
              ? "Nenhuma tarefa cadastrada ainda"
              : "Organize suas tarefas por status"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <ListTodo className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">
                Nenhuma tarefa cadastrada ainda
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Tarefa
                  </Button>
                </DialogTrigger>
                <AddTaskDialog projects={projects} />
              </Dialog>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* TO DO */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-300 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-zinc-500" />
                    TO DO
                    <Badge variant="secondary" className="ml-1">
                      {tasksByStatus.todo.length}
                    </Badge>
                  </h3>
                </div>

                <div className="space-y-3">
                  {tasksByStatus.todo.map((task) => (
                    <Card
                      key={task.id}
                      className="bg-zinc-800 border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getPriorityBadge(task.prioridade)}>
                            {task.prioridade}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          {task.nome}
                        </h4>
                        {task.descricao && (
                          <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                            {task.descricao}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <Badge
                            variant="outline"
                            className="text-purple-400 border-purple-400/30"
                          >
                            {task.projeto.name}
                          </Badge>
                          <div className="flex items-center gap-1 text-zinc-500">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(task.createdAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* DOING */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-blue-400 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    DOING
                    <Badge variant="secondary" className="ml-1">
                      {tasksByStatus.doing.length}
                    </Badge>
                  </h3>
                </div>

                <div className="space-y-3">
                  {tasksByStatus.doing.map((task) => (
                    <Card
                      key={task.id}
                      className="bg-zinc-800 border-blue-700/50 hover:border-blue-600 transition-all cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getPriorityBadge(task.prioridade)}>
                            {task.prioridade}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          {task.nome}
                        </h4>
                        {task.descricao && (
                          <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                            {task.descricao}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <Badge
                            variant="outline"
                            className="text-purple-400 border-purple-400/30"
                          >
                            {task.projeto.name}
                          </Badge>
                          <div className="flex items-center gap-1 text-zinc-500">
                            <Clock className="h-3 w-3" />
                            <span>Em progresso</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* REVIEW */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-yellow-400 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    REVIEW
                    <Badge variant="secondary" className="ml-1">
                      {tasksByStatus.review.length}
                    </Badge>
                  </h3>
                </div>

                <div className="space-y-3">
                  {tasksByStatus.review.map((task) => (
                    <Card
                      key={task.id}
                      className="bg-zinc-800 border-yellow-700/50 hover:border-yellow-600 transition-all cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getPriorityBadge(task.prioridade)}>
                            {task.prioridade}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-2">
                          {task.nome}
                        </h4>
                        {task.descricao && (
                          <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                            {task.descricao}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <Badge
                            variant="outline"
                            className="text-purple-400 border-purple-400/30"
                          >
                            {task.projeto.name}
                          </Badge>
                          <div className="flex items-center gap-1 text-zinc-500">
                            <AlertCircle className="h-3 w-3" />
                            <span>Revisão</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* DONE */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-400 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    DONE
                    <Badge variant="secondary" className="ml-1">
                      {tasksByStatus.done.length}
                    </Badge>
                  </h3>
                </div>

                <div className="space-y-3">
                  {tasksByStatus.done.map((task) => (
                    <Card
                      key={task.id}
                      className="bg-zinc-800 border-green-700/50 hover:border-green-600 transition-all cursor-pointer opacity-70"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={getPriorityBadge(task.prioridade)}>
                            {task.prioridade}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        <h4 className="text-sm font-semibold text-white mb-2 line-through">
                          {task.nome}
                        </h4>
                        {task.descricao && (
                          <p className="text-xs text-zinc-400 mb-3 line-clamp-2">
                            {task.descricao}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <Badge
                            variant="outline"
                            className="text-purple-400 border-purple-400/30"
                          >
                            {task.projeto.name}
                          </Badge>
                          <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Concluído</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Card>
  );
};

export default TasksPage;
