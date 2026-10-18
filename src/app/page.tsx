import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { industriesData } from "@/data/industries";
import { portfolioData } from "@/data/portfolio";
import { faqsData } from "@/data/faqs";
import { blogPostsData } from "@/data/blogs";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { formatPrice } from "@/lib/utils";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const featuredBeforeAfter = portfolioData[0];

  return (
    <div className="flex flex-col gap-0 overflow-hidden bg-white text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-10 xl:px-12 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-200/80 w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.06),rgba(255,255,255,0))] pointer-events-none" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Enterprise Grade Image Post-Production</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Professional Image Editing for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-600 to-indigo-800">
                E-commerce, Brands & Photographers
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From pixel-precise clipping paths to high-end beauty and product retouching, Foryourgoal helps international studios and e-commerce leaders deliver consistent, catalog-ready visuals at enterprise scale.
            </p>

            {/* CTA & Trust Triggers */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/request-a-quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 transition-all"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium border border-slate-300 hover:border-slate-400 transition-all shadow-sm"
              >
                <span>Explore Client Work</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">4-Hour / 24-Hour</div>
                  <div className="text-[11px] text-slate-500">Rapid Turnaround</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Strict NDA</div>
                  <div className="text-[11px] text-slate-500">100% Confidential</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">3-Tier QC</div>
                  <div className="text-[11px] text-slate-500">Zero Defect Policy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-2 bg-white shadow-2xl border border-slate-200">
              <BeforeAfterSlider
                beforeImage={featuredBeforeAfter.beforeImage}
                afterImage={featuredBeforeAfter.afterImage}
                title={featuredBeforeAfter.title}
                category="Featured Retouching"
                className="w-full aspect-[4/3] rounded-xl overflow-hidden"
              />
              <div className="mt-3 px-3 py-2 flex items-center justify-between text-xs text-slate-700 bg-slate-50 rounded-lg border border-slate-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Jewelry Glare Removal & Stone Enhancement
                </span>
                <span className="text-indigo-600 font-mono font-semibold">100% Handcrafted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & REASSURANCE BANNER */}
      <section className="bg-slate-50 border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center justify-center p-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">5,000+</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Images Processed Daily</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-slate-200">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-mono">99.8%</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">First-Pass Acceptance Rate</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-slate-200">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono">&lt; 4 Hours</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Express Rush Delivery</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-slate-200">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">100%</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Manual Pen-Tool Clipping</div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Commercial Image Editing Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Engineered for high-volume retailers, e-commerce managers, and commercial studios needing consistent studio-grade precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.slug}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 relative border border-slate-200">
                  <BeforeAfterSlider
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                    title={service.title}
                    category="Sample Result"
                    className="w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                    From {formatPrice(service.startingPrice)}/img
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" /> ~{service.turnaroundHours}h
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  <Link href={`/services/${service.slug}`} className="focus:outline-none">
                    {service.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200 font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-slate-700 hover:text-indigo-600 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Specs & Pricing</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  href={`/request-a-quote?service=${service.slug}`}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Quote &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all text-sm shadow-md"
          >
            <span>View All Image Editing Capabilities</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </section>

      {/* 4. INDUSTRIES WE EMPOWER */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="w-full">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              B2B Market Sectors
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Built for High-Growth Industries
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Each vertical has unique marketplace guidelines, lighting physics, and compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {industriesData.map((ind) => (
              <div
                key={ind.slug}
                className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="text-xs font-mono text-indigo-600 font-semibold tracking-wider uppercase mb-2">
                    {ind.tagline}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {ind.shortDesc}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {ind.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                >
                  <span>Industry Solutions</span> &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 STEPS) */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Seamless Outsourcing
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            How The Foryourgoal Pipeline Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A frictionless, predictable workflow designed to scale with your seasonal surges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            {
              step: "01",
              title: "Upload & Quote",
              desc: "Submit your raw photos, guidelines, and requested outputs. We provide a guaranteed price and timeline within 45 minutes.",
            },
            {
              step: "02",
              title: "Free Trial Sample",
              desc: "We edit up to 2 sample images for free to calibrate lighting, clipping margins, and color tone according to your style guide.",
            },
            {
              step: "03",
              title: "Volume Production",
              desc: "Our senior Photoshop artists execute the batch using 100% manual pen tool and calibrated retouching under strict NDA.",
            },
            {
              step: "04",
              title: "3-Tier QC & Delivery",
              desc: "Every file passes pixel-level QA before delivery via encrypted cloud storage (R2/S3/FTP/Dropbox) with unlimited revisions.",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col relative shadow-sm"
            >
              <div className="text-4xl font-extrabold font-mono text-indigo-600/30 mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONFIDENTIALITY & ENTERPRISE SECURITY */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Data Protection & Compliance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Your Unreleased Product Visuals Stay 100% Secure
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We work with unreleased fashion collections, patent-pending consumer hardware, and embargoed campaign imagery. Your IP security is built into our operational contracts.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Strict Non-Disclosure Agreements (NDA) signed before file transfer.",
                "Isolated local workstation networks with disabled USB storage and external drives.",
                "Zero public portfolio exposure without written client consent.",
                "Automated file purge policies 14 days post-delivery.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-600" />
                <span>Enterprise SLA Guarantees</span>
              </h3>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-semibold text-slate-900">Dedicated Account Manager</div>
                  <div className="text-xs text-slate-600 mt-1">Single point of contact via Slack, Teams, or WhatsApp for rapid production syncs.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-semibold text-slate-900">Scalable Surge Capacity</div>
                  <div className="text-xs text-slate-600 mt-1">Scale from 50 to 10,000 images per week without missing Q4 or holiday campaign deadlines.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-semibold text-slate-900">Custom Metadata & Export Formats</div>
                  <div className="text-xs text-slate-600 mt-1">Deliverables in web-ready WebP/AVIF, layered PSDs with named alpha channels, or multi-resolution TIFFs.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Answers & Clarity
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to know about pricing, turnaround, file formats, and free trial samples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {faqsData.slice(0, 6).map((faq) => (
            <div
              key={faq.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
            >
              <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-indigo-700 text-xs uppercase font-mono px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 font-semibold">
                  {faq.category}
                </span>
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Read all frequently asked questions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 8. FINAL QUOTE CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-10 xl:px-12 bg-slate-50 border-t border-slate-200 w-full">
        <div className="w-full p-8 sm:p-12 lg:p-16 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Test Us With 2 Free Images</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Ready to Elevate Your Visual Output & Lower Costs?
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Send us your brief and sample photos today. We will return your completed sample within 4 hours, complete with custom pricing and zero obligation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/request-a-quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition-all"
            >
              Get Your Custom Quote Now
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-slate-700 font-medium border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all text-sm shadow-sm"
            >
              Interactive Price Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
