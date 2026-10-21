import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioData, getPortfolioBySlug } from "@/data/portfolio";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ChevronRight, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);

  if (!item) {
    return { title: "Portfolio Item Not Found" };
  }

  return {
    title: `${item.title} Case Study`,
    description: item.description,
    alternates: {
      canonical: `https://foryourgoal.com/portfolio/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} Case Study | Foryourgoal`,
      description: item.description,
      url: `https://foryourgoal.com/portfolio/${item.slug}`,
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);

  if (!item) {
    notFound();
  }

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
        name: "Portfolio",
        item: "https://foryourgoal.com/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: `https://foryourgoal.com/portfolio/${item.slug}`,
      },
    ],
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-mono">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/portfolio" className="hover:text-indigo-600 transition-colors">
          Portfolio
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 font-medium">{item.title}</span>
      </nav>

      {/* Hero Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded border border-indigo-200">
              {item.industry}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Turnaround: {item.turnaroundTime}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Batch: {item.volume}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {item.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {item.description}
          </p>

          <div className="pt-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
              Applied Post-Production Specs:
            </h2>
            <div className="flex flex-wrap gap-2">
              {(item.techniquesUsed || []).map((spec: string, i: number) => (
                <span
                  key={i}
                  className="text-xs bg-slate-50 text-slate-800 font-medium px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href={`/request-a-quote?service=${item.category}`}
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Request Similar Project Quote</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </Link>
          </div>
        </div>

        {/* Visual Slider */}
        <div className="lg:col-span-6">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-xl">
            <BeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              title={item.title}
              category="Before & After Comparison"
              aspectRatio="auto"
              imageFit="contain"
              className="w-full rounded-xl overflow-hidden shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Technical Workflow & Production Deep-Dive */}
      <div className="border-t border-slate-200 pt-16 mt-16 max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">
          Technical Production Breakdown & Quality Verification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">The Production Challenge</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Commercial studio raw captures frequently arrive with unpredictable micro-imperfections, lens distortion, uneven lighting gradients, and uncalibrated white balances. In high-velocity e-commerce and luxury lookbooks, manual precision is required to isolate intricate edges without the harsh aliasing or plastic softening common in automated algorithmic magic wands.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Manual Artisan Execution</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every curve, bevel, and silhouette was traced with Adobe Photoshop&apos;s Bézier pen tool at 300% zoom. Our artists separated complex highlights, rebuilt natural drop shadows using organic gradients, and applied frequency separation to preserve authentic tactile textures while eliminating camera sensor dust and studio handling artifacts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">SLA Quality Assurance</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Completed files underwent strict 3-tier inspection by senior QA directors. We audited pixel padding, aspect ratio consistency, ICC color profile embedding (sRGB / Adobe RGB 1998), and vector path closure before packaging deliverables into multi-channel export archives ready for global omnichannel publishing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
