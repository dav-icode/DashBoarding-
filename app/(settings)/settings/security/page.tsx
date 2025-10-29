import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Key } from "lucide-react";

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6 p-5">
      {/* Header */}
      <div className="p-5 w-[75vw]">
        <h2 className="text-2xl font-bold text-white">Segurança</h2>
        <p className="text-zinc-400 mt-1">
          Gerencie sua senha e configurações de segurança
        </p>
      </div>

      {/* Card de Alterar Senha */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl w-[75vw] p-5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-white">Alterar Senha</CardTitle>
          </div>
          <CardDescription>
            Atualize sua senha regularmente para manter sua conta segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-zinc-200">
              Senha atual
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Digite sua senha atual"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-zinc-200">
              Nova senha
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Digite sua nova senha"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
            <p className="text-xs text-zinc-500">Mínimo 6 caracteres</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-zinc-200">
              Confirmar nova senha
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Digite novamente sua nova senha"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button variant="outline" className="border-zinc-700">
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Atualizar senha
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card de Autenticação em Duas Etapas */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl w-[75vw] p-5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-white">
              Autenticação em Duas Etapas
            </CardTitle>
          </div>
          <CardDescription>
            Adicione uma camada extra de segurança à sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">
                2FA está desativado
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Proteja sua conta com autenticação de dois fatores
              </p>
            </div>
            <Button variant="outline" className="border-zinc-700">
              Ativar 2FA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
