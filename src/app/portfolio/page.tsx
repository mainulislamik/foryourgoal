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
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-white text-slate-900">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Production Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Commercial Before & After Gallery
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600">
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
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300"
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
            className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-slate-200">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  title={item.title}
                  category={item.industry}
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {item.industry}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {item.turnaroundTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                <Link href={`/portfolio/${item.slug}`}>{item.title}</Link>
              </h2>

              <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {(item.techniquesUsed || []).slice(0, 3).map((spec: string, i: number) => (
                  <span
                    key={i}
                    className="text-[10px] bg-slate-50 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <Link
                href={`/portfolio/${item.slug}`}
                className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Inspect Case Study &rarr;
              </Link>
              <Link
                href={`/request-a-quote?service=${item.category}`}
                className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Request Similar Output
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Free Test CTA */}
      <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900">Want to see your images edited with this precision?</h3>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
          We offer 2 free sample edits with zero financial commitment. Send us your files and review the returned results within 4 hours.
        </p>
        <Link
          href="/request-a-quote"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
        >
          <span>Send Free Trial Files</span>
          <ArrowRight className="w-4 h-4 text-indigo-400" />
        </Link>
      </div>
    </div>
  );
}
