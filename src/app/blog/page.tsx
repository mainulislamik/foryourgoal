import React from "react";
import Link from "next/link";
import { blogPostsData } from "@/data/blogs";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce Photo Editing & Retouching Guides",
  description:
    "In-depth guides on Photoshop clipping paths, Amazon image compliance, ghost mannequin editing, and high-volume studio production. Read our expert guides.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "E-Commerce Photo Editing & Retouching Guides | Foryourgoal",
    description:
      "In-depth guides on Photoshop clipping paths, Amazon image compliance, ghost mannequin editing, and high-volume studio production.",
    url: "https://foryourgoal.com/blog",
  },
};

export default function BlogPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://foryourgoal.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://foryourgoal.com/blog",
      },
    ],
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Editorial & Guides</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          E-Commerce Imaging & Studio Intelligence
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          Insights on clipping path standards, marketplace specs (Amazon, Shopify), batch production optimization, and color fidelity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
