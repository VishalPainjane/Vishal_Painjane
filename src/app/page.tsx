"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Divide, Code, RefreshCw } from "lucide-react";
import { PageLayout } from "@/components/page-layout";

function PixelAlienIcon() {
  return (
    <div className="mb-6 inline-block relative z-10">
      <motion.div
        layoutId="alien-logo"
        className="inline-block will-change-transform"
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-5xl md:text-6xl will-change-transform"
        >
          <span suppressHydrationWarning>👾</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Home() {
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

  return (
    <PageLayout>
        <div className="flex flex-col font-mono text-foreground" suppressHydrationWarning>
        
        {/* Icon with Floating Animation */}
        <PixelAlienIcon />

        {/* Content Entrance Animation */}
        <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Hero Headings */}
            <motion.h1 variants={item} className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                vishal.ml
            </motion.h1>
            
            <motion.p variants={item} className="text-base md:text-lg text-foreground mb-8">
                Hi! I am Vishal.
            </motion.p>

            {/* Bio Section - Paragraphs */}
            <motion.div variants={item} className="space-y-6 text-sm md:text-base leading-relaxed max-w-none">
                <p>
                I{"'"}m a swe based in Tokyo. I love coffee, machine learning, math, and among others.
                Glad to have you here! Feel free to look around :)
                </p>
                
                <p>
                    This is my graph of thoughts, notes, and ideas.
                </p>

                <p>
                    I ramble about things on my <Link href="/blog" className="text-primary font-bold hover:underline transition-colors hover:opacity-80">blog</Link>; you can check it out if you{"'"}re interested.
                </p>
            </motion.div>

            {/* Reads Section */}
            <motion.div variants={item} className="mt-10 mb-8">
                <p className="mb-4 text-sm md:text-base">
                    Here are some reads I recommend from this site if you&apos;re interested:
                </p>
                <ul className="list-disc list-outside ml-5 space-y-3 text-sm md:text-base">
                    <motion.li variants={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link href="/about" className="text-primary underline underline-offset-4 hover:opacity-70 transition-all block sm:inline">
                            My novice journey, a monologue
                        </Link>
                    </motion.li>
                    <motion.li variants={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link href="/blog/my-2025-resolution" className="text-primary underline underline-offset-4 hover:opacity-70 transition-all block sm:inline">
                            My 2025 Resolution: Beyond the Roadmaps, Beyond the Timelines
                        </Link>
                    </motion.li>
                    <motion.li variants={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link href="/blog/getting-started-ml" className="text-primary underline underline-offset-4 hover:opacity-70 transition-all block sm:inline">
                            Getting Started with Machine Learning
                        </Link>
                    </motion.li>
                </ul>
            </motion.div>

            {/* Reflections Section */}
            <motion.div variants={item} className="mb-12 text-sm md:text-base leading-relaxed">
                <p>
                    I also document my learnings through learning reflections every week. You can take a
                    look at those <Link href="/learning" className="text-primary font-bold hover:underline transition-colors hover:opacity-80">here</Link>.
                </p>
            </motion.div>
            
            {/* Image Section */}
            <motion.section 
                variants={item}
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl group mb-16 shadow-2xl border border-border/50"
            >
                <Image 
                    src="/images/gion-town.png" 
                    alt="Gion Town, Tokyo" 
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                    priority
                />
            </motion.section>

            {/* Current Ongoings Section */}
            <motion.div variants={item} className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">Current Ongoings</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-muted-foreground">
                    <li className="flex items-start gap-3 bg-muted/5 p-3 rounded-lg border border-border/30">
                        <Brain className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                        <span>Studying traditional ML</span>
                    </li>
                    <li className="flex items-start gap-3 bg-muted/5 p-3 rounded-lg border border-border/30">
                        <Divide className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                        <span>Learning math for ML</span>
                    </li>
                    <li className="flex items-start gap-3 bg-muted/5 p-3 rounded-lg border border-border/30">
                        <Code className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                        <span>Mastering the language of Python</span>
                    </li>
                    <li className="flex items-start gap-3 bg-muted/5 p-3 rounded-lg border border-border/30">
                        <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                        <span>Learning to get comfy with PyTorch till 5D</span>
                    </li>
                </ul>
            </motion.div>

            {/* Socials Section */}
            <motion.div variants={item} className="mb-12">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">Socials</h2>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                    I&apos;m always open to chat! Please feel free to ping me at <a href="mailto:vishal@vishal.ml" className="text-primary font-medium hover:underline">vishal@vishal.ml</a> or <a href="https://x.com/vishaldotml" target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">Twitter</a> if you have any questions or just wanna talk.
                </p>
            </motion.div>

        </motion.div>

        </div>
    </PageLayout>
  );
}
