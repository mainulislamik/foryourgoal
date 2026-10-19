import type { Metadata } from "next";
import { faqsData } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & SLAs",
  description:
    "Answers about Foryourgoal image editing SLAs, Photoshop pen-tool QA, NDA security protocols, batch file delivery, and free pilot trials. Request a quote.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions & SLAs | Foryourgoal",
    description:
      "Answers about Foryourgoal image editing SLAs, Photoshop pen-tool QA, NDA security protocols, batch file delivery, and free pilot trials.",
    url: "https://foryourgoal.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]) }}
      />
      {children}
    </>
  );
}
