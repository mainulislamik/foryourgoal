import React from "react";

export function GlobalJsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://foryourgoal.com/#organization",
    name: "Foryourgoal",
    legalName: "Foryourgoal Creative & Commercial Post-Production Studio",
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
      "Enterprise commercial image post-production studio specializing in 100% hand-drawn Photoshop clipping paths, high-end jewelry retouching, 3D ghost mannequin, neck joint compositing, and Amazon/Shopify catalog optimization with 6-24 hour turnaround.",
    email: "support@foryourgoal.com",
    telephone: "+8801772866884",
    priceRange: "$$",
    currenciesAccepted: "USD, EUR, GBP, CAD, AUD",
    paymentAccepted: "Credit Card, PayPal, Wire Transfer",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2480",
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      "Worldwide",
      "United States",
      "United Kingdom",
      "Germany",
      "Canada",
      "Australia",
      "Europe",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+8801772866884",
        contactType: "customer service",
        areaServed: "Global",
        availableLanguage: ["English", "Bengali"],
        hoursAvailable: {
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
      },
    ],
    knowsAbout: [
      "Clipping Path Services",
      "Hand-Drawn Vector Bezier Paths",
      "Multi Clipping Path & Color Separation",
      "Ghost Mannequin & Invisible Neck Joint Compositing",
      "High-End Jewelry Retouching & Focus Stacking",
      "Commercial Product Photo Retouching",
      "Advanced Hair & Fur Alpha Channel Masking",
      "Natural Drop Shadow & Reflection Creation",
      "E-Commerce Color Correction & Multi-Colorway Recolor",
      "Amazon Product Image Compliance (Pure RGB 255,255,255)",
      "Shopify High-Resolution Image Optimization",
      "Batch Image Processing & 3-Tier Quality Control",
    ],
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Enterprise Commercial Post-Production Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hand-Drawn Clipping Path Services",
            url: "https://foryourgoal.com/services/clipping-path",
            description: "100% human-crafted Adobe Photoshop pen tool vector cutouts with smooth bezier curves.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Multi Clipping Path Service",
            url: "https://foryourgoal.com/services/multi-clipping-path",
            description: "Color separation and sub-path segmentation for multi-material apparel and footwear.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Advanced Image Masking Services",
            url: "https://foryourgoal.com/services/image-masking",
            description: "Alpha channel and edge preservation for flyaway hair, fur, transparent glass, and lace.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bulk Background Removal & Replacement",
            url: "https://foryourgoal.com/services/background-removal",
            description: "Pure #FFFFFF Amazon compliant backdrops and transparent PNG cutouts at high volume.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ghost Mannequin & Neck Joint Services",
            url: "https://foryourgoal.com/services/ghost-mannequin",
            description: "3D hollow-body apparel compositing with interior collar and label integration.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ghost Mannequin Neck Joint Service",
            url: "https://foryourgoal.com/services/neck-joint-service",
            description: "Precision collar stitching and interior neck joint compositing for apparel brands.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Product Photo Retouching",
            url: "https://foryourgoal.com/services/product-photo-retouching",
            description: "Surface blemish cleanup, dust removal, glare suppression, and texture preservation.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Luxury Jewelry & Gemstone Retouching",
            url: "https://foryourgoal.com/services/jewelry-retouching",
            description: "Macro focus stacking composites, metal luster restoration, and diamond facet fire enhancement.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Shadow & Reflection Creation",
            url: "https://foryourgoal.com/services/shadow-reflection",
            description: "Natural soft drop shadows, directional cast shadows, and luxury mirror reflections.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Product Shadow Creation Service",
            url: "https://foryourgoal.com/services/shadow-creation",
            description: "Custom ground contact shadows and realistic dimensional reflections for e-commerce PDPs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Color Correction & Multi-Color Recolor",
            url: "https://foryourgoal.com/services/color-correction",
            description: "Pantone-matched colorway generation and studio lighting white balance correction.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Amazon Product Photo Editing Service",
            url: "https://foryourgoal.com/services/amazon-product-photo-editing",
            description: "100% compliant Amazon listing hero images (pure white background, 85% frame fill, 2000px).",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Shopify Product Image Editing Service",
            url: "https://foryourgoal.com/services/shopify-image-editing",
            description: "Square 2048px retina crops, WebP compression, uniform margins, and CDN optimization.",
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
      "Enterprise Image Post-Production & B2B Commercial Photo Editing Studio",
    publisher: {
      "@id": "https://foryourgoal.com/#organization",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://foryourgoal.com/blog?q={search_term_string}",
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
