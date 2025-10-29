import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsSidebar } from "@/components/sidebar-settings";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Settings</h1>
            <p className="text-sm text-zinc-400 mt-0.5">
              Gerencie suas preferências e configurações
            </p>
          </div>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Layout com Sidebar */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 shrink-0">
            <SettingsSidebar />
          </aside>

          {/* Conteúdo */}
          <main className="flex-1 max-w-3xl">{children}</main>
        </div>
      </div>
    </div>
  );
}
