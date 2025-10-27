import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function SettingsProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/Login");
  }

  const initials =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div className="p-5">
        <h2 className="text-2xl font-bold text-white">Perfil</h2>
        <p className="text-zinc-400 mt-1">
          Gerencie suas informações pessoais e como você aparece para outros
        </p>
      </div>

      {/* Card de Foto */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-5 w-[75vw]">
        <CardHeader>
          <CardTitle className="text-white">Foto de Perfil</CardTitle>
          <CardDescription>
            Esta é a sua foto de perfil visível para todos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-zinc-700">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback className="bg-purple-600 text-white text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" className="border-zinc-700">
              Alterar foto
            </Button>
            <p className="text-xs text-zinc-500 mt-2">
              JPG, GIF ou PNG. Máximo 2MB.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card de Informações */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-5 w-[75vw]">
        <CardHeader>
          <CardTitle className="text-white">Informações Pessoais</CardTitle>
          <CardDescription>Atualize seus dados pessoais aqui</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-200">
              Nome completo
            </Label>
            <Input
              id="name"
              defaultValue={session.user.name || ""}
              placeholder="Seu nome completo"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={session.user.email || ""}
              className="bg-zinc-800 border-zinc-700 text-white"
              disabled
            />
            <p className="text-xs text-zinc-500">
              Email não pode ser alterado por questões de segurança
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-200">
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-zinc-200">
              Bio / Descrição
            </Label>
            <textarea
              id="bio"
              rows={4}
              placeholder="Conte um pouco sobre você e seu trabalho..."
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:border-purple-500 focus:outline-none resize-none"
            />
            <p className="text-xs text-zinc-500">Máximo 500 caracteres</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button variant="outline" className="border-zinc-700">
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Salvar alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
