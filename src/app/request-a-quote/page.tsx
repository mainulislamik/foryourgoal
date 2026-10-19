import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Clock, Award, Sparkles } from "lucide-react";
import FreeTrialForm from "@/components/quote/FreeTrialForm";

export const metadata: Metadata = {
  title: "Request Free Trial & Custom Quote",
  description:
    "Request a free commercial photo editing trial. Upload up to 5 sample images or provide cloud links for 100% hand-crafted clipping paths and retouching.",
  alternates: {
    canonical: "/request-a-quote",
  },
  openGraph: {
    title: "Request Free Trial & Custom Quote | Foryourgoal",
    description:
      "Request a free commercial photo editing trial. Upload up to 5 sample images or provide cloud links for 100% hand-crafted clipping paths and retouching.",
    url: "https://foryourgoal.com/request-a-quote",
  },
};

export default function RequestQuotePage() {
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
        name: "Request Free Trial",
        item: "https://foryourgoal.com/request-a-quote",
      },
    ],
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold">Request Free Trial</span>
      </nav>

      {/* Hero Section & Server-Rendered H1 */}
      <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          No Obligation • Test Our Quality
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 sm:mt-4 tracking-tight">
          Request Free Trial
        </h1>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-slate-600 leading-relaxed px-2">
          Test our hand-crafted Photoshop clipping path, retouching, and ghost mannequin quality on your own RAW or high-res images. Upload up to 5 photos below or share your cloud drive link.
        </p>
      </header>

      {/* Trust & Guarantee Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-12">
        <div className="p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">6–12h Turnaround</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
              Rapid sample delivery by senior Photoshop artists.
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">100% Hand-Drawn</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
              Pure pen-tool vector paths with zero AI distortions.
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">Enterprise NDA</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
              Encrypted transfers with automated 14-day file purge.
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">Up to 5 Free Samples</div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-snug">
              Verify accuracy and finish before volume commitment.
            </div>
          </div>
        </div>
      </div>

      {/* Free Trial Form Component */}
      <div className="max-w-2xl mx-auto">
        <Suspense
          fallback={
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-sm animate-pulse">
              Loading Free Trial Form...
            </div>
          }
        >
          <FreeTrialForm />
        </Suspense>
      </div>
    </div>
  );
}
