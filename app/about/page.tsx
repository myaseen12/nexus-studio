"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

const values = [
  ["Strategic clarity", "We align every launch around a clear message and a measurable growth objective."],
  ["Editorial craft", "We design with story, rhythm, and brand confidence in every interaction."],
  ["Future-ready systems", "From motion to automation, we build for scale and long-term relevance."],
];

const team = [
  {
    name: "Yaseen Khan",
    role: "Principal UX Architect & Motion Engineer",
    avatar: "🎨",
    bio: "Focuses on cinematic frontend layouts, custom scroll physics, and responsive system design."
  },
  {
    name: "Sarah Jenkins",
    role: "Lead Brand Designer",
    avatar: "📐",
    bio: "Specializes in design tokens, component architecture, visual styleguides, and corporate rebranding."
  },
  {
    name: "Marcus Vance",
    role: "Senior AI Integration Architect",
    avatar: "🤖",
    bio: "Builds intelligent verification solutions, process automated APIs, and smart data validators."
  }
];

const milestones = [
  {
    year: "2024",
    title: "Agency Genesis",
    description: "Launched Nexus Studio with a focus on combining premium visual design, responsive components, and interactive motion UX."
  },
  {
    year: "2025",
    title: "AI & Automation Hub",
    description: "Expanded core capabilities to include customized AI verification systems, automated fraud scoring, and intelligent content workflows."
  },
  {
    year: "2026",
    title: "Production Scalability",
    description: "Successfully shipped over 50 global launches with verified 99+ Lighthouse performance scores, fully optimized SEO meta configurations, and automated deployment pipelines."
  }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      {/* Introduction */}
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About Nexus Studio</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          We help modern teams build brands that feel unmistakably premium.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600">
          Nexus Studio is a design and technology partner focused on product-led storytelling, elegant interfaces, and AI-enhanced operations.
        </p>
      </ScrollReveal>

      {/* Beliefs Grid */}
      <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-100/80">
          <h2 className="text-2xl font-semibold">What we believe</h2>
          <p className="mt-4 text-slate-300 dark:text-slate-600 leading-relaxed">
            The strongest brands feel simple at first glance and deeply considered on closer inspection. We bring strategy, art direction, and engineering together so every experience feels coherent and alive.
          </p>
        </ScrollReveal>

        <ScrollReveal className="grid gap-4">
          {values.map(([title, text]) => (
            <div key={title} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 dark:border-slate-200/70 dark:bg-white/80">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400 dark:text-slate-600">{text}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>

      {/* Timeline Milestones */}
      <section className="mt-24">
        <ScrollReveal className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-300">Our Journey</p>
          <h2 className="mt-2 text-3xl font-semibold text-white dark:text-slate-900">Timeline & Milestones</h2>
        </ScrollReveal>
        
        <div className="relative border-l border-white/10 dark:border-slate-200/60 ml-4 space-y-12">
          {milestones.map((milestone) => (
            <ScrollReveal key={milestone.year} className="relative pl-8">
              <div className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 border-2 border-cyan-400 text-[10px] text-cyan-300 font-bold dark:bg-white">
                ✓
              </div>
              <span className="text-xs font-semibold text-cyan-300 dark:text-cyan-600 tracking-wider">
                {milestone.year}
              </span>
              <h3 className="text-lg font-semibold text-white dark:text-slate-900 mt-1">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-400 dark:text-slate-600 max-w-2xl">
                {milestone.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Profiles */}
      <section className="mt-24">
        <ScrollReveal className="mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">The Studio</p>
          <h2 className="mt-2 text-3xl font-semibold text-white dark:text-slate-900">Meet the Team</h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <ScrollReveal key={member.name} className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80 flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-4">{member.avatar}</span>
                <h3 className="text-xl font-semibold text-white dark:text-slate-900">{member.name}</h3>
                <p className="text-xs text-cyan-300 dark:text-cyan-600 mt-1 uppercase font-semibold tracking-wider">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400 dark:text-slate-600">
                  {member.bio}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
