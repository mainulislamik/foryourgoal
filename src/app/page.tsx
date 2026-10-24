import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { HomeFaqAccordion } from "@/components/faq/HomeFaqAccordion";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  AnimatedNumber,
  PulseBadge,
} from "@/components/ui/MotionWrappers";
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
  UploadCloud,
  Layers,
  FileCheck,
  Send,
  Eye,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const content = await getSiteContent();
  const hero = content.hero;
  const stats = content.stats || [];
  const services = content.servicesSection?.services || [];
  const industries = content.industriesSection?.industries || [];
  const howItWorks = content.howItWorks;
  const security = content.securitySection;
  const securitySection = content.securitySection;
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
      <section className="relative flex items-center justify-center pt-20 sm:pt-24 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-10 xl:px-12 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 border-b border-slate-200/80 w-full">
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.06),rgba(255,255,255,0))] pointer-events-none" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          {/* Left Column: Editorial Value Proposition */}
          <FadeIn className="lg:col-span-7 flex flex-col gap-6 lg:gap-7 text-center lg:text-left">
            <FadeIn delay={0.05}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.12]">
                {hero.headingPrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-600 to-indigo-800">
                  {hero.headingGradient}
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {hero.subheading}
              </p>
            </FadeIn>

            {/* CTA & Trust Triggers */}
            <FadeIn delay={0.25} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-1">
              <Link
                href={
                  hero.primaryCtaLink && hero.primaryCtaLink !== "/request-a-quote"
                    ? hero.primaryCtaLink
                    : "/request-free-trial"
                }
                className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-base shadow-lg shadow-red-600/25 hover:shadow-red-600/35 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] transition-all group"
              >
                <span>
                  {hero.primaryCtaText && !hero.primaryCtaText.toLowerCase().includes("quote")
                    ? hero.primaryCtaText
                    : "Request a Free Trial"}
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={hero.secondaryCtaLink || "/services"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium border border-slate-300 hover:border-red-400 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-sm"
              >
                <span>{hero.secondaryCtaText || "Explore Services"}</span>
              </Link>
            </FadeIn>

            {/* Trust Badges */}
            <FadeIn delay={0.35} className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-slate-200 max-w-lg mx-auto lg:mx-0">
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
            </FadeIn>
          </FadeIn>

          {/* Right Column: Interactive Before/After Visual Proof */}
          <FadeIn direction="left" delay={0.2} className="lg:col-span-5 flex flex-col items-center">
            <div className="animate-float-slow w-full max-w-xl lg:max-w-none rounded-2xl bg-white p-3 border border-slate-200/90 shadow-2xl shadow-indigo-200/40 [filter:drop-shadow(0_0_24px_rgba(99,102,241,0.18))]">
              <BeforeAfterSlider
                beforeImage={hero.featuredBeforeImage || "/images/services/color-correction-before.jpg"}
                afterImage={hero.featuredAfterImage || "/images/services/color-correction-after.jpg"}
                beforeLabel="Original RAW"
                afterLabel="Retouched Asset"
                aspectRatio="auto"
                naturalAspectRatio={1.5}
                className="w-full rounded-xl overflow-hidden shadow-inner"
                title={hero.featuredTitle || "Color Grading & White-Balance Correction"}
                category="Color Correction & Grading"
              />
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  {hero.featuredTitle}
                </span>
                <PulseBadge color="bg-emerald-500" className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {hero.featuredBadge}
                </PulseBadge>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. STATS & CAPACITY BAR */}
      <section className="border-b border-slate-200 bg-slate-50 py-10 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <StaggerContainer className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <StaggerItem>
            <HoverCard className="card-hover-elevated flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs h-full">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedNumber value={1000} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Daily Processing Capacity
              </div>
            </HoverCard>
          </StaggerItem>
          <StaggerItem>
            <HoverCard className="card-hover-elevated flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs h-full">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedNumber value={99.8} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                First-Pass Acceptance Rate
              </div>
            </HoverCard>
          </StaggerItem>
          <StaggerItem>
            <HoverCard className="card-hover-elevated flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs h-full">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedNumber value={4} suffix="h Avg" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Express Turnaround Available
              </div>
            </HoverCard>
          </StaggerItem>
          <StaggerItem>
            <HoverCard className="card-hover-elevated flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs h-full">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedNumber value={100} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Hand-Crafted Vector Precision
              </div>
            </HoverCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 2.5 ZERO-RISK 5-IMAGE CLIENT PILOT */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <div className="max-w-6xl mx-auto rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800/80">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Test Our Edge Quality with 5 Free Sample Images
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  No credit card. No obligation. Send 5 of your most demanding raw catalog shots and inspect our 100% hand-drawn vector paths and natural retouching before committing a single dollar.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/request-free-trial"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Start 5-Image Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/8801772866884?text=Hello%20Foryourgoal%20Studio,%20I'd%20like%20to%20send%205%20free%20sample%20images%20to%20test%20your%20quality."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
                  01
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-indigo-400" />
                  Send Your Raw Files
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Drop a WeTransfer, Dropbox, or Google Drive link in our form or send directly on WhatsApp. Any format: RAW, CR3, NEF, TIFF, or PSD.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                  02
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  4–24 Hour Retouch & QA
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Our master retouchers execute 100% hand-drawn vector paths, micro-dust cleanup, and color grading. Every file passes two rounds of QA.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
                  03
                </div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  Inspect at 300% & Decide
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Inspect the layered PSDs at 300% magnification. If you love the output, discuss production pricing. If not, walk away with zero charge.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Confidentiality: Bilateral NDA Available Upon Request</span>
              </div>
              <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4">
                Request Custom NDA &rarr;
              </Link>
            </div>
          </div>
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
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
          >
            <span>View all {services.length} services</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 8).map((service) => (
            <StaggerItem key={service.slug}>
              <HoverCard className="card-hover-elevated group flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:border-indigo-400/80 transition-all duration-300 h-full">
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <BeforeAfterSlider
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                    aspectRatio="custom"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    title={service.title}
                    category="Commercial Photo Editing"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <Link href={`/services/${service.slug}`} className="block">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>~{service.turnaroundHours}h Turnaround</span>
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. HOW IT WORKS / SLAS */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full border-t border-slate-200/80 bg-slate-50/50" id="how-it-works">
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-300 via-indigo-600 to-emerald-400 z-0 animate-pulse" />
          {(howItWorks?.steps || []).map((s, i) => {
            const stepIcons = [UploadCloud, Sparkles, Layers, ShieldCheck];
            const StepIcon = stepIcons[i % stepIcons.length] || CheckCircle2;
            return (
              <StaggerItem key={i}>
                <HoverCard className="relative p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex flex-col z-10 h-full group transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-700 flex items-center justify-center font-mono font-black text-lg shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      {s.step}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300">
                      <StepIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{s.desc}</p>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* 6. CONFIDENTIALITY & ENTERPRISE SECURITY */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
        <FadeIn className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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

            <StaggerContainer className="space-y-3 pt-2">
              {(security?.bulletPoints || []).map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/request-free-trial"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-slate-900/20 transition-all hover:-translate-y-0.5"
              >
                <span>Request 5-Image Trial</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-300 transition-all"
              >
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Request Custom NDA</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-900 group aspect-[4/3] w-full">
              {securitySection?.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={securitySection?.image || "/images/security/photoshop-editing.webp"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={securitySection.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={securitySection?.image || "/images/security/photoshop-editing.webp"}
                  alt={securitySection?.heading || "Enterprise Data Protection & Secure Facility"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  quality={90}
                  priority={false}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Air-Gapped & ISO 27001 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>Adobe Photoshop Workflow</span>
                  </div>
                  <div className="text-[11px] font-mono tracking-wider uppercase text-slate-400 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    TLS 1.3 / AES-256
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 7. TESTIMONIALS / CLIENT TRUST */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white border-t border-slate-200">
          <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Client Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Trusted by High-Volume Studios & Brands
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {testimonials.map((test) => (
              <StaggerItem key={test.id}>
                <HoverCard className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between h-full">
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
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-slate-100">
                      {test.avatar ? (
                        <Image
                          src={test.avatar}
                          alt={test.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-indigo-700 text-sm bg-indigo-100">
                          {test.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{test.name}</div>
                      <div className="text-xs font-medium text-slate-500">{test.role}</div>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 xl:px-12 w-full border-t border-slate-200">
        <FadeIn className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Answers & Clarity
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to know about turnaround speeds, quality control, file formats, and free trial samples.
          </p>
        </FadeIn>

        <FadeIn className="w-full">
          <HomeFaqAccordion faqs={faqs.slice(0, 6)} />
        </FadeIn>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>Read all frequently asked questions</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
