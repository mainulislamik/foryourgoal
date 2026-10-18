import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { formatPrice } from "@/lib/utils";
import { Clock, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Image Editing Services | Clipping Path, Retouching & Ghost Mannequin",
  description:
    "Explore our complete suite of commercial photo editing and retouching services: 100% hand-drawn clipping paths, invisible ghost mannequin, high-end beauty/jewelry retouching, and shadow creation.",
};

export default function ServicesPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Enterprise Editing Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Commercial Image Post-Production Services
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-ivory/70">
          Engineered for e-commerce brands, high-volume catalogs, and commercial photography studios requiring pixel-level perfection.
        </p>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => (
          <div
            key={service.slug}
            className="flex flex-col justify-between p-6 rounded-2xl bg-brand-navy-card/80 border border-brand-border hover:border-brand-violet/50 transition-all duration-300"
          >
            <div>
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-brand-border/60">
                <BeforeAfterSlider
                  beforeImage={service.beforeImage}
                  afterImage={service.afterImage}
                  title={service.title}
                  category="Sample"
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/20">
                  Starting at {formatPrice(service.startingPrice)}/img
                </span>
                <span className="text-xs text-brand-ivory/50 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5" /> ~{service.turnaroundHours}h
                </span>
              </div>

              <h2 className="text-xl font-bold text-brand-ivory hover:text-brand-lime transition-colors">
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </h2>

              <p className="mt-2.5 text-sm text-brand-ivory/70 line-clamp-3 leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="mt-4 space-y-1.5">
                {service.features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-brand-ivory/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-brand-border/60 flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                className="text-xs font-semibold text-brand-ivory hover:text-brand-lime inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Service Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/request-a-quote?service=${service.slug}`}
                className="text-xs font-semibold text-brand-violet hover:text-brand-ivory transition-colors"
              >
                Get Quote &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Free Sample Banner */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy-card via-brand-violet/20 to-brand-navy-card border border-brand-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/10 text-brand-lime text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Cost Test</span>
          </div>
          <h3 className="text-2xl font-bold text-brand-ivory">Want to test our quality on your own files?</h3>
          <p className="text-sm text-brand-ivory/70 mt-1 max-w-xl">
            Upload up to 2 raw images. We will edit them free of charge within 4 hours to calibrate to your style guidelines.
          </p>
        </div>
        <Link
          href="/request-a-quote"
          className="whitespace-nowrap px-8 py-4 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-lime-400 transition-all shadow-lg"
        >
          Request Free Sample Test
        </Link>
      </div>
    </div>
  );
}
