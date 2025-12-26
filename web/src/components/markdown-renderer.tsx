"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-neutral max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match ? match[1] : "";
            
            // Extract plain text for copying
            const rawCode = extractText(children);
            
            return !inline ? (
              <CodeBlock language={lang} value={rawCode}>
                <code className={className} {...props}>
                  {children}
                </code>
              </CodeBlock>
            ) : (
              <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[0.9em] text-foreground" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
      <style jsx global>{`
        .prose blockquote {
          border-left-color: hsl(var(--primary));
          background: transparent;
          padding: 0.5rem 1.5rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.6);
        }
        .prose hr {
            border-color: var(--color-border);
            opacity: 0.2;
        }
        .katex-display {
            overflow-x: auto;
            overflow-y: hidden;
            padding: 1.5rem 0;
            color: var(--color-foreground);
        }
        /* Remove any default background that might cause a blend */
        .prose :not(pre) > code {
            background-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}

// Helper to get raw text from React children (important for copying when syntax highlighting is on)
function extractText(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children?.props?.children) return extractText(children.props.children);
  return "";
}

function CodeBlock({ children, language, value }: { children: React.ReactNode; language: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 border border-border/30 rounded-md overflow-hidden group bg-black/20">
      {/* Super Simple Header */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-border/20 bg-muted/5">
        <span className="text-[10px] font-mono text-muted-foreground/50 tracking-widest uppercase">
            {language || "code"}
        </span>
        
        <button
          onClick={copyToClipboard}
          className="text-[10px] font-mono text-muted-foreground/40 hover:text-foreground transition-all uppercase"
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>

      <div className="relative">
        <pre className="!m-0 !bg-transparent !p-5 overflow-x-auto text-[13px] leading-relaxed">
          {children}
        </pre>
      </div>
    </div>
  );
}
