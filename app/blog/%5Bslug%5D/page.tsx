"use client";

import { use } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useAppContext } from "@/components/app-context";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { blogPosts } = useAppContext();
  
  const post = blogPosts.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <span className="text-4xl block mb-4">📭</span>
        <h2 className="text-2xl font-bold text-white dark:text-slate-950">Article Not Found</h2>
        <p className="mt-3 text-slate-400 dark:text-slate-600">
          The blog post coordinates you are trying to query do not exist in our index.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-block rounded-full bg-cyan-400 px-6 py-2.5 font-semibold text-slate-950 transition hover:scale-[1.02] dark:bg-slate-950 dark:text-white"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  // Calculate simulated reading time (approx 200 words per min)
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-24">
      {/* Back to list */}
      <ScrollReveal className="mb-8">
        <Link
          href="/blog"
          className="text-xs font-semibold text-cyan-300 hover:text-cyan-400 transition flex items-center gap-1.5 dark:text-cyan-600 dark:hover:text-cyan-700"
        >
          ← Back to Articles
        </Link>
      </ScrollReveal>

      {/* Header Info */}
      <ScrollReveal className="border-b border-white/10 pb-8 dark:border-slate-200/60">
        <span className="rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider dark:bg-cyan-500/5 dark:text-cyan-600">
          {post.category}
        </span>
        
        <h1 className="text-3xl font-bold sm:text-5xl text-white dark:text-slate-950 mt-4 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="font-semibold text-slate-300 dark:text-slate-700">By {post.author}</span>
          <span>•</span>
          <span>
            {new Date(post.date).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric"
            })}
          </span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>
      </ScrollReveal>

      {/* Article Content Body */}
      <ScrollReveal className="mt-8">
        <article className="prose prose-invert dark:prose-slate max-w-none text-slate-300 dark:text-slate-700 leading-8 space-y-6 text-base sm:text-lg">
          <p className="font-medium text-slate-200 dark:text-slate-800 text-lg sm:text-xl border-l-2 border-cyan-400 pl-4 italic leading-relaxed">
            {post.excerpt}
          </p>
          <p className="whitespace-pre-wrap">{post.content}</p>
        </article>
      </ScrollReveal>

      {/* Author Footer Card */}
      <ScrollReveal className="mt-16 border-t border-white/10 pt-8 dark:border-slate-200/60">
        <div className="rounded-[1.5rem] bg-white/5 border border-white/10 p-6 dark:bg-slate-100/50 dark:border-slate-200/60 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 text-2xl">
            ✍
          </div>
          <div>
            <h4 className="font-semibold text-white dark:text-slate-950">Written by {post.author}</h4>
            <p className="text-xs text-slate-500 mt-1">
              Member of the Nexus Studio core product strategy and deployment engineering team.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
