"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext, Project } from "@/components/app-context";
import { ProjectModal } from "@/components/project-modal";
import { ScheduleModal } from "@/components/schedule-modal";

const services = [
  {
    title: "Web Experiences",
    description: "High-converting websites built with motion, storytelling, and modern product thinking.",
    icon: "✦",
  },
  {
    title: "UI / UX Systems",
    description: "Thoughtful product design systems that feel effortless on every screen and interaction.",
    icon: "◌",
  },
  {
    title: "AI Automation",
    description: "Custom automations that turn repetitive flows into elegant, high-impact customer journeys.",
    icon: "⚡",
  },
  {
    title: "Growth Strategy",
    description: "Launch-ready positioning, content architecture, and analytics for measurable momentum.",
    icon: "↗",
  },
];

const metrics = [
  { value: "95+", label: "Performance score" },
  { value: "24/7", label: "AI support coverage" },
  { value: "50+", label: "Global launches" },
  { value: "4.9/5", label: "Client delight" },
];

const faqs = [
  {
    question: "How quickly can we launch?",
    answer: "Most engagements ship in 3 to 6 weeks, depending on scope and design complexity.",
  },
  {
    question: "Do you support AI integrations?",
    answer: "Yes. We design and implement automation, assistants, and intelligent workflows tailored to your brand.",
  },
  {
    question: "Can you work with existing teams?",
    answer: "Absolutely. We integrate smoothly with in-house product, growth, and marketing partners.",
  },
];

export default function Home() {
  const { projects, testimonials } = useAppContext();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.24),_transparent_40%),linear-gradient(135deg,_#040816_0%,_#0b1020_45%,_#111827_100%)] text-slate-100 dark:bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.24),_transparent_40%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#e2e8f0_100%)] dark:text-slate-900">
      <section className="relative overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 px-2 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <ScrollReveal className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-sm font-medium text-fuchsia-200 dark:border-fuchsia-400/30 dark:bg-fuchsia-500/15 dark:text-fuchsia-700">
              AI-powered digital agency • Premium experiences • Fast launches
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              We design digital brands that feel <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent dark:from-cyan-600 dark:via-indigo-600 dark:to-fuchsia-600">alive</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl dark:text-slate-600">
              Nexus Studio builds immersive websites, products, and AI-powered growth systems for ambitious founders who want more than templates.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#work" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:scale-[1.02]">
                View our work
              </a>
              <button
                onClick={() => setIsScheduleOpen(true)}
                className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/20 dark:border-slate-300/60 dark:bg-slate-100/70 dark:text-slate-900 cursor-pointer"
              >
                Schedule consultation
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-sm">
              {['Brand systems', 'Motion-led UX', 'AI automations', 'Growth-ready launches'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-300 dark:border-slate-200/70 dark:bg-slate-100/70 dark:text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl dark:border-slate-200/70 dark:bg-white/80 dark:shadow-slate-200/40">
              <div className="mb-6 flex items-center justify-between text-sm text-slate-400 dark:text-slate-500">
                <span>Launch runway</span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">Live</span>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 to-slate-900 p-6 dark:border-slate-200/70 dark:from-indigo-200/70 dark:to-slate-100">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-400 dark:text-slate-600">Strategy + design + motion</p>
                    <p className="mt-2 text-3xl font-semibold text-white dark:text-slate-900">From concept to conversion</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200 dark:bg-slate-900/10 dark:text-slate-700">⚡</div>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {metrics.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4 dark:border-slate-200/70 dark:bg-white/70">
                      <p className="text-2xl font-semibold text-white dark:text-slate-900">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-400 dark:text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Capabilities</p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl dark:text-slate-900">Everything needed to launch with presence.</h2>
          </ScrollReveal>
          <ScrollReveal className="max-w-2xl text-slate-300 dark:text-slate-600">We blend strategy, design, content, development, and AI into one premium engine for ambitious digital brands.</ScrollReveal>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ScrollReveal key={service.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/30 dark:border-slate-200/70 dark:bg-slate-100/80">
              <div className="text-3xl text-cyan-300">{service.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-white dark:text-slate-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400 dark:text-slate-600">{service.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/30 lg:grid-cols-[0.9fr_1.1fr] lg:p-12 dark:border-slate-200/70 dark:bg-white/80 dark:shadow-slate-200/40">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Why brands choose us</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl dark:text-slate-900">Bold ideas, refined execution, and measurable momentum.</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Immersive design', 'We create experiences that feel cinematic, memorable, and conversion-ready.'],
              ['Insight-led strategy', 'Every decision is rooted in user behavior, storytelling, and commercial goals.'],
              ['AI-enhanced workflows', 'We build smart systems that scale your operations without sacrificing quality.'],
              ['Launch focused', 'We ship polished, high-performance products that look sharp from day one.'],
            ].map(([title, text]) => (
              <ScrollReveal key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 dark:border-slate-200/70 dark:bg-slate-100/80">
                <h3 className="text-lg font-semibold text-white dark:text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400 dark:text-slate-600">{text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl dark:text-slate-900">Signature launches built for modern growth.</h2>
          </ScrollReveal>
          <ScrollReveal className="max-w-2xl text-slate-300 dark:text-slate-600">We shape ambitious digital experiences that feel premium and deliver clarity across every screen.</ScrollReveal>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id || project.name} className="group rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-slate-900/80 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/30 dark:border-slate-200/70 dark:from-slate-100/70 dark:to-white/90">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">0{index + 1}</span>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-300 dark:border-slate-200/70 dark:bg-slate-100/80 dark:text-slate-700">{project.type}</span>
              </div>
              <h3 className="text-2xl font-semibold text-white dark:text-slate-900">{project.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400 dark:text-slate-600">{project.blurb}</p>
              <button
                onClick={() => setSelectedProject(project)}
                className="mt-6 inline-flex items-center text-sm font-medium text-cyan-300 transition group-hover:translate-x-1 cursor-pointer hover:underline bg-transparent border-none outline-none"
              >
                Explore case study →
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ScrollReveal className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 p-8 dark:border-slate-200/70 dark:bg-slate-100/70">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Client voices</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl dark:text-slate-900">Trusted by founders building the next era of products.</h2>
          </ScrollReveal>
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <ScrollReveal key={testimonial.id || testimonial.author} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-100/80">
                <p className="text-lg leading-8 text-slate-200 dark:text-slate-700">“{testimonial.quote}”</p>
                <footer className="mt-4 text-sm text-slate-400 dark:text-slate-600">
                  <span className="font-semibold text-white dark:text-slate-900">{testimonial.author}</span> • {testimonial.role}
                </footer>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-12 dark:border-slate-200/70 dark:bg-white/80">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl dark:text-slate-900">The questions that usually come first.</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <ScrollReveal key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 p-4 dark:border-slate-200/70 dark:bg-slate-100/80">
                <details>
                  <summary className="cursor-pointer text-base font-semibold text-white dark:text-slate-900">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-400 dark:text-slate-600">{faq.answer}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-20 pt-8 sm:px-8 lg:px-10">
        <ScrollReveal className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-fuchsia-500/15 p-8 text-center lg:p-12 dark:border-cyan-400/20">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Let’s build something unforgettable</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl dark:text-slate-900">Ready to turn your next launch into a premium experience?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300 dark:text-slate-600">We’re available for strategy, design, development, and AI integrations across web, product, and growth.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/contact" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white">
              Start a project
            </a>
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 dark:border-slate-300/60 dark:bg-slate-100/70 dark:text-slate-900 cursor-pointer"
            >
              Schedule a discovery call
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* Case Study Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Consultation Scheduler Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </main>
  );
}
