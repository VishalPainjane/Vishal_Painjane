import { Skeleton } from "@/components/ui/skeleton";
import { PageLayout } from "@/components/page-layout";

export default function Loading() {
  return (
    <PageLayout>
      <div className="font-mono text-foreground max-w-2xl mx-auto space-y-12">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground">/</span>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-full max-w-md" />
        </div>

        {/* Blog Post List Skeleton */}
        <div className="space-y-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
               <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
               </div>
               <Skeleton className="h-7 w-3/4" />
               <Skeleton className="h-16 w-full" />
               <Skeleton className="h-4 w-20 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
