"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Book } from "lucide-react";

interface ReadingItem {
  id: string;
  title: string;
  authors: string | null;
  category: string;
  link: string;
  type: string;
}

interface ReadingListViewProps {
  items: ReadingItem[];
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

export function ReadingListView({ items }: ReadingListViewProps) {
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

  const papers = items.filter(i => i.type === "Paper");
  const books = items.filter(i => i.type === "Book");

  return (
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
            <span className="text-foreground">Reading List</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div variants={item} className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Reading List</h1>
          <p className="text-muted-foreground leading-relaxed">
            A curated collection of papers, books, and articles I&apos;ve explored in my journey.
          </p>
        </motion.div>

        {/* Papers Section */}
        {papers.length > 0 && (
            <motion.div variants={item} className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-2 uppercase tracking-tighter">
                    <FileText className="w-5 h-5 text-primary" />
                    Papers
                </h2>
                <div className="grid gap-4">
                    {papers.map((paper) => (
                        <a 
                            key={paper.id} 
                            href={paper.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group block p-5 rounded-2xl border border-border bg-muted/5 hover:border-primary/30 transition-all shadow-sm"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg leading-tight uppercase tracking-tight">
                                        {paper.title}
                                    </h3>
                                    {paper.authors && (
                                        <p className="text-sm text-muted-foreground mt-2 font-mono">
                                            {paper.authors}
                                        </p>
                                    )}
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                            </div>
                            <div className="mt-4">
                                <span className="text-[10px] border border-border px-2.5 py-1 rounded-full text-muted-foreground font-black uppercase tracking-widest bg-muted/10">
                                    {paper.category}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </motion.div>
        )}

        {/* Books Section */}
        {books.length > 0 && (
            <motion.div variants={item} className="space-y-6 pt-4">
                <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border pb-2 uppercase tracking-tighter">
                    <Book className="w-5 h-5 text-primary" />
                    Books
                </h2>
                <div className="grid gap-4">
                    {books.map((book) => (
                        <a 
                            key={book.id} 
                            href={book.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group block p-5 rounded-2xl border border-border bg-muted/5 hover:border-primary/30 transition-all shadow-sm"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg leading-tight uppercase tracking-tight">
                                        {book.title}
                                    </h3>
                                    {book.authors && (
                                        <p className="text-sm text-muted-foreground mt-2 font-mono">
                                            {book.authors}
                                        </p>
                                    )}
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                            </div>
                            <div className="mt-4">
                                <span className="text-[10px] border border-border px-2.5 py-1 rounded-full text-muted-foreground font-black uppercase tracking-widest bg-muted/10">
                                    {book.category}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </motion.div>
        )}

        {items.length === 0 && (
             <motion.div variants={item} className="text-muted-foreground italic">
                Reading list is currently empty.
             </motion.div>
        )}

        {/* Footer Navigation */}
        <motion.div variants={item} className="flex justify-center pt-8 border-t border-border">
          <Link 
            href="/" 
            className="text-primary hover:text-primary/80 transition-colors font-bold text-xs uppercase tracking-[0.3em] hover:underline underline-offset-8"
          >
            [ Return to Base ]
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
