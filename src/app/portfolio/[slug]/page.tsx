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
    return { title: "Portfolio Item Not Found | Foryourgoal" };
  }

  return {
    title: `${item.title} Case Study | Foryourgoal Portfolio`,
    description: item.description,
    alternates: {
      canonical: `https://foryourgoal.com/portfolio/${item.slug}`,
    },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-brand-ivory/60 mb-8 font-mono">
        <Link href="/" className="hover:text-brand-lime transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/portfolio" className="hover:text-brand-lime transition-colors">
          Portfolio
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-ivory font-medium">{item.title}</span>
      </nav>

      {/* Hero Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-lime bg-brand-lime/10 px-3 py-1 rounded border border-brand-lime/20">
              {item.industry}
            </span>
            <span className="text-xs text-brand-ivory/60 font-mono">
              Turnaround: {item.turnaroundTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-ivory">
            {item.title}
          </h1>

          <p className="text-base sm:text-lg text-brand-ivory/70 leading-relaxed">
            {item.description}
          </p>

          <div className="pt-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-ivory/80 mb-3">
              Applied Post-Production Specs:
            </h2>
            <div className="flex flex-wrap gap-2">
              {(item.techniquesUsed || []).map((spec: string, i: number) => (
                <span
                  key={i}
                  className="text-xs bg-brand-navy-card text-brand-ivory px-3 py-1.5 rounded-lg border border-brand-border"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href={`/request-a-quote?service=${item.category}`}
              className="px-8 py-3.5 rounded-xl bg-brand-violet text-white font-semibold text-sm hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Request Similar Project Quote</span>
              <ArrowRight className="w-4 h-4 text-brand-lime" />
            </Link>
          </div>
        </div>

        {/* Visual Slider */}
        <div className="lg:col-span-6">
          <div className="p-3 rounded-2xl bg-brand-navy-card border border-brand-border shadow-2xl">
            <BeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              title={item.title}
              category="Before & After Comparison"
              className="w-full aspect-[4/3] rounded-xl overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
