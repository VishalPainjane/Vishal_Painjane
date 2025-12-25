"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-xs border border-red-900/50 text-red-500/70 px-3 py-1.5 rounded hover:bg-red-900/20 hover:text-red-400 transition-colors"
    >
      <LogOut className="w-3 h-3" />
      TERMINATE SESSION
    </button>
  );
}
