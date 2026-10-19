import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData, getServiceBySlug } from "@/data/services";
import { getDynamicServiceBySlug } from "@/lib/site-content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export const dynamic = "force-dynamic";
export const revalidate = 0;
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

const serviceMetaDescriptions: Record<string, string> = {
  "clipping-path":
    "Pixel-perfect hand-drawn Photoshop pen tool clipping paths for sharp product cutouts. Fast turnaround and dedicated retouching teams. Request a custom quote.",
  "product-photo-retouching":
    "High-end commercial product retouching: blemish cleanup, dust removal, color balance, and texture preservation for premium brands. Request your custom quote.",
  "ghost-mannequin":
    "Expert invisible ghost mannequin and neck joint editing for apparel brands. Combine multi-angle shots into realistic 3D volume. Request your custom quote.",
  "jewelry-retouching":
    "Master jewelry and gemstone photo retouching. Eliminate macro scratches, restore precious metal luster, and maximize diamond sparkle. Request a custom quote.",
  "background-removal":
    "High-volume background removal and cutout services for Amazon, Shopify, and catalogs. Pure white #FFFFFF, transparent PNGs, and backdrops. Get a custom quote.",
  "shadow-reflection":
    "Natural drop shadows, directional cast shadows, and mirror reflections for product cutouts. Ground your catalog visuals naturally. Request a custom quote.",
  "color-correction":
    "Accurate color correction and multi-colorway generation. Match physical Pantone swatches from one master capture. Consistent apparel and e-commerce colors.",
  "image-masking":
    "Advanced alpha channel, fur, flyaway hair, and translucent fabric masking. Flawless edge isolation where standard clipping paths fail. Request a custom quote.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dynamicService = await getDynamicServiceBySlug(slug);
  const service = dynamicService || getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const desc = serviceMetaDescriptions[service.slug] || service.shortDesc;

  return {
    title: service.title,
    description: desc,
    alternates: {
      canonical: `https://foryourgoal.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Foryourgoal Studio`,
      description: desc,
      url: `https://foryourgoal.com/services/${service.slug}`,
      images: [{ url: service.afterImage }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const dynamicService = await getDynamicServiceBySlug(slug);
  const service = dynamicService || getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Schema.org Service & BreadcrumbList JSON-LD
  const schemasJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: serviceMetaDescriptions[service.slug] || service.shortDesc,
      provider: {
        "@type": "Organization",
        name: "Foryourgoal",
        url: "https://foryourgoal.com",
        logo: "https://foryourgoal.com/images/foryourgoal-logo.png",
      },
      areaServed: "Worldwide",
      serviceType: service.title,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: service.startingPrice?.replace(/[^0-9.]/g, "") || "0.49",
        availability: "https://schema.org/InStock",
        url: `https://foryourgoal.com/services/${service.slug}`,
      },
    },
    {
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
          name: "Services",
          item: "https://foryourgoal.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: `https://foryourgoal.com/services/${service.slug}`,
        },
      ],
    },
    ...(service.faqs && service.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((f: { q: string; a: string }) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/services" className="hover:text-indigo-600 transition-colors">
          Services
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">{service.title}</span>
      </nav>

      {/* Hero Service Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Commercial Specification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {service.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            {service.fullDesc}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-slate-700 font-mono">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>~{service.turnaroundHours} Hours Turnaround SLA</span>
            </div>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2 text-sm text-emerald-700 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Unlimited Revisions</span>
            </div>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2 text-sm text-indigo-700 font-mono font-medium">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Custom Enterprise Scope</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`/request-a-quote?service=${service.slug}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Get Custom Volume Quote</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-50 text-slate-800 font-medium border border-slate-300 hover:border-slate-400 hover:bg-slate-100 text-sm text-center transition-colors"
            >
              Explore Our Workflow & SLAs
            </Link>
          </div>
        </div>

        {/* Visual Before/After */}
        <div className="lg:col-span-5">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-xl">
            <BeforeAfterSlider
              beforeImage={service.beforeImage}
              afterImage={service.afterImage}
              title={service.title}
              category="Interactive Inspection"
              className="w-full aspect-[4/3] rounded-xl overflow-hidden"
            />
            <div className="mt-3 text-center text-xs text-slate-500">
              Drag slider left or right to inspect edge quality and color accuracy.
            </div>
          </div>
        </div>
      </div>

      {/* Technical Features & Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span>Key Capabilities & Inclusions</span>
          </h2>
          <div className="space-y-4">
            {service.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>Production Standards & Deliverables</span>
          </h2>
          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="font-semibold text-slate-900">Export Formats</div>
              <div className="text-xs text-slate-600 mt-1">Layered PSD (named paths & masks), transparent PNG, WebP, AVIF, TIFF (sRGB or Adobe RGB).</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="font-semibold text-slate-900">Color & Profile Integrity</div>
              <div className="text-xs text-slate-600 mt-1">Preservation of embedded ICC color profiles, EXIF metadata, and standardized DPI dimensions.</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="font-semibold text-slate-900">Quality Assurance</div>
              <div className="text-xs text-slate-600 mt-1">Dual-inspector review at 300% zoom to verify zero clipping halos or artifact banding.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="my-16 w-full">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently Asked Questions About {service.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {service.faqs.map((faq: { q: string; a: string }, idx: number) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Bottom Banner */}
      <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Ready to scale your {service.title.toLowerCase()} volume?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Submit 2 sample images today. We will process them according to your exact specifications at zero charge.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/request-a-quote?service=${service.slug}`}
            className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
          >
            Start Free Sample Test
          </Link>
          <Link
            href="/services"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-800 font-medium border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-sm shadow-sm"
          >
            Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
