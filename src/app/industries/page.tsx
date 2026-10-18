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
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Target Market Verticals</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Image Post-Production by Industry
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          Every commercial sector has unique lighting rules, color accuracy standards, and marketplace compliance mandates. Discover how we tailor workflows for your vertical.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industriesData.map((ind) => (
          <div
            key={ind.slug}
            className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-indigo-700 font-bold uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                  {ind.tagline}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {ind.complianceStandards?.[0] || "Global SLA"}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                <Link href={`/industries/${ind.slug}`} className="hover:text-indigo-600 transition-colors">
                  {ind.title}
                </Link>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {ind.shortDesc}
              </p>

              <div className="mb-6">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Challenges Solved:
                </div>
                <div className="space-y-2">
                  {ind.challenges.map((c, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>{c.problem}:</strong> {c.solution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                href={`/industries/${ind.slug}`}
                className="text-xs font-semibold text-slate-700 hover:text-indigo-600 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Read Industry Brief</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/request-a-quote"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
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
