"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScheduleModal } from "@/components/schedule-modal";

const services = [
  {
    title: "Brand systems",
    description: "Visual language, design tokens, typography scale, corporate color palettes, and messaging frameworks that give your launch an unmistakable market presence.",
    icon: "🎨"
  },
  {
    title: "Product design",
    description: "High-end user interfaces and client dashboards crafted to feel intuitive, fast, highly responsive, and conversion-friendly on all devices.",
    icon: "📐"
  },
  {
    title: "AI copilots",
    description: "Intelligent conversational bots, automated verification systems, and custom backend scripts to reduce support drag and scale business ops.",
    icon: "🤖"
  },
  {
    title: "Launch acceleration",
    description: "SEO technical setups, load-speed optimization, deployment workflows, and tracking pipelines to ensure launch momentum from day one.",
    icon: "🚀"
  }
];

const processes = [
  {
    phase: "Phase 01",
    title: "Discovery & Strategy",
    text: "We audit your audience, outline technical needs, and map a strategic timeline focused on concrete growth outcomes."
  },
  {
    phase: "Phase 02",
    title: "Interactive Prototyping",
    text: "Our team designs high-fidelity UI systems, adding motion indicators and responsive components before writing code."
  },
  {
    phase: "Phase 03",
    title: "Production Deployment",
    text: "We translate layouts into optimized Next.js frameworks, configuring SEO parameters and deploying to staging."
  }
];

export default function ServicesPage() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      {/* Introduction */}
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Services</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">A studio built to move from idea to impact.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600">
          We partner with founders and teams that want a complete digital presence, not just a one-off landing page.
        </p>
      </ScrollReveal>

      {/* Services Grid with Action buttons */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <ScrollReveal key={service.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-100/80 flex flex-col justify-between">
            <div>
              <span className="text-4xl block mb-4">{service.icon}</span>
              <h2 className="text-2xl font-semibold text-white dark:text-slate-900">{service.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400 dark:text-slate-600">{service.description}</p>
            </div>
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="mt-8 self-start rounded-full bg-white/10 border border-white/15 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 dark:bg-slate-950 dark:text-white cursor-pointer"
            >
              Get Started →
            </button>
          </ScrollReveal>
        ))}
      </div>

      {/* Process Workflow Section */}
      <section className="mt-28">
        <ScrollReveal className="mb-16">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-300">How We Build</p>
          <h2 className="mt-2 text-3xl font-semibold text-white dark:text-slate-900">Our Production Process</h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {processes.map((step) => (
            <ScrollReveal key={step.phase} className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 dark:border-slate-200/70 dark:bg-white/80">
              <span className="text-xs uppercase tracking-wider text-cyan-300 dark:text-cyan-600 font-bold">
                {step.phase}
              </span>
              <h3 className="text-lg font-bold text-white dark:text-slate-900 mt-1">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400 dark:text-slate-600">
                {step.text}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Booking Dialog Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </div>
  );
}
