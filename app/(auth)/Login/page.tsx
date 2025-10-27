"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Duração de "Lembrar Senha"

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,

      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 dias ou 1 dia
    });

    if (result?.error) {
      setError("Email ou senha incorretos");
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <h1 className="text-center text-3xl font-bold text-white">Login</h1>
          <p className="text-center text-sm text-zinc-400 mt-2">
            Acesse sua conta para continuar
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
                required
              />
            </div>

            {/* Password com toggle */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-200">
                Senha
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mensagem de erro */}
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            {/* Checkbox e Link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-zinc-600"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-zinc-300 cursor-pointer"
                >
                  Lembrar senha
                </Label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            {/* Botão Login */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-200"
            >
              Entrar
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-400">
                Ou entre com
              </span>
            </div>
          </div>

          {/* Botões Sociais */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="flex-1 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white transition-all duration-200"
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleGithubLogin}
              className="flex-1 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white transition-all duration-200"
            >
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* Link Registro */}
          <p className="text-center text-sm text-zinc-400">
            Não tem uma conta?{" "}
            <Link
              href="/Register"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Registre-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
