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
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
          <span>Knowledge & Answers</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-base text-brand-ivory/70">
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
                ? "bg-brand-violet text-white shadow-md shadow-brand-violet/30"
                : "bg-brand-navy-card text-brand-ivory/70 hover:text-brand-ivory border border-brand-border"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4 mb-16">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-brand-navy-card border border-brand-border overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="text-base font-bold text-brand-ivory flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-lime shrink-0" />
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-ivory/50 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-brand-lime" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-sm text-brand-ivory/75 leading-relaxed border-t border-brand-border/40 mt-1">
                  <p className="pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Have More Questions CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-navy via-brand-violet/20 to-brand-navy border border-brand-border text-center">
        <h3 className="text-xl font-bold text-brand-ivory">Still have questions regarding your project?</h3>
        <p className="mt-2 text-xs text-brand-ivory/70">
          Our team is available 24/7. Reach out directly or submit your sample photos.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/request-a-quote"
            className="px-6 py-3 rounded-xl bg-brand-lime text-brand-navy font-bold text-xs hover:bg-lime-400 transition-all inline-flex items-center gap-2"
          >
            <span>Submit Free Sample Test</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-brand-navy-card text-brand-ivory font-medium border border-brand-border hover:border-brand-ivory/30 text-xs"
          >
            Contact Operations Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
