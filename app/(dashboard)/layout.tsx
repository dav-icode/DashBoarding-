import Sidebar from "@/components/sidebar";
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen  bg-linear-to-br from-zinc-600 to-zinc-950">
      <Sidebar />
      {children}
    </div>
  );
}
