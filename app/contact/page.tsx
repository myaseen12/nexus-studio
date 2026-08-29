"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext } from "@/components/app-context";

export default function ContactPage() {
  const { addMessage } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in all fields before sending.");
      return;
    }

    addMessage(name, email, message);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Let’s create a launch that feels unmistakably yours.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600">
          Share your goals and we’ll map the strategy, design, and implementation needed to bring your next idea to life.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-100/80">
          <div>
            <h2 className="text-2xl font-semibold text-white dark:text-slate-900">Start a conversation</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400 dark:text-slate-600">hello@nexusstudio.dev</p>
            <p className="mt-1 text-sm leading-7 text-slate-400 dark:text-slate-600">Remote • Global • Available for select launches</p>
          </div>

          <div className="pt-6 border-t border-white/10 dark:border-slate-200/50">
            <h3 className="text-sm font-semibold text-slate-300 dark:text-slate-700 uppercase tracking-wider mb-3">Office hours</h3>
            <p className="text-sm text-slate-400 dark:text-slate-600">Monday - Friday • 9:00 AM - 6:00 PM GMT</p>
          </div>

          <div className="pt-6 border-t border-white/10 dark:border-slate-200/50">
            <h3 className="text-sm font-semibold text-slate-300 dark:text-slate-700 uppercase tracking-wider mb-3">Looking to test?</h3>
            <p className="text-sm text-slate-400 dark:text-slate-600 leading-relaxed">
              Submit your inquiry here, then log in and navigate to the **Dashboard** to view and manage it instantly in real-time.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 dark:border-slate-200/70 dark:bg-white/80">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl mb-6 animate-pulse">
                ✓
              </div>
              <h2 className="text-2xl font-semibold text-white dark:text-slate-900">
                Inquiry Logged Successfully!
              </h2>
              <p className="mt-4 text-sm text-slate-400 dark:text-slate-600 max-w-md leading-relaxed">
                Thank you, <span className="font-semibold text-slate-200 dark:text-slate-800">{name}</span>. 
                Your message has been captured. You can log in and view this inquiry in the **Dashboard** inbox tab.
              </p>
              <button
                onClick={handleReset}
                className="mt-8 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 dark:border-slate-300/60 dark:bg-slate-200/70 dark:text-slate-900"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 dark:border-red-400/45 dark:bg-red-50 dark:text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
                  Your Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none ring-0 focus:border-cyan-400/30 dark:border-slate-200/70 dark:bg-slate-100/70 dark:text-slate-950"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none ring-0 focus:border-cyan-400/30 dark:border-slate-200/70 dark:bg-slate-100/70 dark:text-slate-950"
                  placeholder="e.g. sarah@vertex.io"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
                  Project Details
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 outline-none ring-0 focus:border-cyan-400/30 dark:border-slate-200/70 dark:bg-slate-100/70 dark:text-slate-950"
                  placeholder="Tell us about your brand, timeline, and goals..."
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
