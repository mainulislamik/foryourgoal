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
  Layers,
  SlidersHorizontal,
  Lock,
  Cpu,
  Star,
  ChevronRight,
  FileText,
  BadgeCheck,
} from "lucide-react";

export default function HomePage() {
  const featuredBeforeAfter = portfolioData[0];

  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy border-b border-brand-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(116,92,255,0.18),rgba(255,255,255,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
              <span>Enterprise Grade Image Post-Production</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-ivory leading-[1.12]">
              Professional Image Editing for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-ivory via-brand-violet to-brand-lime">
                E-commerce, Brands & Photographers
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-ivory/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              From pixel-precise clipping paths to high-end beauty and product retouching, Foryourgoal helps international studios and e-commerce leaders deliver consistent, catalog-ready visuals at enterprise scale.
            </p>

            {/* CTA & Trust Triggers */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/request-a-quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-violet to-violet-600 text-white font-semibold text-base shadow-xl shadow-brand-violet/25 hover:shadow-brand-violet/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Request a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-brand-lime" />
              </Link>
              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-brand-navy-card hover:bg-brand-navy-light text-brand-ivory font-medium border border-brand-border hover:border-brand-ivory/30 transition-all"
              >
                <span>Explore Client Work</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-border/60 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-brand-lime shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-brand-ivory">4-Hour / 24-Hour</div>
                  <div className="text-[11px] text-brand-ivory/50">Rapid Turnaround</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-brand-violet shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-brand-ivory">Strict NDA</div>
                  <div className="text-[11px] text-brand-ivory/50">100% Confidential</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-brand-ivory">3-Tier QC</div>
                  <div className="text-[11px] text-brand-ivory/50">Zero Defect Policy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-2 bg-gradient-to-br from-brand-border via-brand-navy-card to-brand-border shadow-2xl border border-brand-border">
              <BeforeAfterSlider
                beforeImage={featuredBeforeAfter.beforeImage}
                afterImage={featuredBeforeAfter.afterImage}
                title={featuredBeforeAfter.title}
                category="Featured Retouching"
                className="w-full aspect-[4/3] rounded-xl overflow-hidden"
              />
              <div className="mt-3 px-3 py-2 flex items-center justify-between text-xs text-brand-ivory/70 bg-brand-navy/80 rounded-lg">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
                  Jewelry Glare Removal & Stone Enhancement
                </span>
                <span className="text-brand-lime font-mono">100% Handcrafted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & REASSURANCE BANNER */}
      <section className="bg-brand-navy-card/80 border-b border-brand-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center justify-center p-3">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-lime font-mono">5,000+</div>
            <div className="text-xs sm:text-sm text-brand-ivory/70 mt-1">Images Processed Daily</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-brand-border/60">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-ivory font-mono">99.8%</div>
            <div className="text-xs sm:text-sm text-brand-ivory/70 mt-1">First-Pass Acceptance Rate</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-brand-border/60">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-violet font-mono">&lt; 4 Hours</div>
            <div className="text-xs sm:text-sm text-brand-ivory/70 mt-1">Express Rush Delivery</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-brand-border/60">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-ivory font-mono">100%</div>
            <div className="text-xs sm:text-sm text-brand-ivory/70 mt-1">Manual Pen-Tool Clipping</div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold tracking-wider uppercase mb-3">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ivory tracking-tight">
            Commercial Image Editing Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-ivory/60">
            Engineered for high-volume retailers, e-commerce managers, and commercial studios needing consistent studio-grade precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.slug}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-brand-navy-card/60 border border-brand-border hover:border-brand-violet/50 hover:bg-brand-navy-card transition-all duration-300"
            >
              <div>
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 relative border border-brand-border/60">
                  <BeforeAfterSlider
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                    title={service.title}
                    category="Sample Result"
                    className="w-full h-full"
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/20">
                    From {formatPrice(service.startingPrice)}/img
                  </span>
                  <span className="text-xs text-brand-ivory/50 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> ~{service.turnaroundHours}h
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-ivory group-hover:text-brand-lime transition-colors">
                  <Link href={`/services/${service.slug}`} className="focus:outline-none">
                    {service.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-sm text-brand-ivory/70 line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-brand-navy/90 text-brand-ivory/80 px-2 py-0.5 rounded border border-brand-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-brand-ivory hover:text-brand-lime inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Specs & Pricing</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/request-a-quote?service=${service.slug}`}
                  className="text-xs font-semibold text-brand-violet hover:text-brand-ivory transition-colors"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy-card text-brand-ivory font-medium border border-brand-border hover:border-brand-violet transition-all text-sm"
          >
            <span>View All Image Editing Capabilities</span>
            <ArrowRight className="w-4 h-4 text-brand-lime" />
          </Link>
        </div>
      </section>

      {/* 4. INDUSTRIES WE EMPOWER */}
      <section className="py-20 bg-brand-navy-light/60 border-y border-brand-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-lime">
              B2B Market Sectors
            </span>
            <h2 className="text-3xl font-extrabold text-brand-ivory mt-2">
              Built for High-Growth Industries
            </h2>
            <p className="mt-3 text-sm sm:text-base text-brand-ivory/70">
              Each vertical has unique marketplace guidelines, lighting physics, and compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industriesData.map((ind) => (
              <div
                key={ind.slug}
                className="p-6 rounded-xl bg-brand-navy-card border border-brand-border flex flex-col justify-between hover:border-brand-lime/40 transition-all"
              >
                <div>
                  <div className="text-xs font-mono text-brand-violet font-semibold tracking-wider uppercase mb-2">
                    {ind.tagline}
                  </div>
                  <h3 className="text-lg font-bold text-brand-ivory mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-brand-ivory/65 leading-relaxed mb-4">
                    {ind.shortDesc}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {ind.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                      <li key={bIdx} className="text-xs text-brand-ivory/80 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="text-xs font-semibold text-brand-lime hover:underline inline-flex items-center gap-1"
                >
                  <span>Industry Solutions</span> &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 STEPS) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            Seamless Outsourcing
          </span>
          <h2 className="text-3xl font-extrabold text-brand-ivory mt-2">
            How The Foryourgoal Pipeline Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-ivory/70">
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
              className="p-6 rounded-2xl bg-brand-navy-card/40 border border-brand-border/80 flex flex-col relative"
            >
              <div className="text-4xl font-extrabold font-mono text-brand-lime/20 mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-brand-ivory mb-2">{s.title}</h3>
              <p className="text-sm text-brand-ivory/65 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONFIDENTIALITY & ENTERPRISE SECURITY */}
      <section className="py-20 bg-brand-navy-light/90 border-t border-brand-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-lime">
              Data Protection & Compliance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ivory">
              Your Unreleased Product Visuals Stay 100% Secure
            </h2>
            <p className="text-base text-brand-ivory/70 leading-relaxed">
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
                  <ShieldCheck className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-ivory/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-brand-navy-card border border-brand-border shadow-xl">
              <h3 className="text-xl font-bold text-brand-ivory mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-violet" />
                <span>Enterprise SLA Guarantees</span>
              </h3>
              <div className="space-y-4 text-sm text-brand-ivory/70">
                <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-border/60">
                  <div className="font-semibold text-brand-ivory">Dedicated Account Manager</div>
                  <div className="text-xs text-brand-ivory/60 mt-1">Single point of contact via Slack, Teams, or WhatsApp for rapid production syncs.</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-border/60">
                  <div className="font-semibold text-brand-ivory">Scalable Surge Capacity</div>
                  <div className="text-xs text-brand-ivory/60 mt-1">Scale from 50 to 10,000 images per week without missing Q4 or holiday campaign deadlines.</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-border/60">
                  <div className="font-semibold text-brand-ivory">Custom Metadata & Export Formats</div>
                  <div className="text-xs text-brand-ivory/60 mt-1">Deliverables in web-ready WebP/AVIF, layered PSDs with named alpha channels, or multi-resolution TIFFs.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            Answers & Clarity
          </span>
          <h2 className="text-3xl font-extrabold text-brand-ivory mt-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-ivory/60">
            Everything you need to know about pricing, turnaround, file formats, and free trial samples.
          </p>
        </div>

        <div className="space-y-4">
          {faqsData.slice(0, 6).map((faq) => (
            <div
              key={faq.id}
              className="p-6 rounded-xl bg-brand-navy-card/60 border border-brand-border"
            >
              <h3 className="text-base font-bold text-brand-ivory flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="text-brand-lime text-xs uppercase font-mono px-2 py-0.5 rounded bg-brand-lime/10">
                  {faq.category}
                </span>
              </h3>
              <p className="mt-3 text-sm text-brand-ivory/70 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="text-xs font-semibold text-brand-violet hover:text-brand-lime inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Read all frequently asked questions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 8. FINAL QUOTE CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-navy via-brand-violet/20 to-brand-navy border-t border-brand-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-lime/10 text-brand-lime text-xs font-semibold border border-brand-lime/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Us With 2 Free Images</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ivory">
            Ready to Elevate Your Visual Output & Lower Costs?
          </h2>

          <p className="text-base sm:text-lg text-brand-ivory/70 max-w-2xl mx-auto">
            Send us your brief and sample photos today. We will return your completed sample within 4 hours, complete with custom pricing and zero obligation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/request-a-quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-lime text-brand-navy font-bold text-base hover:bg-lime-400 hover:shadow-lg transition-all"
            >
              Get Your Custom Quote Now
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-brand-navy-card text-brand-ivory font-medium border border-brand-border hover:border-brand-ivory/40 transition-all text-sm"
            >
              Interactive Price Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
