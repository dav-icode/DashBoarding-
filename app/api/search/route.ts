import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { SearchResult } from "@/lib/types/search";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    // Verifica autenticação
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Pega o query da URL
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";

    // Se query vazia, retorna vazio
    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        results: [],
        totalCount: 0,
        query: query,
      });
    }

    const searchQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // 1. BUSCAR CLIENTES
    if (category === "all" || category === "cliente") {
      const clientes = await db.client.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { email: { contains: searchQuery, mode: "insensitive" } },
            { phone: { contains: searchQuery, mode: "insensitive" } },
            { company: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
      });

      clientes.forEach((cliente) => {
        results.push({
          id: cliente.id,
          title: cliente.name,
          description: `${cliente.email} • ${cliente.phone}`,
          type: "cliente",
          url: "/Clientes",
          match: cliente.company || cliente.email || cliente.phone || "",
          icon: "Users",
        });
      });
    }

    // 2. BUSCAR PROJETOS
    if (category === "all" || category === "projeto") {
      const projetos = await db.project.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            { status: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        include: {
          client: {
            select: {
              name: true,
            },
          },
        },
        take: 10,
      });

      projetos.forEach((projeto) => {
        const priceValue = projeto.price || 0;
        results.push({
          id: projeto.id,
          title: projeto.name,
          description: `Cliente: ${projeto.client.name} • Status: ${projeto.status}`,
          type: "projeto",
          url: "/Projetos",
          match: `R$ ${priceValue.toLocaleString("pt-BR")}`,
          icon: "Briefcase",
        });
      });
    }

    // 3. BUSCAR VENDAS
    if (category === "all" || category === "venda") {
      const vendas = await db.sale.findMany({
        where: {
          OR: [
            { description: { contains: searchQuery, mode: "insensitive" } },
            { method: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        // Buscar o projeto separadamente depois
        select: {
          id: true,
          description: true,
          amount: true,
          date: true,
          projectId: true,
        },
        take: 10,
      });

      // Buscar informações dos projetos relacionados
      const projectIds = vendas
        .map((v) => v.projectId)
        .filter((id): id is string => id !== null);

      const projects = await db.project.findMany({
        where: {
          id: { in: projectIds },
        },
        select: {
          id: true,
          name: true,
        },
      });

      // Criar um mapa de projeto por ID para fácil acesso
      const projectMap = new Map(projects.map((p) => [p.id, p.name]));

      vendas.forEach((venda) => {
        const projectName = venda.projectId
          ? projectMap.get(venda.projectId) || "Projeto não encontrado"
          : "Sem projeto";

        const amountValue = venda.amount || 0;

        results.push({
          id: venda.id,
          title: `Venda - ${projectName}`,
          description: `${
            venda.description || "Sem descrição"
          } • R$ ${amountValue.toLocaleString("pt-BR")}`,
          type: "venda",
          url: "/Vendas",
          match: new Date(venda.date).toLocaleDateString("pt-BR"),
          icon: "DollarSign",
        });
      });
    }

    // 4. BUSCAR TAREFAS (quando implementado)
    // TODO: Adicionar busca de tarefas quando o model for criado

    // 5. BUSCAR FATURAS (quando implementado)
    // TODO: Adicionar busca de faturas quando o model for criado

    return NextResponse.json({
      results,
      totalCount: results.length,
      query: searchQuery,
    });
  } catch (error) {
    console.error("Erro na busca global:", error);
    return NextResponse.json(
      { error: "Erro ao realizar busca" },
      { status: 500 }
    );
  }
}
