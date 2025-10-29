import { AddProjectDialog } from "@/components/create-project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateProject from "@/components/update-project";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  Edit,
  FolderKanban,
  Mail,
  Phone,
  Plus,
  Trash2,
  TriangleAlertIcon,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";
import { deleteClient } from "@/lib/actions/delete-client";
import { DeleteClientButton } from "@/components/DeleteClientButton";

export default async function PageProjectsClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const resolvedParams = await params;

  const cliente = await db.client.findFirst({
    where: {
      id: resolvedParams.id,
      userId: session.user.id,
    },
    include: {
      projects: true,
    },
  });

  if (cliente?.userId !== session.user.id) {
    throw new Error("Acesso negado");
  }

  if (!cliente) {
    redirect("/Clientes");
  }

  return (
    <Card className="p-6 flex gap-6 w-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg rounded-tl-none border border-s-white/5 border-t-black/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* INFORMAÇÕES DO CLIENTE */}
          <div className="lg:col-span-1 space-y-5 border p-5 rounded-3xl border-zinc-700">
            <div>
              <h2 className="text-sm font-medium text-zinc-400 mb-1">
                Empresa
              </h2>
              <h1 className="text-2xl font-bold text-white">
                {cliente.company || "CNPJ não cadastrado"}
              </h1>
            </div>

            <div className="space-y-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-3 text-zinc-300">
                <User className="h-4 w-4 text-zinc-500" />
                <span>{cliente.name}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Mail className="h-4 w-4 text-zinc-500" />
                <span className="text-sm">{cliente.email}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Phone className="h-4 w-4 text-zinc-500" />
                <span>{cliente.phone}</span>
              </div>
            </div>

            {/* AÇÕES */}
            <div className="flex flex-col gap-2 pt-4">
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 hover:bg-zinc-800"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Cliente
                  </Button>
                </DialogTrigger>
                <UpdateProject client={cliente} />
              </Dialog>
              <DeleteClientButton
                clientId={cliente.id}
                clientName={cliente.name}
              />
            </div>
          </div>

          {/* PROJETOS */}
          <div className="lg:col-span-2 space-y-4 border p-5 rounded-3xl border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {cliente.projects.length}{" "}
                  {cliente.projects.length === 1 ? "Projeto" : "Projetos"}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Acompanhe o andamento dos projetos
                </p>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Projeto
                  </Button>
                </DialogTrigger>
                <AddProjectDialog clientId={cliente.id} />
              </Dialog>
            </div>

            {cliente.projects.length === 0 ? (
              <div className="text-center py-12 bg-zinc-800/30 rounded-lg border border-zinc-700 border-dashed">
                <FolderKanban className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 mb-4">
                  Nenhum projeto cadastrado ainda
                </p>
                <Dialog>
                  <DialogTrigger>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Projeto
                    </Button>
                  </DialogTrigger>
                  <AddProjectDialog clientId={cliente.id} />
                </Dialog>
              </div>
            ) : (
              <div className="space-y-3">
                {cliente.projects.map((project) => {
                  const isOverdue =
                    project.deadline &&
                    new Date() > new Date(project.deadline) &&
                    project.status !== "Completed";

                  return (
                    <Card
                      key={project.id}
                      className="bg-zinc-800 border-zinc-700"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between border-b border-zinc-700 pb-4">
                          <div>
                            <CardTitle className="text-lg">
                              {project.name}
                            </CardTitle>
                            {project.description && (
                              <p className="text-sm text-zinc-400 mt-1">
                                {project.description}
                              </p>
                            )}
                          </div>

                          {/* Badge com lógica visual */}
                          <Badge
                            className={
                              isOverdue
                                ? "bg-red-600"
                                : project.status === "Completed"
                                ? "bg-green-600"
                                : project.status === "In Progress"
                                ? "bg-blue-600"
                                : "bg-zinc-600"
                            }
                          >
                            {isOverdue
                              ? ` ${(<TriangleAlertIcon />)} Atrasado`
                              : project.status}
                          </Badge>
                        </div>

                        {/* Barra de progresso */}
                        {project.progress !== undefined && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-zinc-400">Progresso</span>
                              <span className="text-zinc-300">
                                {project.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-zinc-900 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Datas */}
                        <div className="flex gap-4 mt-3 text-sm text-zinc-400">
                          {project.startDate && (
                            <span>
                              Início:{" "}
                              {new Date(project.startDate).toLocaleDateString()}
                            </span>
                          )}
                          {project.deadline && (
                            <span
                              className={
                                isOverdue ? "text-red-400 font-semibold" : ""
                              }
                            >
                              Prazo:{" "}
                              {new Date(project.deadline).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </CardHeader>

                      {/* Preço */}
                      {project.price && (
                        <CardContent>
                          <p className="text-xl font-bold text-purple-400 mt-3">
                            R${" "}
                            {project.price.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
