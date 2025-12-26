"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Code, Save, X } from "lucide-react";

interface Technology {
  id: string;
  name: string;
  icon: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  links: string; // JSON
  technologies: Technology[];
}

interface ProjectManagerProps {
  onUpdate?: () => void;
}

export function ProjectManager({ onUpdate }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allTechs, setAllTechs] = useState<Technology[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState<{label: string, href: string}[]>([{ label: "github", href: "" }]);
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
    fetchTechs();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const fetchTechs = async () => {
    try {
        const res = await fetch("/api/technologies");
        if (res.ok) {
            const data = await res.json();
            setAllTechs(data);
        }
    } catch (error) {
        console.error("Failed to fetch technologies", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLinks([{ label: "github", href: "" }]);
    setSelectedTechIds([]);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (project: Project) => {
    setTitle(project.title);
    setDescription(project.description);
    try {
        setLinks(JSON.parse(project.links));
    } catch (e) {
        setLinks([]);
    }
    setSelectedTechIds(project.technologies.map(t => t.id));
    setEditingId(project.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanLinks = links.filter(l => l.label && l.href);

    const payload = {
        title,
        description,
        links: cleanLinks,
        techIds: selectedTechIds
    };

    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        fetchProjects();
        resetForm();
        if (onUpdate) onUpdate();
    } else {
        alert("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm deletion?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
        fetchProjects();
        if (onUpdate) onUpdate();
    } else {
        alert("Deletion failed");
    }
  };

  // Helper for dynamic inputs
  const addLink = () => setLinks([...links, { label: "", href: "" }]);
  const removeLink = (idx: number) => setLinks(links.filter((_, i) => i !== idx));
  const updateLink = (idx: number, field: 'label' | 'href', value: string) => {
      const newLinks = [...links];
      newLinks[idx][field] = value;
      setLinks(newLinks);
  };

  const toggleTech = (id: string) => {
      if (selectedTechIds.includes(id)) {
          setSelectedTechIds(selectedTechIds.filter(tid => tid !== id));
      } else {
          setSelectedTechIds([...selectedTechIds, id]);
      }
  };

  if (isEditing) {
      return (
          <div className="border border-border p-6 rounded bg-muted/10 font-mono hacker-theme">
              <div className="flex justify-between items-center mb-6 border-b border-border pb-2">
                  <h3 className="text-lg font-bold text-primary">{editingId ? "EDIT PROJECT" : "NEW PROJECT"}</h3>
                  <button onClick={resetForm} className="text-red-500 hover:text-red-400 transition-colors">
                      <X className="w-5 h-5" />
                  </button>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                      <label className="text-xs text-muted-foreground block mb-1">TITLE</label>
                      <input 
                          value={title} onChange={e => setTitle(e.target.value)} 
                          className="w-full bg-background border border-border text-primary p-2 rounded outline-none focus:border-primary/50"
                          required
                      />
                  </div>
                  <div>
                      <label className="text-xs text-muted-foreground block mb-1">DESCRIPTION</label>
                      <textarea 
                          value={description} onChange={e => setDescription(e.target.value)} 
                          className="w-full bg-background border border-border text-primary p-2 rounded h-24 outline-none focus:border-primary/50"
                          required
                      />
                  </div>
                  
                  {/* Links Section */}
                  <div>
                      <label className="text-xs text-muted-foreground block mb-1">LINKS</label>
                      {links.map((link, i) => (
                          <div key={i} className="flex gap-2 mb-2">
                              <input 
                                  placeholder="Label" 
                                  value={link.label} onChange={e => updateLink(i, 'label', e.target.value)}
                                  className="bg-background border border-border text-primary p-2 rounded w-1/3 text-xs outline-none focus:border-primary/50"
                              />
                              <input 
                                  placeholder="URL" 
                                  value={link.href} onChange={e => updateLink(i, 'href', e.target.value)}
                                  className="bg-background border border-border text-primary p-2 rounded flex-1 text-xs outline-none focus:border-primary/50"
                              />
                              <button type="button" onClick={() => removeLink(i)} className="text-red-500 p-2 hover:text-red-400 transition-colors"><X className="w-4 h-4"/></button>
                          </div>
                      ))}
                      <button type="button" onClick={addLink} className="text-xs text-primary hover:underline transition-all">+ ADD LINK</button>
                  </div>

                  {/* Tech Stack Selection */}
                  <div>
                      <label className="text-xs text-muted-foreground block mb-2">STACK</label>
                      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-border rounded">
                        {allTechs.map((tech) => (
                            <button
                                key={tech.id}
                                type="button"
                                onClick={() => toggleTech(tech.id)}
                                className={`text-xs px-2 py-1 rounded border transition-all flex items-center gap-1 ${
                                    selectedTechIds.includes(tech.id) 
                                    ? "bg-primary text-background border-primary font-bold shadow-[0_0_10px_hsl(var(--primary)/0.2)]" 
                                    : "bg-transparent text-primary/40 border-border hover:border-primary/30"
                                }`}
                            >
                                {tech.name}
                            </button>
                        ))}
                         {allTechs.length === 0 && <span className="text-xs text-muted-foreground italic">No stacks defined. Go to 'STACK' tab.</span>}
                      </div>
                  </div>

                  <button type="submit" className="bg-primary text-background font-bold py-2 rounded mt-4 hover:bg-primary/90 flex justify-center items-center gap-2 transition-all">
                      <Save className="w-4 h-4" /> SAVE PROJECT
                  </button>
              </form>
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-6 w-full font-mono hacker-theme">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Code className="w-5 h-5" />
            PROJECTS
        </h2>
        <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded border border-border transition-colors text-sm font-bold"
        >
            <Plus className="w-4 h-4" />
            NEW PROJECT
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
            <div key={project.id} className="border border-border p-4 rounded bg-muted/10 flex flex-col justify-between gap-4 hover:border-primary/30 transition-colors">
                <div>
                    <h3 className="font-bold text-primary text-lg">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map(t => (
                            <span key={t.id} className="text-[10px] bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded text-primary flex items-center gap-1">
                                {t.name}
                            </span>
                        ))}
                    </div>
                </div>
                
                <div className="flex gap-2 justify-end border-t border-border pt-2 mt-2">
                    <button onClick={() => handleEdit(project)} className="text-primary/60 hover:text-primary transition-colors"><Edit2 className="w-4 h-4"/></button>
                    <button onClick={() => handleDelete(project.id)} className="text-red-500/60 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                </div>
            </div>
        ))}
         {projects.length === 0 && (
            <div className="text-muted-foreground italic text-center py-12 border border-border rounded border-dashed">
                NO PROJECTS DEPLOYED
            </div>
        )}
      </div>
    </div>
  );
}