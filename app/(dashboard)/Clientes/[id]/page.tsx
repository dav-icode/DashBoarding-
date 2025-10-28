import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit,
  FolderKanban,
  Mail,
  Phone,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function PageProjectsClient({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const cliente = await db.client.findFirst({
    where: {
      id: params.id,
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
    <Card className="p-6 flex gap-6 w-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg  rounded-tl-none border border-s-white/5 border-t-black/20">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* INFORMAÇÕES DO CLIENTE */}
          <div className="lg:col-span-1 space-y-4 border p-5 rounded-3xl border-zinc-700">
            <div>
              <h2 className="text-sm font-medium text-zinc-400 mb-1">
                Empresa
              </h2>
              <h1 className="text-2xl font-bold text-white">
                {cliente.company || "Sem empresa"}
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
              <Button
                variant="outline"
                className="w-full border-zinc-700 hover:bg-zinc-800"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Cliente
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-900 text-red-400 hover:bg-red-950 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Deletar Cliente
              </Button>
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
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Projeto
              </Button>
            </div>

            {cliente.projects.length === 0 ? (
              <div className="text-center py-12 bg-zinc-800/30 rounded-lg border border-zinc-700 border-dashed">
                <FolderKanban className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 mb-4">
                  Nenhum projeto cadastrado ainda
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Projeto
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {cliente.projects.map((project) => {
                  const getStatusBadge = (status: string) => {
                    const styles = {
                      "In Progress":
                        "bg-blue-600/20 text-blue-400 border-blue-600/30",
                      Completed:
                        "bg-green-600/20 text-green-400 border-green-600/30",
                      Planning:
                        "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
                    };
                    return (
                      styles[status as keyof typeof styles] ||
                      "bg-zinc-600/20 text-zinc-400"
                    );
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
                    <div
                      key={project.id}
                      className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">
                          {project.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={getStatusBadge(project.status)}
                        >
                          {getStatusIcon(project.status)}
                          <span className="ml-1">{project.status}</span>
                        </Badge>
                      </div>
                      {project.description && (
                        <p className="text-sm text-zinc-400 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      {project.price && (
                        <p className="text-sm font-medium text-purple-400 mt-2">
                          R${" "}
                          {project.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      )}
                    </div>
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
