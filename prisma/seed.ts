import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do Dashboard...\n");

  // Limpar banco
  console.log("🗑️  Limpando banco de dados...");
  await prisma.sale.deleteMany();
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Banco limpo!\n");

  // ========================================
  // 1. CRIAR USUÁRIO (você!)
  // ========================================
  console.log("👤 Criando usuário...");
  const hashedPassword = await bcrypt.hash("123456", 10);
  
  const user = await prisma.user.create({
    data: {
      email: "dev@dashboard.com",
      name: "Davi Developer",
      password: hashedPassword,
      image: "https://github.com/shadcn.png",
    },
  });
  console.log(`✅ Usuário: ${user.name} (${user.email})`);
  console.log(`🔑 Senha: 123456\n`);

  // ========================================
  // 2. CRIAR 10 CLIENTES VARIADOS
  // ========================================
  console.log("🏢 Criando 10 clientes...");
  
  const clientes = await Promise.all([
    prisma.client.create({
      data: {
        name: "Tech Solutions Brasil",
        email: "contato@techsolutions.com.br",
        phone: "(11) 98765-4321",
        company: "Tech Solutions LTDA",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Maria Oliveira",
        email: "maria.oliveira@consultoria.com",
        phone: "(21) 99876-5432",
        company: "Oliveira Consultoria Empresarial",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "StartupX Inovação",
        email: "hello@startupx.io",
        phone: "(11) 91234-5678",
        company: "StartupX Inc",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Ana Costa",
        email: "ana.costa@ecommerce.com",
        phone: "(85) 98888-7777",
        company: "Costa E-commerce & Logistics",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Pedro Santos",
        email: "pedro.santos@gmail.com",
        phone: "(48) 99999-1111",
        company: null, // Freelancer
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Restaurante Sabor & Arte",
        email: "contato@saborearte.com.br",
        phone: "(31) 97777-8888",
        company: "Sabor & Arte Gastronomia LTDA",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Dr. Carlos Mendes",
        email: "dr.carlos@clinicamendes.com",
        phone: "(41) 96666-5555",
        company: "Clínica Mendes - Saúde e Bem-Estar",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "FitGym Academia",
        email: "contato@fitgym.com.br",
        phone: "(11) 95555-4444",
        company: "FitGym Rede de Academias",
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Júlia Designer",
        email: "julia.design@gmail.com",
        phone: "(47) 94444-3333",
        company: null, // Freelancer
        userId: user.id,
      },
    }),
    prisma.client.create({
      data: {
        name: "Escola Criativa Kids",
        email: "contato@escolacriativa.edu.br",
        phone: "(71) 93333-2222",
        company: "Escola Criativa Educação Infantil",
        userId: user.id,
      },
    }),
  ]);
  
  console.log(`✅ ${clientes.length} clientes criados!\n`);

  // ========================================
  // 3. CRIAR 15 PROJETOS COM VENDAS
  // ========================================
  console.log("💼 Criando 15 projetos e vendas...\n");

  // Datas dos últimos 6 meses
  const hoje = new Date();
  const mes1 = new Date(hoje); mes1.setMonth(mes1.getMonth() - 1);
  const mes2 = new Date(hoje); mes2.setMonth(mes2.getMonth() - 2);
  const mes3 = new Date(hoje); mes3.setMonth(mes3.getMonth() - 3);
  const mes4 = new Date(hoje); mes4.setMonth(mes4.getMonth() - 4);
  const mes5 = new Date(hoje); mes5.setMonth(mes5.getMonth() - 5);
  const mes6 = new Date(hoje); mes6.setMonth(mes6.getMonth() - 6);

  // ========================================
  // PROJETO 1: Website Institucional - PAGO 100%
  // ========================================
  const p1 = await prisma.project.create({
    data: {
      name: "Website Institucional Moderno",
      description: "Site responsivo com Next.js 14, animações Framer Motion e SEO otimizado",
      status: "Completed",
      price: 8500.0,
      clientId: clientes[0].id,
    },
  });
  await prisma.sale.createMany({
    data: [
      { amount: 4250.0, description: "Entrada 50% - Website", projectId: p1.id, userId: user.id, date: mes5 },
      { amount: 4250.0, description: "Pagamento Final - Website", projectId: p1.id, userId: user.id, date: mes4 },
    ],
  });
  console.log(`✅ ${p1.name} - R$ 8.500 (100% PAGO) ✅`);

  // ========================================
  // PROJETO 2: Sistema CRM - PAGAMENTO PARCIAL 40%
  // ========================================
  const p2 = await prisma.project.create({
    data: {
      name: "Sistema CRM Completo",
      description: "CRM com gestão de leads, pipeline de vendas, relatórios e integrações",
      status: "In Progress",
      price: 18000.0,
      clientId: clientes[0].id,
    },
  });
  await prisma.sale.create({
    data: { amount: 7200.0, description: "Entrada 40% - CRM", projectId: p2.id, userId: user.id, date: mes3 },
  });
  console.log(`✅ ${p2.name} - R$ 18.000 (PAGO: R$ 7.200) 🔄 Falta: R$ 10.800`);

  // ========================================
  // PROJETO 3: Landing Page - PAGO 100%
  // ========================================
  const p3 = await prisma.project.create({
    data: {
      name: "Landing Page Alto Impacto",
      description: "Landing page para captação de leads com funil de vendas integrado",
      status: "Completed",
      price: 3800.0,
      clientId: clientes[1].id,
    },
  });
  await prisma.sale.create({
    data: { amount: 3800.0, description: "Pagamento Integral - Landing", projectId: p3.id, userId: user.id, date: mes6 },
  });
  console.log(`✅ ${p3.name} - R$ 3.800 (100% PAGO) ✅`);

  // ========================================
  // PROJETO 4: App Mobile Delivery - PAGAMENTO PARCIAL 60%
  // ========================================
  const p4 = await prisma.project.create({
    data: {
      name: "App Mobile de Delivery",
      description: "Aplicativo React Native com pedidos, pagamentos e tracking em tempo real",
      status: "In Progress",
      price: 25000.0,
      clientId: clientes[2].id,
    },
  });
  await prisma.sale.createMany({
    data: [
      { amount: 10000.0, description: "Entrada 40% - App", projectId: p4.id, userId: user.id, date: mes2 },
      { amount: 5000.0, description: "2ª Parcela 20% - App", projectId: p4.id, userId: user.id, date: mes1 },
    ],
  });
  console.log(`✅ ${p4.name} - R$ 25.000 (PAGO: R$ 15.000) 🔄 Falta: R$ 10.000`);

  // ========================================
  // PROJETO 5: E-commerce Completo - SEM PAGAMENTO
  // ========================================
  const p5 = await prisma.project.create({
    data: {
      name: "Loja Virtual Premium",
      description: "E-commerce full-stack com painel admin, gestão de estoque e multi-pagamento",
      status: "Planning",
      price: 22000.0,
      clientId: clientes[3].id,
    },
  });
  console.log(`✅ ${p5.name} - R$ 22.000 (PAGO: R$ 0) ⏳ A iniciar`);

  // ========================================
  // PROJETO 6: Dashboard Analytics - PAGAMENTO PARCIAL 30%
  // ========================================
  const p6 = await prisma.project.create({
    data: {
      name: "Dashboard de Analytics",
      description: "Dashboard com gráficos interativos, relatórios e KPIs em tempo real",
      status: "In Progress",
      price: 12000.0,
      clientId: clientes[3].id,
    },
  });
  await prisma.sale.create({
    data: { amount: 3600.0, description: "Entrada 30% - Dashboard", projectId: p6.id, userId: user.id, date: mes2 },
  });
  console.log(`✅ ${p6.name} - R$ 12.000 (PAGO: R$ 3.600) 🔄 Falta: R$ 8.400`);

  // ========================================
  // PROJETO 7: Portfolio Pessoal - PAGO 100%
  // ========================================
  const p7 = await prisma.project.create({
    data: {
      name: "Portfolio Criativo + Blog",
      description: "Site portfolio moderno com blog integrado e CMS",
      status: "Completed",
      price: 4200.0,
      clientId: clientes[4].id,
    },
  });
  await prisma.sale.create({
    data: { amount: 4200.0, description: "Pagamento Integral - Portfolio", projectId: p7.id, userId: user.id, date: mes5 },
  });
  console.log(`✅ ${p7.name} - R$ 4.200 (100% PAGO) ✅`);

  // ========================================
  // PROJETO 8: Sistema de Agendamento - SEM PAGAMENTO
  // ========================================
  const p8 = await prisma.project.create({
    data: {
      name: "Sistema de Agendamento Online",
      description: "Plataforma para agendamento de serviços com calendário e notificações",
      status: "In Progress",
      price: 15000.0,
      clientId: clientes[4].id,
    },
  });
  console.log(`✅ ${p8.name} - R$ 15.000 (PAGO: R$ 0) 🔄 Em andamento`);

  // ========================================
  // PROJETO 9: Site Restaurante + Cardápio Digital
  // ========================================
  const p9 = await prisma.project.create({
    data: {
      name: "Website + Cardápio Digital",
      description: "Site institucional com cardápio digital interativo e pedidos online",
      status: "Completed",
      price: 6500.0,
      clientId: clientes[5].id,
    },
  });
  await prisma.sale.createMany({
    data: [
      { amount: 3250.0, description: "Entrada 50% - Site Restaurante", projectId: p9.id, userId: user.id, date: mes4 },
      { amount: 3250.0, description: "Pagamento Final", projectId: p9.id, userId: user.id, date: mes3 },
    ],
  });
  console.log(`✅ ${p9.name} - R$ 6.500 (100% PAGO) ✅`);

  // ========================================
  // PROJETO 10: Sistema para Clínica - PAGAMENTO PARCIAL 50%
  // ========================================
  const p10 = await prisma.project.create({
    data: {
      name: "Sistema de Gestão Clínica",
      description: "Sistema para agendamento de consultas, prontuários eletrônicos e financeiro",
      status: "In Progress",
      price: 28000.0,
      clientId: clientes[6].id,
    },
  });
  await prisma.sale.create({
    data: { amount: 14000.0, description: "Entrada 50% - Sistema Clínica", projectId: p10.id, userId: user.id, date: mes1 },
  });
  console.log(`✅ ${p10.name} - R$ 28.000 (PAGO: R$ 14.000) 🔄 Falta: R$ 14.000`);

  // ========================================
  // PROJETO 11: App Fitness + Treinos
  // ========================================
  const p11 = await prisma.project.create({
    data: {
      name: "App de Treinos Personalizados",
      description: "Aplicativo mobile para gestão de treinos, alunos e pagamentos",
      status: "Planning",
      price: 19500.0,
      clientId: clientes[7].id,
    },
  });
  console.log(`✅ ${p11.name} - R$ 19.500 (PAGO: R$ 0) ⏳ Planejamento`);

  // ========================================
  // PROJETO 12: Site Portfolio Design - PAGO 100%
  // ========================================
  const p12 = await prisma.project.create({
    data: {
      name: "Portfolio de Design Interativo",
      description: "Site portfolio com galeria de projetos e animações 3D",
      status: "Completed",
      price: 5800.0,
      clientId: clientes[8].id,
    },
  });
  await prisma.sale.create({
    data: { amount: 5800.0, description: "Pagamento Único - Portfolio", projectId: p12.id, userId: user.id, date: mes3 },
  });
  console.log(`✅ ${p12.name} - R$ 5.800 (100% PAGO) ✅`);

  // ========================================
  // PROJETO 13: Plataforma Educacional
  // ========================================
  const p13 = await prisma.project.create({
    data: {
      name: "Plataforma de Ensino Online",
      description: "Sistema EAD com vídeos, exercícios, certificados e área do aluno",
      status: "In Progress",
      price: 32000.0,
      clientId: clientes[9].id,
    },
  });
  await prisma.sale.createMany({
    data: [
      { amount: 12800.0, description: "Entrada 40% - Plataforma EAD", projectId: p13.id, userId: user.id, date: mes2 },
      { amount: 6400.0, description: "2ª Parcela 20%", projectId: p13.id, userId: user.id, date: hoje },
    ],
  });
  console.log(`✅ ${p13.name} - R$ 32.000 (PAGO: R$ 19.200) 🔄 Falta: R$ 12.800`);

  // ========================================
  // PROJETO 14: Redesign de Site
  // ========================================
  const p14 = await prisma.project.create({
    data: {
      name: "Redesign Completo de Website",
      description: "Modernização visual e técnica com nova identidade digital",
      status: "Planning",
      price: 9800.0,
      clientId: clientes[1].id,
    },
  });
  console.log(`✅ ${p14.name} - R$ 9.800 (PAGO: R$ 0) ⏳ Aprovação`);

  // ========================================
  // PROJETO 15: Sistema de Ponto Eletrônico
  // ========================================
  const p15 = await prisma.project.create({
    data: {
      name: "Sistema de Controle de Ponto",
      description: "Sistema web para controle de ponto, folha de pagamento e relatórios",
      status: "In Progress",
      price: 16500.0,
      clientId: clientes[7].id,
    },
  });
  await prisma.sale.create({
    data: { amount: 8250.0, description: "Entrada 50% - Sistema Ponto", projectId: p15.id, userId: user.id, date: mes1 },
  });
  console.log(`✅ ${p15.name} - R$ 16.500 (PAGO: R$ 8.250) 🔄 Falta: R$ 8.250`);

  // ========================================
  // RESUMO FINANCEIRO COMPLETO
  // ========================================
  const totalProjetos = await prisma.project.count();
  const totalVendas = await prisma.sale.aggregate({ _sum: { amount: true } });
  const totalContratos = await prisma.project.aggregate({ _sum: { price: true } });

  const recebido = totalVendas._sum.amount || 0;
  const contratos = totalContratos._sum.price || 0;
  const aReceber = contratos - recebido;

  console.log("\n" + "=".repeat(60));
  console.log("💰 RESUMO FINANCEIRO COMPLETO");
  console.log("=".repeat(60));
  console.log(`📊 Total de Projetos: ${totalProjetos}`);
  console.log(`📊 Total de Clientes: ${clientes.length}`);
  console.log(`💵 Total em Contratos: R$ ${contratos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`✅ Total Recebido: R$ ${recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`⏳ Total A Receber: R$ ${aReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`📈 Taxa de Recebimento: ${((recebido / contratos) * 100).toFixed(1)}%`);
  console.log("=".repeat(60));

  // Status dos projetos
  const statusCount = await prisma.project.groupBy({
    by: ['status'],
    _count: true,
  });

  console.log("\n📊 PROJETOS POR STATUS:");
  statusCount.forEach(s => {
    const emoji = s.status === 'Completed' ? '✅' : s.status === 'In Progress' ? '🔄' : '⏳';
    console.log(`  ${emoji} ${s.status}: ${s._count}`);
  });

  console.log("\n🎉 SEED COMPLETO! Pronto para estilizar! 🎨");
  console.log("\n🔑 LOGIN:");
  console.log(`   Email: dev@dashboard.com`);
  console.log(`   Senha: 123456`);
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });