"use client";

import React, { useState } from "react";
import Link from "next/link";
import { faqsData, FAQItem } from "@/data/faqs";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General & Pilot" },
    { id: "services", label: "Services & Quality" },
    { id: "pricing", label: "Pricing & Invoicing" },
    { id: "security", label: "Security & NDA" },
  ];

  const filtered =
    activeCategory === "all"
      ? faqsData
      : faqsData.filter((f) => f.category === activeCategory);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-indigo-200">
          <span>Knowledge & Answers</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Everything you need to know about our photo editing processes, free trial tests, security practices, and volume invoicing.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === c.id
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 w-full items-start">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition-colors shadow-sm"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-200 mt-1">
                  <p className="pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Have More Questions CTA */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Still have questions regarding your project?</h3>
        <p className="mt-2 text-xs text-slate-600">
          Our team is available 24/7. Reach out directly or submit your sample photos.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/request-a-quote"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <span>Submit Free Sample Test</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-xs transition-colors"
          >
            Contact Operations Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
