"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Sparkles, Check, Clock, ShieldCheck, Zap } from "lucide-react";

interface ServiceTier {
  id: string;
  name: string;
  baseRate: number;
}

const serviceTiers: ServiceTier[] = [
  { id: "clipping-path", name: "Hand-Drawn Clipping Path", baseRate: 0.49 },
  { id: "background-removal", name: "Background Removal", baseRate: 0.39 },
  { id: "product-photo-retouching", name: "Product Retouching", baseRate: 0.99 },
  { id: "ghost-mannequin", name: "Ghost Mannequin / Neck Joint", baseRate: 1.25 },
  { id: "jewelry-retouching", name: "Jewelry & Macro Retouching", baseRate: 2.50 },
  { id: "shadow-reflection", name: "Shadow & Reflection Creation", baseRate: 0.59 },
  { id: "color-correction", name: "Color Correction & Recolor", baseRate: 0.79 },
];

export function PricingCalculator() {
  const [selectedService, setSelectedService] = useState<string>("clipping-path");
  const [volume, setVolume] = useState<number>(150);
  const [turnaround, setTurnaround] = useState<number>(24);

  // Volume discount calculation
  let discountPct = 0;
  if (volume >= 1000) {
    discountPct = 0.25; // 25% off
  } else if (volume >= 500) {
    discountPct = 0.20; // 20% off
  } else if (volume >= 200) {
    discountPct = 0.15; // 15% off
  } else if (volume >= 50) {
    discountPct = 0.10; // 10% off
  }

  // Turnaround multiplier
  let turnaroundMultiplier = 1.0;
  if (turnaround === 6) {
    turnaroundMultiplier = 1.35; // 35% rush fee
  } else if (turnaround === 12) {
    turnaroundMultiplier = 1.15; // 15% rush fee
  }

  const currentService = serviceTiers.find((s) => s.id === selectedService) || serviceTiers[0];
  const unitPrice = currentService.baseRate * (1 - discountPct) * turnaroundMultiplier;
  const totalPrice = unitPrice * volume;

  return (
    <div className="rounded-3xl border border-[#2A3150] bg-[#141829] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#745CFF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D6FF70]" />
              Interactive Volume Calculator
            </h3>
            <p className="text-sm text-slate-400">
              Customize your service, expected batch volume, and turnaround requirements for real-time rates.
            </p>
          </div>

          {/* 1. Choose Service */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              1. Select Editing Service
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {serviceTiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedService(tier.id)}
                  className={`text-left p-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                    selectedService === tier.id
                      ? "bg-[#1E243D] border-[#745CFF] text-white shadow-[0_0_15px_rgba(116,92,255,0.2)]"
                      : "bg-[#101321]/60 border-[#2A3150] text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span className="truncate pr-2">{tier.name}</span>
                  <span className="text-xs font-mono text-[#D6FF70] shrink-0">
                    from ${tier.baseRate.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Choose Image Volume */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Monthly Image Volume
              </label>
              <div className="text-sm font-mono font-bold text-[#D6FF70]">
                {volume.toLocaleString()} images / batch
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="2500"
              step="10"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-[#2A3150] rounded-lg appearance-none cursor-pointer accent-[#745CFF]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>10</span>
              <span>500</span>
              <span>1,000</span>
              <span>2,500+</span>
            </div>

            {discountPct > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D6FF70]/10 text-[#D6FF70] border border-[#D6FF70]/20">
                <Zap className="w-3.5 h-3.5" />
                Volume Tier Applied: {(discountPct * 100).toFixed(0)}% Savings
              </div>
            )}
          </div>

          {/* 3. Turnaround SLA */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              3. Guaranteed Turnaround Speed (SLA)
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setTurnaround(24)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  turnaround === 24
                    ? "bg-[#1E243D] border-[#745CFF] text-white shadow-md"
                    : "bg-[#101321]/60 border-[#2A3150] text-slate-300 hover:border-slate-500"
                }`}
              >
                <div className="text-sm font-bold">24 Hours</div>
                <div className="text-xs text-slate-400">Standard Rate</div>
              </button>

              <button
                type="button"
                onClick={() => setTurnaround(12)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  turnaround === 12
                    ? "bg-[#1E243D] border-[#745CFF] text-white shadow-md"
                    : "bg-[#101321]/60 border-[#2A3150] text-slate-300 hover:border-slate-500"
                }`}
              >
                <div className="text-sm font-bold">12 Hours</div>
                <div className="text-xs text-[#D6FF70]">Fast Track (+15%)</div>
              </button>

              <button
                type="button"
                onClick={() => setTurnaround(6)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  turnaround === 6
                    ? "bg-[#1E243D] border-[#745CFF] text-white shadow-md"
                    : "bg-[#101321]/60 border-[#2A3150] text-slate-300 hover:border-slate-500"
                }`}
              >
                <div className="text-sm font-bold">6 Hours</div>
                <div className="text-xs text-amber-400">Lightning (+35%)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Calculated Output Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#101321] border border-[#2A3150] shadow-xl">
          <div className="space-y-6">
            <div className="border-b border-[#2A3150] pb-4">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Estimated Project Total
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-2 flex items-baseline gap-2">
                <span>{formatPrice(totalPrice)}</span>
                <span className="text-xs font-normal text-slate-400 font-sans">USD est.</span>
              </div>
              <div className="text-xs text-[#D6FF70] font-mono mt-1 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Only {formatPrice(unitPrice)} per image
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between py-1 border-b border-[#2A3150]/60">
                <span className="text-slate-400">Selected Service:</span>
                <span className="font-semibold text-white">{currentService.name}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2A3150]/60">
                <span className="text-slate-400">Batch Quantity:</span>
                <span className="font-semibold text-white">{volume} Images</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2A3150]/60">
                <span className="text-slate-400">Guaranteed Turnaround:</span>
                <span className="font-semibold text-[#D6FF70]">{turnaround} Hours Delivery</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#2A3150]/60">
                <span className="text-slate-400">Quality Guarantee:</span>
                <span className="font-semibold text-white">Unlimited Free Revisions</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Data Security:</span>
                <span className="font-semibold text-white">Full NDA Compliance</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#2A3150] space-y-3">
            <Link
              href={`/request-a-quote?service=${selectedService}&volume=${volume}&turnaround=${turnaround}`}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#D6FF70] to-[#bbf738] text-[#101321] hover:shadow-[0_0_25px_rgba(214,255,112,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Lock In This Rate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/request-a-quote?type=sample"
              className="w-full block text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#141829] border border-[#2A3150] hover:border-[#745CFF] transition-colors"
            >
              Test Our Quality: Free 2-Image Sample Trial
            </Link>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D6FF70]" /> 24/7 Production
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#745CFF]" /> No Upfront Card Required
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
