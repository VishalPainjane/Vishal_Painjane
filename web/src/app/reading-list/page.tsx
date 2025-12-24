"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Book } from "lucide-react";

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

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al., 2017",
    category: "Transformer",
    link: "https://arxiv.org/abs/1706.03762"
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Devlin et al., 2018",
    category: "NLP",
    link: "https://arxiv.org/abs/1810.04805"
  },
  {
    title: "Deep Residual Learning for Image Recognition",
    authors: "He et al., 2015",
    category: "Computer Vision",
    link: "https://arxiv.org/abs/1512.03385"
  },
  {
    title: "Denoising Diffusion Probabilistic Models",
    authors: "Ho et al., 2020",
    category: "Generative Models",
    link: "https://arxiv.org/abs/2006.11239"
  }
];

const books = [
    {
        title: "Deep Learning",
        authors: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
        category: "Textbook",
        link: "https://www.deeplearningbook.org/"
    },
    {
        title: "Designing Data-Intensive Applications",
        authors: "Martin Kleppmann",
        category: "System Design",
        link: "#"
    }
]

export default function ReadingListPage() {
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
            A curated collection of papers, books, and articles I've explored in my journey.
          </p>
        </motion.div>

        {/* Papers Section */}
        <motion.div variants={item} className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/40 pb-2">
                <FileText className="w-5 h-5 text-[hsl(var(--primary))]" />
                Papers
            </h2>
            <div className="grid gap-4">
                {papers.map((paper) => (
                    <a 
                        key={paper.title} 
                        href={paper.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group block p-4 rounded-lg border border-border/40 bg-[#0a0a0a] hover:border-[hsl(var(--primary))/50] transition-all"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                                    {paper.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {paper.authors}
                                </p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-colors" />
                        </div>
                        <div className="mt-3">
                             <span className="text-xs border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                                {paper.category}
                             </span>
                        </div>
                    </a>
                ))}
            </div>
        </motion.div>

        {/* Books Section */}
        <motion.div variants={item} className="space-y-6 pt-4">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-border/40 pb-2">
                <Book className="w-5 h-5 text-[hsl(var(--primary))]" />
                Books
            </h2>
            <div className="grid gap-4">
                {books.map((book) => (
                    <a 
                        key={book.title} 
                        href={book.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group block p-4 rounded-lg border border-border/40 bg-[#0a0a0a] hover:border-[hsl(var(--primary))/50] transition-all"
                    >
                         <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {book.authors}
                                </p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-colors" />
                        </div>
                        <div className="mt-3">
                             <span className="text-xs border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                                {book.category}
                             </span>
                        </div>
                    </a>
                ))}
            </div>
        </motion.div>

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
  );
}
