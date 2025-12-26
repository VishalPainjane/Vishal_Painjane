"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="w-full bg-background pt-8 pb-4" suppressHydrationWarning>
      <div className="container mx-auto flex items-center justify-between px-6 max-w-3xl" suppressHydrationWarning>
        {/* Logo and Navigation Links - Top Left */}
        <div className="flex items-center space-x-6">
          {isClient && pathname !== "/" && ( // Only render on client after hydration
            <Link href="/" className="text-2xl sm:text-3xl md:text-4xl hover:opacity-80 transition-opacity">
              <motion.span 
                layoutId="alien-logo" 
                className="inline-block will-change-transform"
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 25
                }}
              >
                <span suppressHydrationWarning>👾</span>
              </motion.span>
            </Link>
          )}
          <nav className="flex items-center space-x-6 text-base">
              {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                    "hover:text-primary transition-colors relative whitespace-nowrap",
                    pathname === item.href ? "text-foreground font-medium" : "text-foreground/80"
                    )}
                >
                    {item.name}
                    {isClient && pathname === item.href && ( // Only render on client after hydration
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
        
        {/* Theme Toggle - Far Right */}
        <ThemeToggle />
      </div>
    </header>
  );
}
