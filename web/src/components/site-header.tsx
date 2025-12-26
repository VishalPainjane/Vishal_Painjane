"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Learning", href: "/learning" },
  { name: "Reading List", href: "/reading-list" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (isClient && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="w-full bg-background/80 pt-6 md:pt-8 pb-4 sticky top-0 z-50 border-b border-border/50 backdrop-blur-md" suppressHydrationWarning>
      <div className="container mx-auto flex items-center justify-between px-6 max-w-3xl" suppressHydrationWarning>
        {/* Left Side: Logo and Desktop Nav */}
        <div className="flex items-center gap-6">
          {isClient && pathname !== "/" && (
            <Link href="/" className="text-2xl hover:opacity-80 transition-opacity shrink-0">
              <motion.span 
                layoutId="alien-logo" 
                className="inline-block"
              >
                <span suppressHydrationWarning>👾</span>
              </motion.span>
            </Link>
          )}
          
          <nav className="hidden md:flex items-center space-x-6 text-sm lg:text-base">
              {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                    "hover:text-primary transition-colors relative whitespace-nowrap py-1",
                    pathname === item.href ? "text-foreground font-bold" : "text-muted-foreground"
                    )}
                >
                    {item.name}
                    {isClient && pathname === item.href && (
                        <motion.div
                            layoutId="active-nav"
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </Link>
              ))}
          </nav>
        </div>
        
        {/* Right Side: Theme Toggle and Mobile Trigger */}
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 w-full md:hidden border-b border-border/50 bg-background/80 backdrop-blur-md shadow-lg overflow-hidden"
            >
                <nav className="flex flex-col p-6 gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-lg font-medium transition-colors py-2 border-b border-border/50 last:border-0",
                                pathname === item.href ? "text-primary font-bold" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
