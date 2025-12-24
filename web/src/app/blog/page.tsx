"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    title: "Autograd Logic",
    slug: "autograd-logic",
    description: "the logic behind how autograd links to optimization through loss minimization",
    date: "February 24, 2025",
    readTime: "15 min read"
  },
  {
    title: "My 2025 Resolution: Beyond the Roadmaps, Beyond the Timelines",
    slug: "my-2025-resolution",
    description: "A week of self-reflection on my 2025 plan, and how I plan to elevate my knowledge fabric.",
    date: "January 14, 2025",
    readTime: "5 min read"
  },
  {
    title: "Getting Started with Machine Learning",
    slug: "getting-started-ml",
    description: "A comprehensive guide on getting started with machine learning, from math to practical implementation.",
    date: "December 25, 2024",
    readTime: "10 min read"
  }
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

export default function BlogPage() {
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
    <div className="font-mono text-foreground max-w-2xl mx-auto">
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
            <span className="text-foreground">Blog</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div variants={item} className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Thoughts on programming, machine learning, and technology
          </p>
        </motion.div>

        {/* Blog Posts List */}
        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <motion.article 
              key={post.slug} 
              variants={item}
              className="group flex flex-col gap-3 border-b border-border/40 pb-10 last:border-0"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors duration-200">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-muted-foreground leading-relaxed text-sm">
                {post.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-1">
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer Navigation */}
        <motion.div variants={item} className="flex justify-center pt-8 pb-16">
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
