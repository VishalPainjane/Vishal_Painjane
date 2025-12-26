import Link from "next/link";
import { notFound } from "next/navigation";
import { getCachedReflectionBySlug } from "@/lib/cached-data";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import { PageLayout } from "@/components/page-layout";

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

export const revalidate = 60;

export default async function ReflectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const reflection = await getCachedReflectionBySlug(resolvedParams.slug);

  if (!reflection) {
    notFound();
  }

  return (
    <PageLayout>
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
                <Link href="/learning/weekly-reflections" className="hover:text-foreground transition-colors">Weekly Reflections</Link>
                <span>/</span>
                <span className="text-foreground">{reflection.title}</span>
                </div>
            </div>

            {/* Header */}
            <div className="space-y-4 border-b border-border pb-8">
                <h1 className="text-3xl font-bold tracking-tight">{reflection.title}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                    <span className="text-primary font-bold">Date:</span> {reflection.dateRange}
                </span>
                <span className="hidden sm:inline text-border">|</span>
                <span className="flex items-center gap-2">
                    <span className="text-primary font-bold">Group:</span> {reflection.monthGroup}
                </span>
                </div>
            </div>

                      {/* Content */}
                      <div className="prose prose-invert prose-neutral max-w-none">
                        <div className="whitespace-pre-wrap leading-relaxed text-base">
                          {reflection.content || "No content available for this week."}
                        </div>
                      </div>
            
                      {/* Footer Navigation */}
                      <div className="flex justify-center items-center gap-4 pt-20 pb-16 text-primary font-medium border-t border-border mt-8">
                        <Link 
                          href="/learning/weekly-reflections" 
                          className="hover:text-primary/80 transition-colors hover:underline underline-offset-4"
                        >
                          Back to List
                        </Link>
                        <span className="text-muted-foreground">|</span>
                        <Link 
                          href="/" 
                          className="hover:text-primary/80 transition-colors hover:underline underline-offset-4"
                        >
                          Home Page
                        </Link>
                      </div>            </div>
        </div>
        </PageTransitionWrapper>
    </PageLayout>
  );
}
