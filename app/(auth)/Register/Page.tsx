"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { registerUser } from "@/lib/actions/auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      // Fazer login automático após registro
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });
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
          <h1 className="text-center text-3xl font-bold text-white">
            Criar conta
          </h1>
          <p className="text-center text-sm text-zinc-400 mt-2">
            Cadastre-se para começar a usar o Dashboard!
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-200">
                Nome completo
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">
                E-mail
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
                required
                disabled={isLoading}
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
                  placeholder="Digite sua senha (mínimo 6 caracteres)"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500 pr-10"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                  disabled={isLoading}
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

            {/* Termos de uso */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="border-zinc-600"
                required
                disabled={isLoading}
              />
              <Label
                htmlFor="terms"
                className="text-sm text-zinc-300 cursor-pointer"
              >
                Aceito os{" "}
                <Link
                  href="/terms"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  termos de uso
                </Link>{" "}
                e{" "}
                <Link
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  política de privacidade
                </Link>
              </Label>
            </div>

            {/* Botão Cadastrar */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-400">
                Ou continue com
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
              disabled={isLoading}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleGithubLogin}
              className="flex-1 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white transition-all duration-200"
              disabled={isLoading}
            >
              <FaGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* Link Login */}
          <p className="text-center text-sm text-zinc-400">
            Já possui uma conta?{" "}
            <Link
              href="/Login"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Faça login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
