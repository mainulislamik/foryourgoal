"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortfolioItem } from "@/lib/site-content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "clipping-path", label: "Clipping Path" },
  { id: "retouching", label: "Product Retouching" },
  { id: "ghost-mannequin", label: "Ghost Mannequin" },
  { id: "jewelry", label: "Jewelry Retouching" },
  { id: "shadow", label: "Shadow Creation" },
  { id: "masking", label: "Image Masking" },
];

interface Props {
  initialItems: PortfolioItem[];
}

export function PortfolioGallery({ initialItems }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems =
    selectedCategory === "all"
      ? initialItems
      : initialItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  beforeLabel="Original RAW"
                  afterLabel="Retouched"
                  aspectRatio="custom"
                  className="w-full h-full"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                <span className="font-semibold text-indigo-600 capitalize">
                  {item.category.replace("-", " ")}
                </span>
                <span className="font-mono text-[10px] text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {item.technique}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-600 font-medium">
                Volume: <strong className="text-slate-800">{item.volume}</strong>
              </span>
              <Link
                href="/request-a-quote"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-slate-600">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
