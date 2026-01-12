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
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-full max-w-md" />
        </div>

        {/* Reading List Skeleton */}
        <div className="space-y-8">
           {/* Category Section */}
           <div className="space-y-6">
                <Skeleton className="h-8 w-32 border-b border-border/40 pb-2" />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-start gap-4">
                            <div className="space-y-2 w-full">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <Skeleton className="h-5 w-24 shrink-0" />
                        </div>
                    ))}
                </div>
           </div>
        </div>
      </div>
    </PageLayout>
  );
}
