import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  let isAuthenticated = false;

  if (token) {
    const session = await verifySession(token);
    if (session) {
      isAuthenticated = true;
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen hacker-theme bg-background text-primary font-mono p-6 flex items-center justify-center relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(var(--color-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-primary)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="z-10 w-full max-w-md">
            <LoginForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hacker-theme bg-background text-primary font-mono">
        <AdminDashboard />
    </div>
  );
}