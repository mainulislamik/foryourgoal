import React from "react";
import Link from "next/link";
import { Briefcase, Clock, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Senior Retouching Openings",
  description:
    "Explore career opportunities for senior Photoshop artists, QA leads, and studio account managers at Foryourgoal. View open roles and apply today.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers & Senior Retouching Openings | Foryourgoal",
    description:
      "Explore career opportunities for senior Photoshop artists, QA leads, and studio account managers at Foryourgoal.",
    url: "https://foryourgoal.com/careers",
  },
};

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Photoshop Retoucher (High-End Beauty & Jewelry)",
      department: "Production",
      location: "Studio / Remote",
      type: "Full-Time",
      experience: "3+ Years",
      desc: "Looking for skilled artists with deep experience in frequency separation, Dodge & Burn, non-destructive skin texture preservation, and gemstone reflection rendering.",
    },
    {
      title: "Pen Tool & Clipping Path Specialist",
      department: "Clipping Operations",
      location: "Studio",
      type: "Full-Time",
      experience: "2+ Years",
      desc: "Fast, accurate pen-tool craftsman capable of drawing smooth Bézier curves at speed across complex apparel, bicycle spokes, and industrial machinery.",
    },
    {
      title: "Quality Assurance Lead (3-Tier QC)",
      department: "Quality Assurance",
      location: "Studio",
      type: "Full-Time",
      experience: "4+ Years",
      desc: "Inspect hundreds of files daily at 300% zoom against client style guides, verify alpha channels, and ensure zero-defect exports.",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-indigo-200">
          <span>Global Production Team</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Join Our Precision Imaging Studio
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
          We operate 24/7 post-production facilities delivering hand-drawn clipping paths, retouching, and 3D compositing for world-class brands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-16">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-semibold">
                  {job.department}
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-600">{job.location}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-600">{job.type}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
              <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                {job.desc}
              </p>
            </div>

            <a
              href="mailto:careers@foryourgoal.com"
              className="whitespace-nowrap px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-xs hover:border-indigo-500 hover:text-indigo-600 hover:bg-slate-50 shadow-sm transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Apply via Email</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
