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
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">Request Free Trial</span>
      </nav>

      {/* Hero Section & Server-Rendered H1 */}
      <header className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded border border-blue-200">
          No Obligation • Test Our Quality
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
          Request Free Trial
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Test our hand-crafted Photoshop clipping path, retouching, and ghost mannequin quality on your own RAW or high-res images. Upload up to 5 photos below or share your cloud drive link.
        </p>
      </header>

      {/* Trust & Guarantee Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-12">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-xs text-slate-900">6–12h Turnaround</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Rapid sample delivery by senior Photoshop artists.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-xs text-slate-900">100% Hand-Drawn</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Pure pen-tool vector paths with zero AI edge distortions.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-xs text-slate-900">Strict Enterprise NDA</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Encrypted transfers with automated 14-day file purge.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-xs text-slate-900">Up to 5 Free Samples</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Verify accuracy and finish before committing to volume.
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
