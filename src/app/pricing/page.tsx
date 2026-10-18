import React from "react";
import Link from "next/link";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { servicesData } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Sparkles, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparent B2B Pricing & Volume Calculator | Foryourgoal",
  description:
    "Calculate instant volume estimates for clipping path, ghost mannequin, photo retouching, and jewelry editing. Volume discounts up to 35% on high monthly throughput.",
};

export default function PricingPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Clear & Predictable Invoicing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Enterprise Volume Pricing
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-ivory/70">
          No hidden setup fees, no monthly subscriptions. Pay only for the images you submit, with automatic volume tier discounts up to 35%.
        </p>
      </div>

      {/* Interactive Volume Calculator */}
      <div className="mb-20">
        <PricingCalculator />
      </div>

      {/* Baseline Rate Card Table */}
      <div className="mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-ivory">Service Starting Baseline Rates</h2>
          <p className="text-xs text-brand-ivory/60 mt-1">
            Rates reflect standard simple-to-medium complexity. Complex multi-subject or heavy jewelry retouching quoted after image inspection.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-brand-border bg-brand-navy-card">
          <table className="w-full text-left text-sm text-brand-ivory">
            <thead className="bg-brand-navy border-b border-brand-border text-xs uppercase text-brand-ivory/60 font-mono">
              <tr>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Complexity</th>
                <th className="px-6 py-4">Turnaround</th>
                <th className="px-6 py-4">Starting Rate</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {servicesData.map((s) => (
                <tr key={s.slug} className="hover:bg-brand-navy-light/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-brand-ivory">
                    <Link href={`/services/${s.slug}`} className="hover:text-brand-lime">
                      {s.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-ivory/70">
                    Hand-drawn Pen Tool / Non-Destructive
                  </td>
                  <td className="px-6 py-4 text-xs text-brand-ivory/70 font-mono">
                    ~{s.turnaroundHours} Hours
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-brand-lime">
                    {formatPrice(s.startingPrice)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/request-a-quote?service=${s.slug}`}
                      className="text-xs font-semibold text-brand-violet hover:text-brand-ivory"
                    >
                      Get Quote &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Free Test CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy-card via-brand-violet/20 to-brand-navy-card border border-brand-border text-center">
        <h3 className="text-2xl font-bold text-brand-ivory">Need a custom contractual SLA or monthly retainer?</h3>
        <p className="mt-2 text-sm text-brand-ivory/70 max-w-xl mx-auto">
          We offer custom monthly retainers, dedicated photo retouching teams, and dedicated FTP channels for high-volume enterprises processing 10,000+ files per month.
        </p>
        <div className="mt-6">
          <Link
            href="/request-a-quote"
            className="px-8 py-3.5 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-lime-400 transition-all inline-flex items-center gap-2"
          >
            <span>Discuss Custom Retainer</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
