"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2, Lock, Terminal, ArrowRight } from "lucide-react";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        const data = await res.json();
        setError(data.error || "ACCESS_DENIED: INVALID_CREDENTIALS");
      }
    } catch (err) {
      setError("COMMUNICATION_ERROR: LINK_FAILURE");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center gap-6 mb-10">
        <div className="w-20 h-20 bg-green-500/10 rounded-3xl border border-green-500/20 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-green-500/5 blur-xl group-hover:bg-green-500/10 transition-all"></div>
            <Terminal className="w-10 h-10 text-green-500 relative z-10" />
        </div>
        <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Root_Access</h1>
            <p className="text-[10px] text-green-500/40 uppercase tracking-[0.3em] font-bold">Encrypted_Channel_Established</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500/30 group-focus-within:text-green-500 transition-colors">
                <Lock className="w-4 h-4" />
            </div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER_PASSPHRASE..."
                className="w-full bg-black border border-green-500/10 text-green-500 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-green-500/50 focus:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all font-bold placeholder:text-green-500/10"
                required
                autoFocus
            />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 animate-shake">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-tight">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group w-full bg-green-500 text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-green-400 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <>
                Establish_Link
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-green-500/5 text-center">
        <p className="text-[9px] text-green-500/20 font-bold uppercase tracking-[0.4em]">Vishal_Painjane // Sector_01</p>
      </div>
    </div>
  );
}