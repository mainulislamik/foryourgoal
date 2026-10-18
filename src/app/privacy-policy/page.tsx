import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy & NDA Commitment | Foryourgoal",
  description: "Foryourgoal's privacy policy, data protection, client asset confidentiality, and automated 14-day file deletion protocol.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-slate-700 space-y-6 text-sm leading-relaxed bg-white">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
        Privacy Policy & Asset Confidentiality
      </h1>
      <p className="text-xs text-slate-500 font-mono">Last updated: October 2026</p>

      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 shadow-sm">
        <h2 className="text-base font-bold mb-2">Our B2B Confidentiality Promise</h2>
        <p className="text-xs text-slate-600">
          At Foryourgoal, we understand that client image files often contain unreleased products, upcoming seasonal apparel collections, and sensitive commercial photography. We treat all uploaded client materials as strictly confidential trade secrets.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-900 pt-4">1. Information We Collect</h2>
      <p>
        When you submit a quotation inquiry or upload sample images, we collect contact information (such as your full name, business email, and company name) and technical project briefs necessary to provide accurate estimates and deliver image processing services.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">2. Non-Disclosure & Image Security</h2>
      <p>
        All raw source files, layered workfiles, and exported assets are stored in encrypted object storage. We never publish, sell, license, or display your images in our public portfolio or marketing campaigns without explicit, prior written consent from your authorized representative.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">3. Automated 14-Day Purge Policy</h2>
      <p>
        To prevent persistent exposure of client IP, our storage systems automatically purge all uploaded raw images and processed deliverables fourteen (14) calendar days following project delivery and approval, unless a different data retention agreement is executed in writing.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">4. Contacting Our Data Protection Officer</h2>
      <p>
        For inquiries regarding privacy, data deletion, or custom bilateral Non-Disclosure Agreements (NDAs), contact our legal and compliance desk at <a href="mailto:privacy@foryourgoal.com" className="text-indigo-600 font-medium underline">privacy@foryourgoal.com</a>.
      </p>
    </div>
  );
}
