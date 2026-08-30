"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext, Project } from "@/components/app-context";
import { ProjectModal } from "@/components/project-modal";

type FilterType = "All" | "SaaS" | "AI" | "Creative";

export default function PortfolioPage() {
  const { projects } = useAppContext();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    const typeLower = project.type.toLowerCase();
    const filterLower = activeFilter.toLowerCase();
    
    if (filterLower === "creative" && typeLower.includes("creative")) return true;
    if (filterLower === "saas" && typeLower.includes("saas")) return true;
    if (filterLower === "ai" && typeLower.includes("ai")) return true;
    
    return typeLower.includes(filterLower);
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      {/* Page Header */}
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Portfolio</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Selected work with motion, precision, and purpose.
        </h1>
      </ScrollReveal>

      {/* Dynamic Filter Buttons */}
      <ScrollReveal className="mt-12 flex flex-wrap gap-3">
        {(["All", "SaaS", "AI", "Creative"] as FilterType[]).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition cursor-pointer border ${
                isActive
                  ? "bg-cyan-400 border-cyan-400 text-slate-950 shadow-md font-bold"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white dark:border-slate-200/70 dark:bg-slate-100/70 dark:text-slate-700 dark:hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </ScrollReveal>

      {/* Projects Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-20 text-slate-500">
            <span className="text-4xl block mb-3">📁</span>
            No projects published under "{activeFilter}" category.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <button
              key={project.id || project.name}
              onClick={() => setSelectedProject(project)}
              className="text-left group block rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-slate-900/80 p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/30 dark:border-slate-200/70 dark:from-slate-100/70 dark:to-white/90 cursor-pointer w-full focus:outline-none"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{project.outcome || project.type}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white dark:text-slate-950">{project.name}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400 dark:text-slate-600">{project.blurb}</p>
              <span className="mt-6 inline-flex items-center text-sm font-medium text-cyan-300 transition group-hover:translate-x-1 hover:underline">
                Explore case study →
              </span>
            </button>
          ))
        )}
      </div>

      {/* Case Study Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
