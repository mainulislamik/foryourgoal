import React from "react";
import Link from "next/link";
import { Mail, Clock, MapPin, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Foryourgoal Studio",
  description:
    "Get in touch with Foryourgoal's enterprise image-editing specialists. Guaranteed 45-minute response for quotes and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-lime bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/20">
          Direct Studio Communication
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-ivory mt-3">
          Get in Touch With Our Team
        </h1>
        <p className="mt-3 text-base text-brand-ivory/70">
          Whether you need a custom high-volume enterprise SLA, dedicated retouchers, or have a question about our turnaround times, we are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-brand-navy-card border border-brand-border">
            <Mail className="w-6 h-6 text-brand-lime mb-3" />
            <div className="text-xs uppercase font-mono text-brand-ivory/50">Official Inquiry Email</div>
            <div className="text-base font-bold text-brand-ivory mt-1">support@foryourgoal.com</div>
            <div className="text-xs text-brand-ivory/60 mt-1">Monitored 24/7 by our operations desk</div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-navy-card border border-brand-border">
            <Clock className="w-6 h-6 text-brand-violet mb-3" />
            <div className="text-xs uppercase font-mono text-brand-ivory/50">Operating Hours</div>
            <div className="text-base font-bold text-brand-ivory mt-1">24 Hours / 7 Days a Week</div>
            <div className="text-xs text-brand-ivory/60 mt-1">Shift rotations ensure zero downtime</div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-navy-card border border-brand-border">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
            <div className="text-xs uppercase font-mono text-brand-ivory/50">Rapid SLA</div>
            <div className="text-base font-bold text-brand-ivory mt-1">&lt; 45 Minute Response</div>
            <div className="text-xs text-brand-ivory/60 mt-1">All new business inquiries answered swiftly</div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-brand-navy-card/90 border border-brand-border flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-ivory mb-3">
              Need a Quote or Free Sample First?
            </h2>
            <p className="text-sm text-brand-ivory/70 leading-relaxed mb-6">
              Our multi-step quotation wizard allows you to upload raw test images directly and specify your desired clipping path styles, layer naming conventions, and file formats.
            </p>

            <div className="space-y-3 mb-8">
              <div className="text-xs text-brand-ivory/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-lime" />
                <span>Upload up to 2 sample files for free calibration</span>
              </div>
              <div className="text-xs text-brand-ivory/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-lime" />
                <span>Receive custom tiered volume pricing</span>
              </div>
              <div className="text-xs text-brand-ivory/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-lime" />
                <span>Non-Disclosure Agreement signed upon request</span>
              </div>
            </div>
          </div>

          <Link
            href="/request-a-quote"
            className="w-full py-4 rounded-xl bg-brand-violet text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Quote & Sample Request</span>
            <ArrowRight className="w-4 h-4 text-brand-lime" />
          </Link>
        </div>
      </div>
    </div>
  );
}
