import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Foryourgoal Dedicated Image Production Studio",
  description:
    "Learn about Foryourgoal's mission, our 24/7 dedicated image-editing artists, pen-tool craftsmanship, and strict data security protocols.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-white text-slate-900">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Our Heritage & Craftsmanship</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Crafting Flawless Visuals for the World’s Leading Brands
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Foryourgoal is an international commercial image-editing studio. We combine master pen-tool artisans with high-throughput cloud delivery pipelines to solve high-volume post-production bottlenecks.
        </p>
      </div>

      {/* Brand Identity & Golden Ratio Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 mb-20 shadow-sm">
        <div className="lg:col-span-5 flex justify-center">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md">
            <Image
              src="/brand/for-your-goal-main-light-background.svg"
              alt="FOR YOUR GOAL - Official Brand Identity"
              width={340}
              height={260}
              className="w-full max-w-[260px] h-auto object-contain"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Golden Ratio Architecture (φ = 1.618)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
            The Philosophy Behind Our Identity
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            Our official mark unites the geometric monogram <strong className="text-slate-900">“F”</strong> and <strong className="text-slate-900">“G”</strong> within an artboard proportion of 500 × 309 units—harmonizing closely with the Golden Ratio (φ = 1.618). The forward slant embodies speed, discipline, and execution.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            The ascending blue arrow cutting through the circular aperture conveys upward mobility, commercial growth, and performance trajectory—reinforcing our commitment to elevate your e-commerce visuals toward their ultimate goal.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-600">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="block text-slate-400 uppercase text-[10px]">Symbol Artboard</span>
              <span className="text-slate-900 font-bold">500 × 309 (φ = 1.618)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="block text-slate-400 uppercase text-[10px]">Color Harmonization</span>
              <span className="text-indigo-600 font-bold">Electric Blue & Charcoal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <Award className="w-10 h-10 text-indigo-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">100% Handcrafted Precision</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            While automated AI tools produce fuzzy, jagged halos around complex edges, our retouchers draw every vector clipping path manually with Photoshop&apos;s Pen Tool.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <Users className="w-10 h-10 text-indigo-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">24/7 Global Follow-the-Sun</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            With production facilities running across three 8-hour shifts, your images are edited overnight and returned ready for publishing before your business day begins.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-emerald-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Enterprise IP Protection</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We treat your unreleased catalog visuals with military-grade discretion. Isolated air-gapped terminal configurations and strict NDAs safeguard your creative assets.
          </p>
        </div>
      </div>

      {/* Quality Philosophy */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 mb-20 shadow-sm">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
            Our Zero-Defect Quality Assurance Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            We believe an image returned with an inaccurate clipping edge or unnatural skin tone is worse than no delivery at all. That is why every completed order undergoes a strict 3-tier inspection protocol:
          </p>
          <div className="space-y-3">
            {[
              "Phase 1: Artist self-audit against your designated style guide parameters.",
              "Phase 2: Senior QA lead pixel inspection at 300% zoom on calibrated EIZO monitors.",
              "Phase 3: File integrity and export profile validation (sRGB / Adobe RGB / PSD Layer hierarchy).",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-10 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Want to partner with our production team?</h2>
        <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
          Test our craftsmanship with 2 complimentary pilot images today.
        </p>
        <div className="mt-6">
          <Link
            href="/request-a-quote"
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Start Free Calibration Test</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
