import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Foryourgoal Dedicated Image Production Studio",
  description:
    "Learn about Foryourgoal's mission, our 24/7 dedicated image-editing artists, pen-tool craftsmanship, and strict data security protocols.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Our Heritage & Craftsmanship</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Crafting Flawless Visuals for the World’s Leading Brands
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-ivory/70 leading-relaxed">
          Foryourgoal is an international commercial image-editing studio. We combine master pen-tool artisans with high-throughput cloud delivery pipelines to solve high-volume post-production bottlenecks.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 rounded-2xl bg-brand-navy-card border border-brand-border">
          <Award className="w-10 h-10 text-brand-lime mb-4" />
          <h2 className="text-xl font-bold text-brand-ivory mb-2">100% Handcrafted Precision</h2>
          <p className="text-sm text-brand-ivory/70 leading-relaxed">
            While automated AI tools produce fuzzy, jagged halos around complex edges, our retouchers draw every vector clipping path manually with Photoshop's Pen Tool.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-brand-navy-card border border-brand-border">
          <Users className="w-10 h-10 text-brand-violet mb-4" />
          <h2 className="text-xl font-bold text-brand-ivory mb-2">24/7 Global Follow-the-Sun</h2>
          <p className="text-sm text-brand-ivory/70 leading-relaxed">
            With production facilities running across three 8-hour shifts, your images are edited overnight and returned ready for publishing before your business day begins.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-brand-navy-card border border-brand-border">
          <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4" />
          <h2 className="text-xl font-bold text-brand-ivory mb-2">Enterprise IP Protection</h2>
          <p className="text-sm text-brand-ivory/70 leading-relaxed">
            We treat your unreleased catalog visuals with military-grade discretion. Isolated air-gapped terminal configurations and strict NDAs safeguard your creative assets.
          </p>
        </div>
      </div>

      {/* Quality Philosophy */}
      <div className="p-8 sm:p-12 rounded-3xl bg-brand-navy-light border border-brand-border mb-20">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ivory mb-4">
            Our Zero-Defect Quality Assurance Framework
          </h2>
          <p className="text-sm sm:text-base text-brand-ivory/75 leading-relaxed mb-6">
            We believe an image returned with an inaccurate clipping edge or unnatural skin tone is worse than no delivery at all. That is why every completed order undergoes a strict 3-tier inspection protocol:
          </p>
          <div className="space-y-3">
            {[
              "Phase 1: Artist self-audit against your designated style guide parameters.",
              "Phase 2: Senior QA lead pixel inspection at 300% zoom on calibrated EIZO monitors.",
              "Phase 3: File integrity and export profile validation (sRGB / Adobe RGB / PSD Layer hierarchy).",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" />
                <span className="text-sm text-brand-ivory/80">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-10 rounded-2xl bg-gradient-to-r from-brand-navy via-brand-violet/20 to-brand-navy border border-brand-border">
        <h2 className="text-2xl font-bold text-brand-ivory">Want to partner with our production team?</h2>
        <p className="mt-2 text-sm text-brand-ivory/70 max-w-lg mx-auto">
          Test our craftsmanship with 2 complimentary pilot images today.
        </p>
        <div className="mt-6">
          <Link
            href="/request-a-quote"
            className="px-8 py-3.5 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-lime-400 transition-all inline-flex items-center gap-2"
          >
            <span>Start Free Calibration Test</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
