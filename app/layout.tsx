import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { AppContextProvider } from "@/components/app-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Studio | AI-Powered Digital Agency",
  description: "Premium digital agency website with immersive design, motion, and AI-driven product experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        <AppContextProvider>
          <SiteShell>{children}</SiteShell>
        </AppContextProvider>
      </body>
    </html>
  );
}


