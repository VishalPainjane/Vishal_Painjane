"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        setError("INVALID CREDENTIALS");
        setLoading(false);
      }
    } catch (err) {
      setError("CONNECTION ERROR");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full max-w-md mx-auto">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="p-4 rounded-full bg-green-900/20 border border-green-500/30">
          <Lock className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="text-xl font-bold text-green-500 tracking-widest">SECURE ACCESS</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="relative group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ENTER PASSWORD"
            className="w-full bg-black border border-green-500/30 text-green-500 p-4 rounded text-center outline-none focus:border-green-500 transition-all placeholder:text-green-900"
            autoFocus
          />
          <div className="absolute inset-0 border border-green-500/0 group-hover:border-green-500/20 pointer-events-none rounded transition-all" />
        </div>
        
        {error && (
          <div className="text-red-500 text-xs font-mono text-center border border-red-900/30 bg-red-900/10 p-2 rounded">
            ERROR: {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-black font-bold py-3 rounded hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? "AUTHENTICATING..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
}
