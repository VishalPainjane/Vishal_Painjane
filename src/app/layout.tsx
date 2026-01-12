import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google"; 
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "vishal.ml",
  description: "Software Engineer based in Tokyo.",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${ibmPlexMono.variable} min-h-screen bg-background font-mono antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Defaulting to dark as per the strong preference for the dark aesthetic
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col" suppressHydrationWarning>
            <SiteHeader />
            <main className="flex-1">
                {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}