import React from "react";
import type { Metadata } from "next";
import { getDynamicPortfolio } from "@/lib/site-content";
import { portfolioData } from "@/data/portfolio";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Commercial Photo Editing & Retouching Portfolio",
  description:
    "Explore our commercial photo editing portfolio: interactive before/after sliders of clipping path, high-end retouching, ghost mannequin, and jewelry. Inspect our work.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Commercial Photo Editing & Retouching Portfolio | Foryourgoal",
    description:
      "Explore our commercial photo editing portfolio: interactive before/after sliders of clipping path, high-end retouching, ghost mannequin, and jewelry.",
    url: "https://foryourgoal.com/portfolio",
  },
};

export default async function PortfolioPage() {
  const dynamicItems = await getDynamicPortfolio();
  const items = dynamicItems.length > 0 ? dynamicItems : (portfolioData as any);

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PortfolioGallery initialItems={items} />
    </>
  );
}
