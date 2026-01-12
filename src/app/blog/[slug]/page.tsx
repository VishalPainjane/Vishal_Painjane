import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { getCachedPostBySlug } from "@/lib/cached-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const post = await getCachedPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <PageLayout>
        <div className="font-mono text-foreground max-w-3xl mx-auto px-6 py-12">
        <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK TO INTEL
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10 border-b border-border pb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight leading-tight">
                {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={new Date(post.createdAt).toISOString()}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                    </time>
                </div>
                <span>•</span>
                <span>{post.slug}</span>
            </div>
            </header>

            <MarkdownRenderer content={post.content} />
        </article>

        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
            <div>END OF TRANSMISSION</div>
            <Link href="/blog" className="hover:text-primary transition-colors">
                RETURN TO ARCHIVES
            </Link>
        </div>
        </div>
    </PageLayout>
  );
}
