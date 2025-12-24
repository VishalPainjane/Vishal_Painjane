"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
            I studied Business in Japan for 4 years. But to be honest, I was never really interested in it.
            My fascination always lay with Math and Engineering—specifically &quot;bridges and rockets.&quot;
          </p>
          <p>
            The turning point came during my 3rd year of university when a professor introduced me to <strong>Machine Learning</strong>.
            That spark pivoted my entire career trajectory.
          </p>
          <p>
            I had no prior software experience. Yet, through sheer curiosity and effort, I secured a new-grad role as a <strong>Software Engineer</strong> in Japan.
          </p>
          
          <h2 className="text-xl font-bold mt-12 mb-6">The Graph</h2>
          <p className="mb-4">
            If I were to visualize my progression on a horizontal axis:
          </p>
          
          <div className="border border-border/50 rounded-md p-6 bg-[#0a0a0a] font-mono text-sm shadow-sm">
            <ul className="list-none space-y-4 m-0 p-0">
                <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold min-w-[120px]">- Negative Scale:</span>
                    <span className="text-muted-foreground">Started with an uninterested degree (Business).</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-green-400 font-bold min-w-[120px]">+ Positive Scale:</span>
                    <span className="text-muted-foreground">Moved to a current role in Tech.</span>
                </li>
            </ul>
          </div>
          
          <p className="mt-8">
            I attribute my success to a mix of luck and tenacity. My detours have finally converged, and I feel like my true journey has just begun.
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
  );
}