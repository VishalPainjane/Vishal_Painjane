"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/page-layout";

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

export default function AboutPage() {
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
    <PageLayout>
        <div className="font-mono text-foreground max-w-3xl mx-auto mb-20">
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
                <span className="text-foreground">About</span>
            </div>
            </motion.div>

            {/* Content */}
            <motion.article variants={item} className="prose-custom">
            <h1 className="text-3xl font-bold tracking-tight mb-8">My Novice Journey&apos;s Monologue</h1>
            
            <p>
                Curiosity has always been the starting point. Things are rarely accepted as they are. Learning happens by experimenting, breaking things, and understanding why they work.
            </p>
            <p>
                There was no fixed roadmap. Just <strong>consistent</strong> effort. When something feels interesting an algorithm or an ML concept the focus stays until the basics are clear.
            </p>
            <p>
                Problem-solving became a strong habit. Practicing hundreds of algorithmic questions helped build logical thinking. Over time, it became clear that solving problems only on platforms isn’t enough.
            </p>
            <p>
                Moving beyond theory. Turning logic into real systems through projects, AI experiments, and problem solving that actually matters.
            </p>
            
            <h2 className="text-xl font-bold mt-12 mb-6">The Graph</h2>
            <p className="mb-4">
                If I were to visualize my progression on a horizontal axis:
            </p>
            
            <div className="border border-border/50 rounded-md p-6 bg-[#0a0a0a] font-mono text-sm shadow-sm">
                <ul className="list-none space-y-4 m-0 p-0">
                    <li className="flex items-start gap-3">
                        <span className="text-red-400 font-bold min-w-[120px]">- Abstract Solver:</span>
                        <span className="text-muted-foreground">Solving problems purely for the challenge</span>
                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary font-bold min-w-[120px]">+ Applied Architect:</span>
                                        <span className="text-muted-foreground">Channeling that logic into tangible systems</span>
                                    </li>                </ul>
            </div>
            
            <p className="mt-8">
                The success so far is a mix of that initial hustle and a stubborn curiosity. The experiments are starting to converge, and it feels like the real work is just beginning.
            </p>
            </motion.article>

            {/* Footer Navigation */}
            <motion.div variants={item} className="flex justify-center pt-8 border-t border-border/40">
            <Link 
                href="/" 
                className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))/80] transition-colors font-medium hover:underline underline-offset-4"
            >
                Home Page
            </Link>
            </motion.div>
        </motion.div>
        </div>
    </PageLayout>
  );
}