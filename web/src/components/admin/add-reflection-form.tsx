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
    <div className="flex flex-col items-center justify-center font-mono w-full max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-xl font-bold mb-6 text-green-500 text-left w-full border-b border-green-500/30 pb-2">
        &gt; {editingId ? "UPDATE MODE" : "INSERTION MODE"}
      </h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mb-12">
        <div>
            <div className="flex justify-between items-end mb-1">
                <label className="text-green-500/70 text-xs block">
                    {editingId ? "EDITING CONTENT" : "NEW WEEKLY LOG CONTENT"}
                </label>
                {editingId && (
                    <button 
                        type="button" 
                        onClick={handleCancelEdit}
                        className="text-xs text-red-500 hover:underline"
                    >
                        CANCEL EDIT
                    </button>
                )}
            </div>
            <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-black border border-green-500/50 text-green-500 p-3 rounded outline-none focus:border-green-500 h-64 font-mono text-sm"
            required
            placeholder={editingId ? "Modify content..." : "Enter your learnings for this week..."}
            />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-900/20 border border-green-500/50 text-green-500 py-3 hover:bg-green-500/10 transition-colors disabled:opacity-50 font-bold flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : (editingId ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />)}
          {loading ? "EXECUTING..." : (editingId ? "UPDATE RECORD" : "EXECUTE INJECTION")}
        </button>
      </form>

      <h2 className="text-lg font-bold mb-4 text-green-500 text-left w-full border-b border-green-500/30 pb-2">
        &gt; DATABASE RECORDS
      </h2>
      
      <div className="w-full grid gap-4">
        {reflections.map((reflection) => (
            <div key={reflection.id} className="border border-green-500/30 p-4 rounded bg-green-500/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="font-bold text-green-400">{reflection.title}</div>
                    <div className="text-xs text-green-500/60">{reflection.dateRange}</div>
                    <div className="text-xs text-green-500/40 mt-1 truncate max-w-md">{reflection.content}</div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(reflection)}
                        className="p-2 border border-green-500/30 rounded hover:bg-green-500/20 text-green-400"
                        title="Edit"
                    >
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(reflection.id)}
                        className="p-2 border border-red-500/30 rounded hover:bg-red-500/20 text-red-400"
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        ))}
        {reflections.length === 0 && (
            <div className="text-green-500/40 italic text-center py-8">NO RECORDS FOUND</div>
        )}
      </div>
    </div>
  );
}