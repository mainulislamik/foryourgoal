"use client";

import React from "react";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs sm:text-sm font-semibold shadow-md shadow-slate-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      title="Print or Save as PDF"
      aria-label="Print or Save as PDF"
    >
      <Printer className="w-4 h-4 text-emerald-400" />
      <span>Print / Save as PDF</span>
    </button>
  );
}
