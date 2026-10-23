import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPostsData } from "@/data/blogs";
import { Clock, Calendar, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce Photo Editing & Retouching Guides | Foryourgoal",
  description:
    "Authoritative guides on Photoshop clipping paths, Amazon image compliance, ghost mannequin editing, jewelry retouching, and high-volume commercial studio production.",
  alternates: {
    canonical: "https://foryourgoal.com/blog",
  },
  openGraph: {
    title: "E-Commerce Photo Editing & Retouching Guides | Foryourgoal",
    description:
      "Authoritative guides on Photoshop clipping paths, Amazon image compliance, ghost mannequin editing, jewelry retouching, and high-volume commercial studio production.",
    url: "https://foryourgoal.com/blog",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Foryourgoal Studio Blog & E-Commerce Guides",
      },
    ],
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
    <div className="min-h-screen bg-slate-50/50 py-16 px-4 sm:px-6 lg:px-10 xl:px-12 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header Section */}
      <div className="mx-auto max-w-4xl text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Studio Intelligence & Production Standards</span>
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl dark:text-white">
          E-Commerce Imaging & Retouching Guides
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Technical insights on enterprise clipping paths, marketplace specifications (Amazon, Shopify), ghost mannequin workflows, color matching, and commercial catalog production.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPostsData.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50"
          >
            <div>
              {/* Blog Thumbnail Image */}
              <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors dark:text-white dark:group-hover:text-indigo-400 line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 pt-0 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs pt-4">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900 dark:text-white">{post.author.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{post.author.role}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group-hover:translate-x-0.5 duration-200 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
