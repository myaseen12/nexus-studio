"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/components/app-context";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? scrollTop / height : 0;
      setProgress(value);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-200"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();
  const { user, logout } = useAppContext();

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme") as "dark" | "light" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ?? (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    document.documentElement.style.colorScheme = initialTheme;
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // Define dynamic nav items based on authentication state
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
    ...(user
      ? [{ href: "/admin/dashboard", label: "Dashboard" }]
      : [{ href: "/login", label: "Login" }]),
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 dark:bg-slate-50 dark:text-slate-950">
      <ScrollProgress />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-50/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-lg font-semibold tracking-[0.3em] text-white dark:text-slate-900">
            NEXUS STUDIO
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex dark:text-slate-700">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition hover:text-white dark:hover:text-slate-900 ${
                    isActive ? "text-cyan-300 dark:text-cyan-600 font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={logout}
                className="hidden rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 sm:block"
              >
                Logout
              </button>
            )}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20 dark:border-slate-300/60 dark:bg-slate-200/70 dark:text-slate-900"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀︎" : "☾"}
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-slate-400 dark:border-slate-200/70 dark:text-slate-600 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nexus Studio. Premium digital experiences, crafted with intention.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition hover:text-white dark:hover:text-slate-900">Privacy</Link>
            <Link href="/terms" className="transition hover:text-white dark:hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

