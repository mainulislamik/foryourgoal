import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industriesData, getIndustryBySlug } from "@/data/industries";
import { servicesData } from "@/data/services";
import {
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industriesData.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);

  if (!ind) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `${ind.title} Photo Editing Services`,
    description: ind.shortDesc,
    alternates: {
      canonical: `https://foryourgoal.com/industries/${ind.slug}`,
    },
    openGraph: {
      title: `${ind.title} Photo Editing Services | Foryourgoal`,
      description: ind.shortDesc,
      url: `https://foryourgoal.com/industries/${ind.slug}`,
    },
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);

  if (!ind) {
    notFound();
  }

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
        name: "Industries",
        item: "https://foryourgoal.com/industries",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: ind.title,
        item: `https://foryourgoal.com/industries/${ind.slug}`,
      },
    ],
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/industries" className="hover:text-indigo-600 transition-colors">
          Industries
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">{ind.title}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded border border-indigo-200">
          {ind.tagline}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">
          {ind.title} Photo Retouching & Post-Production
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          {ind.shortDesc}
        </p>
      </div>

      {/* Challenges & Solutions */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Critical Bottlenecks in {ind.title} & How We Fix Them
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ind.challenges.map((c, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-red-600 font-bold mb-2 uppercase">
                  Challenge {i + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{c.problem}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Services for this Industry */}
      <div className="my-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Recommended Editing Services for {ind.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ind.recommendedServices.map((serviceSlug) => {
            const service = servicesData.find((s) => s.slug === serviceSlug);
            if (!service) return null;
            return (
              <div key={service.slug} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{service.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{service.shortDesc}</p>
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
                >
                  <span>View Details</span> &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance Standards */}
      {ind.complianceStandards && ind.complianceStandards.length > 0 && (
        <div className="my-12 p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>Industry Compliance & Platform Standards</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {ind.complianceStandards.map((std: string, i: number) => (
              <span
                key={i}
                className="text-xs font-mono bg-white text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
              >
                {std}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center p-10 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Ready to streamline {ind.title} image workflows?
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
          Contact our team for a custom SLA proposal and 2 free pilot test files.
        </p>
        <div className="mt-6">
          <Link
            href="/request-a-quote"
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Request Industry SLA Quote</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
