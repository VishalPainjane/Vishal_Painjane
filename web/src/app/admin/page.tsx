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
      <div className="min-h-screen bg-black text-green-500 font-mono p-6 flex items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-6">
      <div className="max-w-6xl mx-auto">
          <AdminDashboard />
      </div>
    </div>
  );
}
