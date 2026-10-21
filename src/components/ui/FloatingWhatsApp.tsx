"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/8801772866884?text=Hello%20Foryourgoal%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.";

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {hovered && (
        <div className="bg-white text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl shadow-lg border border-emerald-100 whitespace-nowrap animate-fade-in">
          Chat on WhatsApp: +880 1772-866884
        </div>
      )}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp: +880 1772-866884"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/40 hover:shadow-emerald-600/50 transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulse ping dot — 24/7 online indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
        </span>
        <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />
      </a>
    </div>
  );
}
