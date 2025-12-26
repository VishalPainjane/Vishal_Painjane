import { Skeleton } from "@/components/ui/skeleton";
import { PageLayout } from "@/components/page-layout";

export default function Loading() {
  return (
    <PageLayout>
      <div className="font-mono text-foreground max-w-3xl mx-auto space-y-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-full max-w-md" />
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <Skeleton className="h-7 w-1/3" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
