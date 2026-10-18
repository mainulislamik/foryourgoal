import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Zap, Lock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Foryourgoal Outsourced Image Production",
  description:
    "Learn about our simple 4-step B2B photo editing workflow: secure upload, free calibration sample, 24/7 dedicated studio production, and 3-tier quality control.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Upload & Style Guide Briefing",
      desc: "Send your raw images via our secure portal, FTP, Dropbox, WeTransfer, or Cloudflare R2 bucket. Provide your brand's style guide, target aspect ratios, file format preferences, and background color codes (Hex/CMYK).",
      details: ["Accepted RAW, TIFF, PSD, JPEG", "Direct cloud folder synchronization", "Strict Non-Disclosure Agreement (NDA)"],
    },
    {
      num: "02",
      title: "Free Calibration Pilot (2 Images)",
      desc: "Before you commit to volume invoicing, our senior retouching team executes up to 2 test files completely free. We calibrate clipping tolerance, skin smoothing, jewelry glare, and drop shadow angles until your creative director signs off.",
      details: ["4-Hour turnaround for pilot files", "Direct feedback iterations", "Style sheet lock-in"],
    },
    {
      num: "03",
      title: "Batch Production & Nightly Processing",
      desc: "Our production studio works 24/7 across multiple shift rotations. While your headquarters sleeps, our artists process hundreds or thousands of SKUs using 100% hand-drawn pen tool paths, avoiding jagged automated AI clipping artifacts.",
      details: ["High-volume daily throughput (5,000+ files)", "Layered PSD with named paths", "Consistent lighting and color calibration"],
    },
    {
      num: "04",
      title: "3-Tier Quality Control & Secure Delivery",
      desc: "Every completed asset undergoes a 3-tier inspection: artist self-check, QA lead review at 300% zoom, and final spec audit against your naming convention. Assets are delivered to your private cloud storage with unlimited revision guarantees.",
      details: ["Zero-defect inspection protocol", "Instant download links", "Automated 14-day file purge for confidentiality"],
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Operational Excellence</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How Our Production Pipeline Works
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          A predictable, secure, and battle-tested workflow designed for enterprise e-commerce managers, fashion brands, and commercial photography studios.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-8">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between">
              <span className="text-6xl font-extrabold font-mono text-indigo-600/30">
                {s.num}
              </span>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-2 font-bold">
                Phase {idx + 1}
              </span>
            </div>

            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{s.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>

            <div className="lg:col-span-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
                Key Inclusions:
              </div>
              <div className="space-y-2">
                {s.details.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SLA Guarantees */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <Clock className="w-8 h-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">Guaranteed Turnarounds</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard delivery within 24 hours. Express rush queues available for 4-hour and 12-hour turnarounds during urgent campaign deadlines.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <Lock className="w-8 h-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise Security & NDA</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All production workstations are isolated without external drive access. Your unreleased product imagery is safeguarded under bilateral non-disclosure agreements.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">Unlimited Free Revisions</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If any returned file does not 100% adhere to your calibration style guide, our QA leads revise it immediately at no additional charge.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center p-10 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Ready to experience the Foryourgoal advantage?
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
          Start your free 2-image calibration test today. No credit card required.
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
