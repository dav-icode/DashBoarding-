"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { requestPasswordReset } from "@/lib/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    const result = await requestPasswordReset(email);

    if (result.error) {
      setError(result.error);
    } else {
      setMessage("Email enviado! Confira sua caixa de entrada.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <h1 className="text-center text-3xl font-bold text-white">
            Esqueceu sua senha?
          </h1>
          <p className="text-center text-sm text-zinc-400 mt-2">
            Digite seu email para receber o link de recuperação
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-purple-500"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            {message && (
              <p className="text-sm text-green-400 text-center">{message}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>

          <p className="text-center text-sm text-zinc-400">
            Lembrou sua senha?{" "}
            <Link
              href="/Login"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Voltar ao login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
