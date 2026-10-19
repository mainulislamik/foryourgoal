import React from "react";
import type { Metadata } from "next";
import { getDynamicFaqs } from "@/lib/site-content";
import { faqsData } from "@/data/faqs";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Commercial Photo Editing FAQs & SLA Standards",
  description:
    "Common questions about commercial photo editing: turnaround times, SLAs, security NDAs, volume pricing, and free trial tests. Clear answers for enterprise teams.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Commercial Photo Editing FAQs & SLA Standards | Foryourgoal",
    description:
      "Common questions about commercial photo editing: turnaround times, SLAs, security NDAs, and volume pricing.",
    url: "https://foryourgoal.com/faq",
  },
};

export default async function FAQPage() {
  const dynamicFaqs = await getDynamicFaqs();
  const faqs = dynamicFaqs.length > 0 ? dynamicFaqs : (faqsData as any);

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
        name: "FAQ",
        item: "https://foryourgoal.com/faq",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f: any) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqAccordion initialFaqs={faqs} />
    </>
  );
}
