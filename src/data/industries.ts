export interface IndustryItem {
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  heroImage: string;
  challenges: { problem: string; solution: string }[];
  keyBenefits: string[];
  complianceStandards?: string[];
  recommendedServices: string[];
}

export const industriesData: IndustryItem[] = [
  {
    slug: "ecommerce-marketplaces",
    title: "E-Commerce Brands & Marketplace Retailers",
    tagline: "High-velocity image preparation built for Amazon, Shopify & Google Shopping compliance.",
    shortDesc:
      "Scale your product listings with 100% compliant, white-background cutouts, consistent margins, and optimized zoom-ready files that increase conversion rates and eliminate platform rejections.",
    heroImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      {
        problem: "Amazon and Walmart strict image requirements lead to listing suppression.",
        solution: "We enforce 100% pure white (#FFFFFF), 85%+ product frame filling, and sRGB color profile validation on every batch.",
      },
      {
        problem: "Slow visual production bottlenecks new product launches and catalog updates.",
        solution: "With 24/7 dedicated production lines, we turn around batches of 500+ photos in under 12 hours.",
      },
      {
        problem: "Inconsistent angles and lighting between SKUs degrade brand trustworthiness.",
        solution: "Uniform horizon alignment, standardized drop shadows, and proportional bounding boxes harmonize your entire store.",
      },
    ],
    keyBenefits: [
      "Zero marketplace listing rejections",
      "Overnight turnaround for peak seasonal sales",
      "Scalable high-throughput delivery for 500+ daily assets",
      "Custom padding and metadata formatting",
    ],
    recommendedServices: ["clipping-path", "background-removal", "shadow-reflection", "product-photo-retouching"],
  },
  {
    slug: "fashion-apparel",
    title: "Fashion Brands & Apparel Catalogs",
    tagline: "Showcase fit, fabric texture, and authentic drape with flawless ghost mannequin and lookbook retouching.",
    shortDesc:
      "Transform flat-lays, on-model captures, and mannequin shots into high-fashion catalog assets with realistic 3D hollow effects, wrinkle softening, and true-to-life textile reproduction.",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      {
        problem: "Expensive live model shoots and studio rentals drain seasonal production budgets.",
        solution: "Our ghost mannequin compositing delivers organic 3D shape and depth using standard tabletop or mannequin photography.",
      },
      {
        problem: "High customer return rates caused by misleading online color representations.",
        solution: "Our Pantone-calibrated color correction matches true textile tones across all lighting environments.",
      },
      {
        problem: "Wrinkles, creases, and uneven seams distract from garment craftsmanship.",
        solution: "Editorial wrinkle reduction smooths fabrics while preserving natural weave texture.",
      },
    ],
    keyBenefits: [
      "Consistent 3D floating mannequin drape",
      "Exact Pantone color fidelity across all variants",
      "Symmetrical sleeve, collar, and hem alignment",
      "Multi-format export for web, mobile, and print lookbooks",
    ],
    recommendedServices: ["ghost-mannequin", "color-correction", "image-masking", "shadow-reflection"],
  },
  {
    slug: "jewelry-luxury",
    title: "Jewelry Houses & Luxury Accessories",
    tagline: "Microscopic perfection for fine jewelry, precious metals, and luminous gemstones.",
    shortDesc:
      "Fine jewelry demands meticulous macro craftsmanship. We eradicate micro-scratches, balance hot-spot reflections, enhance gemstone facet dispersion, and deliver captivating brilliance.",
    heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      {
        problem: "Macro lenses amplify microscopic scratches and dust invisible to the naked eye.",
        solution: "Our specialist jewelry retouchers polish metals to mirror perfection without altering bezel anatomy.",
      },
      {
        problem: "Diamonds and gemstones appear cloudy, dark, or lifeless under standard studio strobes.",
        solution: "Individual facet contrast tuning intensifies fire, scintillation, and brilliance.",
      },
      {
        problem: "Camera reflections, room glare, and tripod legs reflect onto curved polished surfaces.",
        solution: "Clean metal reconstruction and gradient blending eliminate all distracting environmental reflections.",
      },
    ],
    keyBenefits: [
      "Individual diamond and stone facet enhancement",
      "Gold, platinum, and silver luster reconstruction",
      "Focus stacking blur correction for razor sharpness",
      "High-resolution 300 DPI zoom-ready assets",
    ],
    recommendedServices: ["jewelry-retouching", "clipping-path", "shadow-reflection", "product-photo-retouching"],
  },
  {
    slug: "photographers-studios",
    title: "Commercial Photographers & Creative Studios",
    tagline: "Your invisible 24/7 post-production back-office so you can focus on shooting.",
    shortDesc:
      "Stop spending late nights in Photoshop after a full day on set. Hand off your raw captures to our dedicated retouchers and receive calibrated, client-ready deliverables before your morning coffee.",
    heroImage: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      {
        problem: "Post-production editing bottlenecks take you away from client acquisition and shooting.",
        solution: "Outsource raw culling, clipping, and base cleanup to a reliable team working while you sleep.",
      },
      {
        problem: "Inconsistent freelance retouchers fail to adhere to your studio's unique signature style.",
        solution: "We assign dedicated retouchers trained on your studio's custom style guide and action sets.",
      },
      {
        problem: "Tight client deadlines leave zero margin for delays.",
        solution: "Our guaranteed 6-hour and 12-hour rush SLAs ensure you always meet your agency commitments.",
      },
    ],
    keyBenefits: [
      "White-label confidentiality under strict NDA",
      "Dedicated account manager and assigned retouchers",
      "Flexible batch billing and monthly retainer options",
      "Direct integration with Dropbox, Google Drive, or FTP",
    ],
    recommendedServices: ["clipping-path", "product-photo-retouching", "image-masking", "color-correction"],
  },
  {
    slug: "advertising-agencies",
    title: "Advertising & Digital Marketing Agencies",
    tagline: "Scalable creative production for multi-channel omnichannel ad campaigns.",
    shortDesc:
      "When creative campaigns demand hundreds of banner variants, high-res billboard cutouts, and localized promotional graphics, Foryourgoal delivers prompt, pixel-accurate visual executions.",
    heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    challenges: [
      {
        problem: "Multi-channel campaigns require isolating products across dozens of aspect ratios.",
        solution: "We provide master layered PSDs with vector masks and separated shadow layers for easy resizing.",
      },
      {
        problem: "Internal creative teams burn out doing repetitive masking instead of conceptual design.",
        solution: "Free up high-cost art directors and senior designers by delegating production tasks to us.",
      },
    ],
    keyBenefits: [
      "Scalable surge capacity for large pitch deadlines",
      "Layered non-destructive master deliverables",
      "Priority rush SLA turnaround",
      "Centralized agency invoicing and client sub-accounts",
    ],
    recommendedServices: ["clipping-path", "product-photo-retouching", "color-correction", "image-masking"],
  },
];

export function getIndustryBySlug(slug: string): IndustryItem | undefined {
  return industriesData.find((i) => i.slug === slug);
}
