"use client";

import React, { useState } from "react";
import Link from "next/link";
import { portfolioData, PortfolioItem } from "@/data/portfolio";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Sparkles, ArrowRight, Filter } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "clipping-path", label: "Clipping Path" },
  { id: "retouching", label: "Product Retouching" },
  { id: "ghost-mannequin", label: "Ghost Mannequin" },
  { id: "jewelry", label: "Jewelry Retouching" },
  { id: "shadow", label: "Shadow Creation" },
  { id: "masking", label: "Image Masking" },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems =
    selectedCategory === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Production Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Commercial Before & After Gallery
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-ivory/70">
          Inspect our manual pen-tool clipping accuracy, reflection rendering, and non-destructive retouching across real client categories.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/30"
                : "bg-brand-navy-card text-brand-ivory/70 hover:text-brand-ivory border border-brand-border"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-5 rounded-2xl bg-brand-navy-card border border-brand-border hover:border-brand-violet/50 transition-all duration-300"
          >
            <div>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-brand-border/60">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  title={item.title}
                  category={item.industry}
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/20">
                  {item.industry}
                </span>
                <span className="text-xs text-brand-ivory/50 font-mono">
                  {item.turnaroundTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-brand-ivory hover:text-brand-lime transition-colors">
                <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
              </h2>

              <p className="mt-2 text-xs text-brand-ivory/70 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {(item.techniquesUsed || []).slice(0, 3).map((spec: string, i: number) => (
                  <span
                    key={i}
                    className="text-[10px] bg-brand-navy text-brand-ivory/80 px-2 py-0.5 rounded border border-brand-border"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs">
              <Link
                href={`/portfolio/${item.slug}`}
                className="font-semibold text-brand-ivory hover:text-brand-lime transition-colors"
              >
                Inspect Case Study &rarr;
              </Link>
              <Link
                href={`/request-a-quote?service=${item.category}`}
                className="font-semibold text-brand-violet hover:text-brand-ivory transition-colors"
              >
                Request Similar Output
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Free Test CTA */}
      <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-brand-navy via-brand-violet/20 to-brand-navy border border-brand-border text-center">
        <h3 className="text-2xl font-bold text-brand-ivory">Want to see your images edited with this precision?</h3>
        <p className="mt-2 text-sm text-brand-ivory/70 max-w-xl mx-auto">
          We offer 2 free sample edits with zero financial commitment. Send us your files and review the returned results within 4 hours.
        </p>
        <Link
          href="/request-a-quote"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-lime-400 transition-all"
        >
          <span>Send Free Trial Files</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
