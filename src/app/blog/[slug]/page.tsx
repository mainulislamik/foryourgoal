import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPostsData, getBlogPostBySlug } from "@/data/blogs";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";
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

  const title = `${post.title} | Foryourgoal`;

  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: `https://foryourgoal.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url: `https://foryourgoal.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Schema.org BlogPosting & BreadcrumbList
  const schemasJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
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
        logo: {
          "@type": "ImageObject",
          url: "https://foryourgoal.com/images/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://foryourgoal.com/blog/${post.slug}`,
      },
    },
    {
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
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://foryourgoal.com/blog/${post.slug}`,
        },
      ],
    },
  ];

  return (
    <article className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJsonLd) }}
      />

      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-indigo-600 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md dark:text-white">
            {post.title}
          </span>
        </nav>

        {/* Header Meta */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white leading-[1.15]">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {post.excerpt}
          </p>

          {/* Author Box */}
          <div className="mt-6 flex items-center justify-between border-y border-slate-100 py-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white shadow-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{post.author.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{post.author.role}</div>
              </div>
            </div>

            <Link
              href="/request-free-trial"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test 5 Images Free</span>
            </Link>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-md dark:border-slate-800 dark:bg-slate-900">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Key Takeaways Callout */}
        <div className="mb-10 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-blue-50/50 p-6 shadow-sm dark:border-indigo-900/40 dark:from-indigo-950/20 dark:to-slate-900">
          <h2 className="flex items-center gap-2 text-base font-bold text-indigo-950 dark:text-indigo-200 mb-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Key Takeaways for Studio & E-Commerce Leads</span>
          </h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">&bull;</span>
              <span>Consistent image specifications and clean isolation directly elevate conversion rates and reduce marketplace rejection risk.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">&bull;</span>
              <span>Handcrafted Photoshop paths ensure razor-sharp subject isolation without the fuzzy halos common in automated AI tools.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">&bull;</span>
              <span>Streamlined batch production workflows allow commercial studios to scale throughput while maintaining enterprise quality standards.</span>
            </li>
          </ul>
        </div>

        {/* Markdown Rendered Content */}
        <div className="prose-content">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="my-16 overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              Zero-Risk Commercial Trial
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Test Our Commercial Editing Quality With 5 Free Images
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Send us your challenging product captures. Experience pixel-accurate clipping paths, ghost mannequin composites, or color matching with a 12-hour turnaround.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/request-free-trial"
                className="rounded-xl bg-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 transition-all hover:scale-105"
              >
                Claim 5 Free Sample Images &rarr;
              </Link>
              <Link
                href="/request-a-quote"
                className="rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Back and Navigation */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Guides</span>
          </Link>
          <Link
            href="/request-a-quote"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors dark:text-indigo-400"
          >
            <span>Partner With Our Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
