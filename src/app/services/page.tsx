import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { getDynamicServices } from "@/lib/site-content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Clock, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Commercial Photo Editing & Retouching Services",
  description:
    "Professional commercial photo editing: 100% hand-drawn clipping paths, ghost mannequin, high-end jewelry retouching, and shadows. Request a custom quote.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Commercial Photo Editing Services | Foryourgoal",
    description:
      "Professional commercial photo editing: 100% hand-drawn clipping paths, ghost mannequin, and high-end retouching.",
    url: "https://foryourgoal.com/services",
  },
};

export default async function ServicesPage() {
  const dynamicServices = await getDynamicServices();
  const services = dynamicServices.length > 0 ? dynamicServices : servicesData;

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
        name: "Services",
        item: "https://foryourgoal.com/services",
      },
    ],
  };

  const servicesListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Commercial Image Post-Production Services",
    description: "Enterprise photo editing, clipping path, ghost mannequin, and retouching services.",
    numberOfItems: services.length,
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.shortDesc,
        url: `https://foryourgoal.com/services/${s.slug}`,
        provider: {
          "@type": "Organization",
          name: "Foryourgoal",
          url: "https://foryourgoal.com",
        },
      },
    })),
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, servicesListJsonLd]) }}
      />
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Enterprise Editing Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Commercial Image Post-Production Services
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          Engineered for e-commerce brands, high-volume catalogs, and commercial photography studios requiring pixel-level perfection.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.slug}
            className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-slate-200">
                <BeforeAfterSlider
                  beforeImage={service.beforeImage}
                  afterImage={service.afterImage}
                  title={service.title}
                  category="Sample"
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                  Dedicated Artist Team
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{service.turnaroundHours}h SLA
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </h2>

              <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="mt-4 space-y-1.5">
                {service.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                className="text-xs font-semibold text-slate-700 hover:text-indigo-600 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Service Details</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href={`/request-a-quote?service=${service.slug}`}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Get Quote &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Free Sample Banner */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Cost Test</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Want to test our quality on your own files?</h3>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Upload up to 2 raw images. We will edit them free of charge within 4 hours to calibrate to your style guidelines.
          </p>
        </div>
        <Link
          href="/request-a-quote"
          className="whitespace-nowrap px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
        >
          Request Free Sample Test
        </Link>
      </div>
    </div>
  );
}
