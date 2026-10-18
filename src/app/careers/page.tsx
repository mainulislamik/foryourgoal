import React from "react";
import Link from "next/link";
import { Briefcase, Clock, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join the Foryourgoal Studio Team",
  description:
    "Explore career opportunities for senior Photoshop artists, quality assurance leads, and client account managers at Foryourgoal.",
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
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Join Our Craft</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Careers at Foryourgoal
        </h1>
        <p className="mt-4 text-base text-brand-ivory/70">
          We are always looking for passionate Photoshop artists, colorists, and client production supervisors who pride themselves on pixel perfection.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto mb-16">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-brand-navy-card border border-brand-border hover:border-brand-lime/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/20">
                  {job.department}
                </span>
                <span className="text-brand-ivory/50">&bull;</span>
                <span className="text-brand-ivory/70">{job.location}</span>
                <span className="text-brand-ivory/50">&bull;</span>
                <span className="text-brand-ivory/70">{job.type}</span>
              </div>

              <h2 className="text-xl font-bold text-brand-ivory">{job.title}</h2>
              <p className="text-xs text-brand-ivory/70 max-w-xl leading-relaxed">
                {job.desc}
              </p>
            </div>

            <a
              href="mailto:careers@foryourgoal.com"
              className="whitespace-nowrap px-6 py-3 rounded-xl bg-brand-navy border border-brand-border text-brand-ivory font-semibold text-xs hover:border-brand-lime hover:text-brand-lime transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Apply via Email</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
