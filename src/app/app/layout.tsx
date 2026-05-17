import { redirect } from "next/navigation";
import { AppNav } from "@/components/dashboard/app-nav";
import { getCurrentSession } from "@/lib/auth/session";

export default async function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentSession();
  if (!session.user) redirect("/login");

  return (
    <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
      <AppNav parentName={session.user.name} />
      <div className="min-w-0 px-4 py-6 md:px-8">{children}</div>
    </div>
  );
}
