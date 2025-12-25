"use client";

import { Mail, Github, Twitter } from "lucide-react";
import { AdminGate } from "@/components/admin-gate";
import { useState, useEffect } from "react";

export function SiteFooter() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 pb-20 border-t border-transparent">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 max-w-3xl px-6" suppressHydrationWarning>
        
        {/* To the Top Link */}
        <button 
            onClick={scrollToTop}
            className="text-[hsl(var(--primary))] font-mono text-sm hover:underline underline-offset-4 mb-2"
        >
            To the Top
        </button>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
            <a 
                href="mailto:vishal@vishal.ml" 
                className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/80] transition-colors"
                aria-label="Email"
            >
                <Mail className="w-5 h-5" />
            </a>
            <a 
                href="https://github.com/vishaldotml" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/80] transition-colors"
                aria-label="GitHub"
            >
                <Github className="w-5 h-5" />
            </a>
            <a 
                href="https://x.com/vishaldotml" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/80] transition-colors"
                aria-label="Twitter"
            >
                <Twitter className="w-5 h-5" />
            </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-muted-foreground font-mono">
          <AdminGate /> {currentYear} vishal.ml
        </div>

      </div>
    </footer>
  );
}
