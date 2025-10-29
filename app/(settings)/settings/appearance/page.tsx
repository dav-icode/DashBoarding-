import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Palette, Moon, Sun, Monitor } from "lucide-react";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 w-[75vw]">
        <h2 className="text-2xl font-bold text-white">Aparência</h2>
        <p className="text-zinc-400 mt-1">
          Personalize a aparência do aplicativo
        </p>
      </div>

      {/* Card de Tema */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-5 w-[75vw]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-white">Tema</CardTitle>
          </div>
          <CardDescription>Escolha o tema do aplicativo</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="dark" className="space-y-3">
            <div className="flex items-center space-x-3 p-4 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer">
              <RadioGroupItem value="light" id="light" />
              <Label
                htmlFor="light"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Sun className="h-5 w-5 text-zinc-400" />
                <div>
                  <div className="text-sm font-medium text-white">Claro</div>
                  <div className="text-xs text-zinc-500">
                    Tema claro para o dia
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-600 bg-purple-600/10 transition-colors cursor-pointer">
              <RadioGroupItem value="dark" id="dark" />
              <Label
                htmlFor="dark"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Moon className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-sm font-medium text-white">Escuro</div>
                  <div className="text-xs text-zinc-400">
                    Tema escuro para reduzir cansaço visual
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer">
              <RadioGroupItem value="system" id="system" />
              <Label
                htmlFor="system"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Monitor className="h-5 w-5 text-zinc-400" />
                <div>
                  <div className="text-sm font-medium text-white">Sistema</div>
                  <div className="text-xs text-zinc-500">
                    Usar preferência do sistema
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Card de Cor de Destaque */}
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-5 w-[75vw]">
        <CardHeader>
          <CardTitle className="text-white">Cor de Destaque</CardTitle>
          <CardDescription>
            Escolha a cor principal do aplicativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-5">
            {[
              { name: "Purple", color: "bg-purple-600" },
              { name: "Blue", color: "bg-blue-600" },
              { name: "Green", color: "bg-green-600" },
              { name: "Red", color: "bg-red-600" },
              { name: "Orange", color: "bg-orange-600" },
              { name: "Pink", color: "bg-pink-600" },
            ].map((color) => (
              <button
                key={color.name}
                className={`${color.color} h-12 rounded-lg hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-white/50`}
                title={color.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
