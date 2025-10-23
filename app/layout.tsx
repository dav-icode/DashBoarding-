import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
