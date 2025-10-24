export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-950 via-slate-900 to-zinc-950">
      {children}
    </div>
  );
}
