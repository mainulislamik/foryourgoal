"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from "lucide-react";

const WA_MESSAGE = encodeURIComponent(
  "Hello Foryourgoal Studio, I am looking for a professional photo editing partner. I'd like to test 5 free sample images for my brand."
);
const WA_URL = `https://wa.me/8801772866884?text=${WA_MESSAGE}`;

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  // Proactively pop up subtle greeting after 3 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Interactive Quick Chat Card */}
      {isOpen && (
        <div className="w-[310px] sm:w-[340px] bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm">
                  FG
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-emerald-700 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight text-white flex items-center gap-1.5">
                  Foryourgoal Studio
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/40 text-emerald-100">
                    Online
                  </span>
                </h4>
                <p className="text-[11px] text-emerald-100/90 mt-0.5">
                  Avg. Reply: under 5 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-sm text-xs text-slate-700 space-y-1.5">
              <p className="font-medium text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                Want to test our quality first?
              </p>
              <p className="text-slate-600 leading-relaxed">
                Send up to <strong>5 test images</strong> directly on WhatsApp. We retouch & return them within 4–24 hours with zero commitment.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Strict NDA & 100% IP confidentiality guaranteed</span>
            </div>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
            >
              <Send className="w-3.5 h-3.5" />
              Chat on WhatsApp (+880 1772-866884)
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Pill & Button */}
      <div className="flex items-center gap-3">
        {!isOpen && showBadge && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-slate-800 text-xs font-semibold shadow-lg border border-slate-200/80 hover:border-emerald-300 transition-all hover:shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat with Lead Retoucher</span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
              5m reply
            </span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle WhatsApp chat widget"
          className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/40 hover:shadow-emerald-600/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Pulse ping dot — online indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
          </span>
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
