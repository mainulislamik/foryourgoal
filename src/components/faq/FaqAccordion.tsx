"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaqItem } from "@/lib/site-content";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";

interface Props {
  initialFaqs: FaqItem[];
}

export function FaqAccordion({ initialFaqs }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(
    initialFaqs.length > 0 ? initialFaqs[0].id : null
  );

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General & Pilot" },
    { id: "services", label: "Services & Quality" },
    { id: "terms", label: "Project Scoping & Invoicing" },
    { id: "security", label: "Security & NDA" },
  ];

  const filtered =
    activeCategory === "all"
      ? initialFaqs
      : initialFaqs.filter((f) => f.category === activeCategory);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
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
                  className={`w-5 h-5 text-slate-600 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Have a specific project or technical requirement?
        </h3>
        <p className="text-sm text-slate-600 mb-6 max-w-xl mx-auto">
          Our senior retouchers and production managers are available 24/7 to review custom guidelines and prepare technical test samples.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/request-a-quote"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
          >
            Request a Custom Quote
          </Link>
          <Link
            href="/request-free-trial"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-slate-700 font-semibold text-sm border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Test Us With Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
