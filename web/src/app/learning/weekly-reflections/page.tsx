"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

// Mock Data for Accordion
const reflections = [
  {
    month: "2025年2月",
    isOpen: true,
    weeks: [
      "Week 8, 2025 (Feb 17 - Feb 23)",
      "Week 7, 2025 (Feb 10 - Feb 16)",
      "Week 6, 2025 (Feb 3 - Feb 9)",
      "Week 5, 2025 (Jan 27 - Feb 2)"
    ]
  },
  {
    month: "2025年1月",
    isOpen: false,
    weeks: [
      "Week 4, 2025 (Jan 20 - Jan 26)",
      "Week 3, 2025 (Jan 13 - Jan 19)",
      "Week 2, 2025 (Jan 6 - Jan 12)",
      "Week 1, 2025 (Dec 30 - Jan 5)"
    ]
  }
];

function AccordionItem({ item }: { item: typeof reflections[0] }) {
  const [isOpen, setIsOpen] = useState(item.isOpen);

  return (
    <div className="border-b border-transparent">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left group"
      >
        <span className="text-[hsl(var(--primary))] font-bold text-lg group-hover:opacity-80 transition-opacity">
            {item.month}
        </span>
        {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="pb-6 pl-4 flex flex-col gap-4 text-muted-foreground/80 text-sm">
              {item.weeks.map((week, i) => (
                <div key={i} className="hover:text-foreground transition-colors cursor-pointer">
                    {week}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WeeklyReflectionsPage() {
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
            <Link href="/learning" className="hover:text-foreground transition-colors">Learning</Link>
            <span>/</span>
            <span className="text-foreground">Weekly Reflections</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div variants={item} className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Weekly Reflections</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            My attempt at documenting, reflecting on, and being grateful for what I learned each week in my pursuit of knowledge.
          </p>
        </motion.div>

        {/* Accordion List */}
        <motion.div variants={item} className="mt-4 flex flex-col gap-2">
            {reflections.map((group) => (
                <AccordionItem key={group.month} item={group} />
            ))}
        </motion.div>

        {/* Footer Navigation */}
        <motion.div variants={item} className="flex justify-center items-center gap-4 pt-20 pb-16 text-[hsl(var(--primary))] font-medium">
          <Link 
            href="/learning/weekly-reflections" 
            className="hover:text-[hsl(var(--primary))/80] transition-colors hover:underline underline-offset-4"
          >
            Reflections Page
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link 
            href="/" 
            className="hover:text-[hsl(var(--primary))/80] transition-colors hover:underline underline-offset-4"
          >
            Home Page
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
