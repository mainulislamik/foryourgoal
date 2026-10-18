import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug } from "@/data/services";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { formatPrice } from "@/lib/utils";
import {
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Zap,
  HelpCircle,
} from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Foryourgoal",
    };
  }

  return {
    title: `${service.title} | Foryourgoal Commercial Image Editing`,
    description: service.shortDesc,
    alternates: {
      canonical: `https://foryourgoal.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Foryourgoal Studio`,
      description: service.shortDesc,
      url: `https://foryourgoal.com/services/${service.slug}`,
      images: [{ url: service.afterImage }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Schema.org Service JSON-LD
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDesc,
    provider: {
      "@type": "Organization",
      name: "Foryourgoal",
      url: "https://foryourgoal.com",
    },
    offers: {
      "@type": "Offer",
      price: service.startingPrice,
      priceCurrency: "USD",
    },
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-brand-ivory/60 mb-8 font-mono">
        <Link href="/" className="hover:text-brand-lime transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/services" className="hover:text-brand-lime transition-colors">
          Services
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-ivory font-medium">{service.title}</span>
      </nav>

      {/* Hero Service Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/15 text-brand-violet text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
            <span>Commercial Specification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-ivory tracking-tight">
            {service.title}
          </h1>

          <p className="text-lg text-brand-ivory/70 leading-relaxed">
            {service.fullDesc}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold font-mono text-brand-lime">
                {formatPrice(service.startingPrice)}
              </span>
              <span className="text-xs text-brand-ivory/60">/ per image</span>
            </div>

            <div className="h-6 w-px bg-brand-border" />

            <div className="flex items-center gap-2 text-sm text-brand-ivory/80 font-mono">
              <Clock className="w-4 h-4 text-brand-violet" />
              <span>~{service.turnaroundHours} Hours Turnaround</span>
            </div>

            <div className="h-6 w-px bg-brand-border" />

            <div className="flex items-center gap-2 text-sm text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Unlimited Revisions</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`/request-a-quote?service=${service.slug}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-violet to-violet-600 text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Get Custom Volume Quote</span>
              <ArrowRight className="w-4 h-4 text-brand-lime" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-brand-navy-card text-brand-ivory font-medium border border-brand-border hover:border-brand-ivory/30 text-sm text-center"
            >
              Interactive Price Calculator
            </Link>
          </div>
        </div>

        {/* Visual Before/After */}
        <div className="lg:col-span-5">
          <div className="p-3 rounded-2xl bg-brand-navy-card border border-brand-border shadow-2xl">
            <BeforeAfterSlider
              beforeImage={service.beforeImage}
              afterImage={service.afterImage}
              title={service.title}
              category="Interactive Inspection"
              className="w-full aspect-[4/3] rounded-xl overflow-hidden"
            />
            <div className="mt-3 text-center text-xs text-brand-ivory/60">
              Drag slider left or right to inspect edge quality and color accuracy.
            </div>
          </div>
        </div>
      </div>

      {/* Technical Features & Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <div className="p-8 rounded-2xl bg-brand-navy-card/60 border border-brand-border">
          <h2 className="text-xl font-bold text-brand-ivory mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-lime" />
            <span>Key Capabilities & Inclusions</span>
          </h2>
          <div className="space-y-4">
            {service.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-lime shrink-0 mt-0.5" />
                <span className="text-sm text-brand-ivory/80 leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-brand-navy-card/60 border border-brand-border">
          <h2 className="text-xl font-bold text-brand-ivory mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-violet" />
            <span>Production Standards & Deliverables</span>
          </h2>
          <div className="space-y-4 text-sm text-brand-ivory/80">
            <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-border/60">
              <div className="font-semibold text-brand-ivory">Export Formats</div>
              <div className="text-xs text-brand-ivory/60 mt-1">Layered PSD (named paths & masks), transparent PNG, WebP, AVIF, TIFF (sRGB or Adobe RGB).</div>
            </div>
            <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-border/60">
              <div className="font-semibold text-brand-ivory">Color & Profile Integrity</div>
              <div className="text-xs text-brand-ivory/60 mt-1">Preservation of embedded ICC color profiles, EXIF metadata, and standardized DPI dimensions.</div>
            </div>
            <div className="p-4 rounded-xl bg-brand-navy/60 border border-brand-border/60">
              <div className="font-semibold text-brand-ivory">Quality Assurance</div>
              <div className="text-xs text-brand-ivory/60 mt-1">Dual-inspector review at 300% zoom to verify zero clipping halos or artifact banding.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="my-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-brand-ivory mb-6 text-center">
            Frequently Asked Questions About {service.title}
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-brand-navy-card/50 border border-brand-border">
                <h3 className="text-base font-bold text-brand-ivory flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-lime shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-2 text-sm text-brand-ivory/70 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Bottom Banner */}
      <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy-card via-brand-violet/25 to-brand-navy-card border border-brand-border text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ivory">
          Ready to scale your {service.title.toLowerCase()} volume?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-brand-ivory/70 max-w-xl mx-auto">
          Submit 2 sample images today. We will process them according to your exact specifications at zero charge.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/request-a-quote?service=${service.slug}`}
            className="px-8 py-3.5 rounded-xl bg-brand-lime text-brand-navy font-bold text-sm hover:bg-lime-400 transition-all"
          >
            Start Free Sample Test
          </Link>
          <Link
            href="/services"
            className="px-6 py-3.5 rounded-xl bg-brand-navy text-brand-ivory font-medium border border-brand-border hover:border-brand-ivory/30 text-sm"
          >
            Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
