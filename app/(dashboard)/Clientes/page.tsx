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
import { Plus, Mail, Phone, Building2 } from "lucide-react";

export default async function ClientesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/Login");
  }

  // Buscar clientes do usuário
  const clientes = await db.client.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      projects: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card className="p-6 flex gap-6 w-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg  rounded-tl-none border border-s-white/5 border-t-black/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Clientes</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie seus clientes e contatos
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">
              {clientes.length}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Total de Clientes</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">
              {clientes.filter((c) => c.projects.length > 0).length}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Clientes Ativos</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">
              {clientes.reduce((acc, c) => acc + c.projects.length, 0)}
            </div>
            <p className="text-sm text-zinc-400 mt-1">Projetos Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Clientes */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Todos os Clientes</CardTitle>
          <CardDescription>
            Lista completa de clientes cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {clientes.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">
                Nenhum cliente cadastrado ainda
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Cliente
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {clientes.map((cliente) => (
                <div
                  key={cliente.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <span className="text-purple-400 font-semibold text-lg">
                        {cliente.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {cliente.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        {cliente.email && (
                          <div className="flex items-center gap-1 text-xs text-zinc-400">
                            <Mail className="h-3 w-3" />
                            {cliente.email}
                          </div>
                        )}
                        {cliente.phone && (
                          <div className="flex items-center gap-1 text-xs text-zinc-400">
                            <Phone className="h-3 w-3" />
                            {cliente.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        {cliente.projects.length} projeto(s)
                      </p>
                      {cliente.company && (
                        <p className="text-xs text-zinc-500">
                          {cliente.company}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700"
                    >
                      Ver detalhes
                    </Button>
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
