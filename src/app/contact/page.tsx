import React from "react";
import Link from "next/link";
import { Mail, Clock, MapPin, ShieldCheck, ArrowRight, Phone, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Production & Support Team",
  description:
    "Contact Foryourgoal image production specialists. Guaranteed 45-minute response for B2B quotes, high-volume SLAs, and studio partnerships. Reach out today.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Production & Support Team | Foryourgoal",
    description:
      "Contact Foryourgoal image production specialists. Guaranteed 45-minute response for B2B quotes, high-volume SLAs, and studio partnerships.",
    url: "https://foryourgoal.com/contact",
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
        name: "Contact",
        item: "https://foryourgoal.com/contact",
      },
    ],
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded border border-indigo-200">
          Direct Studio Communication
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-3">
          Get in Touch With Our Team
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Whether you need a custom high-volume enterprise SLA, dedicated retouchers, or have a question about our turnaround times, we are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <Mail className="w-6 h-6 text-indigo-600 mb-3" />
            <div className="text-xs uppercase font-mono text-slate-500">Official Inquiry Email</div>
            <div className="text-base font-bold text-slate-900 mt-1">support@foryourgoal.com</div>
            <div className="text-xs text-slate-500 mt-1">Monitored 24/7 by our operations desk</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <Clock className="w-6 h-6 text-indigo-600 mb-3" />
            <div className="text-xs uppercase font-mono text-slate-500">Operating Hours</div>
            <div className="text-base font-bold text-slate-900 mt-1">24 Hours / 7 Days a Week</div>
            <div className="text-xs text-slate-500 mt-1">Shift rotations ensure zero downtime</div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
            <div className="text-xs uppercase font-mono text-slate-500">Rapid SLA</div>
            <div className="text-base font-bold text-slate-900 mt-1">&lt; 45 Minute Response</div>
            <div className="text-xs text-slate-500 mt-1">All new business inquiries answered swiftly</div>
          </div>

          <a
            href="https://wa.me/8801772866884?text=Hello%20Foryourgoal%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm hover:border-emerald-400 hover:bg-emerald-100 transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-emerald-600 mb-3" />
            <div className="text-xs uppercase font-mono text-emerald-700">WhatsApp Direct Chat</div>
            <div className="text-base font-bold text-slate-900 mt-1">+880 1772-866884</div>
            <div className="text-xs text-slate-500 mt-1">Instant response via WhatsApp</div>
          </a>
        </div>

        {/* Action Callout */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Need a Quote or Free Sample First?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Our multi-step quotation wizard allows you to upload raw test images directly and specify your desired clipping path styles, layer naming conventions, and file formats.
            </p>

            <div className="space-y-3 mb-8">
              <div className="text-xs text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Upload up to 5 sample files for free calibration</span>
              </div>
              <div className="text-xs text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Receive tailored project proposal & SLA</span>
              </div>
              <div className="text-xs text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Non-Disclosure Agreement signed upon request</span>
              </div>
            </div>
          </div>

          <Link
            href="/request-a-quote"
            className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Quote & Sample Request</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
