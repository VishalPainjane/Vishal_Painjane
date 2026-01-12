import { getCachedPosts } from "@/lib/cached-data";
import { BlogList } from "@/components/blog-list";
import { PageLayout } from "@/components/page-layout";

export default async function BlogPage() {
  const posts = await getCachedPosts();

  return (
    <PageLayout>
        <div className="font-mono text-foreground max-w-2xl mx-auto">
            <BlogList posts={posts as any} />
        </div>
    </PageLayout>
  );
}
