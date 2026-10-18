import React from "react";
import Link from "next/link";
import { industriesData } from "@/data/industries";
import { CheckCircle2, ChevronRight, ArrowRight, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Industries Served | E-commerce, Fashion, Jewelry & Studios",
  description:
    "Tailored photo editing workflows for specialized sectors: Amazon/Shopify retailers, high-fashion apparel brands, luxury jewelry studios, and commercial photographers.",
};

export default function IndustriesPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Target Market Verticals</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Image Post-Production by Industry
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-ivory/70">
          Every commercial sector has unique lighting rules, color accuracy standards, and marketplace compliance mandates. Discover how we tailor workflows for your vertical.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industriesData.map((ind) => (
          <div
            key={ind.slug}
            className="p-8 rounded-2xl bg-brand-navy-card/80 border border-brand-border hover:border-brand-lime/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-brand-lime font-semibold uppercase tracking-wider bg-brand-lime/10 px-2.5 py-1 rounded border border-brand-lime/20">
                  {ind.tagline}
                </span>
                <span className="text-xs text-brand-ivory/50 font-mono">
                  {ind.complianceStandards?.[0] || "Global SLA"}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-brand-ivory mb-3">
                <Link href={`/industries/${ind.slug}`} className="hover:text-brand-lime transition-colors">
                  {ind.title}
                </Link>
              </h2>

              <p className="text-sm text-brand-ivory/70 leading-relaxed mb-6">
                {ind.shortDesc}
              </p>

              <div className="mb-6">
                <div className="text-xs font-semibold text-brand-ivory uppercase tracking-wider mb-2">
                  Key Challenges Solved:
                </div>
                <div className="space-y-2">
                  {ind.challenges.map((c, i) => (
                    <div key={i} className="text-xs text-brand-ivory/80 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime shrink-0 mt-0.5" />
                      <span><strong>{c.problem}:</strong> {c.solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
              <Link
                href={`/industries/${ind.slug}`}
                className="text-xs font-semibold text-brand-ivory hover:text-brand-lime inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Read Industry Brief</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/request-a-quote"
                className="text-xs font-semibold text-brand-violet hover:text-brand-ivory transition-colors"
              >
                Request Custom Consultation &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
