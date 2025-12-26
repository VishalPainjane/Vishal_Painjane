"use client";

import Link from "next/link";
import { Terminal } from "lucide-react";
import { usePathname } from "next/navigation";

export function FloatingBackdoor() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] pointer-events-auto">
      <Link 
        href="/admin"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] group"
        aria-label="Backdoor"
      >
        <Terminal className="w-5 h-5 transition-transform group-hover:scale-110" />
      </Link>
    </div>
  );
}
