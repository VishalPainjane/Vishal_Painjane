"use client";

import { useState, useEffect } from "react";
import { BlogPostEditor } from "./blog-post-editor";
import { Edit2, Trash2, Plus, FileText, CheckCircle, XCircle, Calendar, Image as ImageIcon } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
}

interface BlogManagerProps {
  onUpdate?: () => void;
}

export function BlogManager({ onUpdate }: BlogManagerProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  const handleCreate = async (data: any) => {
    try {
        const res = await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setIsCreating(false);
            fetchPosts();
            if (onUpdate) onUpdate();
        } else {
            alert("Failed to create post");
        }
    } catch (error) {
        console.error("Error creating post", error);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingPost) return;
    try {
        const res = await fetch(`/api/blog/${editingPost.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setEditingPost(null);
            fetchPosts();
            if (onUpdate) onUpdate();
        } else {
            alert("Failed to update post");
        }
    } catch (error) {
        console.error("Error updating post", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm data deletion? Sector 7 will be purged.")) return;
    try {
        const res = await fetch(`/api/blog/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            fetchPosts();
            if (onUpdate) onUpdate();
        } else {
            alert("Failed to delete post");
        }
    } catch (error) {
        console.error("Error deleting post", error);
    }
  };

  if (isCreating) {
    return (
        <BlogPostEditor
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
        />
    );
  }

  if (editingPost) {
    return (
        <BlogPostEditor
            initialTitle={editingPost.title}
            initialContent={editingPost.content}
            initialPublished={editingPost.published}
            initialExcerpt={editingPost.excerpt || ""}
            initialCoverImage={editingPost.coverImage || ""}
            isEditing={true}
            onSubmit={handleUpdate}
            onCancel={() => setEditingPost(null)}
        />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full font-mono hacker-theme">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2 tracking-tighter uppercase">
            <FileText className="w-5 h-5" />
            Blog_Archives
        </h2>
        <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-xl border border-border transition-all text-[10px] font-black uppercase tracking-widest"
        >
            <Plus className="w-4 h-4" />
            New_Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
            <div key={post.id} className="border border-border p-5 rounded-2xl bg-muted/5 flex flex-col gap-4 group transition-all hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.05)]">
                {post.coverImage ? (
                    <div className="aspect-[21/9] w-full rounded-xl overflow-hidden border border-border grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img src={post.coverImage} className="w-full h-full object-cover" alt="" />
                    </div>
                ) : (
                    <div className="aspect-[21/9] w-full rounded-xl bg-muted/10 border border-dashed border-border flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-primary/20" />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-bold text-primary text-lg leading-tight truncate uppercase tracking-tight">{post.title}</h3>
                        <div className="shrink-0 pt-1">
                            {post.published ? (
                                <span className="text-[8px] bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1 font-black tracking-widest">
                                    <CheckCircle className="w-2 h-2" /> LIVE
                                </span>
                            ) : (
                                <span className="text-[8px] bg-yellow-500/10 text-yellow-500/70 px-2 py-0.5 rounded border border-yellow-500/20 flex items-center gap-1 font-black tracking-widest">
                                    <XCircle className="w-2 h-2" /> STAGING
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <p className="text-xs text-primary/50 line-clamp-2 mb-4 h-8 font-mono leading-relaxed">
                        {post.excerpt || post.content.replace(/[#*`]/g, "").slice(0, 100)}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <div className="flex items-center gap-3 text-[9px] text-muted-foreground font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 opacity-50" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingPost(post)}
                                className="p-2 border border-border rounded-lg hover:bg-primary/10 text-primary/60 hover:text-primary transition-all"
                                title="Edit"
                            >
                                <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="p-2 border border-border rounded-lg hover:bg-red-500/10 text-red-500/40 hover:text-red-500 transition-all"
                                title="Delete"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}

        {posts.length === 0 && (
            <div className="col-span-full text-muted-foreground italic text-center py-20 border border-border rounded-2xl border-dashed">
                ARCHIVES ARE EMPTY. START BROADCASTING.
            </div>
        )}
      </div>
    </div>
  );
}