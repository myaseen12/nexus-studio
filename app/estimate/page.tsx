"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext } from "@/components/app-context";

export default function EstimatePage() {
  const { addEstimate } = useAppContext();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState("Web Experience");
  const [pages, setPages] = useState("1 - 5 pages");
  const [timeline, setTimeline] = useState("Standard (6 weeks)");
  
  const [budgetRange, setBudgetRange] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Real-time budget calculation logic
  useEffect(() => {
    let min = 0;
    let max = 0;

    // Scope base
    if (scope === "Web Experience") {
      min += 3000;
      max += 4500;
    } else if (scope === "UI / UX Systems") {
      min += 5000;
      max += 7000;
    } else if (scope === "AI Automation") {
      min += 7000;
      max += 10000;
    }

    // Pages addon
    if (pages === "6 - 12 pages") {
      min += 2000;
      max += 3000;
    } else if (pages === "13 - 20+ pages") {
      min += 4000;
      max += 6000;
    }

    // Timeline addon
    if (timeline === "Express (3 weeks)") {
      min += 2000;
      max += 3500;
    } else if (timeline === "Standard (6 weeks)") {
      min += 500;
      max += 1000;
    }

    setBudgetRange(`$${min.toLocaleString()} - $${max.toLocaleString()}`);
  }, [scope, pages, timeline]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email) {
      setError("Please fill in your Name and Email to register the estimate.");
      return;
    }

    addEstimate({
      name,
      email,
      scope,
      pages,
      timeline,
      calculatedBudget: budgetRange,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      {/* Intro */}
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Estimator</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Calculate your project budget instantly.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600 font-sans">
          Select your requirements below to generate an interactive budget projection. Submitting logs the proposal directly to the dashboard.
        </p>
      </ScrollReveal>

      {/* Main Grid */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        
        {/* Wizard Form */}
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
          {submitted ? (
            <div className="text-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl mb-6 mx-auto animate-pulse">
                ✓
              </div>
              <h2 className="text-2xl font-semibold text-white dark:text-slate-900">
                Estimate Logged!
              </h2>
              <p className="mt-4 text-sm text-slate-400 dark:text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-200 dark:text-slate-800">{name}</span>. Your project proposal for **{scope}** at **{budgetRange}** has been submitted. Check the dashboard estimates tab to verify.
              </p>
              <button
                onClick={handleReset}
                className="mt-8 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
              >
                Create Another Estimate
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-sm text-slate-100 dark:text-slate-900">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Scope Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-3 font-bold">
                  1. Project Scope & Category
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { title: "Web Experience", icon: "🎨" },
                    { title: "UI / UX Systems", icon: "📐" },
                    { title: "AI Automation", icon: "🤖" }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.title}
                      onClick={() => setScope(item.title)}
                      className={`text-left rounded-2xl border p-4 transition-all duration-200 cursor-pointer ${
                        scope === item.title
                          ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300 dark:border-cyan-500/50 dark:bg-cyan-500/5 dark:text-cyan-700"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 dark:border-slate-200/60 dark:bg-slate-50 dark:text-slate-600"
                      }`}
                    >
                      <span className="text-2xl block mb-2">{item.icon}</span>
                      <span className="font-semibold">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pages Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-3 font-bold">
                  2. Number of Screens / Pages
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["1 - 5 pages", "6 - 12 pages", "13 - 20+ pages"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setPages(option)}
                      className={`rounded-xl border py-3 text-center transition-all duration-200 cursor-pointer ${
                        pages === option
                          ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300 dark:border-cyan-500/50 dark:bg-cyan-500/5 dark:text-cyan-700 font-semibold"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 dark:border-slate-200/60 dark:bg-slate-50 dark:text-slate-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-3 font-bold">
                  3. Timeline Preference
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Flexible", "Standard (6 weeks)", "Express (3 weeks)"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setTimeline(option)}
                      className={`rounded-xl border py-3 text-center transition-all duration-200 cursor-pointer ${
                        timeline === option
                          ? "border-cyan-400/50 bg-cyan-500/10 text-cyan-300 dark:border-cyan-500/50 dark:bg-cyan-500/5 dark:text-cyan-700 font-semibold"
                          : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 dark:border-slate-200/60 dark:bg-slate-50 dark:text-slate-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Info */}
              <div className="border-t border-white/10 pt-6 dark:border-slate-200/50 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-semibold">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. Thomas Drake"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-semibold">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. t.drake@drakedigital.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-cyan-400 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
              >
                Log Proposal & Save
              </button>
            </form>
          )}
        </ScrollReveal>

        {/* Dynamic Summary Card */}
        <ScrollReveal className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-slate-950 p-6 sm:p-8 dark:border-slate-200/70 dark:bg-slate-50/60 h-fit">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300 dark:text-cyan-600 font-bold block mb-2">
              Budget Estimate
            </span>
            <h3 className="text-4xl font-extrabold text-white dark:text-slate-950 tracking-tight">
              {budgetRange}
            </h3>
            <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-500 leading-relaxed">
              *This estimate represents an initial target projection based on our standard deliverables. Taxes, content writing fees, and custom third-party platform costs are not included.
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 dark:border-slate-200/50 space-y-4 text-xs text-slate-400 dark:text-slate-600">
            <h4 className="font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-700">Project Parameters</h4>
            <div className="flex justify-between">
              <span>Selected Scope:</span>
              <span className="font-semibold text-white dark:text-slate-900">{scope}</span>
            </div>
            <div className="flex justify-between">
              <span>Page Volume:</span>
              <span className="font-semibold text-white dark:text-slate-900">{pages}</span>
            </div>
            <div className="flex justify-between">
              <span>Time Constraint:</span>
              <span className="font-semibold text-white dark:text-slate-900">{timeline}</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
