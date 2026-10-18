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
    <div className="py-12 px-4 sm:px-6 lg:px-10 xl:px-12 w-full bg-white text-slate-900">
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
              className="w-full aspect-[4/3] rounded-xl overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
