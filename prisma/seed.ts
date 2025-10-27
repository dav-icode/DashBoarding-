import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...\n");

  // Limpar banco (CUIDADO: deleta tudo!)
  console.log("🗑️  Limpando banco de dados...");
  await prisma.sale.deleteMany();
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Banco limpo!\n");

  // ========================================
  // 1. CRIAR USUÁRIO
  // ========================================
  console.log("👤 Criando usuário...");
  const user = await prisma.user.create({
    data: {
      email: "dev@dashboard.com",
      name: "João Developer",
      image: "https://i.pravatar.cc/150?img=12",
    },
  });
  console.log(`✅ Usuário criado: ${user.name}\n`);

  // ========================================
  // 2. CRIAR CLIENTES
  // ========================================
  console.log("🏢 Criando clientes...");
  const clientes = await Promise.all([
    prisma.client.create({
      data: {
        name: "Tech Solutions",
        email: "contato@techsolutions.com",
        phone: "(11) 98765-4321",
        company: "Tech Solutions LTDA",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Maria Oliveira",
        email: "maria@consultoria.com",
        phone: "(21) 99876-5432",
        company: "Oliveira Consultoria",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "StartupX",
        email: "contato@startupx.io",
        phone: "(11) 91234-5678",
        company: "StartupX Inc",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Ana Costa",
        email: "ana@ecommerce.com",
        phone: "(85) 98888-7777",
        company: "Costa E-commerce",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Pedro Autônomo",
        email: "pedro@gmail.com",
        phone: "(48) 99999-1111",
        company: null,
        userId: user.id,
      },
    }),
  ]);
  console.log(`✅ ${clientes.length} clientes criados!\n`);

  // ========================================
  // 3. CRIAR PROJETOS E VENDAS
  // ========================================
  console.log("💼 Criando projetos e vendas...\n");

  // Datas para distribuir ao longo dos últimos 6 meses
  const hoje = new Date();
  const mesPassado = new Date(hoje);
  mesPassado.setMonth(mesPassado.getMonth() - 1);
  const mes2Atras = new Date(hoje);
  mes2Atras.setMonth(mes2Atras.getMonth() - 2);
  const mes3Atras = new Date(hoje);
  mes3Atras.setMonth(mes3Atras.getMonth() - 3);
  const mes4Atras = new Date(hoje);
  mes4Atras.setMonth(mes4Atras.getMonth() - 4);
  const mes5Atras = new Date(hoje);
  mes5Atras.setMonth(mes5Atras.getMonth() - 5);

  // ========================================
  // PROJETO 1: Website - PAGO 100%
  // ========================================
  const projeto1 = await prisma.project.create({
    data: {
      name: "Website Institucional",
      description: "Site responsivo com Next.js e animações",
      status: "Completed",
      price: 8000.0,
      clientId: clientes[0].id,
    },
  });

  await prisma.sale.createMany({
    data: [
      {
        amount: 4000.0,
        description: "50% entrada - Website",
        projectId: projeto1.id,
        userId: user.id,
        date: mes4Atras,
      },
      {
        amount: 4000.0,
        description: "50% final - Website",
        projectId: projeto1.id,
        userId: user.id,
        date: mes3Atras,
      },
    ],
  });
  console.log(
    `✅ ${projeto1.name} - R$ 8.000 (PAGO 100%) - Status: Completed`
  );

  // ========================================
  // PROJETO 2: CRM - PAGAMENTO PARCIAL (40%)
  // ========================================
  const projeto2 = await prisma.project.create({
    data: {
      name: "Sistema CRM",
      description: "Sistema de gestão de clientes e vendas",
      status: "In Progress",
      price: 15000.0,
      clientId: clientes[0].id,
    },
  });

  await prisma.sale.create({
    data: {
      amount: 6000.0,
      description: "Entrada 40% - CRM",
      projectId: projeto2.id,
      userId: user.id,
      date: mes2Atras,
    },
  });
  console.log(
    `✅ ${projeto2.name} - R$ 15.000 (PAGO R$ 6.000) - A RECEBER: R$ 9.000`
  );

  // ========================================
  // PROJETO 3: Landing Page - PAGO 100%
  // ========================================
  const projeto3 = await prisma.project.create({
    data: {
      name: "Landing Page",
      description: "Landing page para captação de leads",
      status: "Completed",
      price: 3500.0,
      clientId: clientes[1].id,
    },
  });

  await prisma.sale.create({
    data: {
      amount: 3500.0,
      description: "Pagamento integral - Landing Page",
      projectId: projeto3.id,
      userId: user.id,
      date: mes5Atras,
    },
  });
  console.log(
    `✅ ${projeto3.name} - R$ 3.500 (PAGO 100%) - Status: Completed`
  );

  // ========================================
  // PROJETO 4: App Mobile - PAGAMENTO PARCIAL (50%)
  // ========================================
  const projeto4 = await prisma.project.create({
    data: {
      name: "App Mobile",
      description: "App de delivery com React Native",
      status: "In Progress",
      price: 22000.0,
      clientId: clientes[2].id,
    },
  });

  await prisma.sale.create({
    data: {
      amount: 11000.0,
      description: "Entrada 50% - App Mobile",
      projectId: projeto4.id,
      userId: user.id,
      date: mesPassado,
    },
  });
  console.log(
    `✅ ${projeto4.name} - R$ 22.000 (PAGO R$ 11.000) - A RECEBER: R$ 11.000`
  );

  // ========================================
  // PROJETO 5: E-commerce - SEM PAGAMENTO
  // ========================================
  const projeto5 = await prisma.project.create({
    data: {
      name: "Loja Virtual",
      description: "E-commerce completo com painel admin",
      status: "Planning",
      price: 18000.0,
      clientId: clientes[3].id,
    },
  });
  console.log(
    `✅ ${projeto5.name} - R$ 18.000 (PAGO R$ 0) - A RECEBER: R$ 18.000`
  );

  // ========================================
  // PROJETO 6: Dashboard - PAGAMENTO PARCIAL (30%)
  // ========================================
  const projeto6 = await prisma.project.create({
    data: {
      name: "Dashboard Analytics",
      description: "Dashboard com gráficos e relatórios",
      status: "In Progress",
      price: 9500.0,
      clientId: clientes[3].id,
    },
  });

  await prisma.sale.create({
    data: {
      amount: 2850.0,
      description: "Entrada 30% - Dashboard",
      projectId: projeto6.id,
      userId: user.id,
      date: mes2Atras,
    },
  });
  console.log(
    `✅ ${projeto6.name} - R$ 9.500 (PAGO R$ 2.850) - A RECEBER: R$ 6.650`
  );

  // ========================================
  // PROJETO 7: Portfolio - PAGO 100%
  // ========================================
  const projeto7 = await prisma.project.create({
    data: {
      name: "Portfolio Pessoal",
      description: "Site portfolio com blog",
      status: "Completed",
      price: 2500.0,
      clientId: clientes[4].id,
    },
  });

  await prisma.sale.create({
    data: {
      amount: 2500.0,
      description: "Pagamento integral - Portfolio",
      projectId: projeto7.id,
      userId: user.id,
      date: mes4Atras,
    },
  });
  console.log(
    `✅ ${projeto7.name} - R$ 2.500 (PAGO 100%) - Status: Completed`
  );

  // ========================================
  // PROJETO 8: Sistema Agendamento - SEM PAGAMENTO
  // ========================================
  const projeto8 = await prisma.project.create({
    data: {
      name: "Sistema de Agendamento",
      description: "Plataforma de agendamento online",
      status: "In Progress",
      price: 12000.0,
      clientId: clientes[4].id,
    },
  });
  console.log(
    `✅ ${projeto8.name} - R$ 12.000 (PAGO R$ 0) - A RECEBER: R$ 12.000`
  );

  // ========================================
  // RESUMO FINANCEIRO
  // ========================================
  const totalProjetos = await prisma.project.count();
  const totalVendas = await prisma.sale.aggregate({
    _sum: { amount: true },
  });
  const totalAPagar = await prisma.project.aggregate({
    _sum: { price: true },
  });

  const totalRecebido = totalVendas._sum.amount || 0;
  const totalContratos = totalAPagar._sum.price || 0;
  const totalAReceber = totalContratos - totalRecebido;

  console.log("\n" + "=".repeat(50));
  console.log("📊 RESUMO FINANCEIRO:");
  console.log("=".repeat(50));
  console.log(`Total de Projetos: ${totalProjetos}`);
  console.log(`Total em Contratos: R$ ${totalContratos.toFixed(2)}`);
  console.log(`Total Recebido: R$ ${totalRecebido.toFixed(2)}`);
  console.log(`Total A Receber: R$ ${totalAReceber.toFixed(2)}`);
  console.log("=".repeat(50));

  // ========================================
  // PROJETOS POR STATUS
  // ========================================
  const projetosAtivos = await prisma.project.count({
    where: { status: "In Progress" },
  });
  const projetosConcluidos = await prisma.project.count({
    where: { status: "Completed" },
  });
  const projetosPlanejamento = await prisma.project.count({
    where: { status: "Planning" },
  });

  console.log("\n📈 PROJETOS POR STATUS:");
  console.log(`  - Em Progresso: ${projetosAtivos}`);
  console.log(`  - Concluídos: ${projetosConcluidos}`);
  console.log(`  - Planejamento: ${projetosPlanejamento}`);

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