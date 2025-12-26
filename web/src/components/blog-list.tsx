"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  createdAt: Date;
}

interface BlogListProps {
  posts: Post[];
}

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

export function BlogList({ posts }: BlogListProps) {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Helper to calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
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
          <h1 className="text-4xl font-bold tracking-tighter">THE ARCHIVES</h1>
          <p className="text-muted-foreground border-l-2 border-primary pl-4">
            Decrypting thoughts on engineering, machine learning, and digital systems.
          </p>
        </motion.div>

        {/* Blog Posts List */}
        <div className="grid gap-16 mt-8">
          {posts.map((post) => (
            <motion.article 
              key={post.id} 
              variants={item}
              className="group relative flex flex-col gap-6"
            >
              {post.coverImage && (
                  <Link href={`/blog/${post.slug}`} className="block aspect-[21/9] overflow-hidden rounded-xl border border-border/50 transition-all group-hover:border-primary/50 shadow-2xl shadow-primary/5">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                  </Link>
              )}
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {getReadingTime(post.content)} MIN READ</span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight leading-tight">
                    {post.title}
                    </h2>
                </Link>
                
                <p className="text-muted-foreground leading-relaxed text-base max-w-2xl">
                    {post.excerpt || post.content.replace(/[#*`]/g, "").slice(0, 180) + "..."}
                </p>
                
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all mt-2 uppercase tracking-widest">
                    Access Intel <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.article>
          ))}
          
          {posts.length === 0 && (
            <motion.div variants={item} className="text-muted-foreground text-center py-20 border border-dashed border-border rounded-2xl bg-muted/5">
                NO TRANSMISSIONS DETECTED IN THIS SECTOR.
            </motion.div>
          )}
        </div>

        {/* Footer Navigation */}
        <motion.div variants={item} className="flex justify-center pt-8 pb-16">
          <Link 
            href="/" 
            className="text-primary hover:text-primary/80 transition-colors font-bold text-xs uppercase tracking-[0.3em] hover:underline underline-offset-8"
          >
            [ Return to Base ]
          </Link>
        </motion.div>
      </motion.div>
  );
}