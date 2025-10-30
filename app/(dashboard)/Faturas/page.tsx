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
  FileText,
  Download,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Mail,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FaturasPage = () => {
  return (
    <Card className="p-6 h-full mt-2 mr-1 ml-21 bg-white/5 backdrop-blur-lg space-y-6 w-full rounded-tl-none border border-s-white/5 border-t-black/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Faturas</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie e emita suas faturas profissionais
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Fatura
        </Button>
      </div>

      {/* Stats Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">R$ 85.000</div>
                <p className="text-sm text-zinc-400">Total Emitido</p>
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
                <div className="text-2xl font-bold text-green-400">
                  R$ 45.000
                </div>
                <p className="text-sm text-zinc-400">Pago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-yellow-950/30 backdrop-blur-xl border-yellow-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  R$ 32.000
                </div>
                <p className="text-sm text-zinc-400">Pendente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border zinc-800 bg-red-950/30 backdrop-blur-xl border-red-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">R$ 8.000</div>
                <p className="text-sm text-zinc-400">Vencido</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3 items-center">
            <Select defaultValue="todas">
              <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="todas">Todas Faturas</SelectItem>
                <SelectItem value="pagas">Pagas</SelectItem>
                <SelectItem value="pendentes">Pendentes</SelectItem>
                <SelectItem value="vencidas">Vencidas</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Cliente" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="todos">Todos Clientes</SelectItem>
                <SelectItem value="tech">TechCorp Brasil</SelectItem>
                <SelectItem value="startup">StartupX</SelectItem>
                <SelectItem value="ecom">E-commerce Plus</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="mes">
              <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="mes">Este Mês</SelectItem>
                <SelectItem value="trimestre">Último Trimestre</SelectItem>
                <SelectItem value="ano">Este Ano</SelectItem>
                <SelectItem value="tudo">Todas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Faturas */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Lista de Faturas</CardTitle>
          <CardDescription>
            Histórico completo de faturas emitidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Fatura 1 - PAGA */}
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white text-lg">
                        #001 - TechCorp Brasil
                      </p>
                      <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                        ✓ PAGA
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Projeto: Sistema CRM Completo
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                      <span>Emitida: 15 Out 2025</span>
                      <span>•</span>
                      <span>Paga: 20 Out 2025</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">
                    R$ 18.000,00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-zinc-700">
                  <Eye className="h-3 w-3 mr-1" />
                  Ver PDF
                </Button>
                <Button variant="outline" size="sm" className="border-zinc-700">
                  <Download className="h-3 w-3 mr-1" />
                  Baixar
                </Button>
                <Button variant="outline" size="sm" className="border-zinc-700">
                  <Mail className="h-3 w-3 mr-1" />
                  Reenviar
                </Button>
              </div>
            </div>

            {/* Fatura 2 - PENDENTE */}
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-yellow-600/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white text-lg">
                        #002 - E-commerce Plus
                      </p>
                      <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                        ⏱ PENDENTE
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Projeto: Loja Virtual Premium
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                      <span>Emitida: 25 Out 2025</span>
                      <span>•</span>
                      <span className="text-yellow-400">Vence em 5 dias</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-400">
                    R$ 22.000,00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-zinc-700">
                  <Eye className="h-3 w-3 mr-1" />
                  Ver PDF
                </Button>
                <Button variant="outline" size="sm" className="border-zinc-700">
                  <Mail className="h-3 w-3 mr-1" />
                  Enviar Lembrete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-700 text-green-400"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Marcar como Paga
                </Button>
              </div>
            </div>

            {/* Fatura 3 - VENCIDA */}
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-red-700/50 hover:border-red-600 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-red-600/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white text-lg">
                        #003 - StartupX
                      </p>
                      <Badge className="bg-red-600/20 text-red-400 border-red-600/30">
                        ⚠ VENCIDA
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Projeto: App Mobile Delivery
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                      <span>Emitida: 20 Out 2025</span>
                      <span>•</span>
                      <span className="text-red-400">Vencida há 3 dias</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-400">
                    R$ 15.000,00
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-zinc-700">
                  <Eye className="h-3 w-3 mr-1" />
                  Ver PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-700 text-red-400"
                >
                  <Send className="h-3 w-3 mr-1" />
                  Enviar Cobrança
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-700 text-green-400"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Marcar como Paga
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Template de Fatura */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">
            Preview: Template de Fatura
          </CardTitle>
          <CardDescription>
            Visualização de como suas faturas são geradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-8 rounded-lg">
            {/* Header da Fatura */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-200">
              <div>
                <div className="h-12 w-12 bg-purple-600 rounded-lg mb-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Davi Franco Dev
                </h2>
                <p className="text-sm text-gray-600">dev@dashboard.com</p>
                <p className="text-sm text-gray-600">(11) 99999-9999</p>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  FATURA
                </h1>
                <p className="text-lg text-gray-600">#001</p>
                <p className="text-sm text-gray-500 mt-2">
                  Emitida: 15/10/2025
                </p>
              </div>
            </div>

            {/* Informações do Cliente */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                PARA:
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                TechCorp Brasil
              </p>
              <p className="text-sm text-gray-600">contato@techcorp.com.br</p>
              <p className="text-sm text-gray-600">(11) 98765-4321</p>
            </div>

            {/* Detalhes do Serviço */}
            <div className="mb-8">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700">
                      Descrição
                    </th>
                    <th className="text-right p-3 text-sm font-semibold text-gray-700">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-gray-900">
                      <p className="font-semibold">Sistema CRM Completo</p>
                      <p className="text-sm text-gray-600">
                        Desenvolvimento de CRM com gestão de leads, pipeline de
                        vendas e relatórios
                      </p>
                    </td>
                    <td className="p-3 text-right text-gray-900 font-semibold">
                      R$ 18.000,00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 border-t-2 border-gray-900">
                  <span className="font-bold text-gray-900 text-lg">TOTAL</span>
                  <span className="font-bold text-gray-900 text-xl">
                    R$ 18.000,00
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Vencimento: 10/11/2025
                </p>
              </div>
            </div>

            {/* Dados Bancários */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Dados para Pagamento:
              </h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <strong>Banco:</strong> 001 - Banco do Brasil
                </p>
                <p>
                  <strong>Agência:</strong> 1234-5
                </p>
                <p>
                  <strong>Conta:</strong> 12345-6
                </p>
                <p>
                  <strong>PIX:</strong> dev@dashboard.com
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Card>
  );
};

export default FaturasPage;
