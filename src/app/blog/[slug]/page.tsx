import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPostsData, getBlogPostBySlug } from "@/data/blogs";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Sparkles, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found | Foryourgoal" };
  }

  return {
    title: `${post.title} | Foryourgoal Guide`,
    description: post.excerpt,
    alternates: {
      canonical: `https://foryourgoal.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Schema.org BlogPosting
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Foryourgoal",
      url: "https://foryourgoal.com",
    },
  };

  return (
    <article className="py-12 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/blog" className="hover:text-indigo-600 transition-colors">
          Blog
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 text-xs font-mono mb-4">
          <span className="text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 uppercase tracking-wider font-semibold">
            {post.category}
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readingTime}
          </span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-slate-500">Published {post.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="mt-4 text-lg text-slate-600 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author Bio */}
        <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-sm text-indigo-700 font-mono">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
            <div className="text-xs text-slate-500">{post.author.role}</div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose max-w-none text-slate-700 space-y-6 text-base leading-relaxed border-t border-slate-200 pt-8">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Key Takeaways for Production Teams</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>Manual pen-tool anchor placement maintains geometric authenticity across high-res displays.</li>
            <li>Automated edge-detection algorithms struggle with soft fabrics, lace, and fine jewelry facets.</li>
            <li>Layered multi-channel masks in PSD files provide non-destructive editing flexibility for print and digital.</li>
          </ul>
        </div>

        <p>{post.content}</p>

        <h2 className="text-2xl font-bold text-slate-900 mt-8">Technical Implementation Details</h2>
        <p>
          When managing high-volume catalog shoots, establishing an explicit naming hierarchy and alpha channel mask convention ensures downstream automation tools can ingest your imagery without human intervention.
        </p>
      </div>

      {/* Back and CTA */}
      <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
        <Link
          href="/request-a-quote"
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
        >
          Request Sample Test Edit &rarr;
        </Link>
      </div>
    </article>
  );
}
