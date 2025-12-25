"use client";

import { useState, useEffect, useCallback } from "react";
import { AddReflectionForm } from "@/components/admin/add-reflection-form";
import { PersonalDataManager } from "@/components/admin/personal-data-manager";
import { LogoutButton } from "@/components/admin/logout-button";
import { BookOpen, Lock, LayoutDashboard, HardDrive } from "lucide-react";

interface StorageStats {
  formattedTotal: string;
  totalSize: number;
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"reflections" | "personal">("reflections");
  const [stats, setStats] = useState<StorageStats | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      // Append a timestamp to the URL to bust cache reliably
      const res = await fetch(`/api/admin/stats?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
        console.error("Failed to fetch stats", error);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-green-500/30 pb-4 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8" />
            SYSTEM ADMIN
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-sm opacity-70">SECURE CONNECTION ESTABLISHED</p>
            {stats && (
                <div className="flex items-center gap-2 text-[10px] text-green-500/50 bg-green-500/5 px-2 py-0.5 rounded border border-green-500/10">
                    <HardDrive className="w-3 h-3" />
                    STORAGE: <span className="text-green-400 font-bold">{stats.formattedTotal}</span>
                </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex bg-green-900/10 rounded-lg p-1 border border-green-500/20">
                <button
                    onClick={() => setActiveTab("reflections")}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
                        activeTab === "reflections" 
                        ? "bg-green-500 text-black shadow-lg" 
                        : "text-green-500/50 hover:text-green-500 hover:bg-green-500/10"
                    }`}
                >
                    <BookOpen className="w-4 h-4" />
                    WEEKLY LOGS
                </button>
                <button
                    onClick={() => setActiveTab("personal")}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
                        activeTab === "personal" 
                        ? "bg-green-500 text-black shadow-lg" 
                        : "text-green-500/50 hover:text-green-500 hover:bg-green-500/10"
                    }`}
                >
                    <Lock className="w-4 h-4" />
                    SELF DATA
                </button>
            </div>
            <LogoutButton />
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "reflections" ? (
            <AddReflectionForm onUpdate={fetchStats} />
        ) : (
            <PersonalDataManager onUpdate={fetchStats} />
        )}
      </div>
    </div>
  );
}