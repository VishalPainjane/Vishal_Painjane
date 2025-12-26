"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Layers, X, Save } from "lucide-react";

interface Technology {
  id: string;
  name: string;
  icon: string;
}

interface TechnologyManagerProps {
  onUpdate?: () => void;
}

export function TechnologyManager({ onUpdate }: TechnologyManagerProps) {
  const [techs, setTechs] = useState<Technology[]>([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTechs();
  }, []);

  const fetchTechs = async () => {
    try {
      const res = await fetch("/api/technologies");
      if (res.ok) {
        const data = await res.json();
        setTechs(data);
      }
    } catch (error) {
      console.error("Failed to fetch technologies", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/technologies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, icon }),
    });

    if (res.ok) {
      setName("");
      setIcon("");
      setIsCreating(false);
      fetchTechs();
      if (onUpdate) onUpdate();
    } else {
      alert("Failed to create technology");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this technology?")) return;
    const res = await fetch(`/api/technologies/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchTechs();
      if (onUpdate) onUpdate();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full font-mono hacker-theme">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Layers className="w-5 h-5" />
            TECH STACK
        </h2>
        <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded border border-border transition-colors text-sm font-bold"
        >
            <Plus className="w-4 h-4" />
            ADD STACK
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="border border-border p-4 rounded bg-muted/10 flex flex-col gap-3">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">NEW TECHNOLOGY</span>
                <button type="button" onClick={() => setIsCreating(false)}><X className="w-4 h-4 text-red-500" /></button>
             </div>
             <input 
                placeholder="Name (e.g. Python)" 
                value={name} onChange={e => setName(e.target.value)}
                className="bg-background border border-border text-primary p-2 rounded text-sm outline-none focus:border-primary/50"
                required
             />
             <textarea 
                placeholder="SVG Icon String or URL" 
                value={icon} onChange={e => setIcon(e.target.value)}
                className="bg-background border border-border text-primary p-2 rounded text-sm h-20 font-mono text-[10px] outline-none focus:border-primary/50"
                required
             />
             <button type="submit" className="bg-primary text-background font-bold py-2 rounded hover:bg-primary/90 flex justify-center items-center gap-2 text-sm">
                 <Save className="w-3 h-3" /> SAVE
             </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {techs.map((t) => (
            <div key={t.id} className="border border-border p-2 rounded bg-muted/10 flex items-center justify-between gap-2 group hover:border-primary/30 transition-colors min-w-0">
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <div className="w-6 h-6 shrink-0 flex items-center justify-center text-primary" dangerouslySetInnerHTML={{ __html: t.icon.startsWith('<svg') ? t.icon : `<img src="${t.icon}" class="w-full h-full object-contain" />` }} />
                    <span className="text-xs text-primary font-bold truncate flex-1">{t.name}</span>
                </div>
                <button onClick={() => handleDelete(t.id)} className="text-red-500 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            </div>
        ))}
      </div>
    </div>
  );
}
