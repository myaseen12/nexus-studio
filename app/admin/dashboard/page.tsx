"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext, ProjectRoadmap } from "@/components/app-context";
import { ScrollReveal } from "@/components/scroll-reveal";

type DashboardTab = "messages" | "consultations" | "estimates" | "blogs" | "applicants" | "roadmaps";

export default function AdminDashboardPage() {
  const {
    user,
    projects,
    testimonials,
    messages,
    consultations,
    blogPosts,
    estimates,
    jobApplications,
    roadmaps,
    addProject,
    deleteProject,
    addTestimonial,
    deleteTestimonial,
    deleteMessage,
    deleteConsultation,
    addBlogPost,
    deleteBlogPost,
    deleteEstimate,
    deleteJobApplication,
    updateRoadmap,
    logout,
  } = useAppContext();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTab>("messages");

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Design");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogSuccess, setBlogSuccess] = useState("");

  // Roadmap editing state
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>("");
  const [roadmapStatus, setRoadmapStatus] = useState("Design Phase");
  const [roadmapProgress, setRoadmapProgress] = useState(50);
  const [roadmapNewLog, setRoadmapNewLog] = useState("");
  const [roadmapSuccess, setRoadmapSuccess] = useState("");

  // Redirect if unauthenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Set default roadmap select values when roadmaps load
  useEffect(() => {
    if (roadmaps.length > 0 && !selectedRoadmapId) {
      const first = roadmaps[0];
      setSelectedRoadmapId(first.id);
      setRoadmapStatus(first.status);
      setRoadmapProgress(first.progressVal);
    }
  }, [roadmaps, selectedRoadmapId]);

  if (!user) return null;

  // Handles updating selected roadmap values
  const handleRoadmapSelect = (id: string) => {
    const rm = roadmaps.find((r) => r.id === id);
    if (rm) {
      setSelectedRoadmapId(id);
      setRoadmapStatus(rm.status);
      setRoadmapProgress(rm.progressVal);
    }
  };

  // Submits roadmap updates
  const handleUpdateRoadmap = (e: React.FormEvent) => {
    e.preventDefault();
    const rm = roadmaps.find((r) => r.id === selectedRoadmapId);
    if (!rm) return;

    const newLogs = [...rm.updatesLog];
    if (roadmapNewLog.trim()) {
      newLogs.push(roadmapNewLog.trim());
    }

    updateRoadmap({
      ...rm,
      status: roadmapStatus,
      progressVal: Number(roadmapProgress),
      updatesLog: newLogs,
    });

    setRoadmapNewLog("");
    setRoadmapSuccess("Roadmap status updated successfully!");
    setTimeout(() => setRoadmapSuccess(""), 3000);
  };

  // Submits blog post updates
  const handleAddBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogExcerpt || !blogContent) {
      alert("Please fill in Blog Title, Excerpt, and Content.");
      return;
    }

    addBlogPost({
      title: blogTitle,
      category: blogCategory,
      excerpt: blogExcerpt,
      content: blogContent,
      author: "Nexus Admin",
    });

    setBlogTitle("");
    setBlogExcerpt("");
    setBlogContent("");
    setBlogSuccess("Blog post published successfully!");
    setTimeout(() => setBlogSuccess(""), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
      {/* Header Info */}
      <ScrollReveal className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between dark:border-slate-200/50">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Admin workspace</p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-5xl text-white dark:text-slate-900">
            CMS Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-400 dark:text-slate-600">
            Active User: <span className="font-semibold text-slate-200 dark:text-slate-800">{user.name}</span> ({user.email})
          </p>
        </div>
        <div>
          <button
            onClick={logout}
            className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </ScrollReveal>

      {/* Dynamic Summary Cards Grid */}
      <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-6">
        {[
          { tab: "messages" as const, title: "Inquiries", value: messages.length, icon: "✉" },
          { tab: "consultations" as const, title: "Meetings", value: consultations.length, icon: "📅" },
          { tab: "estimates" as const, title: "Estimates", value: estimates.length, icon: "💰" },
          { tab: "blogs" as const, title: "Blogs", value: blogPosts.length, icon: "📰" },
          { tab: "applicants" as const, title: "Candidates", value: jobApplications.length, icon: "👥" },
          { tab: "roadmaps" as const, title: "Roadmaps", value: roadmaps.length, icon: "🗺" },
        ].map((card) => (
          <button
            key={card.title}
            onClick={() => setActiveTab(card.tab)}
            className={`text-left rounded-2xl border p-4 transition duration-300 ${
              activeTab === card.tab
                ? "border-cyan-400/50 ring-1 ring-cyan-400/20 bg-slate-900 dark:bg-white"
                : "border-white/10 dark:border-slate-200/70 bg-white/5"
            } cursor-pointer`}
          >
            <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-600">
              <span className="font-semibold">{card.title}</span>
              <span className="text-cyan-300">{card.icon}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white dark:text-slate-900">{card.value}</p>
          </button>
        ))}
      </div>

      {/* Main Content Workspace */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_2fr]">
        
        {/* Left Side: Form Editors */}
        <ScrollReveal className="space-y-6">
          {/* Blog Publisher Form */}
          {activeTab === "blogs" && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
              <h3 className="text-lg font-bold text-white dark:text-slate-900 mb-4">Write Blog Post</h3>
              {blogSuccess && (
                <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400">
                  {blogSuccess}
                </div>
              )}
              <form onSubmit={handleAddBlogPost} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Post Title</label>
                  <input
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="e.g. Speed Optimizations in Next.js"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                  >
                    <option value="Design">Design</option>
                    <option value="Tech">Tech</option>
                    <option value="AI">AI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Short Excerpt</label>
                  <input
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="Brief description preview..."
                  />
                </div>
                <div>
                  <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Post Content</label>
                  <textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none min-h-[120px] dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    placeholder="Write article body content here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-cyan-400 py-2.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
                >
                  Publish Article
                </button>
              </form>
            </div>
          )}

          {/* Roadmap Status Editor Form */}
          {activeTab === "roadmaps" && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
              <h3 className="text-lg font-bold text-white dark:text-slate-900 mb-4">Edit Client Roadmap</h3>
              {roadmapSuccess && (
                <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400">
                  {roadmapSuccess}
                </div>
              )}
              {selectedRoadmapId ? (
                <form onSubmit={handleUpdateRoadmap} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Select Project</label>
                    <select
                      value={selectedRoadmapId}
                      onChange={(e) => handleRoadmapSelect(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                    >
                      {roadmaps.map((r) => (
                        <option key={r.id} value={r.id}>{r.projectName} ({r.projectCode})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Current Status Status</label>
                    <input
                      value={roadmapStatus}
                      onChange={(e) => setRoadmapStatus(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                      placeholder="e.g. Development Phase"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Progress Percentage: {roadmapProgress}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={roadmapProgress}
                      onChange={(e) => setRoadmapProgress(Number(e.target.value))}
                      className="w-full cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 dark:text-slate-600 mb-1 font-semibold">Append Update Log Note</label>
                    <input
                      value={roadmapNewLog}
                      onChange={(e) => setRoadmapNewLog(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none dark:border-slate-200/70 dark:bg-slate-50/70 dark:text-slate-900"
                      placeholder="e.g. Staging build deployed successfully."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-cyan-400 py-2.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white cursor-pointer"
                  >
                    Save Changes & Publish
                  </button>
                </form>
              ) : (
                <p className="text-xs text-slate-500">No active roadmaps to edit.</p>
              )}
            </div>
          )}

          {/* Helper panel for other tabs */}
          {activeTab !== "blogs" && activeTab !== "roadmaps" && (
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl dark:border-slate-200/70 dark:bg-white/80">
              <h3 className="text-lg font-bold text-white dark:text-slate-900 mb-3">Workspace Module</h3>
              <p className="text-xs text-slate-400 dark:text-slate-600 leading-relaxed mb-4">
                This dashboard functions as a client-side CRM database.
              </p>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-[10px] text-slate-400 dark:border-slate-200/60 dark:bg-slate-50 dark:text-slate-600">
                Data changes are saved in real-time to your local browser storage. Refreshing the browser preserves the records.
              </div>
            </div>
          )}
        </ScrollReveal>

        {/* Right Side: Tab Lists & Delete Controllers */}
        <ScrollReveal className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-2xl dark:border-slate-200/70 dark:bg-white/80">
          
          {/* Tab 1: MESSAGES */}
          {activeTab === "messages" && (
            <div>
              <h3 className="text-xl font-bold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Inquiry Inbox</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{messages.length} total</span>
              </h3>
              {messages.length === 0 ? (
                <p className="text-center py-12 text-slate-500">No messages in inbox.</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="rounded-xl border border-white/5 bg-white/5 p-4 flex justify-between items-start dark:border-slate-200 dark:bg-slate-50">
                      <div>
                        <p className="font-semibold text-white dark:text-slate-900 text-sm">{msg.name}</p>
                        <p className="text-xs text-cyan-300 dark:text-cyan-600 mt-0.5">{msg.email}</p>
                        <p className="mt-3 text-xs text-slate-300 dark:text-slate-700 whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      <button onClick={() => deleteMessage(msg.id)} className="text-slate-500 hover:text-red-400 transition cursor-pointer">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: CONSULTATIONS */}
          {activeTab === "consultations" && (
            <div>
              <h3 className="text-xl font-bold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Discovery Bookings</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{consultations.length} total</span>
              </h3>
              {consultations.length === 0 ? (
                <p className="text-center py-12 text-slate-500">No sessions scheduled.</p>
              ) : (
                <div className="space-y-4">
                  {consultations.map((con) => (
                    <div key={con.id} className="rounded-xl border border-white/5 bg-white/5 p-4 flex justify-between items-start dark:border-slate-200 dark:bg-slate-50">
                      <div>
                        <p className="font-semibold text-white dark:text-slate-900 text-sm">{con.name}</p>
                        <p className="text-xs text-cyan-300 dark:text-cyan-600 mt-0.5">{con.email}</p>
                        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Date: {con.date} • {con.time} ({con.service})</p>
                      </div>
                      <button onClick={() => deleteConsultation(con.id)} className="text-slate-500 hover:text-red-400 transition cursor-pointer">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: ESTIMATES */}
          {activeTab === "estimates" && (
            <div>
              <h3 className="text-xl font-bold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Submitted Proposals</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{estimates.length} total</span>
              </h3>
              {estimates.length === 0 ? (
                <p className="text-center py-12 text-slate-500">No calculations registered.</p>
              ) : (
                <div className="space-y-4">
                  {estimates.map((est) => (
                    <div key={est.id} className="rounded-xl border border-white/5 bg-white/5 p-4 flex justify-between items-start dark:border-slate-200 dark:bg-slate-50">
                      <div>
                        <p className="font-semibold text-white dark:text-slate-900 text-sm">{est.name}</p>
                        <p className="text-xs text-cyan-300 dark:text-cyan-600 mt-0.5">{est.email}</p>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                          <div>Scope: <span className="font-semibold text-slate-300 dark:text-slate-700">{est.scope}</span></div>
                          <div>Pages: <span className="font-semibold text-slate-300 dark:text-slate-700">{est.pages}</span></div>
                          <div>Timeline: <span className="font-semibold text-slate-300 dark:text-slate-700">{est.timeline}</span></div>
                          <div>Cost Range: <span className="font-bold text-emerald-300 dark:text-emerald-600">{est.calculatedBudget}</span></div>
                        </div>
                      </div>
                      <button onClick={() => deleteEstimate(est.id)} className="text-slate-500 hover:text-red-400 transition cursor-pointer">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: BLOGS LIST */}
          {activeTab === "blogs" && (
            <div>
              <h3 className="text-xl font-bold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Published Articles</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{blogPosts.length} total</span>
              </h3>
              {blogPosts.length === 0 ? (
                <p className="text-center py-12 text-slate-500">No published posts.</p>
              ) : (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="rounded-xl border border-white/5 bg-white/5 p-4 flex justify-between items-start dark:border-slate-200 dark:bg-slate-50">
                      <div className="max-w-[90%]">
                        <span className="text-[10px] text-cyan-300 dark:text-cyan-600 uppercase font-semibold">{post.category}</span>
                        <h4 className="font-semibold text-white dark:text-slate-900 text-sm mt-1">{post.title}</h4>
                        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{post.excerpt}</p>
                      </div>
                      <button onClick={() => deleteBlogPost(post.id)} className="text-slate-500 hover:text-red-400 transition cursor-pointer">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 5: CANDIDATES */}
          {activeTab === "applicants" && (
            <div>
              <h3 className="text-xl font-bold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Job Applicants</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{jobApplications.length} total</span>
              </h3>
              {jobApplications.length === 0 ? (
                <p className="text-center py-12 text-slate-500">No applications registered.</p>
              ) : (
                <div className="space-y-4">
                  {jobApplications.map((app) => (
                    <div key={app.id} className="rounded-xl border border-white/5 bg-white/5 p-4 flex justify-between items-start dark:border-slate-200 dark:bg-slate-50">
                      <div>
                        <p className="font-semibold text-white dark:text-slate-900 text-sm">{app.name}</p>
                        <p className="text-xs text-cyan-300 dark:text-cyan-600 mt-0.5">{app.email}</p>
                        <p className="text-xs text-slate-400 mt-2 font-medium">Applied for: <span className="text-slate-200 dark:text-slate-800">{app.role}</span></p>
                        <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 hover:underline block mt-1">Portfolio: {app.portfolioUrl}</a>
                        {app.notes && <p className="mt-3 text-xs text-slate-400 dark:text-slate-600 italic">Notes: "{app.notes}"</p>}
                      </div>
                      <button onClick={() => deleteJobApplication(app.id)} className="text-slate-500 hover:text-red-400 transition cursor-pointer">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 6: CLIENT ROADMAPS */}
          {activeTab === "roadmaps" && (
            <div>
              <h3 className="text-xl font-bold text-white dark:text-slate-900 mb-6 flex justify-between items-center">
                <span>Active Roadmaps</span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full">{roadmaps.length} total</span>
              </h3>
              <div className="space-y-4">
                {roadmaps.map((rm) => (
                  <button
                    key={rm.id}
                    onClick={() => handleRoadmapSelect(rm.id)}
                    className={`w-full text-left rounded-xl border p-4 transition duration-200 ${
                      selectedRoadmapId === rm.id
                        ? "border-cyan-400/50 bg-cyan-500/10"
                        : "border-white/5 bg-white/5 hover:bg-white/10"
                    } dark:bg-slate-50`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white dark:text-slate-900 text-sm">{rm.projectName}</h4>
                      <span className="text-[10px] text-slate-500">Code: {rm.projectCode}</span>
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-slate-400">
                      <span>Status: <span className="text-slate-200 font-semibold dark:text-slate-800">{rm.status}</span></span>
                      <span>{rm.progressVal}%</span>
                    </div>
                    {/* Tiny Progress Bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2 dark:bg-slate-200">
                      <div className="h-full bg-cyan-400" style={{ width: `${rm.progressVal}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </ScrollReveal>
      </div>
    </div>
  );
}
