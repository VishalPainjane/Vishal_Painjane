"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, BookOpen, Save, X, ExternalLink } from "lucide-react";

interface ReadingItem {
  id: string;
  title: string;
  authors: string | null;
  category: string;
  link: string;
  type: string;
}

interface ReadingListManagerProps {
  onUpdate?: () => void;
}

export function ReadingListManager({ onUpdate }: ReadingListManagerProps) {
  const [items, setItems] = useState<ReadingItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("Paper");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/reading-list");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch reading list", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthors("");
    setCategory("");
    setLink("");
    setType("Paper");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item: ReadingItem) => {
    setTitle(item.title);
    setAuthors(item.authors || "");
    setCategory(item.category);
    setLink(item.link);
    setType(item.type);
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = { title, authors, category, link, type };
    const url = editingId ? `/api/reading-list/${editingId}` : "/api/reading-list";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        fetchItems();
        resetForm();
        if (onUpdate) onUpdate();
    } else {
        alert("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm deletion?")) return;
    const res = await fetch(`/api/reading-list/${id}`, { method: "DELETE" });
    if (res.ok) {
        fetchItems();
        if (onUpdate) onUpdate();
    } else {
        alert("Deletion failed");
    }
  };

  if (isEditing) {
      return (
          <div className="border border-border p-6 rounded bg-muted/10 font-mono hacker-theme">
              <div className="flex justify-between items-center mb-6 border-b border-border pb-2">
                  <h3 className="text-lg font-bold text-primary">{editingId ? "EDIT ENTRY" : "NEW ENTRY"}</h3>
                  <button onClick={resetForm} className="text-red-500 hover:text-red-400 transition-colors">
                      <X className="w-5 h-5" />
                  </button>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-muted-foreground block mb-1">TYPE</label>
                        <select 
                            value={type} onChange={e => setType(e.target.value)} 
                            className="w-full bg-background border border-border text-primary p-2 rounded outline-none focus:border-primary/50"
                        >
                            <option value="Paper">Paper</option>
                            <option value="Book">Book</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground block mb-1">CATEGORY</label>
                        <input 
                            value={category} onChange={e => setCategory(e.target.value)} 
                            className="w-full bg-background border border-border text-primary p-2 rounded outline-none focus:border-primary/50"
                            required
                        />
                    </div>
                  </div>

                  <div>
                      <label className="text-xs text-muted-foreground block mb-1">TITLE</label>
                      <input 
                          value={title} onChange={e => setTitle(e.target.value)} 
                          className="w-full bg-background border border-border text-primary p-2 rounded outline-none focus:border-primary/50"
                          required
                      />
                  </div>
                  <div>
                      <label className="text-xs text-muted-foreground block mb-1">AUTHORS</label>
                      <input 
                          value={authors} onChange={e => setAuthors(e.target.value)} 
                          className="w-full bg-background border border-border text-primary p-2 rounded outline-none focus:border-primary/50"
                          placeholder="Optional"
                      />
                  </div>
                  <div>
                      <label className="text-xs text-muted-foreground block mb-1">LINK</label>
                      <input 
                          value={link} onChange={e => setLink(e.target.value)} 
                          className="w-full bg-background border border-border text-primary p-2 rounded outline-none focus:border-primary/50"
                          placeholder="https://..."
                          required
                      />
                  </div>

                  <button type="submit" className="bg-primary text-background font-bold py-2 rounded mt-4 hover:bg-primary/90 flex justify-center items-center gap-2 transition-all">
                      <Save className="w-4 h-4" /> SAVE ENTRY
                  </button>
              </form>
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-6 w-full font-mono hacker-theme">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            READING LIST
        </h2>
        <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded border border-border transition-colors text-sm font-bold"
        >
            <Plus className="w-4 h-4" />
            NEW ENTRY
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
            <div key={item.id} className="border border-border p-4 rounded bg-muted/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors hover:border-primary/30">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${item.type === 'Paper' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                            {item.type.toUpperCase()}
                        </span>
                        <h3 className="font-bold text-primary truncate">{item.title}</h3>
                    </div>
                    <div className="text-xs text-muted-foreground pl-1">
                        {item.authors} • <span className="opacity-50">{item.category}</span>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <a href={item.link} target="_blank" rel="noreferrer" className="p-2 border border-border rounded hover:bg-primary/10 text-primary transition-colors" title="Open Link">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => handleEdit(item)} className="p-2 border border-border rounded hover:bg-primary/10 text-primary transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 border border-red-500/20 rounded hover:bg-red-500/10 text-red-500 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ))}
         {items.length === 0 && (
            <div className="text-muted-foreground italic text-center py-12 border border-border rounded border-dashed">
                ARCHIVES EMPTY
            </div>
        )}
      </div>
    </div>
  );
}
