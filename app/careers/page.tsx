"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext } from "@/components/app-context";

const jobs = [
  {
    title: "Senior UI/UX Designer",
    dept: "Design & Brand",
    type: "Remote • Full-time",
    salary: "$80k - $120k",
    desc: "Build design tokens, typography scales, responsive layouts, and visual styleguides for global product launches."
  },
  {
    title: "Next.js Frontend Developer",
    dept: "Engineering",
    type: "Remote • Full-time",
    salary: "$90k - $135k",
    desc: "Translate Figma frames into high-performance, motion-driven React components, optimizing load speeds and technical SEO."
  },
  {
    title: "AI Integration Architect",
    dept: "Solutions & AI",
    type: "Remote • Full-time",
    salary: "$110k - $150k",
    desc: "Design and implement custom AI assistants, automated verification routes, and process validations for enterprise platforms."
  }
];

export default function CareersPage() {
  const { addJobApplication } = useAppContext();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Senior UI/UX Designer");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [notes, setNotes] = useState("");
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !portfolioUrl) {
      setError("Please fill in Name, Email, and Portfolio/Resume Link.");
      return;
    }

    addJobApplication({
      name,
      email,
      role,
      portfolioUrl,
      notes,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPortfolioUrl("");
    setNotes("");
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      {/* Intro */}
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Careers</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Build the next era of digital platforms.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600 font-sans">
          Join our global crew of remote designers, frontend engineers, and AI developers. Submit your application below to get logged in our systems.
        </p>
      </ScrollReveal>

      {/* Main Grid */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        
        {/* Left Side: Open Roles */}
        <ScrollReveal className="space-y-6">
          <h2 className="text-2xl font-bold text-white dark:text-slate-900 mb-6">Open Positions</h2>
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-slate-100/80"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-cyan-300 dark:text-cyan-600 font-bold block">
                      {job.dept}
                    </span>
                    <h3 className="text-xl font-semibold text-white dark:text-slate-950 mt-1">{job.title}</h3>
                  </div>
                  <div className="text-right sm:text-right self-start sm:self-center">
                    <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 text-xs dark:bg-indigo-500/5 dark:text-indigo-600">
                      {job.type}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1">{job.salary}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400 dark:text-slate-600">
                  {job.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Right Side: Apply Form */}
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-2xl dark:border-slate-200/70 dark:bg-white/80 h-fit">
          <h2 className="text-2xl font-bold text-white dark:text-slate-900 mb-6">Submit Application</h2>

          {submitted ? (
            <div className="text-center py-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl mb-6 mx-auto animate-pulse">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-white dark:text-slate-900">Application Logged!</h3>
              <p className="mt-4 text-sm text-slate-400 dark:text-slate-600 leading-relaxed max-w-xs mx-auto">
                Thank you, <span className="font-semibold text-slate-200 dark:text-slate-800">{name}</span>. Your resume link has been captured. Admin will check candidates under the dashboard **Applicants** tab.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 rounded-full bg-cyan-400 px-6 py-2.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
              >
                Apply for another role
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-100 dark:text-slate-900">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-semibold">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  placeholder="e.g. Lina Sterling"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  placeholder="e.g. lina@sterlingdesign.me"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-semibold">Desired Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                >
                  {jobs.map((j) => (
                    <option key={j.title} value={j.title}>{j.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-semibold">Portfolio / Resume Link</label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  placeholder="e.g. https://portfolio.sterlingdesign.me"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-semibold">Cover Note (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none min-h-[80px] dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  placeholder="Tell us a little bit about yourself..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-cyan-400 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          )}
        </ScrollReveal>

      </div>
    </div>
  );
}
