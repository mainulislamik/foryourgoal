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
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-white text-slate-900">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-indigo-200">
          <span>Editorial & Guides</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Image Post-Production Knowledge Base
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          In-depth guides on marketplace compliance, non-destructive retouching techniques, and high-volume studio operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPostsData.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-mono">
                <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-semibold">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {post.readingTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">{post.author.name}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
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
