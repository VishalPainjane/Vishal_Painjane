"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function AdminGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleTrigger = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      setIsOpen(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // Shake duration
    }
  };

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <span onClick={handleTrigger} className="cursor-default select-none hover:text-foreground transition-colors">
        ©
      </span>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, x: error ? [0, -10, 10, -10, 10, 0] : 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm p-6 bg-black border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)] rounded-lg"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="text-green-500 font-mono text-sm tracking-widest">IDENTIFICATION KEY</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black border-b border-green-500 text-green-500 outline-none font-mono py-2 text-center text-xl focus:border-b-2"
                  autoFocus
                />
              </form>
            </motion.div>
            
            {/* Backdrop click to close */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
