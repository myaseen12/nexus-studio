"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/app-context";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { user, login } = useAppContext();
  const router = useRouter();

  // If already logged in, redirect immediately to dashboard
  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      triggerShake();
      return;
    }

    // Attempt login instantly
    const success = login(email, password);
    setLoading(false);

    if (success) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password.");
      triggerShake();
    }

  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const fillPresets = () => {
    setEmail("admin@nexus.dev");
    setPassword("admin123");
  };

  return (
    <div className="relative min-h-[80vh] overflow-hidden px-6 py-12 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_50%)]">
      {/* Background ambient glowing nodes */}
      <div className="absolute top-1/4 left-1/3 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <ScrollReveal className="w-full max-w-md">
        <div
          className={`rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-slate-200/70 dark:bg-white/80 ${
            shake ? "animate-shake" : ""
          }`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-white dark:text-slate-900">
              Access Workspace
            </h1>
            <p className="mt-2 text-sm text-slate-400 dark:text-slate-600">
              Sign in to manage your website content and client messages.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 dark:border-red-400/40 dark:bg-red-50/70 dark:text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400/40 dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900 dark:focus:border-cyan-500/50"
                placeholder="email@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none ring-0 transition focus:border-cyan-400/40 dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900 dark:focus:border-cyan-500/50"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-full bg-white py-3.5 text-center font-semibold text-slate-950 transition hover:scale-[1.02] disabled:opacity-75 flex items-center justify-center gap-2 dark:bg-slate-950 dark:text-white"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent dark:border-white" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Quick Sandbox Helper */}
          <div className="mt-8 pt-6 border-t border-white/10 dark:border-slate-200/50 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-600 mb-3">
              Testing sandbox? Click below to autofill admin credentials.
            </p>
            <button
              type="button"
              onClick={fillPresets}
              className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20 dark:border-cyan-500/20 dark:bg-cyan-500/5 dark:text-cyan-600 dark:hover:bg-cyan-500/10"
            >
              Use Admin Presets
            </button>
          </div>
        </div>
      </ScrollReveal>
      
      {/* Custom Styles for animation-shake if Tailwind version 4 doesn't support custom configs out of the box */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
