"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface WeekData {
  title: string;
  dateRange: string;
  content: string | null;
  slug: string;
}

interface ReflectionGroup {
  month: string;
  isOpen: boolean;
  weeks: WeekData[];
}

function ReflectionWeekItem({ week }: { week: WeekData }) {
  return (
    <div className="border-l border-primary/20 pl-4 ml-1 mb-2">
      <Link
        href={`/learning/weekly-reflections/${week.slug}`}
        className="text-left hover:text-primary transition-colors w-full py-1 flex items-center gap-2 group"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
        <span className="font-semibold">{week.title}</span> 
        <span className="text-xs text-muted-foreground">({week.dateRange})</span>
      </Link>
    </div>
  );
}

function AccordionItem({ item }: { item: ReflectionGroup }) {
  const [isOpen, setIsOpen] = useState(item.isOpen);

  return (
    <div className="border-b border-transparent">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left group"
      >
        <span className="text-primary font-bold text-lg group-hover:opacity-80 transition-opacity">
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
            <div className="pb-6 pl-2 flex flex-col gap-2">
              {item.weeks.map((week, i) => (
                <ReflectionWeekItem key={i} week={week} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ReflectionsList({ initialData }: { initialData: ReflectionGroup[] }) {
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={item} className="mt-4 flex flex-col gap-2">
      {initialData.map((group) => (
        <AccordionItem key={group.month} item={group} />
      ))}
      {initialData.length === 0 && (
        <div className="text-muted-foreground italic">No reflections found.</div>
      )}
    </motion.div>
  );
}
