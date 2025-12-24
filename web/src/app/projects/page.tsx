"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Icons (SVG Components) ---

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#3776AB]">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-2.91l.01-.09.09-.37.15-.35.2-.33.25-.3.3-.26.33-.21.36-.17.38-.11.38-.07.38-.02h.16l.33.02zM7.16 1.83c-.15 0-.28.05-.38.16-.11.1-.16.23-.16.38 0 .14.05.27.16.38.1.1.23.16.38.16.14 0 .27-.05.37-.16.11-.1.17-.23.17-.38 0-.15-.06-.28-.17-.38-.1-.11-.23-.16-.37-.16zM12.7 8.08c.15 0 .28.06.38.17.11.1.16.23.16.38 0 .15-.05.28-.16.38-.1.11-.23.16-.38.16-.14 0-.27-.05-.38-.16-.11-.1-.16-.23-.16-.38 0-.15.05-.28.16-.38.11-.11.24-.17.38-.17zM22.25 6.32l.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02h-.16l-.06-.01h-8.16v2.91l-.01.09-.09.37-.15.35-.2.33-.25.3-.3.26-.33.21-.36.17-.38.11-.38.07-.38.02h-.16l-.33-.02-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02h4.47l.7-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21V6.07h2.09l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88z" />
  </svg>
);

const FastAPIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#009688]">
    <path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.25l8.25 4.71v9.42L12 21.09 3.75 16.38V6.96L12 2.25z" />
  </svg>
);

const HuggingFaceIcon = () => (
    <span className="text-sm">🤗</span>
)

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#2496ED]">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.119a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V3.574a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V3.574a.185.185 0 00-.186-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V6.29a.185.185 0 00-.186-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.929 0h2.119a.185.185 0 00.185-.185V6.29a.185.185 0 00-.186-.185H2.207a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.93 0h2.12a.185.185 0 00.184-.185V6.29a.185.185 0 00-.185-.185H-.723a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M14.17 12h2.118a.185.185 0 00.186-.186v-1.888a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186m-2.93 0h2.12a.185.185 0 00.184-.186v-1.888a.185.185 0 00-.185-.185h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.186.185.186m-2.93 0h2.119a.185.185 0 00.185-.186v-1.888a.186.186 0 00-.186-.185h-2.119a.186.186 0 00-.185.185v1.888c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186v-1.888a.186.186 0 00-.186-.185H5.346a.186.186 0 00-.186.185v1.888c0 .102.084.186.186.186m-2.93 0h2.12a.185.185 0 00.184-.186v-1.888a.185.185 0 00-.185-.185H2.417a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186M-.514 12h2.119a.186.186 0 00.185-.186v-1.888a.186.186 0 00-.185-.185h-2.119a.186.186 0 00-.186.185v1.888c0 .102.084.186.186.186m23.102 5.093c-.927-.373-1.928-.582-2.983-.582h-.01c-1.055 0-2.056.209-2.983.582-1.636.657-3.05 1.706-4.14 3.033a.187.187 0 01-.284 0c-1.09-1.327-2.505-2.376-4.14-3.033a7.86 7.86 0 00-2.983-.582h-.01c-1.055 0-2.056.209-2.983.582-1.636.657-3.05 1.706-4.14 3.033a.187.187 0 01-.144.068.188.188 0 01-.145-.068A8.026 8.026 0 010 14.532c0-2.584 1.258-4.88 3.195-6.28a.187.187 0 01.185-.021c.539.263 1.134.42 1.764.42h.01c.63 0 1.225-.157 1.764-.42a.187.187 0 01.185.021 7.74 7.74 0 003.195 6.28c.41.298.847.56 1.306.782.46-.222.896-.484 1.306-.782a7.74 7.74 0 003.195-6.28.187.187 0 01.185-.021c.539.263 1.134.42 1.764.42h.01c.63 0 1.225-.157 1.764-.42a.187.187 0 01.185.021A8.026 8.026 0 0124 14.532c0 2.584-1.258 4.88-3.195 6.28a.188.188 0 01-.289 0 7.994 7.994 0 01-4.14-3.033z" />
  </svg>
);

const GCPIcon = () => (
    <span className="text-sm">☁️</span>
)

const NextJSIcon = () => (
    <svg viewBox="0 0 180 180" fill="currentColor" className="w-3.5 h-3.5 text-foreground">
        <mask height="180" id="mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{maskType:"alpha"}}><circle cx="90" cy="90" fill="black" r="90"/></mask><g mask="url(#mask0_408_134)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90" stroke="white" strokeWidth="6px"/><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white"/><path d="M115 54C115 54 117.96 56.25 119.479 58.102C120.998 59.9539 127 125.97 127 125.97H114.971L115 54Z" fill="white"/></g>
    </svg>
)

const AWSIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#FF9900]">
     <path d="M17.8 14.7c-.5-1-1.3-1.6-2.5-1.6-1.5 0-2.3 1-2.3 2.7 0 1.5.8 2.5 2.2 2.5 1.1 0 1.9-.6 2.4-1.6.1-.2.4-.2.5-.1l.9.6c.2.1.2.4.1.6-1 1.7-2.6 2.5-4.2 2.5-2.7 0-4.6-2-4.6-5 0-2.8 2-5 4.9-5 2.4 0 4.2 1.5 4.7 3.9.1.3-.1.5-.4.5h-1.3c-.2 0-.4-.2-.5-.4zM7.3 12.3c0 .3-.3.5-.6.5H5.4c-.3 0-.5-.3-.5-.6V8.6h-.1c-.3.6-.6 1.3-1 1.9-.6.9-1.2 1.8-1.9 2.6-.2.2-.4.3-.7.3H.6c-.3 0-.5-.2-.3-.5l2.6-3.7-2.3-3.8c-.2-.2 0-.5.3-.5h1.3c.3 0 .5.2.6.4.5.8 1 1.6 1.5 2.5h.1V5.4c0-.3.3-.5.6-.5H6c.3 0 .6.3.6.6v6.8zm11 5.5c-2.4 1.7-6 1.8-9.2.6-.4-.1-.4-.7 0-.8.9-.3 1.9-.4 2.9-.4 2.8 0 4.8 1.1 6.3 1.9.3.2.3.6 0 .7z"/>
  </svg>
)

const PostgresIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#336791]">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S16.627 0 12 0zm0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z"/>
  </svg>
)

const TSIcon = () => (
    <span className="text-sm font-bold text-[#3178C6] bg-white rounded-sm px-[2px]">TS</span>
)

const BunIcon = () => (
    <span className="text-sm">🍞</span>
)

const CppIcon = () => (
   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#00599C]">
    <path d="M22.5 12.75h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5a.75.75 0 011.5 0v1.5h1.5a.75.75 0 010 1.5M17.25 12a.75.75 0 01-.75.75h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5a.75.75 0 011.5 0v1.5h1.5a.75.75 0 010 1.5M9.986 6.975a.75.75 0 01.378 1.034 4.502 4.502 0 000 8.982.75.75 0 11-.53 1.403 6.002 6.002 0 010-11.797.75.75 0 01.152.378"/>
   </svg>
)

const PyTorchIcon = () => (
   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#EE4C2C]">
     <path d="M12 0L2.25 4.5v15L12 24l9.75-4.5v-15L12 0z"/>
   </svg>
)

const KerasIcon = () => (
    <span className="text-sm text-[#D00000] font-bold">K</span>
)

const ReactIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#61DAFB]">
        <circle cx="12" cy="12" r="2" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5" />
            <ellipse rx="10" ry="4.5" transform="rotate(60 12 12)" />
            <ellipse rx="10" ry="4.5" transform="rotate(120 12 12)" />
        </g>
    </svg>
)

const GitIcon = () => (
   <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#F05032]">
    <path d="M2.6 10.6a.8.8 0 000 1.1l8.1 8.1a.8.8 0 001.1 0l9.6-9.6a.8.8 0 000-1.1L12.9.6a.8.8 0 00-1.1 0L2.6 10.6zM12.4 2l8.5 8.5-9.1 9.1-8.5-8.5L12.4 2zM12.4 4.7a.8.8 0 100 1.5.8.8 0 000-1.5z"/>
   </svg>
)

const GeminiIcon = () => (
    <span className="text-sm text-[#4E88FF]">✨</span>
)

const ClaudeIcon = () => (
    <span className="text-sm text-[#D97757]">✴️</span>
)


// --- Data ---

const projects = [
  {
    title: "Facet: Gemma Finetuner",
    links: [{ label: "github", href: "#" }],
    description: "An end-to-end platform that lets users preprocess datasets, fine-tune Gemma models, run inference, and export them in GGUF format, making model training and deployment simple and accessible.",
    tech: [
        { name: "Python", icon: PythonIcon },
        { name: "FastAPI", icon: FastAPIIcon },
        { name: "Hugging Face", icon: HuggingFaceIcon },
        { name: "Docker", icon: DockerIcon },
        { name: "GCP", icon: GCPIcon },
        { name: "Next.js", icon: NextJSIcon },
    ]
  },
  {
    title: "Anon: Anonymous social media forum",
    links: [{ label: "github", href: "#" }, { label: "demo", href: "#" }],
    description: "Anon Forum is a fully anonymous social platform for college students that enables posting, deleting, upvoting via an optimistic UI, and ensures anonymity through college verification with no personal data storage.",
    tech: [
        { name: "Next.js", icon: NextJSIcon },
        { name: "FastAPI", icon: FastAPIIcon },
        { name: "AWS", icon: AWSIcon },
        { name: "PostgreSQL", icon: PostgresIcon },
        { name: "TypeScript", icon: TSIcon },
        { name: "Bun", icon: BunIcon },
    ]
  },
  {
    title: "Inclinet: Neural network library",
    links: [{ label: "github", href: "#" }],
    description: "Built a neural network library from scratch in Python with PyTorch-like APIs, supporting multiple activation functions, losses, and optimizers, designed using OOP principles for clarity, flexibility, and maintainability.",
    tech: [
        { name: "Python", icon: PythonIcon },
    ]
  },
  {
    title: "Incligrad: Autograd engine in C++",
    links: [{ label: "github", href: "#" }],
    description: "Implemented a PyTorch-like autograd library in C++ from scratch, including full backpropagation logic, enabling gradient-based learning without relying on existing frameworks.",
    tech: [
        { name: "C++", icon: CppIcon },
    ]
  }
];

const allTechnologies = [
    { name: "Python", icon: PythonIcon },
    { name: "PyTorch", icon: PyTorchIcon },
    { name: "Keras", icon: KerasIcon },
    { name: "Hugging Face", icon: HuggingFaceIcon },
    { name: "C++", icon: CppIcon },
    { name: "React.js", icon: ReactIcon },
    { name: "Next.js", icon: NextJSIcon },
    { name: "TypeScript", icon: TSIcon },
    { name: "Bun", icon: BunIcon },
    { name: "FastAPI", icon: FastAPIIcon },
    { name: "PostgreSQL", icon: PostgresIcon },
    { name: "Git", icon: GitIcon },
    { name: "AWS", icon: AWSIcon },
    { name: "GCP", icon: GCPIcon },
    { name: "Docker", icon: DockerIcon },
    { name: "Gemini", icon: GeminiIcon },
    { name: "Claude", icon: ClaudeIcon },
];

function SmallAlienIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[hsl(var(--primary))]"
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

// --- Components ---

function TechBadge({ name, Icon }: { name: string, Icon: React.FC }) {
    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#121212] border border-[#27272a] text-xs font-medium text-foreground/80 hover:text-foreground hover:border-foreground/50 transition-colors cursor-default">
            <Icon />
            {name}
        </span>
    )
}

export default function ProjectsPage() {
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
          {projects.map((project) => (
            <motion.div 
              key={project.title} 
              variants={item}
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                 <h2 className="text-xl font-bold text-foreground">
                    {project.title}
                 </h2>
                 <div className="flex gap-4">
                    {project.links.map(link => (
                        <Link 
                            key={link.label} 
                            href={link.href}
                            className="flex items-center gap-1 text-sm text-foreground/60 hover:text-[hsl(var(--primary))] transition-colors"
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
                 {project.tech.map((tech) => (
                     <TechBadge key={tech.name} name={tech.name} Icon={tech.icon} />
                 ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies Section */}
        <motion.div variants={item} className="space-y-6 pt-8 border-t border-border/40">
            <h2 className="text-2xl font-bold tracking-tight">Technologies</h2>
            <div className="flex flex-wrap gap-3">
                {allTechnologies.map((tech) => (
                    <TechBadge key={tech.name} name={tech.name} Icon={tech.icon} />
                ))}
            </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div variants={item} className="flex justify-center pt-8">
          <Link 
            href="/" 
            className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/80] transition-colors font-medium hover:underline underline-offset-4"
          >
            Home Page
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
