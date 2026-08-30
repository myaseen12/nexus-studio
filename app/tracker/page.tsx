"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext } from "@/components/app-context";

export default function TrackerPage() {
  const { roadmaps } = useAppContext();
  const [code, setCode] = useState("");
  const [activeProject, setActiveProject] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSearched(true);

    if (!code) {
      setError("Please enter a project track code.");
      setActiveProject(null);
      return;
    }

    const match = roadmaps.find(
      (r) => r.projectCode.toUpperCase() === code.trim().toUpperCase()
    );

    if (match) {
      setActiveProject(match);
    } else {
      setActiveProject(null);
      setError("Coordinates not found. Please review your project tracking code.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      {/* Intro */}
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Client Board</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Project Roadmap Tracker
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600 font-sans">
          Provide transparency to your team. Enter your unique tracking code below to inspect active milestones, progress bars, and update logs in real-time.
        </p>
      </ScrollReveal>

      {/* Main Grid */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Side: Search & Project Status */}
        <ScrollReveal className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
            <h3 className="text-xl font-bold text-white dark:text-slate-950 mb-4">Query Tracking Code</h3>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 outline-none ring-0 focus:border-cyan-400/30 dark:border-slate-200/70 dark:bg-slate-50 dark:text-slate-900"
                placeholder="e.g. PULSE-101"
              />
              <button
                type="submit"
                className="btn-premium-shimmer rounded-full bg-cyan-400 px-8 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] dark:bg-slate-950 dark:text-white cursor-pointer"
              >
                Track Status
              </button>
            </form>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 dark:border-red-400/40 dark:bg-red-50 dark:text-red-600">
                {error}
              </div>
            )}

            {/* Sandbox Sandbox Helper */}
            <div className="mt-6 pt-6 border-t border-white/5 dark:border-slate-200/50">
              <span className="text-xs text-slate-500 block mb-2">💡 Sandbox Test Codes</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCode("PULSE-101");
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:text-white dark:border-slate-200/60 dark:bg-slate-100/70 dark:text-slate-700 dark:hover:bg-slate-100 cursor-pointer"
                >
                  PULSE-101 (Design)
                </button>
                <button
                  onClick={() => {
                    setCode("AURELIA-202");
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 hover:text-white dark:border-slate-200/60 dark:bg-slate-100/70 dark:text-slate-700 dark:hover:bg-slate-100 cursor-pointer"
                >
                  AURELIA-202 (Dev)
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Active Project Display */}
          {activeProject && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80 animate-fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider dark:bg-cyan-500/5 dark:text-cyan-600">
                    {activeProject.status}
                  </span>
                  <h3 className="text-2xl font-bold text-white dark:text-slate-950 mt-3">{activeProject.projectName}</h3>
                </div>
                <span className="text-xs text-slate-500">Code: {activeProject.projectCode}</span>
              </div>

              {/* Progress Bar Container */}
              <div className="mt-8">
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-600 mb-2">
                  <span>Development Roadmap Progress</span>
                  <span className="font-bold text-white dark:text-slate-950">{activeProject.progressVal}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden dark:bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-500"
                    style={{ width: `${activeProject.progressVal}%` }}
                  />
                </div>
              </div>

              {/* Milestones Log List */}
              <div className="mt-8 border-t border-white/5 pt-6 dark:border-slate-200/50">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-700 mb-4">
                  Activity Timeline Log
                </h4>
                <ul className="space-y-4">
                  {activeProject.updatesLog.map((log: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-400 dark:text-slate-600 leading-relaxed">
                      <span className="text-cyan-300 dark:text-cyan-600 font-bold">•</span>
                      <span>{log}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </ScrollReveal>

        {/* Right Side: Informational Context */}
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-slate-950 p-6 sm:p-8 dark:border-slate-200/70 dark:bg-slate-50/60 h-fit space-y-6">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-700 mb-2">
              Why Project Tracking?
            </h4>
            <p className="text-xs leading-6 text-slate-500 dark:text-slate-500 leading-relaxed">
              We do not believe in silence. During our engagements, clients receive a code that hooks into our dynamic database logs, keeping teams aligned on exact deliverables, milestones, and release coordinates.
            </p>
          </div>
          
          <div className="border-t border-white/10 pt-6 dark:border-slate-200/50">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-700 mb-3">
              Included Assets
            </h4>
            <ul className="text-xs text-slate-500 space-y-2 leading-relaxed">
              <li>• Live staging build URL</li>
              <li>• Figma dashboard files & wireframes</li>
              <li>• Analytics tags and event logs</li>
              <li>• Production deployment coordinates</li>
            </ul>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
