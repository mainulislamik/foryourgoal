"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/lib/site-content";

interface HomeFaqAccordionProps {
  faqs: FaqItem[];
}

export function HomeFaqAccordion({ faqs }: HomeFaqAccordionProps) {
  // By default, no answer is shown directly (all collapsed)
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full items-start">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
              isOpen
                ? "border-indigo-500 shadow-md ring-2 ring-indigo-500/10"
                : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFaq(faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer group"
            >
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 tracking-wider">
                    {faq.category}
                  </span>
                </div>
                <h3
                  className={`text-base font-bold transition-colors leading-snug ${
                    isOpen
                      ? "text-indigo-600"
                      : "text-slate-900 group-hover:text-indigo-600"
                  }`}
                >
                  {faq.question}
                </h3>
              </div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <div
              id={`faq-answer-${faq.id}`}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
