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
      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/20 text-red-500/50 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
    >
      <LogOut className="w-3 h-3" />
      Terminate_Session
    </button>
  );
}