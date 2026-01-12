"use client";

export const dynamic = 'force-dynamic';
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

export default function LearningPage() {
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
        <div className="font-mono text-foreground max-w-3xl mx-auto">
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
                <span className="text-foreground">Learning</span>
            </div>
            </motion.div>

            {/* Header */}
            <motion.div variants={item} className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Learning</h1>
            <p className="text-muted-foreground leading-relaxed">
                A collection of my learning: weekly reflections, materials I use, and more.
            </p>
            </motion.div>

            {/* Links Section */}
            <motion.div variants={item} className="flex flex-col gap-4">
                <Link 
                    href="/learning/weekly-reflections"
                    className="text-lg font-bold underline underline-offset-4 decoration-2 decoration-foreground/30 hover:decoration-foreground transition-all w-fit"
                >
                    Weekly Reflections
                </Link>
            </motion.div>

            {/* Footer Navigation */}
            <motion.div variants={item} className="flex justify-center pt-20 pb-16">
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
