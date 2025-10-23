import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar um usuário de exemplo
  const user = await prisma.user.upsert({
    where: { email: "demo@dashboarding.com" },
    update: {},
    create: {
      email: "demo@dashboarding.com",
      name: "João Silva",
      image: "https://i.pravatar.cc/150?img=12",
    },
  });

  console.log("✅ Usuário criado:", user.name);

  // Criar clientes
  const clientes = [
    {
      name: "Tech Solutions LTDA",
      email: "contato@techsolutions.com",
      phone: "(11) 98765-4321",
      company: "Tech Solutions",
      userId: user.id,
    },
    {
      name: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      phone: "(21) 99876-5432",
      company: "Oliveira Consultoria",
      userId: user.id,
    },
    {
      name: "Carlos Mendes",
      email: "carlos@startup.io",
      phone: "(11) 91234-5678",
      company: "StartupX",
      userId: user.id,
    },
    {
      name: "Ana Costa",
      email: "ana.costa@empresa.com.br",
      phone: "(85) 98888-7777",
      company: "Costa E-commerce",
      userId: user.id,
    },
    {
      name: "Pedro Santos",
      email: "pedro.santos@gmail.com",
      phone: "(48) 99999-1111",
      company: null,
      userId: user.id,
    },
  ];

  for (const clienteData of clientes) {
    const cliente = await prisma.client.create({
      data: clienteData,
    });
    console.log("✅ Cliente criado:", cliente.name);
  }

  // Buscar os clientes criados
  const clientesCriados = await prisma.client.findMany();

  // Criar projetos para cada cliente
  const projetos = [
    {
      name: "Website Institucional",
      description:
        "Desenvolvimento de site institucional com Next.js e animações",
      status: "In Progress",
      price: 8500.0,
      clientId: clientesCriados[0].id,
    },
    {
      name: "Sistema de CRM",
      description: "Sistema personalizado de gestão de clientes e vendas",
      status: "In Progress",
      price: 15000.0,
      clientId: clientesCriados[0].id,
    },
    {
      name: "Landing Page",
      description: "Landing page responsiva para captação de leads",
      status: "Completed",
      price: 3500.0,
      clientId: clientesCriados[1].id,
    },
    {
      name: "App Mobile",
      description: "Aplicativo mobile para delivery com React Native",
      status: "In Progress",
      price: 22000.0,
      clientId: clientesCriados[2].id,
    },
    {
      name: "E-commerce",
      description: "Loja virtual completa com painel administrativo",
      status: "Planning",
      price: 18500.0,
      clientId: clientesCriados[3].id,
    },
    {
      name: "Dashboard Analytics",
      description: "Dashboard de analytics com gráficos e relatórios",
      status: "In Progress",
      price: 9500.0,
      clientId: clientesCriados[3].id,
    },
    {
      name: "Portfolio Pessoal",
      description: "Site portfolio com blog integrado",
      status: "Completed",
      price: 2800.0,
      clientId: clientesCriados[4].id,
    },
    {
      name: "Sistema de Agendamento",
      description:
        "Plataforma de agendamento online com integração de pagamento",
      status: "In Progress",
      price: 12000.0,
      clientId: clientesCriados[4].id,
    },
  ];

  for (const projetoData of projetos) {
    const projeto = await prisma.project.create({
      data: projetoData,
    });
    console.log("✅ Projeto criado:", projeto.name);
  }

  // Criar algumas vendas/receitas
  const projetosCriados = await prisma.project.findMany();

  const vendas = [
    {
      amount: 4250.0,
      description: "50% de entrada - Website Institucional",
      projectId: projetosCriados[0].id,
      userId: user.id,
      date: new Date("2024-09-15"),
    },
    {
      amount: 3500.0,
      description: "Pagamento final - Landing Page",
      projectId: projetosCriados[2].id,
      userId: user.id,
      date: new Date("2024-10-01"),
    },
    {
      amount: 11000.0,
      description: "Primeira parcela - App Mobile",
      projectId: projetosCriados[3].id,
      userId: user.id,
      date: new Date("2024-10-10"),
    },
    {
      amount: 2800.0,
      description: "Pagamento integral - Portfolio",
      projectId: projetosCriados[6].id,
      userId: user.id,
      date: new Date("2024-09-28"),
    },
  ];

  for (const vendaData of vendas) {
    const venda = await prisma.sale.create({
      data: vendaData,
    });
    console.log("✅ Venda criada: R$", venda.amount);
  }

  console.log("\n🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
