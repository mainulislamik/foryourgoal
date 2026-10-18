import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Foryourgoal",
  description: "Foryourgoal's terms of service, SLA standards, payment terms, and client revision policy.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full text-slate-700 space-y-6 text-sm leading-relaxed bg-white">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
        Terms of Service
      </h1>
      <p className="text-xs text-slate-500 font-mono">Effective: October 2026</p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">1. Scope of Services</h2>
      <p>
        Foryourgoal provides commercial post-production photo editing, clipping path creation, retouching, and related digital imaging services to international corporate and studio clients.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">2. Quotations and Invoicing</h2>
      <p>
        Quotations provided via our online calculator or direct sales team represent binding price agreements based on the file complexity, volume tier, and turnaround SLA selected by the client. Enterprise accounts with monthly retainers are invoiced bi-weekly or monthly under standard Net-15 or Net-30 agreements upon credit approval.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">3. Turnaround SLA & Revisions</h2>
      <p>
        Turnaround times commence upon complete receipt of all required source image files and designated styling instructions. If any deliverable deviates from the approved style guidelines, Foryourgoal provides unlimited revisions within fourteen (14) days of delivery at no extra cost.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">4. Intellectual Property</h2>
      <p>
        The client retains 100% ownership, copyright, and title to all supplied imagery and resulting post-production derivative works. Foryourgoal claims zero ownership rights over client materials.
      </p>
    </div>
  );
}
