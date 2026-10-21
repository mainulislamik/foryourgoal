"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight, Mail, MapPin, MessageSquare } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/imon")) {
    return null;
  }

  return (
    <footer className="w-full bg-[#0B1120] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      {/* Top 3px brand gradient accent line */}
      <div
        className="h-[3px] w-full -mt-16 mb-16"
        style={{ background: "linear-gradient(90deg, #174CFF 0%, #06A6FF 50%, #00BDF2 100%)" }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">

        {/* SLA & Trust Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-14 border-b border-slate-800/80">

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-cyan-400 shrink-0 border border-blue-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-white">6 to 24h Turnaround</div>
              <div className="text-[11px] text-slate-400">Strict SLA delivery guarantee</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-white">100% Hand-Crafted</div>
              <div className="text-[11px] text-slate-400">Pen tool paths &amp; layers</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-cyan-400 shrink-0 border border-blue-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-white">Strict NDA &amp; Privacy</div>
              <div className="text-[11px] text-slate-400">Air-gapped server security</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-300 shrink-0 border border-cyan-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-white">1,000+ Daily Capacity</div>
              <div className="text-[11px] text-slate-400">Enterprise volume ready</div>
            </div>
          </div>
        </div>

        {/* Pre-footer Trial CTA Banner */}
        <div className="my-12 rounded-3xl bg-[#0B1120] p-8 sm:p-10 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 relative z-10 max-w-2xl">
            <div className="inline-block px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold uppercase tracking-widest border border-cyan-500/30">
              Zero Risk Trial
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Test Our Studio Quality With 2 Free Images
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Upload any 2 product photos. We&apos;ll process them within 24 hours with complete clipping paths and retouching — completely free, no credit card required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href="/request-a-quote?type=sample"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm shadow-lg shadow-red-600/20 transition-all text-center"
            >
              Request Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/8801711000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all text-center"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct Chat
            </a>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-t border-slate-800/60">

          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo in dark theme so "FOR YOUR" text renders as light #F5F7FB */}
            <Logo theme="dark" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Foryourgoal is an international B2B image editing &amp; retouching studio. Delivering pixel-perfect product visual assets with guaranteed turnaround for world-class retailers and agencies.
            </p>
            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:support@foryourgoal.com" className="font-bold text-cyan-300 hover:text-cyan-200 transition-colors">
                  support@foryourgoal.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Global Production Facility &amp; 24/7 Cloud Pipeline</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Core Services</div>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { href: "/services/clipping-path", label: "Clipping Path" },
                { href: "/services/background-removal", label: "Background Removal" },
                { href: "/services/product-photo-retouching", label: "Product Photo Retouching" },
                { href: "/services/ghost-mannequin", label: "Ghost Mannequin" },
                { href: "/services/jewelry-retouching", label: "Jewelry Retouching" },
                { href: "/services/color-correction", label: "Color Correction" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-cyan-300 hover:translate-x-1 inline-block transition-all duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Industries</div>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { href: "/industries/ecommerce-marketplaces", label: "E-Commerce & Amazon" },
                { href: "/industries/fashion-apparel", label: "Fashion & Apparel" },
                { href: "/industries/jewelry-luxury", label: "Luxury Jewelry & Watches" },
                { href: "/industries/photographers-studios", label: "Commercial Studios" },
                { href: "/industries/advertising-agencies", label: "Advertising Agencies" },
                { href: "/industries/footwear", label: "Footwear & Bags" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-cyan-300 hover:translate-x-1 inline-block transition-all duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio & Security */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Studio &amp; Security</div>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/terms", label: "SLA Guarantee" },
                { href: "/privacy-policy", label: "NDA & Data Protection" },
                { href: "/careers", label: "Careers & Studio Culture" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/contact", label: "Client Helpdesk" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-cyan-300 hover:translate-x-1 inline-block transition-all duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              All 24/7 Production Systems Operational
            </span>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <span>&copy; {new Date().getFullYear()} Foryourgoal. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link href="/privacy-policy" className="hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cyan-300 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link
              href="/request-a-quote?type=sample"
              className="font-bold text-red-500 hover:text-red-400 flex items-center gap-1 hover:underline"
            >
              Free Trial (2 Free Images) <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
