import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPostsData, getBlogPostBySlug, BlogPost } from "@/data/blogs";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { SocialShare } from "@/components/blog/SocialShare";
import { Clock, Calendar, ArrowLeft, ArrowRight, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

interface FAQItem {
  question: string;
  answer: string;
}

function extractFAQsFromMarkdown(content: string): FAQItem[] {
  const faqs: FAQItem[] = [];
  const faqSectionRegex =
    /##\s*(?:Frequently Asked Questions|FAQ[s]?|Questions & Answers|Q&A)([\s\S]*?)(?=\n##\s|\n---\s*\n\s*(?:Ready|\[)|$)/i;
  const match = content.match(faqSectionRegex);
  const targetText = match ? match[1] : content;

  if (match) {
    const qRegex = /###\s+(.+?)\n([\s\S]*?)(?=(?:\n###\s+)|\n---\s*|\n##\s*|$)/g;
    let qMatch;
    while ((qMatch = qRegex.exec(targetText)) !== null) {
      const question = qMatch[1].trim().replace(/\*\*/g, "");
      const answer = qMatch[2]
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/[*_`]/g, "")
        .trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  if (faqs.length === 0) {
    const genericQRegex = /###\s+(.+?\?)\n([\s\S]*?)(?=(?:\n###\s+)|\n---\s*|\n##\s*|$)/g;
    let qMatch;
    while ((qMatch = genericQRegex.exec(content)) !== null) {
      const question = qMatch[1].trim().replace(/\*\*/g, "");
      const answer = qMatch[2]
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/[*_`]/g, "")
        .trim();
      if (question && answer && answer.length > 20) {
        faqs.push({ question, answer });
      }
    }
  }

  return faqs;
}

function getQuickTakeaways(post: BlogPost): { points: string[] } {
  const points: string[] = [];
  const introExcerpt = post.content.slice(0, 3500);

  const bulletRegex = /(?:^|\n)[*-]\s+\*\*?([^\n*]+)\*\*?:?\s*([^\n]+)/g;
  let match;
  while ((match = bulletRegex.exec(introExcerpt)) !== null) {
    const title = match[1].trim();
    const desc = match[2].trim();
    const combined = `${title}: ${desc}`.replace(/[*_`]/g, "");
    if (
      combined.length > 25 &&
      !combined.toLowerCase().includes("request a free") &&
      !combined.toLowerCase().includes("explore our")
    ) {
      points.push(combined);
      if (points.length >= 3) break;
    }
  }

  if (points.length < 3) {
    const numberedRegex = /(?:^|\n)\d+\.\s+\*\*?([^\n*]+)\*\*?:?\s*([^\n]+)/g;
    let nMatch;
    while ((nMatch = numberedRegex.exec(introExcerpt)) !== null) {
      const title = nMatch[1].trim();
      const desc = nMatch[2].trim();
      const combined = `${title}: ${desc}`.replace(/[*_`]/g, "");
      if (combined.length > 25) {
        points.push(combined);
        if (points.length >= 3) break;
      }
    }
  }

  if (points.length === 0) {
    points.push(
      "Guaranteed compliance with marketplace guidelines prevents listing suppression and boosts product click-through rates."
    );
    points.push(
      "Human-crafted vector pen paths provide pixel-accurate subject isolation without automated AI edge halos."
    );
    points.push(
      "Standardized multi-tier quality control ensures uniform lighting, colors, and margins across thousands of SKUs."
    );
  } else if (points.length === 1) {
    points.push(
      "Human-crafted vector pen paths provide pixel-accurate subject isolation without automated AI edge halos."
    );
    points.push(
      "Standardized multi-tier quality control ensures uniform lighting, colors, and margins across thousands of SKUs."
    );
  } else if (points.length === 2) {
    points.push(
      "Standardized multi-tier quality control ensures uniform lighting, colors, and margins across thousands of SKUs."
    );
  }

  return { points: points.slice(0, 3) };
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

  const postUrl = `https://foryourgoal.com/blog/${post.slug}`;

  const fullCoverImageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://foryourgoal.com${post.coverImage}`;

  const faqs = extractFAQsFromMarkdown(post.content);
  const quickTakeaways = getQuickTakeaways(post);

  // Schema.org BlogPosting, BreadcrumbList, and FAQPage (AEO/GEO enriched)
  const schemasJsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: fullCoverImageUrl,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        "@type": "Organization",
        name: "Foryourgoal Production Team",
        url: "https://foryourgoal.com/about",
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
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "article p:first-of-type", ".blog-content > p:first-of-type"],
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

  if (faqs.length > 0) {
    schemasJsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <article className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJsonLd) }}
      />

      <div className="mx-auto max-w-4xl relative">
        {/* Desktop Sticky Floating Share Bar */}
        <div className="hidden xl:block absolute -left-16 top-72 z-20">
          <div className="sticky top-28">
            <SocialShare
              url={postUrl}
              title={post.title}
              description={post.excerpt}
              variant="floating"
            />
          </div>
        </div>

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

          <h1 className="post-title mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white leading-[1.15]">
            {post.title}
          </h1>

          <p className="blog-hero-excerpt mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {post.excerpt}
          </p>

          {/* Author Box & Inline Social Share */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-slate-100 py-4 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white shadow-sm shrink-0">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{post.author.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{post.author.role}</div>
              </div>
            </div>

            <SocialShare
              url={postUrl}
              title={post.title}
              description={post.excerpt}
              variant="inline"
            />
          </div>
        </header>

        {/* AEO Quick Takeaway / Direct Answer Card */}
        <section
          id="quick-takeaway-box"
          aria-label="Key Takeaways and Direct Answer"
          className="aeo-quick-takeaway mb-10 rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-purple-50/40 p-6 sm:p-7 shadow-sm dark:border-indigo-800/60 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900"
        >
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-indigo-950 dark:text-indigo-200 mb-3.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm text-sm font-black">
              ⚡
            </span>
            <h2 className="text-base sm:text-lg font-bold">Key Takeaways / Quick Summary</h2>
          </div>

          <p className="aeo-direct-answer text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 font-medium mb-4 pb-3.5 border-b border-indigo-100/80 dark:border-indigo-900/50">
            <strong className="text-slate-900 dark:text-white">Direct Answer: </strong>
            {post.excerpt}
          </p>

          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            {quickTakeaways.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

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

        {/* Markdown Rendered Content */}
        <div className="prose-content">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Bottom Social Share Card */}
        <div className="my-10">
          <SocialShare
            url={postUrl}
            title={post.title}
            description={post.excerpt}
            variant="bottom"
          />
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
