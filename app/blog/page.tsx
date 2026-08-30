"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext } from "@/components/app-context";

type BlogCategory = "All" | "Design" | "Tech" | "AI";

export default function BlogPage() {
  const { blogPosts } = useAppContext();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

  // Search and category filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory =
      activeCategory === "All" ||
      post.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
      {/* Header */}
      <ScrollReveal className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Blog</p>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
          Thoughts, logic, and design theories.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300 dark:text-slate-600 font-sans">
          Insights on motion frontend systems, B2B rebrand strategy, automated fraud validators, and production scaling.
        </p>
      </ScrollReveal>

      {/* Search & Categories Bar */}
      <ScrollReveal className="mt-12 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Categories */}
        <div className="flex flex-wrap gap-2.5">
          {(["All", "Design", "Tech", "AI"] as BlogCategory[]).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold border transition cursor-pointer ${
                  isActive
                    ? "bg-cyan-400 border-cyan-400 text-slate-950 font-bold"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white dark:border-slate-200/70 dark:bg-slate-100/70 dark:text-slate-700"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs outline-none ring-0 focus:border-cyan-400/30 dark:border-slate-200/70 dark:bg-slate-50 dark:text-slate-900"
          placeholder="Search articles..."
        />
      </ScrollReveal>

      {/* Blog Cards Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center py-20 text-slate-500">
            <span className="text-4xl block mb-3">📰</span>
            No articles match your query.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <ScrollReveal
              key={post.id}
              className="group flex flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/30 dark:border-slate-200/70 dark:bg-slate-100/80"
            >
              <div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold mb-4 uppercase tracking-wider">
                  <span className="text-cyan-300 dark:text-cyan-600">{post.category}</span>
                  <span>
                    {new Date(post.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white dark:text-slate-950 group-hover:text-cyan-300 dark:group-hover:text-cyan-600 transition">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400 dark:text-slate-600">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/5 dark:border-slate-200/40 flex justify-between items-center">
                <span className="text-xs text-slate-500">By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-cyan-300 group-hover:translate-x-1 transition flex items-center gap-1 dark:text-cyan-600"
                >
                  Read Article →
                </Link>
              </div>
            </ScrollReveal>
          ))
        )}
      </div>
    </div>
  );
}
