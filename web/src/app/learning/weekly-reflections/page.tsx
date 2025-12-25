import Link from "next/link";
import { motion } from "framer-motion"; // Server components can't use motion directly for layout, but here we are mixing client/server. 
// Actually, to use motion in Server Component children is tricky unless wrapped. 
// I'll keep the page "use client" wrapper in a separate component or just make the whole page "use client" if simpler?
// No, I want to fetch data server side.
// I'll make the page a Server Component and import a Client Component wrapper for the layout animation.

import { prisma } from "@/lib/db";
import { ReflectionsList } from "@/components/reflections-list";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"; // I'll create this to handle the page transitions

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

// Fetch data
async function getReflections() {
  try {
    const reflections = await prisma.reflection.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const grouped = reflections.reduce((acc: any, curr) => {
      const month = curr.monthGroup;
      if (!acc[month]) {
        acc[month] = { month: month, isOpen: false, weeks: [] };
      }
      acc[month].weeks.push({
        title: curr.title,
        dateRange: curr.dateRange,
        content: curr.content,
        slug: curr.slug
      });
      return acc;
    }, {});

    // Convert object to array and maybe sort keys if needed (descending months)
    return Object.values(grouped); 
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export const dynamic = 'force-dynamic'; // Ensure it revalidates on request

export default async function WeeklyReflectionsPage() {
  const reflectionsData = await getReflections();

  return (
    <PageTransitionWrapper>
      <div className="font-mono text-foreground max-w-3xl mx-auto">
        <div className="flex flex-col gap-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <SmallAlienIcon />
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link href="/learning" className="hover:text-foreground transition-colors">Learning</Link>
              <span>/</span>
              <span className="text-foreground">Weekly Reflections</span>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">Weekly Reflections</h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              My attempt at documenting, reflecting on, and being grateful for what I learned each week in my pursuit of knowledge.
            </p>
          </div>

          {/* Accordion List */}
          {/* @ts-ignore */}
          <ReflectionsList initialData={reflectionsData} />

          {/* Footer Navigation */}
          <div className="flex justify-center items-center gap-4 pt-20 pb-16 text-[hsl(var(--primary))] font-medium">
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
          </div>
        </div>
      </div>
    </PageTransitionWrapper>
  );
}