import { getCachedProjects, getCachedTechnologies } from "@/lib/cached-data";
import { ProjectList } from "@/components/project-list";
import { PageLayout } from "@/components/page-layout";

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, technologies] = await Promise.all([
    getCachedProjects(),
    getCachedTechnologies()
  ]);

  return (
    <PageLayout>
        <ProjectList projects={projects} /> 
        
        <div className="font-mono text-foreground max-w-3xl mx-auto mb-24 -mt-12 px-0">
             <div className="space-y-6 pt-8 border-t border-border/40">
                <h2 className="text-2xl font-bold tracking-tight">Technologies</h2>
                <div className="flex flex-wrap gap-3">
                    {technologies.map((tech) => (
                        <div key={tech.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#121212] border border-[#27272a] text-xs font-medium text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-colors cursor-default">
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-primary" dangerouslySetInnerHTML={{ __html: tech.icon.startsWith('<svg') ? tech.icon : `<img src="${tech.icon}" class="w-full h-full" />` }} />
                             {tech.name}
                        </div>
                    ))}
                    {technologies.length === 0 && (
                        <span className="text-muted-foreground text-sm">
                            No technologies listed yet.
                        </span>
                    )}
                </div>
            </div>
        </div>
    </PageLayout>
  );
}
