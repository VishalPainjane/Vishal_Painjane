"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { Loader2, Save, Image as ImageIcon, Eye, Edit3, Type, X, Monitor, Columns, Send, ShieldCheck, Upload } from "lucide-react";
import { MarkdownRenderer } from "../markdown-renderer";
import "easymde/dist/easymde.min.css";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-green-900/10 animate-pulse rounded border border-green-500/30 flex items-center justify-center text-xs opacity-50 tracking-widest">INITIALIZING NEURAL LINK...</div>
});

interface BlogPostEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialPublished?: boolean;
  initialExcerpt?: string;
  initialCoverImage?: string;
  onSubmit: (data: { title: string; content: string; published: boolean; excerpt?: string; coverImage?: string }) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export function BlogPostEditor({
  initialTitle = "",
  initialContent = "",
  initialPublished = false,
  initialExcerpt = "",
  initialCoverImage = "",
  onSubmit,
  onCancel,
  isEditing = false,
}: BlogPostEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [coverImage, setCoverImage] = useState(initialCoverImage);
  const [published, setPublished] = useState(initialPublished);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("edit");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setCoverImage(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ title, content, published, excerpt, coverImage });
    setLoading(false);
  };

  const options = useMemo(() => {
    return {
      spellChecker: false,
      maxHeight: "600px",
      placeholder: "DECRYPT YOUR THOUGHTS INTO MARKDOWN...",
      status: false,
      toolbar: [
        "bold", "italic", "heading", "|",
        "quote", "code", "unordered-list", "ordered-list", "|",
        "link", "image", "table", "|",
        "fullscreen", "|",
        "guide"
      ],
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 hacker-theme">
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-4">
            <button 
                onClick={onCancel}
                className="p-2 hover:bg-red-500/10 rounded-full transition-colors text-red-500/50 hover:text-red-500"
            >
                <X className="w-5 h-5" />
            </button>
            <div>
                <h2 className="text-xl font-black text-primary flex items-center gap-2 tracking-tight uppercase">
                    {isEditing ? "Modify Intel" : "Initialize Broadcast"}
                </h2>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
                    <span>Archives</span>
                    <span className="opacity-20">/</span>
                    <span className="text-primary/50">{title || "Untitled"}</span>
                </div>
            </div>
        </div>
        
        <div className="flex items-center gap-2 bg-muted/20 border border-border p-1 rounded-xl">
            <button 
                onClick={() => setViewMode("edit")}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 transition-all ${viewMode === 'edit' ? 'bg-primary text-background shadow-lg' : 'text-primary/40 hover:text-primary'}`}
            >
                <Edit3 className="w-3 h-3" /> Write
            </button>
            <button 
                onClick={() => setViewMode("preview")}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-primary text-background shadow-lg' : 'text-primary/40 hover:text-primary'}`}
            >
                <Monitor className="w-3 h-3" /> Preview
            </button>
            <button 
                onClick={() => setViewMode("split")}
                className={`hidden lg:flex px-4 py-2 rounded-lg text-[10px] font-black uppercase items-center gap-2 transition-all ${viewMode === 'split' ? 'bg-primary text-background shadow-lg' : 'text-primary/40 hover:text-primary'}`}
            >
                <Columns className="w-3 h-3" /> Split
            </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-40 lg:pb-32">
        {/* Input Column */}
        <div className={`${viewMode === 'preview' ? 'hidden' : viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-8'} flex flex-col gap-8`}>
            <div className="grid gap-6">
                <div className="group">
                    <label className="text-[10px] font-black text-primary/30 mb-2 flex items-center gap-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                        <Type className="w-3 h-3"/> Core_Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-muted/10 border border-border text-primary p-4 rounded-xl outline-none focus:border-primary/50 focus:bg-background transition-all font-black text-xl md:text-2xl placeholder:text-primary/10"
                        placeholder="IDENTIFY TRANSMISSION..."
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] font-black text-primary/30 flex items-center gap-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                                <ImageIcon className="w-3 h-3"/> Visual_Overlay (URL)
                            </label>
                            <label className="cursor-pointer text-[9px] text-primary/40 hover:text-primary flex items-center gap-1 uppercase transition-all">
                                {uploading ? <Loader2 className="w-2 h-2 animate-spin" /> : <Upload className="w-2 h-2" />}
                                Upload
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                            </label>
                        </div>
                        <input
                            type="text"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="w-full bg-muted/10 border border-border text-primary p-3 rounded-xl outline-none focus:border-primary/50 focus:bg-background transition-all text-sm placeholder:text-primary/10"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>
                    <div className="group flex flex-col justify-end">
                        <label className="text-[10px] font-black text-primary/30 mb-2 flex items-center gap-2 uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3"/> Distribution_Status
                        </label>
                        <div 
                            onClick={() => setPublished(!published)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${published ? 'bg-primary/10 border-primary text-primary' : 'bg-muted/10 border-border text-primary/30 hover:border-primary/30'}`}
                        >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${published ? 'bg-primary border-primary' : 'border-current'}`}>
                                {published && <div className="w-2 h-2 bg-background rounded-sm" />}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Broadcast Live</span>
                        </div>
                    </div>
                </div>

                <div className="group">
                    <label className="text-[10px] font-black text-primary/30 mb-2 flex items-center gap-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                        Summary_Excerpt
                    </label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full bg-muted/10 border border-border text-primary p-3 rounded-xl outline-none focus:border-primary/50 focus:bg-background transition-all text-sm h-24 placeholder:text-primary/10 resize-none"
                        placeholder="Brief summary for archives..."
                    />
                </div>
            </div>

            <div className="group mt-2">
                <label className="text-[10px] font-black text-primary/30 mb-2 flex items-center gap-2 uppercase tracking-widest group-focus-within:text-primary transition-colors">
                    Content_Payload
                </label>
                <div className="rounded-xl overflow-hidden border border-border focus-within:border-primary/30 transition-all bg-muted/5">
                    <SimpleMdeReact
                        value={content}
                        onChange={setContent}
                        options={options as any}
                    />
                </div>
            </div>
        </div>

        {/* Preview Column */}
        <div className={`${viewMode === 'edit' ? 'hidden' : viewMode === 'split' ? 'lg:col-span-6' : 'lg:col-span-12'} animate-in fade-in duration-500`}>
            <div className="sticky top-20 rounded-2xl bg-background border border-border shadow-2xl overflow-hidden">
                <div className="bg-muted/30 px-4 md:px-6 py-3 border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20"></div>
                        </div>
                        <span className="text-[9px] font-black text-muted-foreground tracking-[0.2em] uppercase text-primary">Simulated_View</span>
                    </div>
                </div>
                <div className="p-4 md:p-10 max-h-[70vh] lg:max-h-[85vh] overflow-y-auto bg-background scrollbar-thin scrollbar-thumb-muted border-border scrollbar-track-transparent">
                    <div className="text-foreground max-w-2xl mx-auto">
                        <article>
                            <header className="mb-10 border-b border-border pb-8">
                                {coverImage && (
                                    <div className="aspect-[21/9] w-full mb-8 rounded-xl overflow-hidden border border-border">
                                        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                                    {title || "UNTITLED_TRANSMISSION"}
                                </h1>
                                <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                                    <span>{new Date().toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span className="text-muted-foreground/50 lowercase italic truncate">/{title.toLowerCase().replace(/\s+/g, '-')}</span>
                                </div>
                            </header>
                            <MarkdownRenderer content={content || "*Awaiting data transmission...*"} />
                        </article>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-6 inset-x-6 md:inset-x-auto md:bottom-10 md:right-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 z-[60]">
            <button
                type="button"
                onClick={onCancel}
                className="group flex items-center justify-center gap-3 bg-background/80 backdrop-blur-xl border border-red-500/20 text-red-500/50 hover:text-red-500 hover:border-red-500/50 px-6 py-4 rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-widest shadow-2xl"
            >
                Terminate
            </button>
            <button
                type="submit"
                disabled={loading}
                className="group flex items-center justify-center gap-3 bg-primary text-background px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
            >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                {loading ? "Processing..." : (isEditing ? "Patch Intel" : "Broadcast Intel")}
            </button>
        </div>
      </form>

      <style jsx global>{`
        .EasyMDEContainer .CodeMirror {
            background-color: transparent !important;
            color: hsl(var(--primary)) !important;
            border: none !important;
            font-family: 'IBM Plex Mono', monospace !important;
            padding: 20px;
            font-size: 14px;
            line-height: 1.6;
        }
        .EasyMDEContainer .editor-toolbar {
            background-color: hsl(var(--muted) / 0.5) !important;
            border: none !important;
            border-bottom: 1px solid hsl(var(--border)) !important;
            padding: 8px 15px;
        }
        .EasyMDEContainer .editor-toolbar button {
            color: hsl(var(--primary)) !important;
            opacity: 0.4;
            border-radius: 6px;
            margin: 0 2px;
        }
        .EasyMDEContainer .editor-toolbar button:hover,
        .EasyMDEContainer .editor-toolbar button.active {
            opacity: 1;
            background: hsl(var(--primary) / 0.1) !important;
        }
        .CodeMirror-cursor {
            border-left: 2px solid hsl(var(--primary)) !important;
        }
        .editor-preview-active-side {
            display: none !important;
        }
      `}</style>
    </div>
  );
}
