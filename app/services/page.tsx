import { ScrollReveal } from "@/components/scroll-reveal";

const services = [
  ["Brand systems", "Visual language, messaging, and naming frameworks that give your launch unmistakable presence."],
  ["Product design", "Interfaces and flows crafted to feel intuitive, premium, and conversion-friendly."],
  ["AI copilots", "Intelligent experiences that reduce friction and amplify team productivity."],
  ["Launch acceleration", "Strategy, content, and execution support from concept to rollout."],
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Services</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">A studio built to move from idea to impact.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600">
          We partner with founders and teams that want a complete digital presence, not just a one-off landing page.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map(([title, text]) => (
          <ScrollReveal key={title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-100/80">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400 dark:text-slate-600">{text}</p>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
