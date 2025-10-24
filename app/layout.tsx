import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DashBoarding! - Gestão de Projetos para Freelancers",
  description:
    "Plataforma completa de gestão de projetos, clientes e finanças para prestadores de serviço e PJTs",
  keywords: [
    "gestão de projetos",
    "freelancer",
    "dashboard",
    "clientes",
    "projetos",
  ],
  authors: [{ name: "DashBoarding Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex bg-gradient-to-br from-violet-950 via-purple-950 to-black min-h-screen text-slate-50`}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
