"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/app-context";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function AdminDashboardPage() {
  const {
    user,
    projects,
    testimonials,
    messages,
    consultations,
    addProject,
    deleteProject,
    addTestimonial,
    deleteTestimonial,
    deleteMessage,
    deleteConsultation,
    logout,
  } = useAppContext();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"messages" | "projects" | "testimonials" | "consultations">("messages");

  // Project form states
  const [projName, setProjName] = useState("");
  const [projType, setProjType] = useState("");
  const [projOutcome, setProjOutcome] = useState("");
  const [projBlurb, setProjBlurb] = useState("");
  const [projSuccess, setProjSuccess] = useState("");

  // Testimonial form states
  const [testQuote, setTestQuote] = useState("");
  const [testAuthor, setTestAuthor] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testSuccess, setTestSuccess] = useState("");

  // Redirect if unauthenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null; // Avoid rendering flash, redirect instantly

  // Projects submission
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName || !projType || !projBlurb) {
      alert("Please fill in Name, Type and Blurb.");
      return;
    }
    addProject({
      name: projName,
      type: projType,
      outcome: projOutcome || projType,
      blurb: projBlurb,
    });
    setProjName("");
    setProjType("");
    setProjOutcome("");
    setProjBlurb("");
    setProjSuccess("Project added successfully!");
    setTimeout(() => setProjSuccess(""), 3000);
  };

  // Testimonials submission
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuote || !testAuthor || !testRole) {
      alert("Please fill in Quote, Author and Role.");
      return;
    }
    addTestimonial({
      quote: testQuote,
      author: testAuthor,
      role: testRole,
    });
    setTestQuote("");
    setTestAuthor("");
    setTestRole("");
    setTestSuccess("Testimonial added successfully!");
    setTimeout(() => setTestSuccess(""), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
      {/* Header Info */}
      <ScrollReveal className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between dark:border-slate-200/50">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Admin workspace</p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl text-white dark:text-slate-900">
            Console Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-400 dark:text-slate-600">
            Welcome back, <span className="font-semibold text-slate-200 dark:text-slate-800">{user.name}</span> ({user.email})
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={logout}
            className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </ScrollReveal>

      {/* Dynamic Summary Cards */}
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {[
          {
            tab: "messages" as const,
            title: "Inbox Messages",
            value: messages.length,
            icon: "✉",
            color: "from-cyan-500/10 to-indigo-500/5 hover:border-cyan-500/35",
          },
          {
            tab: "consultations" as const,
            title: "Booked Sessions",
            value: consultations.length,
            icon: "📅",
            color: "from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/35",
          },
          {
            tab: "projects" as const,
            title: "Dynamic Projects",
            value: projects.length,
            icon: "✦",
            color: "from-indigo-500/10 to-fuchsia-500/5 hover:border-indigo-500/35",
          },
          {
            tab: "testimonials" as const,
            title: "Testimonials",
            value: testimonials.length,
            icon: "◌",
            color: "from-fuchsia-500/10 to-pink-500/5 hover:border-fuchsia-500/35",
          },
        ].map((card) => (
          <button
            key={card.title}
            onClick={() => setActiveTab(card.tab)}
            className={`text-left rounded-[1.5rem] border p-5 backdrop-blur-xl transition duration-300 bg-gradient-to-br ${card.color} ${
              activeTab === card.tab
                ? "border-cyan-400/50 ring-1 ring-cyan-400/20 bg-slate-900 dark:bg-white"
                : "border-white/10 dark:border-slate-200/70"
            } cursor-pointer`}
          >
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">{card.title}</p>
              <span className="text-lg text-cyan-300">{card.icon}</span>
            </div>
            <p className="mt-3 text-3xl font-semibold text-white dark:text-slate-900">{card.value}</p>
            <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">Manage module →</p>
          </button>
        ))}
      </div>

      {/* Main Content Workspace */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_2fr]">
        
        {/* Left Side: Form Creators & Context Info */}
        <ScrollReveal className="space-y-6">
          
          {/* Project Form */}
          {activeTab === "projects" && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
              <h3 className="text-xl font-semibold text-white dark:text-slate-900 mb-4 font-sans">Add New Project</h3>
              
              {projSuccess && (
                <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400">
                  {projSuccess}
                </div>
              )}

              <form onSubmit={handleAddProject} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Project Name</label>
                  <input
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. Apollo App"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Type (Category)</label>
                  <input
                    value={projType}
                    onChange={(e) => setProjType(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. iOS App, SaaS Platform"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Outcome/Focus (Optional)</label>
                  <input
                    value={projOutcome}
                    onChange={(e) => setProjOutcome(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. Design System overhaul"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Blurb / Description</label>
                  <textarea
                    value={projBlurb}
                    onChange={(e) => setProjBlurb(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none min-h-[80px] dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="Brief description of the work and impact..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-cyan-400 py-2.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
                >
                  Publish Project
                </button>
              </form>
            </div>
          )}

          {/* Testimonial Form */}
          {activeTab === "testimonials" && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
              <h3 className="text-xl font-semibold text-white dark:text-slate-900 mb-4">Add Testimonial</h3>

              {testSuccess && (
                <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400">
                  {testSuccess}
                </div>
              )}

              <form onSubmit={handleAddTestimonial} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Author Name</label>
                  <input
                    value={testAuthor}
                    onChange={(e) => setTestAuthor(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Author Role & Company</label>
                  <input
                    value={testRole}
                    onChange={(e) => setTestRole(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. CEO, Vertex Inc."
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 dark:text-slate-600 mb-1 font-medium">Quote Description</label>
                  <textarea
                    value={testQuote}
                    onChange={(e) => setTestQuote(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none min-h-[100px] dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="What did they say about working with Nexus Studio..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-cyan-400 py-2.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
                >
                  Publish Testimonial
                </button>
              </form>
            </div>
          )}

          {/* Quick info if activeTab is messages or consultations */}
          {(activeTab === "messages" || activeTab === "consultations") && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
              <h3 className="text-xl font-semibold text-white dark:text-slate-900 mb-3">Live Console Feed</h3>
              <p className="text-sm text-slate-400 dark:text-slate-600 leading-relaxed mb-4">
                This dashboard registers and streams client queries and bookings instantly.
              </p>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400 dark:border-slate-200/70 dark:bg-slate-50 dark:text-slate-600 space-y-2">
                <p>
                  <strong className="text-cyan-300">✉ Messages Inbox:</strong> Submissions logged directly from the Contact page form.
                </p>
                <p>
                  <strong className="text-emerald-300">📅 Consultations:</strong> Calendar bookings booked through scheduling modals.
                </p>
              </div>
            </div>
          )}
        </ScrollReveal>

        {/* Right Side: Tab Lists & Actions */}
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-2xl dark:border-slate-200/70 dark:bg-white/80">
          
          {/* Tab 1: MESSAGES LIST */}
          {activeTab === "messages" && (
            <div>
              <h3 className="text-2xl font-semibold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Inbox Inquiries</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{messages.length} total</span>
              </h3>

              {messages.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <span className="text-3xl block mb-2">✉</span>
                  No incoming messages found.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/20 dark:border-slate-200/70 dark:bg-slate-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-white dark:text-slate-900 text-base">{msg.name}</p>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-cyan-300 dark:text-cyan-600 hover:underline block mt-0.5"
                          >
                            {msg.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500">
                            {new Date(msg.date).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="text-slate-500 hover:text-red-400 transition text-sm cursor-pointer p-1"
                            title="Delete Inquiry"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-slate-300 dark:text-slate-700 whitespace-pre-line leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: CONSULTATIONS LIST */}
          {activeTab === "consultations" && (
            <div>
              <h3 className="text-2xl font-semibold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Discovery Sessions</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">{consultations.length} total</span>
              </h3>

              {consultations.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <span className="text-3xl block mb-2">📅</span>
                  No booked consultations found.
                </div>
              ) : (
                <div className="space-y-4">
                  {consultations.map((con) => (
                    <div
                      key={con.id}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400/20 dark:border-slate-200/70 dark:bg-slate-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-white dark:text-slate-900 text-base">{con.name}</p>
                          <a
                            href={`mailto:${con.email}`}
                            className="text-xs text-cyan-300 dark:text-cyan-600 hover:underline block mt-0.5"
                          >
                            {con.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 text-xs font-semibold">
                            {con.time}
                          </span>
                          <button
                            onClick={() => deleteConsultation(con.id)}
                            className="text-slate-500 hover:text-red-400 transition text-sm cursor-pointer p-1"
                            title="Cancel Booking"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-xs border-t border-white/10 pt-3 dark:border-slate-200/50">
                        <div>
                          <span className="text-slate-500 block">Session Date:</span>
                          <span className="font-semibold text-slate-300 dark:text-slate-700">{con.date}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Focus Topic:</span>
                          <span className="font-semibold text-slate-300 dark:text-slate-700">{con.service}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: PROJECTS LIST */}
          {activeTab === "projects" && (
            <div>
              <h3 className="text-2xl font-semibold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Active Projects</span>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">{projects.length} total</span>
              </h3>

              {projects.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <span className="text-3xl block mb-2">✦</span>
                  No projects in the portfolio database.
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="flex justify-between items-start rounded-2xl border border-white/10 bg-white/5 p-4 dark:border-slate-200/70 dark:bg-slate-50"
                    >
                      <div className="max-w-[85%]">
                        <span className="text-xs text-indigo-300 dark:text-indigo-600 font-medium tracking-wider uppercase">
                          {proj.type}
                        </span>
                        <h4 className="font-semibold text-white dark:text-slate-900 text-lg mt-1">{proj.name}</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Outcome: {proj.outcome}</p>
                        <p className="text-sm text-slate-300 dark:text-slate-700 mt-2 leading-relaxed">{proj.blurb}</p>
                      </div>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="text-slate-500 hover:text-red-400 transition text-sm cursor-pointer p-1"
                        title="Remove Project"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: TESTIMONIALS LIST */}
          {activeTab === "testimonials" && (
            <div>
              <h3 className="text-2xl font-semibold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Client Voices</span>
                <span className="text-xs bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full">{testimonials.length} total</span>
              </h3>

              {testimonials.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <span className="text-3xl block mb-2">◌</span>
                  No testimonials published yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="flex justify-between items-start rounded-2xl border border-white/10 bg-white/5 p-4 dark:border-slate-200/70 dark:bg-slate-50"
                    >
                      <div className="max-w-[85%]">
                        <p className="text-sm text-slate-200 dark:text-slate-800 italic">“{test.quote}”</p>
                        <footer className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">
                          — {test.author} • {test.role}
                        </footer>
                      </div>
                      <button
                        onClick={() => deleteTestimonial(test.id)}
                        className="text-slate-500 hover:text-red-400 transition text-sm cursor-pointer p-1"
                        title="Remove Testimonial"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </ScrollReveal>
      </div>
    </div>
  );
}
