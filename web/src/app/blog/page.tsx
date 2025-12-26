import { prisma } from "@/lib/db";
import { BlogList } from "@/components/blog-list";
import { PageLayout } from "@/components/page-layout";

export const revalidate = 60;

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Blog table missing:", error);
  }

  return (
    <PageLayout>
        <div className="font-mono text-foreground max-w-2xl mx-auto">
            <BlogList posts={posts as any} />
        </div>
    </PageLayout>
  );
}
