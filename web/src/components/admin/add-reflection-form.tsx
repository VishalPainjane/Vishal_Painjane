"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus, Loader2 } from "lucide-react";

interface Reflection {
  id: string;
  title: string;
  dateRange: string;
  monthGroup: string;
  content: string | null;
  slug: string;
}

interface AddReflectionFormProps {
  onUpdate?: () => void;
}

export function AddReflectionForm({ onUpdate }: AddReflectionFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    try {
      const res = await fetch("/api/reflections");
      if (res.ok) {
        const data = await res.json();
        const flatList: Reflection[] = [];
        data.forEach((group: any) => {
           group.weeks.forEach((week: any) => {
             flatList.push(week); 
           });
        });
        setReflections(flatList);
      }
    } catch (error) {
      console.error("Failed to fetch reflections", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId ? `/api/reflections/${editingId}` : "/api/reflections";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent("");
      setEditingId(null);
      fetchReflections();
      if (onUpdate) onUpdate();
    } else {
      const data = await res.json();
      alert(`OPERATION FAILED: ${data.details || res.statusText}`);
    }
    setLoading(false);
  };

  const handleEdit = (reflection: Reflection) => {
    setContent(reflection.content || "");
    setEditingId(reflection.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("CONFIRM DELETION? THIS ACTION CANNOT BE UNDONE.")) return;

    const res = await fetch(`/api/reflections/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchReflections();
      if (onUpdate) onUpdate();
      router.refresh();
    } else {
      alert("DELETION FAILED");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setContent("");
  };

  return (
    <div className="flex flex-col items-center justify-center font-mono w-full max-w-4xl mx-auto mt-10 px-4 hacker-theme">
      <h1 className="text-xl font-bold mb-6 text-primary text-left w-full border-b border-border pb-2 uppercase tracking-tighter">
        &gt; {editingId ? "Update_Mode" : "Insertion_Mode"}
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mb-12">
        <div>
            <div className="flex justify-between items-end mb-2">
                <label className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest block">
                    {editingId ? "Editing Content" : "New Neural Log Content"}
                </label>
                {editingId && (
                    <button 
                        type="button" 
                        onClick={handleCancelEdit}
                        className="text-[10px] text-red-500 hover:underline font-bold uppercase tracking-widest"
                    >
                        Cancel_Edit
                    </button>
                )}
            </div>
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-background border border-border text-primary p-4 rounded-xl outline-none focus:border-primary/50 h-64 font-mono text-sm leading-relaxed transition-all resize-none"
            required
            placeholder={editingId ? "Modify content payload..." : "Enter your learnings for this week..."}
            />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-background font-bold py-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase text-xs tracking-[0.2em]"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : (editingId ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />)}
          {loading ? "Executing..." : (editingId ? "Update Record" : "Execute Injection")}
        </button>
      </form>

      <h2 className="text-lg font-bold mb-4 text-primary text-left w-full border-b border-border pb-2 uppercase tracking-tighter">
        &gt; Database_Records
      </h2>
      
      <div className="w-full grid gap-4 pb-20">
        {reflections.map((reflection) => (
            <div key={reflection.id} className="border border-border p-5 rounded-2xl bg-muted/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/30 transition-colors group">
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-primary text-lg tracking-tight">{reflection.title}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-60">{reflection.dateRange}</div>
                    <div className="text-xs text-primary/40 mt-3 truncate max-w-xl font-mono italic">{reflection.content}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => handleEdit(reflection)}
                        className="p-2 border border-border rounded-lg hover:bg-primary/10 text-primary/60 hover:text-primary transition-all"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(reflection.id)}
                        className="p-2 border border-border rounded-lg hover:bg-red-500/10 text-red-500/40 hover:text-red-500 transition-all"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ))}
        {reflections.length === 0 && (
            <div className="text-muted-foreground italic text-center py-12 border border-border border-dashed rounded-2xl">NO RECORDS FOUND</div>
        )}
      </div>
    </div>
  );
}