import React from "react";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  ChevronRight,
  Star,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const content = await getSiteContent();
  const hero = content.hero;
  const stats = content.stats || [];
  const services = content.servicesSection?.services || [];
  const portfolio = content.portfolioSection?.items || [];
  const industries = content.industriesSection?.industries || [];
  const howItWorks = content.howItWorks;
  const security = content.securitySection;
  const cta = content.ctaBanner;
  const faqs = content.faqs || [];
  const testimonials = content.testimonials || [];

  const homeSchemasJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Foryourgoal | Commercial Photo Editing, Clipping Path & Retouching Studio",
      description:
        "High-volume commercial image editing, hand-drawn clipping paths, ghost mannequin, and high-end jewelry photo retouching for global e-commerce brands.",
      url: "https://foryourgoal.com",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://foryourgoal.com",
          },
        ],
      },
    },
    ...(howItWorks?.steps && howItWorks.steps.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How The Foryourgoal Commercial Image Editing Pipeline Works",
            description:
              "Follow our 4-step secure workflow for enterprise image editing, from file upload to pixel-perfect delivery.",
            step: howItWorks.steps.map((st, idx) => ({
              "@type": "HowToStep",
              position: idx + 1,
              name: st.title,
              text: st.desc,
              url: `https://foryourgoal.com/how-it-works#step-${st.step.toLowerCase()}`,
            })),
          },
        ]
      : []),
    ...(faqs && faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.slice(0, 10).map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col gap-0 overflow-hidden bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchemasJsonLd) }}
      />
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-10 xl:px-12 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-200/80 w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.06),rgba(255,255,255,0))] pointer-events-none" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{hero.badgeText}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              {hero.headingPrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-600 to-indigo-800">
                {hero.headingGradient}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {hero.subheading}
            </p>

            {/* CTA & Trust Triggers */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <Link
                href={hero.primaryCtaLink || "/request-a-quote"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 transition-all"
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
              <Link
                href={hero.secondaryCtaLink || "/portfolio"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium border border-slate-300 hover:border-slate-400 transition-all shadow-sm"
              >
                <span>{hero.secondaryCtaText}</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">{hero.trustPill1Title}</div>
                  <div className="text-[11px] text-slate-600">{hero.trustPill1Sub}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">{hero.trustPill2Title}</div>
                  <div className="text-[11px] text-slate-600">{hero.trustPill2Sub}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">{hero.trustPill3Title}</div>
                  <div className="text-[11px] text-slate-600">{hero.trustPill3Sub}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Before/After Visual Proof */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md lg:max-w-none rounded-2xl bg-white p-3 border border-slate-200/90 shadow-2xl shadow-slate-200/50">
              <BeforeAfterSlider
                beforeImage={hero.featuredBeforeImage || "/images/services/color-correction-before.jpg"}
                afterImage={hero.featuredAfterImage || "/images/services/color-correction-after.jpg"}
                beforeLabel="Original RAW"
                afterLabel="Retouched Asset"
                aspectRatio="aspect-square"
                className="rounded-xl overflow-hidden shadow-inner"
                title={hero.featuredTitle || "Color Grading & White-Balance Correction"}
                category="Color Correction & Grading"
              />
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  {hero.featuredTitle}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {hero.featuredBadge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & CAPACITY BAR */}
      <section className="border-b border-slate-200 bg-slate-50 py-10 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE SERVICES GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {content.servicesSection?.badge || "Specialized Capabilities"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {content.servicesSection?.heading || "Commercial Image Editing Services"}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {content.servicesSection?.description ||
                "Engineered for high-volume retailers, e-commerce managers, and commercial studios needing consistent studio-grade precision."}
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
          >
            <span>View all {services.length} services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service) => (
            <div
              key={service.slug}
              className="group flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <BeforeAfterSlider
                  beforeImage={service.beforeImage}
                  afterImage={service.afterImage}
                  aspectRatio="custom"
                  className="w-full h-full"
                  title={service.title}
                  category="Commercial Photo Editing"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-600 font-medium">
                    From <span className="font-bold text-slate-900">{service.startingPrice}</span>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEFORE & AFTER SHOWCASE GALLERY */}
      <section className="py-20 bg-slate-50 border-y border-slate-200 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {content.portfolioSection?.badge || "Verified Client Work"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {content.portfolioSection?.heading || "Before & After Transformation Gallery"}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {content.portfolioSection?.description ||
              "Drag the slider on each showcase to inspect our pixel-level precision, hand-drawn vector paths, and micro-texture preservation."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolio.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeLabel="Raw Input"
                  afterLabel="Retouched"
                  aspectRatio="custom"
                  className="w-full h-full"
                />
              </div>
              <div className="px-1 py-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900">{item.title}</span>
                  <span className="font-mono text-[10px] text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span>Explore full portfolio ({portfolio.length} case studies)</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>
      </section>

      {/* 5. HOW IT WORKS / SLAS */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {howItWorks?.badge || "Seamless Outsourcing"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            {howItWorks?.heading || "How The Foryourgoal Pipeline Works"}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {howItWorks?.description ||
              "A frictionless, predictable workflow designed to scale with your seasonal surges."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {(howItWorks?.steps || []).map((s, i) => (
            <div
              key={i}
              className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col"
            >
              <div className="text-3xl font-black text-indigo-600 mb-4 font-mono">
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
              {security?.badge || "Data Protection & Compliance"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {security?.heading || "Your Unreleased Product Visuals Stay 100% Secure"}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {security?.description ||
                "We work with unreleased fashion collections, patent-pending consumer hardware, and embargoed campaign imagery. Your IP security is built into our operational contracts."}
            </p>

            <div className="space-y-3 pt-2">
              {(security?.bulletPoints || []).map((item, i) => (
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
                <span>{security?.cardTitle || "Enterprise SLA Guarantees"}</span>
              </h3>
              <div className="space-y-4 text-sm text-slate-600">
                {(security?.cardMetrics || []).map((metric, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="font-semibold text-slate-900">{metric.label}</div>
                    <div className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS / CLIENT TRUST */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white border-t border-slate-200">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Client Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Trusted by High-Volume Studios & Brands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(test.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                    &ldquo;{test.content}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{test.name}</div>
                    <div className="text-xs text-slate-500">{test.role}, {test.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full border-t border-slate-200">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Answers & Clarity
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to know about turnaround speeds, quality control, file formats, and free trial samples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {faqs.slice(0, 6).map((faq) => (
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

      {/* 9. FINAL QUOTE CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-10 xl:px-12 bg-slate-50 border-t border-slate-200 w-full">
        <div className="w-full p-8 sm:p-12 lg:p-16 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Test Us With 2 Free Images</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {cta?.heading || "Ready to Elevate Your Visual Output & Lower Costs?"}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {cta?.description ||
              "Send us your brief and sample photos today. We will return your completed sample within 4 hours, complete with your tailored project scope and zero obligation."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/request-a-quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-lg transition-all"
            >
              {cta?.quoteBtnText || "Get Your Custom Quote Now"}
            </Link>
            <Link
              href="/request-free-trial"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-slate-700 font-medium border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all text-sm shadow-sm"
            >
              {cta?.trialBtnText || "Explore Our Free Trial"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
