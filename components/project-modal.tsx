"use client";

import { useEffect } from "react";
import { Project } from "./app-context";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-300 sm:p-10 dark:border-slate-200/80 dark:bg-white/95 text-slate-100 dark:text-slate-900 max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl font-semibold hover:bg-white/15 dark:border-slate-300 dark:bg-slate-200/50 dark:hover:bg-slate-200 transition"
          aria-label="Close Case Study"
        >
          ✕
        </button>

        {/* Content */}
        <div className="mt-4">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 uppercase tracking-wider dark:border-cyan-500/20 dark:bg-cyan-500/5 dark:text-cyan-600">
            {project.type}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white dark:text-slate-950 sm:text-4xl">
            {project.name}
          </h2>
          <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
            Core Scope: {project.outcome}
          </p>

          <p className="mt-6 text-base leading-8 text-slate-200 dark:text-slate-700 font-medium">
            {project.blurb}
          </p>

          {/* Project Details Grid */}
          <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 dark:border-slate-200/60 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 dark:text-cyan-600">
                The Challenge
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400 dark:text-slate-600">
                The client needed to transform a complex engineering architecture into an interface that feels intuitive, editorial, and instantly engaging for modern product teams.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 dark:text-indigo-600">
                Our Solution
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400 dark:text-slate-600">
                We designed a cinema-inspired brand identity with motion-driven landing pages, interactive micro-states, and integrated a client portal utilizing dynamic React interfaces.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-fuchsia-300 dark:text-fuchsia-600">
                Key Metrics
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400 dark:text-slate-600">
                <li>• 40% Increase in conversion rate</li>
                <li>• 99+ Lighthouse performance score</li>
                <li>• 2x Onboarding speed acceleration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-700">
                Deliverables
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-400 dark:text-slate-600">
                <li>• Brand Identity & Naming</li>
                <li>• UI/UX Strategy & Web App Screens</li>
                <li>• Next.js Development & Custom Motion Engines</li>
              </ul>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 dark:border-slate-200/60">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Want a similar experience designed for your brand?
            </p>
            <button
              onClick={onClose}
              className="rounded-full bg-cyan-400 px-6 py-2.5 text-center text-xs font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white"
            >
              Back to Portfolio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
