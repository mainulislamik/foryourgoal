import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  HardDrive,
  Trash2,
  Network,
  Scale,
  Mail,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Building2,
  CheckCircle,
} from "lucide-react";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Enterprise Non-Disclosure Agreement (NDA) & IP Security | Foryourgoal",
  description:
    "Standard Bilateral Commercial Non-Disclosure Agreement and IP security framework governing all image editing, RAW assets, unreleased product visuals, and data retention guarantees at Foryourgoal Studio.",
  alternates: {
    canonical: "https://foryourgoal.com/nda",
  },
  openGraph: {
    title: "Enterprise Non-Disclosure Agreement (NDA) & IP Security | Foryourgoal",
    description:
      "Enterprise-grade bilateral confidentiality terms, 100% client copyright retention, air-gapped terminals, zero AI model training, and 30-day secure file purge guarantee.",
    url: "https://foryourgoal.com/nda",
    type: "website",
    siteName: "Foryourgoal",
  },
};

export default function NdaPage() {
  const effectiveDate = "January 1, 2026";
  const version = "2026.1";

  const ndaJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Enterprise Non-Disclosure Agreement (NDA) & IP Security",
    description:
      "Commercial Post-Production Bilateral Non-Disclosure Agreement and IP security protocols by Foryourgoal Studio.",
    url: "https://foryourgoal.com/nda",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://foryourgoal.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Enterprise NDA",
          item: "https://foryourgoal.com/nda",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14 px-4 sm:px-6 lg:px-10 xl:px-12 text-slate-800 print:bg-white print:p-0 print:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ndaJsonLd) }}
      />

      <style>{`
        @media print {
          @page {
            margin: 1.5cm;
            size: auto;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          .print-full {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* Breadcrumb & Navigation Bar */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 no-print">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 font-medium"
        >
          <Link
            href="/"
            className="hover:text-indigo-600 inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold">Enterprise NDA</span>
        </nav>

        <div className="flex items-center gap-3">
          <PrintButton />
          <a
            href="mailto:info@foryourgoal.com?subject=Custom%20NDA%20Request%20-%20Foryourgoal%20Studio"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 text-xs sm:text-sm font-semibold border border-indigo-200 shadow-sm transition-all hover:border-indigo-400"
          >
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>Request Custom Corporate NDA</span>
          </a>
        </div>
      </div>

      {/* Main Enterprise Legal Document Container */}
      <article className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden print-full">
        {/* Document Header */}
        <header className="p-6 sm:p-10 lg:p-12 border-b border-slate-200 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white print:bg-white print:text-black print:border-b-2 print:border-black print:p-0 print:pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4 text-slate-400 print:text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-emerald-400 font-bold print:border print:border-slate-300 print:bg-transparent print:text-black">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 print:text-black" />
              Standard Bilateral NDA
            </span>
            <span>Version: {version}</span>
            <span>Effective Date: {effectiveDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white print:text-black leading-tight">
            Commercial Post-Production Bilateral Non-Disclosure Agreement
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 print:text-slate-700 font-normal leading-relaxed">
            Standard Intellectual Property (IP) Security, Asset Confidentiality, and Zero-Leakage Guarantee Executed by <strong className="text-white print:text-black">Foryourgoal Studio</strong> for All Commercial Clients, Agencies, and E-Commerce Retailers.
          </p>

          <div className="mt-6 pt-6 border-t border-slate-800 print:border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-400 print:text-slate-600 uppercase tracking-wider font-mono text-[10px]">
                Disclosing Party (Client)
              </div>
              <div className="font-semibold text-slate-100 print:text-black mt-0.5">
                Brand, Retailer, Commercial Studio, or Agency
              </div>
            </div>
            <div>
              <div className="text-slate-400 print:text-slate-600 uppercase tracking-wider font-mono text-[10px]">
                Receiving Party (Post-Production Studio)
              </div>
              <div className="font-semibold text-slate-100 print:text-black mt-0.5">
                Foryourgoal Studio (Digital Post-Production &amp; Imaging Facility)
              </div>
            </div>
          </div>
        </header>

        {/* Executive Summary Callout */}
        <div className="m-6 sm:m-10 p-5 sm:p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-slate-800 text-xs sm:text-sm leading-relaxed print:m-0 print:my-6 print:border print:border-slate-300 print:bg-slate-50">
          <div className="flex items-center gap-2 font-bold text-indigo-950 text-sm sm:text-base mb-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>Executive Security Commitment</span>
          </div>
          <p>
            This bilateral agreement automatically binds Foryourgoal Studio upon transmission of any visual assets, raw photography, 3D renderings, or trial samples. We legally guarantee that your commercial media will never be shared, published, monetized, leaked, or fed into any machine learning/AI generative training model without explicit, written, counter-signed authorization.
          </p>
        </div>

        {/* Document Body Sections */}
        <div className="px-6 sm:px-10 pb-10 space-y-10 text-xs sm:text-sm leading-relaxed print:px-0 print:pb-0">
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 print:text-black print:border-slate-300">
              <FileCheck2 className="w-5 h-5 text-indigo-600 print:text-black shrink-0" />
              <h2>1. Scope &amp; Definition of Confidential Materials</h2>
            </div>
            <p>
              &ldquo;Confidential Materials&rdquo; shall encompass all visual, digital, commercial, and technical assets transmitted by the Client to Foryourgoal Studio, whether delivered directly or via third-party transfer gateways, including but not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700 print:text-black">
              <li>
                <strong>Raw Camera Files &amp; Negative Captures:</strong> Proprietary camera RAW files (.CR2, .CR3, .NEF, .ARW, .DNG, .IIQ, .RAF, etc.), high-bit depth TIFFs, uncompressed PSD/PSB files, and unreleased batch shoots.
              </li>
              <li>
                <strong>Unreleased Catalog &amp; Embargoed Assets:</strong> Upcoming seasonal collections, apparel looks, footwear prototypes, jewelry shoots, and marketing imagery prior to official public launch or retail press release.
              </li>
              <li>
                <strong>Proprietary Industrial &amp; 3D Visuals:</strong> CAD files, patent-pending consumer hardware, 3D models, packaging blueprints, and trade-secret manufacturing mockups.
              </li>
              <li>
                <strong>Internal Directives &amp; Brand Style Guides:</strong> Studio lighting diagrams, art direction briefs, color grading formulas, and pricing/margin structures.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 print:text-black print:border-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-600 print:text-black shrink-0" />
              <h2>2. Non-Disclosure &amp; Intellectual Property (IP) Protection</h2>
            </div>
            <p>
              <strong>100% Exclusive Worldwide Copyright:</strong> The Client maintains sole, unencumbered, worldwide ownership, copyright, and title to all supplied imagery and all resulting post-production derivative works, hand-drawn vector paths, clipping masks, and retouched masters.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700 print:text-black">
              <li>
                <strong>Zero Commercial Exploitation:</strong> Foryourgoal Studio claims zero ownership rights, licensing options, or royalty entitlements over Client materials.
              </li>
              <li>
                <strong>Zero Portfolio/Marketing Display Without Consent:</strong> Foryourgoal Studio shall never display, showcase, publish, or distribute any Client imagery in portfolios, case studies, social media, or advertisements without prior express written approval from an authorized corporate representative of the Client.
              </li>
              <li>
                <strong>Strict Need-to-Know Access:</strong> Only vetted senior retouching specialists directly assigned to the Client&apos;s active batch shall have viewing access to the files.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 print:text-black print:border-slate-300">
              <HardDrive className="w-5 h-5 text-indigo-600 print:text-black shrink-0" />
              <h2>3. Data Security &amp; Storage Protocol</h2>
            </div>
            <p>
              Foryourgoal Studio adheres to rigorous technical and operational standards designed to prevent unauthorized exfiltration, accidental data loss, or external compromise:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700 print:text-black">
              <li>
                <strong>Encrypted SSD Storage &amp; Workstations:</strong> Workstations and central processing storage utilize hardware-level AES-256 encryption at rest.
              </li>
              <li>
                <strong>Zero Third-Party AI Model Training:</strong> Client assets are strictly processed using licensed professional software (Adobe Photoshop, Lightroom, Capture One). Client imagery is <em>never</em> uploaded to public or third-party artificial intelligence platforms, nor used to train neural networks or machine learning models.
              </li>
              <li>
                <strong>Role-Based Access Control (RBAC):</strong> Retouchers operate under monitored user sessions with external USB write restrictions, watermarked QA preview monitors, and strict separation between client production drives.
              </li>
              <li>
                <strong>Physical Security:</strong> Production facilities operate under 24/7 CCTV surveillance, biometric badge access, and clean-desk policies.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 print:text-black print:border-slate-300">
              <Trash2 className="w-5 h-5 text-red-600 print:text-black shrink-0" />
              <h2>4. Data Retention &amp; Purge Guarantee</h2>
            </div>
            <p>
              <strong>Standard 30-Day QA Buffer:</strong> Completed master deliverables and associated working files are archived in secure, isolated storage for exactly thirty (30) calendar days solely to accommodate client revision requests, quality assurance audits, or color adjustments.
            </p>
            <p>
              <strong>Automated &amp; Instant Wipe:</strong> Following the expiration of thirty (30) days, or immediately upon written request from the Client, all copies of raw captures, work-in-progress layers, and final deliverables are permanently erased using DoD-compliant multi-pass data sanitization protocols.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 print:text-black print:border-slate-300">
              <Network className="w-5 h-5 text-indigo-600 print:text-black shrink-0" />
              <h2>5. Permitted Enterprise Transfer Protocols</h2>
            </div>
            <p>
              To maintain transport integrity and prevent man-in-the-middle vulnerabilities, all digital visual materials must be transmitted exclusively via verified encrypted channels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 print:bg-white print:border-slate-300">
                <div className="font-bold text-slate-900 print:text-black">Encrypted SFTP / FTPS</div>
                <div className="text-slate-600 print:text-slate-700 text-xs mt-0.5">
                  Private dedicated studio SFTP endpoints with TLS 1.3 encryption and IP allowlisting.
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 print:bg-white print:border-slate-300">
                <div className="font-bold text-slate-900 print:text-black">Enterprise Cloud Gateways</div>
                <div className="text-slate-600 print:text-slate-700 text-xs mt-0.5">
                  Dropbox Enterprise, WeTransfer Pro / Teams, Box.com, Google Workspace Drive with SSO.
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 print:bg-white print:border-slate-300">
                <div className="font-bold text-slate-900 print:text-black">IBM Aspera / Signiant</div>
                <div className="text-slate-600 print:text-slate-700 text-xs mt-0.5">
                  High-speed UDP enterprise gateways for multi-terabyte uncompressed catalog batches.
                </div>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 print:bg-white print:border-slate-300">
                <div className="font-bold text-slate-900 print:text-black">End-to-End Chat &amp; Pilot Transfer</div>
                <div className="text-slate-600 print:text-slate-700 text-xs mt-0.5">
                  Verified enterprise WhatsApp channel with E2E encryption for quick 5-image test pilots.
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 print:text-black print:border-slate-300">
              <Scale className="w-5 h-5 text-indigo-600 print:text-black shrink-0" />
              <h2>6. Legal Remedies, Severability &amp; Jurisdiction</h2>
            </div>
            <p>
              The Receiving Party acknowledges that any unauthorized disclosure or use of Confidential Materials would cause irreparable harm for which monetary damages alone would be inadequate. Accordingly, the Client shall be entitled to seek injunctive relief to prevent or curtail any breach, in addition to any other remedies available at law or equity.
            </p>
            <p>
              This Agreement shall be governed by and construed in accordance with international commercial law standards. If any provision is deemed unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          {/* Formal Execution Block */}
          <section className="pt-6 border-t-2 border-slate-200 print:border-black">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 print:text-black mb-6">
              Official Bilateral Execution &amp; Representation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 print:bg-white print:border-slate-400 space-y-3">
                <div className="font-bold text-slate-900 print:text-black flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-600 print:text-black" />
                  <span>FOR: Foryourgoal Studio</span>
                </div>
                <div className="text-slate-600 print:text-black space-y-1">
                  <div><strong>Legal Entity:</strong> Foryourgoal Imaging &amp; Retouching Facility</div>
                  <div><strong>Authorized Signatory:</strong> Managing Director &amp; Operations Head</div>
                  <div><strong>Compliance Officer:</strong> privacy@foryourgoal.com</div>
                  <div><strong>Address:</strong> Dhaka, Bangladesh (Global Studio Operations)</div>
                </div>
                <div className="pt-3 border-t border-slate-200 print:border-slate-300 flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Executed Electronically · Active Bilateral Policy</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 print:bg-white print:border-slate-400 space-y-3">
                <div className="font-bold text-slate-900 print:text-black flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-500 print:text-black" />
                  <span>FOR: Client / Brand Organization</span>
                </div>
                <div className="text-slate-500 print:text-slate-700 space-y-1">
                  <div><strong>Client Company:</strong> [Corporate / Studio Legal Name]</div>
                  <div><strong>Authorized Representative:</strong> [Signatory Name / Title]</div>
                  <div><strong>Corporate Email:</strong> [Corporate Email Address]</div>
                  <div><strong>Execution Method:</strong> Counter-sign on submission or via direct contract</div>
                </div>
                <div className="pt-3 border-t border-slate-200 print:border-slate-300 text-slate-500 italic">
                  Applicable automatically upon transmission of project files.
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Action Footer Callout */}
        <footer className="p-6 sm:p-8 bg-slate-900 text-white border-t border-slate-800 no-print">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Need a Custom Counter-Signed Corporate NDA?</span>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                We frequently execute custom enterprise NDAs with Tier-1 fashion houses, Fortune 500 retailers, and international advertising networks.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="mailto:info@foryourgoal.com?subject=Custom%20NDA%20Request%20-%20Foryourgoal%20Studio"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-4 h-4" />
                <span>Email Legal Desk</span>
              </a>
              <a
                href="https://wa.me/8801772866884?text=Hello%20Foryourgoal%20Studio,%20we%20would%20like%20to%20request%20a%20custom%20bilateral%20corporate%20NDA%20for%20our%20enterprise%20brand."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>WhatsApp Legal Contact</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </footer>
      </article>

      {/* Back to Homepage Footer Link */}
      <div className="max-w-4xl mx-auto mt-8 text-center no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Foryourgoal Homepage</span>
        </Link>
      </div>
    </div>
  );
}
