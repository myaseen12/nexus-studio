import { ScrollReveal } from "@/components/scroll-reveal";

const values = [
  ["Strategic clarity", "We align every launch around a clear message and a measurable growth objective."],
  ["Editorial craft", "We design with story, rhythm, and brand confidence in every interaction."],
  ["Future-ready systems", "From motion to automation, we build for scale and long-term relevance."],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">About Nexus Studio</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          We help modern teams build brands that feel unmistakably premium.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600">
          Nexus Studio is a design and technology partner focused on product-led storytelling, elegant interfaces, and AI-enhanced operations.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-100/80">
          <h2 className="text-2xl font-semibold">What we believe</h2>
          <p className="mt-4 text-slate-300 dark:text-slate-600">
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
    </div>
  );
}
