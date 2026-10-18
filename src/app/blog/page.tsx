import React from "react";
import Link from "next/link";
import { blogPostsData } from "@/data/blogs";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Guides & Visual Standards | Foryourgoal Blog",
  description:
    "Expert technical articles, e-commerce photo standards, clipping path guides, and retouching workflows from Foryourgoal's post-production team.",
};

export default function BlogPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Editorial & Guides</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Image Post-Production Knowledge Base
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-ivory/70">
          In-depth guides on marketplace compliance, non-destructive retouching techniques, and high-volume studio operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPostsData.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between p-6 rounded-2xl bg-brand-navy-card/80 border border-brand-border hover:border-brand-violet/50 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-brand-ivory/60 mb-3 font-mono">
                <span className="text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readingTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-brand-ivory hover:text-brand-lime transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="mt-3 text-sm text-brand-ivory/70 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs">
              <span className="text-brand-ivory/50">{post.author.name}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-brand-lime hover:underline inline-flex items-center gap-1"
              >
                <span>Read Guide</span> &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
