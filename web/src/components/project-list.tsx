"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

interface ProjectListProps {
  projects: Project[];
}

function SmallAlienIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 8H4V6H6V4H8V2H16V4H18V6H20V8H22V14H20V16H18V18H16V20H14V22H10V20H8V18H6V16H4V14H2V8ZM6 8H4V14H6V16H8V18H10V20H14V18H16V16H18V14H20V8H18V6H16V4H8V6H6V8ZM8 10H10V12H8V10ZM14 10H16V12H14V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ProjectList({ projects }: ProjectListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="font-mono text-foreground max-w-3xl mx-auto mb-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-12"
      >
        {/* Breadcrumb */}
        <motion.div variants={item} className="flex items-center gap-3 text-sm text-muted-foreground">
          <SmallAlienIcon />
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Projects</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div variants={item} className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col gap-12">
          {projects.map((project) => {
            let links: {label: string, href: string}[] = [];
            try {
                links = JSON.parse(project.links);
            } catch (e) {}

            return (
                <motion.div 
                key={project.id} 
                variants={item}
                className="flex flex-col gap-3"
                >
                <div className="flex items-start justify-between flex-wrap gap-2">
                    <h2 className="text-xl font-bold text-foreground">
                        {project.title}
                    </h2>
                    <div className="flex gap-4">
                        {links.map(link => (
                            <Link 
                                key={link.label} 
                                href={link.href}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowUpRight className="w-4 h-4" />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech) => (
                        <div key={tech.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/20 border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors cursor-default">
                             <div className="w-3.5 h-3.5 flex items-center justify-center text-primary" dangerouslySetInnerHTML={{ __html: tech.icon.startsWith('<svg') ? tech.icon : `<img src="${tech.icon}" class="w-full h-full" />` }} />
                             {tech.name}
                        </div>
                    ))}
                </div>
                </motion.div>
            )
          })}
          
          {projects.length === 0 && (
             <motion.div variants={item} className="text-muted-foreground italic">
                No projects found.
             </motion.div>
          )}
        </div>

        {/* Footer Navigation */}
        <motion.div variants={item} className="flex justify-center pt-8">
          <Link 
            href="/" 
            className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline underline-offset-4"
          >
            Home Page
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}