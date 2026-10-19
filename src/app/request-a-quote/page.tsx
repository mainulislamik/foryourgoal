import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Clock, Award, Sparkles } from "lucide-react";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Custom Commercial Quote",
  description:
    "Request a custom B2B image editing quote or submit trial images. 45-minute scoping response, strict NDA protection, and dedicated retoucher SLAs.",
  alternates: {
    canonical: "/request-a-quote",
  },
  openGraph: {
    title: "Request a Custom Commercial Quote | Foryourgoal",
    description:
      "Request a custom B2B image editing quote or submit trial images. 45-minute scoping response, strict NDA protection, and dedicated retoucher SLAs.",
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
        name: "Request a Quote",
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
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">Request a Quote</span>
      </nav>

      {/* Hero Section & Server-Rendered H1 */}
      <header className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded border border-indigo-200">
          Guaranteed 45-Minute Response SLA
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
          Request a Custom Commercial Photo Editing Quote
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          Partner with Foryourgoal&apos;s dedicated 24/7 post-production studio. Whether you require high-volume clipping paths, complex jewelry retouching, or invisible ghost mannequin composites, our senior production team reviews your brief and provides a tailored scope and turnaround estimate within 45 minutes.
        </p>
      </header>

      {/* Trust & Guarantee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-xs text-slate-900">45-Minute Response</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Rapid project scoping by senior Photoshop leads.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
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
            <div className="font-semibold text-xs text-slate-900">Free 2-Image Pilot</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Inspect our precision on your raw assets with zero obligation.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form Component Wrapped in Suspense */}
      <div className="max-w-3xl mx-auto">
        <Suspense
          fallback={
            <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-sm animate-pulse">
              Loading quote configuration form...
            </div>
          }
        >
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
