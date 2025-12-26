import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="container mx-auto max-w-3xl px-6 mt-16 mb-20">
      {children}
    </div>
  );
}
