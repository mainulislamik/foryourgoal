import React from "react";

export function GlobalJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://foryourgoal.com/#organization",
    name: "Foryourgoal",
    legalName: "Foryourgoal Creative & Post-Production Studio",
    url: "https://foryourgoal.com",
    logo: {
      "@type": "ImageObject",
      url: "https://foryourgoal.com/images/foryourgoal-logo.png",
      width: 512,
      height: 512,
      caption: "Foryourgoal Logo",
    },
    image: "https://foryourgoal.com/images/og-image.jpg",
    description:
      "Enterprise commercial photo editing, clipping path, high-end jewelry retouching, and 3D ghost mannequin services with guaranteed 6-24 hour turnaround for global e-commerce and creative studios.",
    email: "support@foryourgoal.com",
    priceRange: "$$",
    currenciesAccepted: "USD, EUR, GBP",
    paymentAccepted: "Credit Card, PayPal, Wire Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Global" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial Post-Production Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Clipping Path Services",
            url: "https://foryourgoal.com/services/clipping-path",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Product Photo Retouching",
            url: "https://foryourgoal.com/services/product-photo-retouching",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ghost Mannequin & Neck Joint",
            url: "https://foryourgoal.com/services/ghost-mannequin",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jewelry Retouching",
            url: "https://foryourgoal.com/services/jewelry-retouching",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Background Removal",
            url: "https://foryourgoal.com/services/background-removal",
          },
        },
      ],
    },
    sameAs: [
      "https://www.linkedin.com/company/foryourgoal",
      "https://twitter.com/foryourgoal",
      "https://www.facebook.com/foryourgoal",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://foryourgoal.com/#website",
    url: "https://foryourgoal.com",
    name: "Foryourgoal",
    description:
      "Enterprise Image Post-Production & B2B Commercial Editing Studio",
    publisher: {
      "@id": "https://foryourgoal.com/#organization",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://foryourgoal.com/services?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
