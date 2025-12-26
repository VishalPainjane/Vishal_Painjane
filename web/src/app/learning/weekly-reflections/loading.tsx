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
            <Skeleton className="h-4 w-16" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-full max-w-xl" />
        </div>

        {/* Reflections List Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
                <div className="h-14 px-4 bg-muted/20 flex items-center justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
