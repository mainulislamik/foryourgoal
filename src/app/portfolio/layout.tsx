import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Before & After Portfolio",
  description:
    "Explore our commercial photo editing portfolio: manual hand-drawn clipping paths, high-end product retouching, and jewelry editing. Request a custom quote.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Commercial Before & After Portfolio | Foryourgoal",
    description:
      "Explore high-end before/after image retouching samples: hand-drawn clipping paths, ghost mannequin, and jewelry editing.",
    url: "https://foryourgoal.com/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}
    </>
  );
}
