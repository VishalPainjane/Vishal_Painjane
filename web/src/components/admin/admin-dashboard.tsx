"use client";

import { useState, useEffect, useCallback } from "react";
import { AddReflectionForm } from "@/components/admin/add-reflection-form";
import { PersonalDataManager } from "@/components/admin/personal-data-manager";
import { BlogManager } from "@/components/admin/blog-manager";
import { ProjectManager } from "@/components/admin/project-manager";
import { ReadingListManager } from "@/components/admin/reading-list-manager";
import { TechnologyManager } from "@/components/admin/technology-manager";
import { LogoutButton } from "@/components/admin/logout-button";
import { BookOpen, Lock, LayoutDashboard, HardDrive, FileText, Code, Library, Layers, ShieldCheck, Terminal } from "lucide-react";

interface StorageStats {
  formattedTotal: string;
  totalSize: number;
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"reflections" | "personal" | "blog" | "projects" | "reading" | "tech">("reflections");
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
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

  const TabButton = ({ id, label, Icon }: { id: typeof activeTab, label: string, Icon: any }) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`w-full px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all ${
            activeTab === id
            ? "bg-primary text-background shadow-[0_0_20px_hsl(var(--primary)/0.3)] scale-[1.02]" 
            : "text-primary/40 hover:text-primary hover:bg-primary/5"
        }`}
    >
        <Icon className="w-4 h-4" />
        <span className="tracking-tighter uppercase">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen hacker-theme bg-background text-primary font-mono overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className={`w-64 border-r border-border flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-0' : '-ml-64'}`}>
        <div className="p-6 border-b border-border flex flex-col gap-1">
            <div className="flex items-center gap-2 text-primary">
                <Terminal className="w-5 h-5" />
                <h1 className="font-black tracking-tighter text-lg">SYSTEM_ROOT</h1>
            </div>
            <p className="text-[9px] opacity-40 uppercase tracking-[0.2em]">tokyo_sector_01</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 mt-4">
            <div className="text-[10px] text-muted-foreground font-bold mb-2 ml-2 tracking-widest uppercase">Modules</div>
            <TabButton id="reflections" label="Neural Logs" Icon={BookOpen} />
            <TabButton id="blog" label="Intel Broadcast" Icon={FileText} />
            <TabButton id="projects" label="Active Ops" Icon={Code} />
            <TabButton id="tech" label="Stack Mesh" Icon={Layers} />
            <TabButton id="reading" label="Archive Data" Icon={Library} />
            
            <div className="text-[10px] text-muted-foreground font-bold mb-2 ml-2 mt-6 tracking-widest uppercase">Security</div>
            <TabButton id="personal" label="Core Vault" Icon={Lock} />
        </nav>

        <div className="p-4 border-t border-border space-y-4 bg-muted/20">
            {stats && (
                <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="opacity-50 uppercase">Storage Link</span>
                        <HardDrive className="w-2.5 h-2.5" />
                    </div>
                    <div className="text-sm font-black text-primary">{stats.formattedTotal}</div>
                </div>
            )}
            <LogoutButton />
        </div>
      </aside>

      {/* Main Control Surface */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Status Bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-muted/10 backdrop-blur-xl z-30">
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-primary/10 rounded transition-colors text-primary/50 hover:text-primary"
                >
                    <LayoutDashboard className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 opacity-50" />
                    <span className="opacity-30 tracking-widest">SECURE_LINK:</span>
                    <span className="text-primary font-bold">ESTABLISHED</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]"></div>
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">Live_Sync</span>
                </div>
            </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-background p-8 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
            <div className="max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
                {activeTab === "reflections" && <AddReflectionForm onUpdate={fetchStats} />}
                {activeTab === "blog" && <BlogManager onUpdate={fetchStats} />}
                {activeTab === "projects" && <ProjectManager onUpdate={fetchStats} />}
                {activeTab === "tech" && <TechnologyManager onUpdate={fetchStats} />}
                {activeTab === "reading" && <ReadingListManager onUpdate={fetchStats} />}
                {activeTab === "personal" && <PersonalDataManager onUpdate={fetchStats} />}
            </div>
        </div>

        {/* Floating Background Grid Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(hsl(var(--primary)/0.2)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </main>
    </div>
  );
}
