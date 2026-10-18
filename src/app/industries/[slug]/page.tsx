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
    return { title: "Industry Not Found | Foryourgoal" };
  }

  return {
    title: `${ind.title} Photo Editing Services | Foryourgoal`,
    description: ind.shortDesc,
    alternates: {
      canonical: `https://foryourgoal.com/industries/${ind.slug}`,
    },
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);

  if (!ind) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-brand-ivory/60 mb-8 font-mono">
        <Link href="/" className="hover:text-brand-lime transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/industries" className="hover:text-brand-lime transition-colors">
          Industries
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-ivory font-medium">{ind.title}</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-lime bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/20">
          {ind.tagline}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory mt-4 tracking-tight">
          {ind.title} Photo Retouching & Post-Production
        </h1>
        <p className="mt-4 text-lg text-brand-ivory/70 leading-relaxed">
          {ind.shortDesc}
        </p>
      </div>

      {/* Challenges & Solutions */}
      <div className="my-12">
        <h2 className="text-2xl font-bold text-brand-ivory mb-6">
          Critical Bottlenecks in {ind.title} & How We Fix Them
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ind.challenges.map((c, i) => (
            <div key={i} className="p-6 rounded-2xl bg-brand-navy-card border border-brand-border flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-red-400 font-semibold mb-2 uppercase">
                  Challenge {i + 1}
                </div>
                <h3 className="text-base font-bold text-brand-ivory mb-2">{c.problem}</h3>
                <p className="text-sm text-brand-ivory/70 leading-relaxed">{c.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Services for this Industry */}
      <div className="my-16">
        <h2 className="text-2xl font-bold text-brand-ivory mb-6">
          Recommended Editing Services for {ind.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ind.recommendedServices.map((serviceSlug) => {
            const service = servicesData.find((s) => s.slug === serviceSlug);
            if (!service) return null;
            return (
              <div key={service.slug} className="p-5 rounded-xl bg-brand-navy-card/70 border border-brand-border flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-brand-ivory mb-1">{service.title}</h3>
                  <p className="text-xs text-brand-ivory/65 line-clamp-2">{service.shortDesc}</p>
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-4 text-xs font-semibold text-brand-lime hover:underline inline-flex items-center gap-1"
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
        <div className="my-12 p-8 rounded-2xl bg-brand-navy-card border border-brand-border">
          <h2 className="text-xl font-bold text-brand-ivory mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-lime" />
            <span>Industry Compliance & Platform Standards</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {ind.complianceStandards.map((std: string, i: number) => (
              <span
                key={i}
                className="text-xs font-mono bg-brand-navy text-brand-ivory px-3 py-1.5 rounded-lg border border-brand-border"
              >
                {std}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center p-10 rounded-2xl bg-gradient-to-r from-brand-navy via-brand-violet/20 to-brand-navy border border-brand-border">
        <h2 className="text-2xl font-bold text-brand-ivory">
          Ready to streamline {ind.title} image workflows?
        </h2>
        <p className="mt-2 text-sm text-brand-ivory/70 max-w-lg mx-auto">
          Contact our team for a custom SLA proposal and 2 free pilot test files.
        </p>
        <div className="mt-6">
          <Link
            href="/request-a-quote"
            className="px-8 py-3.5 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-lime-400 transition-all inline-flex items-center gap-2"
          >
            <span>Request Industry SLA Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
