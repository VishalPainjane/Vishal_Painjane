"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, Loader2, Save, X, Paperclip, Download } from "lucide-react";

interface PersonalFile {
  id: string;
  originalName: string;
  size: number;
  mimeType: string;
}

interface PersonalEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  attachments: PersonalFile[];
}

interface PersonalDataManagerProps {
  onUpdate?: () => void;
}

export function PersonalDataManager({ onUpdate }: PersonalDataManagerProps) {
  const [entries, setEntries] = useState<PersonalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/personal-data");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (error) {
      console.error("Failed to fetch personal data", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId ? `/api/personal-data/${editingId}` : "/api/personal-data";
    const method = editingId ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, category }),
        });

        if (res.ok) {
            const entry = await res.json();
            
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("entryId", entry.id);
                
                await fetch("/api/personal-data/files", {
                    method: "POST",
                    body: formData,
                });
            }

            resetForm();
            fetchEntries();
            if (onUpdate) onUpdate();
        } else {
            alert("OPERATION FAILED");
        }
    } catch (error) {
        alert("ERROR SUBMITTING DATA");
    }
    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("General");
    setEditingId(null);
    setSelectedFile(null);
  };

  const handleEdit = (entry: PersonalEntry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setCategory(entry.category);
    setEditingId(entry.id);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this secure entry?")) return;
    const res = await fetch(`/api/personal-data/${id}`, { method: "DELETE" });
    if (res.ok) {
        fetchEntries();
        if (onUpdate) onUpdate();
    }
  };

  const handleFileDelete = async (fileId: string) => {
    if (!confirm("Delete this attachment?")) return;
    const res = await fetch(`/api/personal-data/files/${fileId}`, { method: "DELETE" });
    if (res.ok) {
        fetchEntries();
        if (onUpdate) onUpdate();
    }
  };

  const handleDownload = (fileId: string, fileName: string) => {
    window.open(`/api/personal-data/files/${fileId}`, '_blank');
  };

  const getEntrySize = (entry: PersonalEntry) => {
    const textSize = new Blob([entry.content]).size;
    const attachmentSize = entry.attachments?.reduce((acc, file) => acc + file.size, 0) || 0;
    const total = textSize + attachmentSize;
    return formatBytes(total);
  };

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div className="w-full">
      <div className="mb-8 p-6 border border-green-500/30 bg-green-900/10 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          {editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {editingId ? "UPDATE SECURE ENTRY" : "NEW SECURE ENTRY"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="TITLE / KEY"
              className="bg-black border border-green-500/30 p-3 rounded text-green-500 focus:border-green-500 outline-none md:col-span-2"
              required
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="CATEGORY"
              className="bg-black border border-green-500/30 p-3 rounded text-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="SECURE DATA CONTENT..."
            className="bg-black border border-green-500/30 p-3 rounded text-green-500 focus:border-green-500 outline-none h-40 font-mono text-sm"
            required
          />
          
          <div className="flex items-center gap-4 border border-green-500/30 p-3 rounded border-dashed">
            <label className="cursor-pointer flex items-center gap-2 text-green-500 hover:text-green-400 text-sm">
                <Paperclip className="w-4 h-4" />
                {selectedFile ? selectedFile.name : "ATTACH FILE (PDF, IMG, ETC)"}
                <input 
                    type="file" 
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} 
                    className="hidden"
                />
            </label>
            {selectedFile && (
                <button type="button" onClick={() => setSelectedFile(null)} className="text-red-500">
                    <X className="w-4 h-4" />
                </button>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-black font-bold py-2 px-6 rounded hover:bg-green-500 transition-colors flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
              {editingId ? "SAVE CHANGES" : "ENCRYPT & STORE"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-red-900/20 text-red-500 border border-red-500/30 font-bold py-2 px-6 rounded hover:bg-red-900/40 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" /> CANCEL
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <div key={entry.id} className="border border-green-500/20 bg-black p-4 rounded hover:border-green-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-green-400 break-words">{entry.title}</h3>
                <span className="text-[10px] uppercase border border-green-500/20 px-2 py-0.5 rounded text-green-500/50">
                  {entry.category}
                </span>
              </div>
              <p className="text-sm text-green-500/70 whitespace-pre-wrap break-words max-h-40 overflow-y-auto mb-4 custom-scrollbar">
                {entry.content}
              </p>
              
              {entry.attachments && entry.attachments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-green-500/10 space-y-2">
                      <h4 className="text-xs text-green-500/50 font-bold mb-2">ATTACHMENTS</h4>
                      {entry.attachments.map(file => (
                          <div key={file.id} className="flex items-center justify-between text-xs bg-green-900/10 p-2 rounded border border-green-500/10">
                              <span className="truncate max-w-[120px] text-green-300" title={file.originalName}>{file.originalName}</span>
                              <div className="flex gap-2">
                                  <button onClick={() => handleDownload(file.id, file.originalName)} className="text-green-500 hover:text-white">
                                      <Download className="w-3 h-3" />
                                  </button>
                                  <button onClick={() => handleFileDelete(file.id)} className="text-red-500 hover:text-red-400">
                                      <Trash2 className="w-3 h-3" />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-green-500/10 mt-auto">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-green-500/30">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
                <span className="text-[9px] text-green-500/50 font-mono">
                  SIZE: {getEntrySize(entry)}
                </span>
              </div>
              <div className="flex gap-2"> {/* Removed opacity-0 group-hover:opacity-100 */}
                <button
                  onClick={() => handleEdit(entry)}
                  className="p-1.5 hover:bg-green-500/20 rounded text-green-400"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-1.5 hover:bg-red-500/20 rounded text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
