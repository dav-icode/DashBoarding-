import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed COMPLETO do Dashboard...\n");

  // ========================================
  // LIMPEZA TOTAL
  // ========================================
  console.log("🗑️  Limpando banco de dados...");
  await prisma.sale.deleteMany();
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Banco limpo!\n");

  // ========================================
  // USUÁRIO
  // ========================================
  console.log("👤 Criando usuário...");
  const hashedPassword = await bcrypt.hash("123456", 10);
  
  const user = await prisma.user.create({
    data: {
      email: "dev@dashboard.com",
      name: "Davi Franco",
      password: hashedPassword,
      image: "https://github.com/shadcn.png",
    },
  });
  console.log(`✅ Usuário: ${user.name} (${user.email})\n`);

  // ========================================
  // DATAS ÚTEIS
  // ========================================
  const hoje = new Date();
  const ontem = new Date(hoje); ontem.setDate(ontem.getDate() - 1);
  const dias3 = new Date(hoje); dias3.setDate(dias3.getDate() + 3);
  const dias5 = new Date(hoje); dias5.setDate(dias5.getDate() + 5);
  const dias10 = new Date(hoje); dias10.setDate(dias10.getDate() - 10);
  const dias15 = new Date(hoje); dias15.setDate(dias15.getDate() - 15);
  const mes1 = new Date(hoje); mes1.setMonth(mes1.getMonth() - 1);
  const mes2 = new Date(hoje); mes2.setMonth(mes2.getMonth() - 2);
  const mes3 = new Date(hoje); mes3.setMonth(mes3.getMonth() - 3);
  const mes4 = new Date(hoje); mes4.setMonth(mes4.getMonth() - 4);
  const mes5 = new Date(hoje); mes5.setMonth(mes5.getMonth() - 5);
  const diasAtras5 = new Date(hoje); diasAtras5.setDate(diasAtras5.getDate() - 5);

  // ========================================
  // CLIENTES (12 clientes)
  // ========================================
  console.log("🏢 Criando 12 clientes...");
  
  const clientes = await Promise.all([
    // Cliente 1 - Ativo
    prisma.client.create({
      data: {
        name: "TechCorp Brasil",
        email: "contato@techcorp.com.br",
        phone: "(11) 98765-4321",
        company: "TechCorp Soluções LTDA",
        userId: user.id,
      },
    }),
    // Cliente 2 - Ativo
    prisma.client.create({
      data: {
        name: "Maria Consultoria",
        email: "maria@consultoria.com",
        phone: "(21) 99876-5432",
        company: "MC Consultoria Empresarial",
        userId: user.id,
      },
    }),
    // Cliente 3 - Ativo
    prisma.client.create({
      data: {
        name: "StartupX",
        email: "hello@startupx.io",
        phone: "(11) 91234-5678",
        company: "StartupX Innovation Inc",
        userId: user.id,
      },
    }),
    // Cliente 4 - Ativo
    prisma.client.create({
      data: {
        name: "E-commerce Plus",
        email: "contato@ecommerceplus.com",
        phone: "(85) 98888-7777",
        company: "E-commerce Plus LTDA",
        userId: user.id,
      },
    }),
    // Cliente 5 - Freelancer
    prisma.client.create({
      data: {
        name: "Pedro Designer",
        email: "pedro@design.com",
        phone: "(48) 99999-1111",
        company: null,
        userId: user.id,
      },
    }),
    // Cliente 6 - Restaurante
    prisma.client.create({
      data: {
        name: "Restaurante Sabor",
        email: "contato@sabor.com.br",
        phone: "(31) 97777-8888",
        company: "Sabor Gastronomia LTDA",
        userId: user.id,
      },
    }),
    // Cliente 7 - Clínica
    prisma.client.create({
      data: {
        name: "Clínica Vida",
        email: "contato@clinicavida.com",
        phone: "(41) 96666-5555",
        company: "Clínica Vida Saúde",
        userId: user.id,
      },
    }),
    // Cliente 8 - Academia
    prisma.client.create({
      data: {
        name: "FitGym",
        email: "contato@fitgym.com.br",
        phone: "(11) 95555-4444",
        company: "FitGym Academias LTDA",
        userId: user.id,
      },
    }),
    // Cliente 9 - INATIVO (há 3 meses sem projeto)
    prisma.client.create({
      data: {
        name: "Cliente Antigo Corp",
        email: "antigo@corp.com",
        phone: "(47) 94444-3333",
        company: "Antigo Corp",
        userId: user.id,
      },
    }),
    // Cliente 10 - Escola
    prisma.client.create({
      data: {
        name: "Escola Kids",
        email: "contato@escolakids.edu.br",
        phone: "(71) 93333-2222",
        company: "Escola Kids Educação",
        userId: user.id,
      },
    }),
    // Cliente 11 - INATIVO (há 4 meses)
    prisma.client.create({
      data: {
        name: "Empresa Pausada",
        email: "pausada@empresa.com",
        phone: "(62) 92222-1111",
        company: "Empresa Pausada LTDA",
        userId: user.id,
      },
    }),
    // Cliente 12 - Agência
    prisma.client.create({
      data: {
        name: "Agência Digital",
        email: "contato@agenciadigital.com",
        phone: "(81) 91111-0000",
        company: "Agência Digital Marketing",
        userId: user.id,
      },
    }),
  ]);
  
  console.log(`✅ ${clientes.length} clientes criados!\n`);

  // ========================================
  // PROJETOS E VENDAS
  // ========================================
  console.log("💼 Criando projetos estratégicos...\n");

  // ========================================
  // 🔴 PROJETO 1: ATRASADO HÁ 5 DIAS (gera notificação)
  // ========================================
  const p1 = await prisma.project.create({
    data: {
      name: "App Mobile Urgente",
      description: "Aplicativo mobile com deadline vencido",
      status: "In Progress",
      price: 15000.0,
      progress: 60,
      startDate: mes2,
      deadline: diasAtras5, // ← ATRASADO!
      clientId: clientes[0].id,
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 7500.0, 
      description: "Entrada 50%", 
      projectId: p1.id, 
      userId: user.id, 
      date: mes2 
    },
  });
  console.log(`🔴 ${p1.name} - ATRASADO há 5 dias! (R$ 15.000 - Falta R$ 7.500)`);

  // ========================================
  // 🟡 PROJETO 2: DEADLINE EM 3 DIAS (gera notificação)
  // ========================================
  const p2 = await prisma.project.create({
    data: {
      name: "Website Corporativo",
      description: "Site institucional moderno",
      status: "In Progress",
      price: 8500.0,
      progress: 80,
      startDate: mes1,
      deadline: dias3, // ← VENCE EM 3 DIAS!
      clientId: clientes[1].id,
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 4250.0, 
      description: "Entrada 50%", 
      projectId: p2.id, 
      userId: user.id, 
      date: mes1 
    },
  });
  console.log(`🟡 ${p2.name} - Deadline em 3 dias! (R$ 8.500 - Falta R$ 4.250)`);

  // ========================================
  // 🟢 PROJETO 3: PAGAMENTO RECEBIDO HOJE (gera notificação)
  // ========================================
  const p3 = await prisma.project.create({
    data: {
      name: "E-commerce Premium",
      description: "Loja virtual completa",
      status: "In Progress",
      price: 22000.0,
      progress: 70,
      startDate: mes2,
      deadline: new Date(hoje.getFullYear(), hoje.getMonth() + 1, 15),
      clientId: clientes[3].id,
    },
  });
  await prisma.sale.createMany({
    data: [
      { 
        amount: 8800.0, 
        description: "Entrada 40%", 
        projectId: p3.id, 
        userId: user.id, 
        date: mes2 
      },
      { 
        amount: 4400.0, 
        description: "2ª Parcela - Recebido hoje! 🎉", 
        projectId: p3.id, 
        userId: user.id, 
        date: hoje // ← HOJE!
      },
    ],
  });
  console.log(`🟢 ${p3.name} - Pagamento recebido HOJE! R$ 4.400 (Total R$ 22.000)`);

  // ========================================
  // 🟣 PROJETO 4: GRANDE VALOR PENDENTE (gera notificação)
  // ========================================
  const p4 = await prisma.project.create({
    data: {
      name: "Sistema ERP Completo",
      description: "ERP com todos os módulos",
      status: "In Progress",
      price: 45000.0,
      progress: 50,
      startDate: mes3,
      deadline: new Date(hoje.getFullYear(), hoje.getMonth() + 2, 1),
      clientId: clientes[2].id,
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 13500.0, 
      description: "Entrada 30%", 
      projectId: p4.id, 
      userId: user.id, 
      date: mes3 
    },
  });
  console.log(`🟣 ${p4.name} - R$ 45.000 (Falta R$ 31.500 - 70%)`);

  // ========================================
  // ⚪ PROJETO 5: SEM PROGRESSO HÁ 15 DIAS (gera notificação)
  // ========================================
  const p5 = await prisma.project.create({
    data: {
      name: "Dashboard Analytics",
      description: "Dashboard com gráficos",
      status: "In Progress",
      price: 12000.0,
      progress: 30,
      startDate: mes2,
      deadline: new Date(hoje.getFullYear(), hoje.getMonth() + 1, 20),
      clientId: clientes[4].id,
      updatedAt: dias15, // ← SEM UPDATE HÁ 15 DIAS!
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 6000.0, 
      description: "Entrada 50%", 
      projectId: p5.id, 
      userId: user.id, 
      date: mes2 
    },
  });
  console.log(`⚪ ${p5.name} - SEM PROGRESSO há 15 dias (R$ 12.000 - Falta R$ 6.000)`);

  // ========================================
  // ✅ PROJETO 6: COMPLETO E PAGO
  // ========================================
  const p6 = await prisma.project.create({
    data: {
      name: "Landing Page Conversão",
      description: "Landing page otimizada",
      status: "Completed",
      price: 4500.0,
      progress: 100,
      startDate: mes4,
      deadline: mes3,
      completedAt: mes3,
      clientId: clientes[5].id,
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 4500.0, 
      description: "Pagamento integral", 
      projectId: p6.id, 
      userId: user.id, 
      date: mes3 
    },
  });
  console.log(`✅ ${p6.name} - COMPLETO e PAGO (R$ 4.500)`);

  // ========================================
  // PROJETO 7: DEADLINE EM 5 DIAS
  // ========================================
  const p7 = await prisma.project.create({
    data: {
      name: "Sistema de Agendamento",
      description: "Plataforma de agendamentos",
      status: "In Progress",
      price: 18000.0,
      progress: 75,
      startDate: mes2,
      deadline: dias5, // ← 5 DIAS!
      clientId: clientes[6].id,
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 9000.0, 
      description: "Entrada 50%", 
      projectId: p7.id, 
      userId: user.id, 
      date: mes2 
    },
  });
  console.log(`🟡 ${p7.name} - Deadline em 5 dias (R$ 18.000 - Falta R$ 9.000)`);

  // ========================================
  // PROJETO 8: PLANEJAMENTO (sem valor recebido)
  // ========================================
  const p8 = await prisma.project.create({
    data: {
      name: "App Fitness",
      description: "Aplicativo de treinos",
      status: "Planning",
      price: 25000.0,
      progress: 0,
      clientId: clientes[7].id,
    },
  });
  console.log(`⏳ ${p8.name} - Planejamento (R$ 25.000 - Nada recebido ainda)`);

  // ========================================
  // PROJETO 9: COMPLETO E PAGO
  // ========================================
  const p9 = await prisma.project.create({
    data: {
      name: "Site Restaurante",
      description: "Site com cardápio digital",
      status: "Completed",
      price: 6500.0,
      progress: 100,
      startDate: mes4,
      deadline: mes3,
      completedAt: mes3,
      clientId: clientes[5].id,
    },
  });
  await prisma.sale.createMany({
    data: [
      { amount: 3250.0, description: "Entrada 50%", projectId: p9.id, userId: user.id, date: mes4 },
      { amount: 3250.0, description: "Final", projectId: p9.id, userId: user.id, date: mes3 },
    ],
  });
  console.log(`✅ ${p9.name} - COMPLETO e PAGO (R$ 6.500)`);

  // ========================================
  // PROJETO 10: Cliente INATIVO (há 3 meses)
  // ========================================
  const mes3Atras = new Date(hoje);
  mes3Atras.setMonth(mes3Atras.getMonth() - 3);
  const p10 = await prisma.project.create({
    data: {
      name: "Projeto Antigo",
      description: "Último projeto deste cliente",
      status: "Completed",
      price: 8000.0,
      progress: 100,
      startDate: mes5,
      deadline: mes4,
      completedAt: mes4,
      clientId: clientes[8].id, // ← Cliente que ficará inativo
      updatedAt: mes3Atras, // ← 3 MESES ATRÁS!
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 8000.0, 
      description: "Pagamento integral", 
      projectId: p10.id, 
      userId: user.id, 
      date: mes4 
    },
  });
  console.log(`💤 ${p10.name} - Cliente INATIVO há 3 meses`);

  // ========================================
  // PROJETO 11: GRANDE PROJETO EM ANDAMENTO
  // ========================================
  const p11 = await prisma.project.create({
    data: {
      name: "Plataforma EAD",
      description: "Sistema de ensino completo",
      status: "In Progress",
      price: 38000.0,
      progress: 45,
      startDate: mes2,
      deadline: new Date(hoje.getFullYear(), hoje.getMonth() + 2, 28),
      clientId: clientes[9].id,
    },
  });
  await prisma.sale.createMany({
    data: [
      { amount: 15200.0, description: "Entrada 40%", projectId: p11.id, userId: user.id, date: mes2 },
      { amount: 7600.0, description: "2ª Parcela 20%", projectId: p11.id, userId: user.id, date: mes1 },
    ],
  });
  console.log(`🔄 ${p11.name} - Em andamento (R$ 38.000 - Falta R$ 15.200)`);

  // ========================================
  // PROJETO 12: VENDA AVULSA (sem projeto - ontem)
  // ========================================
  await prisma.sale.create({
    data: {
      amount: 2500.0,
      description: "Consultoria avulsa - 5 horas",
      userId: user.id,
      date: ontem,
    },
  });
  console.log(`💰 Venda avulsa - Consultoria R$ 2.500 (ontem)`);

  // ========================================
  // PROJETO 13: Marketing Digital
  // ========================================
  const p13 = await prisma.project.create({
    data: {
      name: "Campanha Marketing Digital",
      description: "Gestão de redes sociais e ads",
      status: "In Progress",
      price: 9500.0,
      progress: 90,
      startDate: mes1,
      deadline: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 10),
      clientId: clientes[11].id,
    },
  });
  await prisma.sale.create({
    data: { 
      amount: 9500.0, 
      description: "Pagamento mensal", 
      projectId: p13.id, 
      userId: user.id, 
      date: mes1 
    },
  });
  console.log(`✅ ${p13.name} - Pago integralmente (R$ 9.500)`);

  // ========================================
  // RESUMO FINANCEIRO
  // ========================================
  const totalProjetos = await prisma.project.count();
  const totalVendas = await prisma.sale.aggregate({ _sum: { amount: true } });
  const totalContratos = await prisma.project.aggregate({ _sum: { price: true } });

  const recebido = totalVendas._sum.amount || 0;
  const contratos = totalContratos._sum.price || 0;
  const aReceber = contratos - recebido;

  console.log("\n" + "=".repeat(70));
  console.log("💰 RESUMO FINANCEIRO COMPLETO");
  console.log("=".repeat(70));
  console.log(`📊 Total de Projetos: ${totalProjetos}`);
  console.log(`📊 Total de Clientes: ${clientes.length}`);
  console.log(`💵 Valor Total em Contratos: R$ ${contratos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`✅ Total Recebido: R$ ${recebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`⏳ Total A Receber: R$ ${aReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`📈 Taxa de Recebimento: ${((recebido / contratos) * 100).toFixed(1)}%`);
  console.log("=".repeat(70));

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

  console.log("\n🔔 NOTIFICAÇÕES QUE DEVEM APARECER:");
  console.log("  🔴 1 projeto atrasado (App Mobile Urgente)");
  console.log("  🟡 2 deadlines próximos (Website em 3 dias, Sistema em 5 dias)");
  console.log("  🟢 1 pagamento recebido hoje (E-commerce R$ 4.400)");
  console.log("  🟣 Múltiplos pagamentos pendentes");
  console.log("  ⚪ 1 projeto sem progresso há 15 dias (Dashboard)");
  console.log("  💤 2 clientes inativos (há 3+ meses)");

  console.log("\n🎉 SEED COMPLETO! Dashboard pronto para testar! 🚀");
  console.log("\n🔑 LOGIN:");
  console.log(`   Email: dev@dashboard.com`);
  console.log(`   Senha: 123456`);
  console.log("\n💡 Acesse /dashboard para ver as notificações funcionando!\n");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });