export interface ServiceItem {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  turnaroundHours: number;
  beforeImage: string;
  afterImage: string;
  features: string[];
  deliverables: string[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    slug: "clipping-path",
    title: "Hand-Drawn Clipping Path Services",
    shortDesc: "Pixel-perfect hand-drawn Photoshop pen tool paths for crisp, sharp product isolation.",
    fullDesc:
      "Our master retouchers use Adobe Photoshop's pen tool exclusively to create razor-sharp vector clipping paths around your products. Unlike automated AI magic wands that introduce ragged edge artifacts, hand-drawn paths isolate subjects with flawless curves, crisp geometry, and natural contours ready for any catalog or composite.",
    startingPrice: 0.49,
    turnaroundHours: 6,
    beforeImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80&sat=-100",
    features: [
      "100% hand-drawn vector paths via Photoshop Pen Tool",
      "Zero halos, pixel fringing, or rough pixelated edges",
      "Multiple path clipping layers for color segmentation",
      "Configurable feather radius (0.2px to 0.5px for ultra-natural boundary)",
      "Supports complex curves, mesh fabrics, bicycles, and intricate shapes",
    ],
    deliverables: [
      "Original format with embedded active clipping path",
      "Isolated PNG with transparent background",
      "Pure white background JPEG (Amazon/Shopify compliant)",
      "Layered PSD with separate mask layers",
    ],
    idealFor: [
      "E-commerce stores (Amazon, eBay, Shopify, WooCommerce)",
      "Print product catalogs and advertising mailers",
      "Footwear, electronics, cosmetics, and packaged goods",
    ],
    faqs: [
      {
        q: "Why do you use hand-drawn clipping paths instead of AI automated cutouts?",
        a: "Automated AI clipping often cuts into product boundaries, misinterprets low-contrast edges, and leaves pixelated fringing. Our human pen-tool specialists ensure 100% edge fidelity and smooth bezier curves required for enterprise print and high-res web.",
      },
      {
        q: "What is your daily capacity for clipping path orders?",
        a: "We comfortably process 5,000+ images per day across our 24/7 dedicated production shifts.",
      },
    ],
  },
  {
    slug: "product-photo-retouching",
    title: "Commercial Product Photo Retouching",
    shortDesc: "Flawless cleanup, blemish elimination, dust removal, and texture preservation for premium brand aesthetics.",
    fullDesc:
      "Transform studio raw captures into high-converting hero visuals. We eliminate micro-scratches, lint, sensor dust, uneven reflections, and manufacturing flaws while preserving authentic material textures such as brushed metals, leathers, and matte coatings.",
    startingPrice: 0.99,
    turnaroundHours: 12,
    beforeImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80&brightness=1.1&contrast=1.1",
    features: [
      "Comprehensive sensor dust, fingerprint, and scratch removal",
      "Surface smoothing without plastic over-softening",
      "Reflection balancing and hot-spot gradient correction",
      "Shape realignment, label straightening, and perspective correction",
      "Natural shadow preservation and custom drop-shadow additions",
    ],
    deliverables: [
      "Full-resolution WebP and high-quality JPEG",
      "Layered 16-bit Master PSD on demand",
      "Optimized web variants with responsive dimensions",
    ],
    idealFor: [
      "Consumer electronics, watches, home appliances, and cosmetics",
      "DTC brands launching flagship storefronts and crowdfunding campaigns",
      "Amazon A+ content and lifestyle hero banners",
    ],
    faqs: [
      {
        q: "Do you keep the authentic material texture intact?",
        a: "Yes. We use advanced frequency separation and dodge & burn techniques to clean surfaces while retaining 100% of the authentic tactile texture.",
      },
    ],
  },
  {
    slug: "ghost-mannequin",
    title: "Ghost Mannequin & Neck Joint Services",
    shortDesc: "Combine multiple apparel shots to create seamless 3D hollow-body effects for apparel catalogs.",
    fullDesc:
      "Display clothing with realistic volume and fit without the distraction or expense of live models or plastic mannequins. We seamlessly composite the exterior front, interior collar/neck label, and lining shots into a clean, dimensional floating garment.",
    startingPrice: 1.25,
    turnaroundHours: 12,
    beforeImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80&sat=120",
    features: [
      "Seamless inner collar, tag, and lining composition",
      "Symmetry correction for sleeves, shoulders, and hems",
      "Wrinkle and crease softening while preserving natural drape",
      "Realistic interior shadow depth for organic 3D dimension",
      "Bottom hem jointing for coats, dresses, and trousers",
    ],
    deliverables: [
      "Transparent PNG cutout ready for any background",
      "Clean pure white background RGB JPEG",
      "Layered Photoshop PSD",
    ],
    idealFor: [
      "Fashion apparel brands, activewear lines, and department stores",
      "E-commerce lookbooks, wholesale line-sheets, and digital showrooms",
    ],
    faqs: [
      {
        q: "What files do I need to send for ghost mannequin effect?",
        a: "Provide the main photo on the mannequin plus a separate shot of the inner collar/neck label shot inside-out or flat on a table.",
      },
    ],
  },
  {
    slug: "jewelry-retouching",
    title: "Luxury Jewelry & Gemstone Retouching",
    shortDesc: "High-magnification diamond sparkle enhancement, metal polishing, and reflection balancing.",
    fullDesc:
      "Jewelry photography suffers from macro reflections, camera glare, and microscopic manufacturing abrasions. Our specialized jewelry retouching team restores precious metals to mirror-smooth brilliance, intensifies facet contrast in diamonds and colored gemstones, and creates luminous depth.",
    startingPrice: 2.50,
    turnaroundHours: 24,
    beforeImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80&contrast=1.2",
    features: [
      "Precision metal polishing (gold, platinum, silver, rose gold)",
      "Gemstone facet enhancement and fire intensification",
      "Neutralization of camera, tripod, and room reflections",
      "Focus stacking alignment and focus blur cleanup",
      "Diamond brilliant cut fire sparkle and contrast boosting",
    ],
    deliverables: [
      "High-res print ready TIFF / PSD",
      "Super-sharp web zoom JPEG & WebP",
    ],
    idealFor: [
      "Fine jewelry houses, luxury watchmakers, and bridal jewelers",
      "Auction catalogs and luxury e-commerce retailers",
    ],
    faqs: [
      {
        q: "Can you fix blurry areas in macro jewelry shots?",
        a: "Yes, we can perform focus-stack compositing if you provide multiple focus bracket shots, or sharpen depth-of-field falloff manually.",
      },
    ],
  },
  {
    slug: "background-removal",
    title: "Bulk Background Removal & Replacement",
    shortDesc: "Clean, consistent background cutouts on pure white, transparent, or custom branded backdrops.",
    fullDesc:
      "Eliminate cluttered studio environments and standardize thousands of product photos to pure white (#FFFFFF), modern neutral gray (#F5F5F5), or transparent PNGs compliant with Amazon, Google Shopping, and marketplace standards.",
    startingPrice: 0.39,
    turnaroundHours: 6,
    beforeImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80&sat=-50",
    features: [
      "Pure White RGB (255, 255, 255) guarantee for Amazon & eBay",
      "Transparent PNG with zero background fringe",
      "Natural contact shadows retained or recreated",
      "Automated margin, padding, and alignment standardization",
    ],
    deliverables: ["Transparent PNG", "Amazon white JPEG", "WebP"],
    idealFor: ["High-volume marketplace sellers and dropshippers"],
    faqs: [
      {
        q: "Can you match our custom background color hex code?",
        a: "Absolutely. Provide your exact brand hex code (e.g., #F6F5F0) and margin rules, and every image will be formatted uniformly.",
      },
    ],
  },
  {
    slug: "shadow-reflection",
    title: "Shadow & Reflection Creation",
    shortDesc: "Natural drop shadows, cast shadows, and realistic glossy surface reflections for grounded product visuals.",
    fullDesc:
      "Floating cutouts look artificial without believable grounding. We craft organic drop shadows, directional cast shadows, and mirror surface reflections that match the natural angle and color temperature of the product's lighting source.",
    startingPrice: 0.59,
    turnaroundHours: 12,
    beforeImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80&contrast=1.1",
    features: [
      "Natural existing shadow retention through soft masks",
      "Custom drop shadow creation with diffused feathering",
      "Directional sunlight and window cast shadow synthesis",
      "Mirror and acrylic reflective surface simulation",
    ],
    deliverables: ["Transparent PNG with soft shadow", "White background JPEG"],
    idealFor: ["Footwear, bottles, furniture, and boxed products"],
    faqs: [
      {
        q: "What is the difference between drop shadow and cast shadow?",
        a: "A drop shadow creates a soft diffused cushion directly underneath the item, whereas a cast shadow replicates directional lighting throwing a realistic elongated shadow across the floor.",
      },
    ],
  },
  {
    slug: "color-correction",
    title: "Color Correction & Multi-Color Recolor",
    shortDesc: "Accurate Pantone matching, white-balance calibration, and color variant generation from a single master shot.",
    fullDesc:
      "Save thousands on photography by shooting one master sample and letting us generate every colorway in your SKU lineup. We match physical Pantone swatches with calibrated digital accuracy, eliminating return rates caused by color discrepancies.",
    startingPrice: 0.79,
    turnaroundHours: 12,
    beforeImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80&hue=90",
    features: [
      "Colorway replication across all product color options",
      "Pantone TCX / TPX / Coated color matching",
      "Neutralization of color casts caused by studio strobes",
      "Skin tone normalization for model photography",
    ],
    deliverables: ["Full color SKU set in JPEG, PNG, or PSD"],
    idealFor: ["Apparel, cosmetics, furniture, and accessory brands"],
    faqs: [
      {
        q: "Can I provide Pantone codes for exact color replication?",
        a: "Yes, send us your Pantone formulas or HEX/RGB swatches and we will calibrate the digital files to match.",
      },
    ],
  },
  {
    slug: "image-masking",
    title: "Advanced Image Masking Services",
    shortDesc: "Alpha channel, hair, fur, and transparent fabric isolation for hyper-complex edge geometries.",
    fullDesc:
      "When pen-tool clipping paths cannot capture delicate flyaway hair, animal fur, translucent lace, or semi-transparent glass, our image masking specialists deploy multi-channel luminosity masks and refine-edge alpha selections to preserve every microscopic strand.",
    startingPrice: 1.10,
    turnaroundHours: 12,
    beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80&sat=-100",
    features: [
      "Hair, wool, and fur preservation without jagged clumping",
      "Translucent and sheer fabric opacity masking",
      "Alpha channel layer mask embedded in 16-bit PSD",
      "Edge color decontaminating to eradicate studio color bleed",
    ],
    deliverables: ["Layered PSD with active Alpha Mask", "Transparent PNG"],
    idealFor: ["Fashion model photography, pet products, and winter apparel"],
    faqs: [
      {
        q: "How does image masking differ from a standard clipping path?",
        a: "A clipping path is a hard vector outline ideal for solid smooth edges like shoes or electronics. Image masking uses pixel alpha values, making it essential for fine hair, fur, and semi-transparent objects.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}
