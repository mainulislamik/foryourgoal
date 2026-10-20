import { ServiceItem, ServiceSampleItem } from "@/lib/site-content";

export type { ServiceItem, ServiceSampleItem };

export const servicesData: ServiceItem[] = [
  {
    "slug": "clipping-path",
    "title": "Hand-Drawn Clipping Path Services",
    "shortDesc": "Pixel-perfect hand-drawn Photoshop pen tool paths for crisp, sharp product isolation.",
    "fullDesc": "Our master retouchers use Adobe Photoshop's pen tool exclusively to create razor-sharp vector clipping paths around your products. Unlike automated AI magic wands that introduce ragged edge artifacts, hand-drawn paths isolate subjects with flawless curves, crisp geometry, and natural contours ready for any catalog or composite.",
    "turnaroundHours": 6,
    "beforeImage": "/images/services/clipping-path-before.jpg",
    "afterImage": "/images/services/clipping-path-after.jpg",
    "features": [
      "100% hand-drawn vector paths via Photoshop Pen Tool",
      "Zero halos, pixel fringing, or rough pixelated edges",
      "Multiple path clipping layers for color segmentation",
      "Configurable feather radius (0.2px to 0.5px for ultra-natural boundary)",
      "Supports complex curves, mesh fabrics, bicycles, and intricate shapes"
    ],
    "deliverables": [
      "Original format with embedded active clipping path",
      "Isolated PNG with transparent background",
      "Pure white background JPEG (Amazon/Shopify compliant)",
      "Layered PSD with separate mask layers"
    ],
    "idealFor": [
      "E-commerce stores (Amazon, eBay, Shopify, WooCommerce)",
      "Print product catalogs and advertising mailers",
      "Footwear, electronics, cosmetics, and packaged goods"
    ],
    "faqs": [
      {
        "q": "Why do you use hand-drawn clipping paths instead of AI automated cutouts?",
        "a": "Automated AI clipping often cuts into product boundaries, misinterprets low-contrast edges, and leaves pixelated fringing. Our human pen-tool specialists ensure 100% edge fidelity and smooth bezier curves required for enterprise print and high-res web."
      },
      {
        "q": "What is your daily capacity for clipping path orders?",
        "a": "We comfortably process 1,000+ images per day across our 24/7 dedicated production shifts."
      }
    ],
    "metaTitle": "Hand-Drawn Clipping Path Services | Precision Photoshop Vector Cutouts",
    "metaDesc": "Enterprise hand-drawn clipping path services by master Adobe Photoshop artists. Pixel-perfect vector pen tool isolation, zero halos, and multi-path segmentation.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "RAW Ingestion & Anchor Geometry Strategy",
        "desc": "Every image is inspected at 200% zoom to determine optimal bezier anchor density, avoiding over-sampling or harsh straight-line approximations."
      },
      {
        "step": 2,
        "title": "100% Manual Pen Tool Vector Tracing",
        "desc": "Master retouchers hand-draw continuous vector paths using the Adobe Photoshop Pen Tool with an intentional 0.3px inward offset to guarantee zero background halo."
      },
      {
        "step": 3,
        "title": "Multi-Path Layer Separation",
        "desc": "Complex subjects are mapped into distinct component paths (body, hardware, wheels, straps) allowing downstream editors to isolate sub-elements instantly."
      },
      {
        "step": 4,
        "title": "300% Zoom QA & Alpha Verification",
        "desc": "Senior supervisors test extracted subjects against high-contrast solid backgrounds (#000000, #FFFFFF, and 50% neutral gray) to verify immaculate perimeter cleanliness."
      }
    ],
    "industryUseCases": [
      "E-Commerce Catalog Platforms (Amazon, Shopify, Zalando)",
      "High-End Commercial Print & Packaging",
      "Fashion Apparel Lookbooks & Accessories",
      "Automotive & Industrial Hardware Catalogs",
      "Global Creative & Advertising Agencies"
    ],
    "qualityAssuranceChecklist": [
      "Zero automated AI magic wand artifacts or ragged raster borders",
      "Strict 0.2px - 0.4px inner-edge boundary inset to eliminate background fringe",
      "Closed vector paths with optimal control anchor points for smooth bezier curves",
      "Embedded active clipping paths compatible with InDesign, Illustrator, and Photoshop"
    ],
    "samples": []
  },
  {
    "slug": "product-photo-retouching",
    "title": "Commercial Product Photo Retouching",
    "shortDesc": "Flawless cleanup, blemish elimination, dust removal, and texture preservation for premium brand aesthetics.",
    "fullDesc": "Transform studio raw captures into high-converting hero visuals. We eliminate micro-scratches, lint, sensor dust, uneven reflections, and manufacturing flaws while preserving authentic material textures such as brushed metals, leathers, and matte coatings.",
    "turnaroundHours": 12,
    "beforeImage": "/images/services/product-retouch-before.jpg",
    "afterImage": "/images/services/product-retouch-after.jpg",
    "features": [
      "Comprehensive sensor dust, fingerprint, and scratch removal",
      "Surface smoothing without plastic over-softening",
      "Reflection balancing and hot-spot gradient correction",
      "Shape realignment, label straightening, and perspective correction",
      "Natural shadow preservation and custom drop-shadow additions"
    ],
    "deliverables": [
      "Full-resolution WebP and high-quality JPEG",
      "Layered 16-bit Master PSD on demand",
      "Optimized web variants with responsive dimensions"
    ],
    "idealFor": [
      "Consumer electronics, watches, home appliances, and cosmetics",
      "DTC brands launching flagship storefronts and crowdfunding campaigns",
      "Amazon A+ content and lifestyle hero banners"
    ],
    "faqs": [
      {
        "q": "Do you keep the authentic material texture intact?",
        "a": "Yes. We use advanced frequency separation and dodge & burn techniques to clean surfaces while retaining 100% of the authentic tactile texture."
      }
    ],
    "metaTitle": "Commercial Product Photo Retouching Services | Studio E-Commerce Editing",
    "metaDesc": "High-end commercial product retouching services. Micro-scratch removal, frequency separation texture preservation, label alignment, and studio-grade color balancing.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Surface Defect Mapping & Sensor Dust Removal",
        "desc": "High-resolution sensor spotting, micro-scratch eradication, and fingerprint elimination across matte, glossy, and transparent substrates."
      },
      {
        "step": 2,
        "title": "Frequency Separation & Texture Preservation",
        "desc": "Spatial frequency splitting isolates surface texture from underlying luminance gradients, preventing plastic or over-smoothed artifacts."
      },
      {
        "step": 3,
        "title": "Geometry Alignment & Label Straightening",
        "desc": "Lens distortion compensation, perspective correction, and microscopic label alignment ensuring brand typography sits true to the container form."
      },
      {
        "step": 4,
        "title": "Color Calibration & D65 White Balancing",
        "desc": "Standardized daylight white balancing and ICC profile embedding ensuring strict fidelity between physical product packaging and digital catalog displays."
      }
    ],
    "industryUseCases": [
      "Cosmetics, Skincare & Luxury Fragrance Brands",
      "Consumer Electronics, Appliances & Wearables",
      "Packaged Consumer Goods (CPG) & Beverages",
      "Amazon & Shopify Plus Power Merchants",
      "Commercial Product Design & 3D Render Post-Production"
    ],
    "qualityAssuranceChecklist": [
      "Original material grain, brushed metal, and glass clarity preserved with zero blur",
      "Brand logos, barcodes, and regulatory micro-text remain 100% sharp and legible",
      "Studio highlight gradients smoothed without color banding (16-bit processing)",
      "Exported with standardized sRGB / Adobe RGB 1998 color profiles"
    ],
    "samples": []
  },
  {
    "slug": "ghost-mannequin",
    "title": "Ghost Mannequin & Neck Joint Services",
    "shortDesc": "Combine multiple apparel shots to create seamless 3D hollow-body effects for apparel catalogs.",
    "fullDesc": "Display clothing with realistic volume and fit without the distraction or expense of live models or plastic mannequins. We seamlessly composite the exterior front, interior collar/neck label, and lining shots into a clean, dimensional floating garment.",
    "turnaroundHours": 12,
    "beforeImage": "/images/services/ghost-mannequin-before.jpg",
    "afterImage": "/images/services/ghost-mannequin-after.jpg",
    "features": [
      "Seamless inner collar, tag, and lining composition",
      "Symmetry correction for sleeves, shoulders, and hems",
      "Wrinkle and crease softening while preserving natural drape",
      "Realistic interior shadow depth for organic 3D dimension",
      "Bottom hem jointing for coats, dresses, and trousers"
    ],
    "deliverables": [
      "Transparent PNG cutout ready for any background",
      "Clean pure white background RGB JPEG",
      "Layered Photoshop PSD"
    ],
    "idealFor": [
      "Fashion apparel brands, activewear lines, and department stores",
      "E-commerce lookbooks, wholesale line-sheets, and digital showrooms"
    ],
    "faqs": [
      {
        "q": "What files do I need to send for ghost mannequin effect?",
        "a": "Provide the main photo on the mannequin plus a separate shot of the inner collar/neck label shot inside-out or flat on a table."
      }
    ],
    "metaTitle": "Ghost Mannequin & Neck Joint Services | Invisible Mannequin Photo Editing",
    "metaDesc": "Professional invisible mannequin photo editing. 3D hollow body composite, symmetric neck joint stitching, interior collar tag alignment, and natural fabric drapery.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Component Extraction & Bilateral Alignment",
        "desc": "Front garment capture and secondary inner-neck/liner exposure are aligned along the anatomical vertical axis and shoulder seam markers."
      },
      {
        "step": 2,
        "title": "3D Hollow Body Synthesis & Seam Stitching",
        "desc": "Seamless blending of inner collar lining, size tags, and interior fabric texture using precise warping and pen-tool joint integration."
      },
      {
        "step": 3,
        "title": "Natural Interior Depth Shadow Simulation",
        "desc": "Graduated ambient occlusion shadows applied beneath the collar rim to provide authentic three-dimensional volume and fabric depth."
      },
      {
        "step": 4,
        "title": "Hemline, Placket & Sleeve Symmetry QA",
        "desc": "Micro-level warping ensures sleeve openings, button plackets, and bottom hemlines hang naturally with perfect bilateral symmetry."
      }
    ],
    "industryUseCases": [
      "Fast-Fashion & Luxury Apparel Retailers",
      "Sports Performance, Athleisure & Activewear",
      "Swimwear, Lingerie & Undergarment Catalogs",
      "Designer Runway & Wholesale Lookbooks",
      "Apparel Contract Manufacturers & Exporters"
    ],
    "qualityAssuranceChecklist": [
      "Brand label and size tags centered and crisp with zero distortion",
      "Interior neck fabric color and weave identical to exterior lighting",
      "Natural 3D depth shadows with gradual falloff, avoiding flat cutout appearances",
      "Bilateral garment symmetry preserved along central zipper/button plackets"
    ],
    "samples": []
  },
  {
    "slug": "jewelry-retouching",
    "title": "Luxury Jewelry & Gemstone Retouching",
    "shortDesc": "High-magnification diamond sparkle enhancement, metal polishing, and reflection balancing.",
    "fullDesc": "Jewelry photography suffers from macro reflections, camera glare, and microscopic manufacturing abrasions. Our specialized jewelry retouching team restores precious metals to mirror-smooth brilliance, intensifies facet contrast in diamonds and colored gemstones, and creates luminous depth.",
    "turnaroundHours": 24,
    "beforeImage": "/images/services/jewelry-retouch-before.jpg",
    "afterImage": "/images/services/jewelry-retouch-after.jpg",
    "features": [
      "Precision metal polishing (gold, platinum, silver, rose gold)",
      "Gemstone facet enhancement and fire intensification",
      "Neutralization of camera, tripod, and room reflections",
      "Focus stacking alignment and focus blur cleanup",
      "Diamond brilliant cut fire sparkle and contrast boosting"
    ],
    "deliverables": [
      "High-res print ready TIFF / PSD",
      "Super-sharp web zoom JPEG & WebP"
    ],
    "idealFor": [
      "Fine jewelry houses, luxury watchmakers, and bridal jewelers",
      "Auction catalogs and luxury e-commerce retailers"
    ],
    "faqs": [
      {
        "q": "Can you fix blurry areas in macro jewelry shots?",
        "a": "Yes, we can perform focus-stack compositing if you provide multiple focus bracket shots, or sharpen depth-of-field falloff manually."
      }
    ],
    "metaTitle": "Luxury Jewelry & Gemstone Retouching Services | High-End Diamond Photo Editing",
    "metaDesc": "Elite jewelry retouching services for diamonds, precious gems, gold, and platinum. Facet brilliance enhancement, scratch polishing, and studio reflection clearing.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Focus Stacking Merge & Micro Cleanse",
        "desc": "Multi-depth focus bracket merging to achieve infinite depth-of-field, followed by ultrasonic dust and handling smudge eradication."
      },
      {
        "step": 2,
        "title": "Precious Metal Polishing & Prong Refinement",
        "desc": "Micro-scratches smoothed on gold, platinum, and rhodium surfaces while retaining authentic metal specular highlights and razor-sharp prong tips."
      },
      {
        "step": 3,
        "title": "Gemstone Brilliance & Facet Enhancement",
        "desc": "Individual facet contrast enhancement, internal reflection balance, and true-to-life refractive sparkle restoration without artificial CGI flare."
      },
      {
        "step": 4,
        "title": "High-Gloss Shadow & Reflection Modeling",
        "desc": "Custom elliptical contact shadow and high-gloss ground reflection rendering to position pieces elegantly on high-key or dark-luxe surfaces."
      }
    ],
    "industryUseCases": [
      "Fine Jewelry Maisons & Diamond Traders",
      "Luxury Swiss Watchmakers & Horology Boutiques",
      "High-End Auction Houses & Estate Jewelers",
      "Bridal & Engagement Ring E-Commerce Retailers",
      "Precious Metal Craftsmen & Gemological Labs"
    ],
    "qualityAssuranceChecklist": [
      "Diamond facets maintain crisp internal geometry and true spectral dispersion",
      "Gold, rose gold, silver, and platinum reflect authentic alloy color tones",
      "Prongs and pav\u00e9 settings retain razor-sharp physical contour definition",
      "Studio lightboxes, photographer reflections, and camera glare completely eradicated"
    ],
    "samples": []
  },
  {
    "slug": "background-removal",
    "title": "Bulk Background Removal & Replacement",
    "shortDesc": "Clean, consistent background cutouts on pure white, transparent, or custom branded backdrops.",
    "fullDesc": "Eliminate cluttered studio environments and standardize thousands of product photos to pure white (#FFFFFF), modern neutral gray (#F5F5F5), or transparent PNGs compliant with Amazon, Google Shopping, and marketplace standards.",
    "turnaroundHours": 6,
    "beforeImage": "/images/services/background-removal-before.jpg",
    "afterImage": "/images/services/background-removal-after.jpg",
    "features": [
      "Pure White RGB (255, 255, 255) guarantee for Amazon & eBay",
      "Transparent PNG with zero background fringe",
      "Natural contact shadows retained or recreated",
      "Automated margin, padding, and alignment standardization"
    ],
    "deliverables": [
      "Transparent PNG",
      "Amazon white JPEG",
      "WebP"
    ],
    "idealFor": [
      "High-volume marketplace sellers and dropshippers"
    ],
    "faqs": [
      {
        "q": "Can you match our custom background color hex code?",
        "a": "Absolutely. Provide your exact brand hex code (e.g., #F6F5F0) and margin rules, and every image will be formatted uniformly."
      }
    ],
    "metaTitle": "Bulk Background Removal Services | Pure White & Transparent Cutouts",
    "metaDesc": "High-volume bulk background removal services. 100% Amazon/Google Shopping compliant white (#FFFFFF) backgrounds, transparent PNGs, and custom environmental backdrops.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Asset Triage & Boundary Profiling",
        "desc": "Automated batch pre-sorting separates hard-surface products from organic and hair elements, routing each to specialized specialist artists."
      },
      {
        "step": 2,
        "title": "Vector Separation & Edge Refinement",
        "desc": "Sub-pixel path tracing isolates the subject with zero loss of edge detail, preserving subtle contact bevels and product silhouettes."
      },
      {
        "step": 3,
        "title": "Color Cast & Ambient Spill Cleanse",
        "desc": "Decontamination algorithms eradicate background ambient color bounce on reflective and semi-gloss product perimeter surfaces."
      },
      {
        "step": 4,
        "title": "Standardized Marketplace Canvas Padding",
        "desc": "Automated dimension conforming, centering, and margin calibration (85% frame ratio for Amazon, Google Shopping, and eBay compliance)."
      }
    ],
    "industryUseCases": [
      "High-Volume Marketplace Retailers (Amazon, Walmart, eBay)",
      "Omnichannel Big-Box Department Stores",
      "Industrial Distributors with 20k+ SKU Inventories",
      "Enterprise DAM & PIM Asset Management Pipelines",
      "Wholesale B2B Catalog Publishers"
    ],
    "qualityAssuranceChecklist": [
      "Pure #FFFFFF (RGB 255, 255, 255) background with zero gray vignette perimeter",
      "Subject perfectly centered with uniform border margins matching marketplace guidelines",
      "Product boundary edge contrast preserved with zero pixel erosion or clipping",
      "Standard sRGB IEC61966-2.1 color profile embedded across all exported assets"
    ],
    "samples": []
  },
  {
    "slug": "shadow-reflection",
    "title": "Shadow & Reflection Creation",
    "shortDesc": "Natural drop shadows, cast shadows, and realistic glossy surface reflections for grounded product visuals.",
    "fullDesc": "Floating cutouts look artificial without believable grounding. We craft organic drop shadows, directional cast shadows, and mirror surface reflections that match the natural angle and color temperature of the product's lighting source.",
    "turnaroundHours": 12,
    "beforeImage": "/images/services/shadow-reflection-before.jpg",
    "afterImage": "/images/services/shadow-reflection-after.jpg",
    "features": [
      "Natural existing shadow retention through soft masks",
      "Custom drop shadow creation with diffused feathering",
      "Directional sunlight and window cast shadow synthesis",
      "Mirror and acrylic reflective surface simulation"
    ],
    "deliverables": [
      "Transparent PNG with soft shadow",
      "White background JPEG"
    ],
    "idealFor": [
      "Footwear, bottles, furniture, and boxed products"
    ],
    "faqs": [
      {
        "q": "What is the difference between drop shadow and cast shadow?",
        "a": "A drop shadow creates a soft diffused cushion directly underneath the item, whereas a cast shadow replicates directional lighting throwing a realistic elongated shadow across the floor."
      }
    ],
    "metaTitle": "Professional Shadow & Reflection Creation | Natural, Drop & Cast Shadows",
    "metaDesc": "Realistic shadow creation and mirror reflection services. Natural drop shadows, directional cast shadows, and floating product grounding for e-commerce photos.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Light Direction & Horizon Calculation",
        "desc": "Studio lighting angle, intensity, and elevation are mapped from internal product reflections to establish authentic shadow trajectory."
      },
      {
        "step": 2,
        "title": "Multi-Tier Ambient Occlusion Layering",
        "desc": "Dense contact shadow placed immediately beneath footprint anchors the product to the plane, eliminating floating appearances."
      },
      {
        "step": 3,
        "title": "Progressive Gaussian Falloff & Scatter",
        "desc": "Cast shadow opacity and softness scaled exponentially with distance from base, mimicking real-world atmospheric diffusion."
      },
      {
        "step": 4,
        "title": "Subsurface Reflection & Texture Bleed",
        "desc": "For glossy surfaces, a faded mirror reflection is layered with realistic surface distortion and opacity falloff gradient."
      }
    ],
    "industryUseCases": [
      "Footwear & Athletic Sneaker Brands",
      "Cosmetics, Skincare Jars & Glass Perfume Flacons",
      "Furniture, Lighting & Home Decor Retailers",
      "Consumer Technology & Desktop Peripherals",
      "E-Commerce Hero Banner Designers"
    ],
    "qualityAssuranceChecklist": [
      "Firm contact shadow grounds base, eliminating floating product syndrome",
      "Shadow softness expands proportionally as distance from object increases",
      "Shadow color temperature respects ambient studio bounce, avoiding flat black",
      "Mirrored reflections fade gracefully without abrupt opacity cutoffs"
    ],
    "samples": []
  },
  {
    "slug": "color-correction",
    "title": "Color Correction & Multi-Color Recolor",
    "shortDesc": "Accurate Pantone matching, white-balance calibration, and color variant generation from a single master shot.",
    "fullDesc": "Save thousands on photography by shooting one master sample and letting us generate every colorway in your SKU lineup. We match physical Pantone swatches with calibrated digital accuracy, eliminating return rates caused by color discrepancies.",
    "turnaroundHours": 12,
    "beforeImage": "/images/services/color-correction-before.jpg",
    "afterImage": "/images/services/color-correction-after.jpg",
    "features": [
      "Colorway replication across all product color options",
      "Pantone TCX / TPX / Coated color matching",
      "Neutralization of color casts caused by studio strobes",
      "Skin tone normalization for model photography"
    ],
    "deliverables": [
      "Full color SKU set in JPEG, PNG, or PSD"
    ],
    "idealFor": [
      "Apparel, cosmetics, furniture, and accessory brands"
    ],
    "faqs": [
      {
        "q": "Can I provide Pantone codes for exact color replication?",
        "a": "Yes, send us your Pantone formulas or HEX/RGB swatches and we will calibrate the digital files to match."
      }
    ],
    "metaTitle": "Color Correction & Multi-Color Recolor Services | Accurate E-Commerce Colorways",
    "metaDesc": "Master color correction and multi-color recoloring services. Match physical Pantone swatches, produce all apparel colorway SKUs from a single master shot, and minimize return rates.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Color Target Profiling & Spectro Calibration",
        "desc": "Target Pantone codes, RGB coordinates, or physical fabric swatches ingested and matched under standardized D65 lighting profiles."
      },
      {
        "step": 2,
        "title": "Non-Destructive LAB / Selective Color Mapping",
        "desc": "Separation of chroma and luma channels allows complete recoloring of garments while keeping highlight and shadow textures intact."
      },
      {
        "step": 3,
        "title": "Highlight & Shadow Micro-Texture Preservation",
        "desc": "Dark dyes and bright pastels retain 100% of underlying textile weave, thread stitching, and natural crease contrast."
      },
      {
        "step": 4,
        "title": "Delta-E Color Accuracy Verification",
        "desc": "Quality control inspects recolored assets with colorimeter sampling to ensure Delta-E remains below strict commercial tolerance thresholds."
      }
    ],
    "industryUseCases": [
      "Fashion Apparel & Footwear Variant Colorways",
      "Home Textiles, Bedding & Upholstery Catalogs",
      "Automotive Paint, Leather & Trim Configurations",
      "Consumer Packaged Goods Variant SKUs",
      "High-Fashion Editorial & Advertising Campaigns"
    ],
    "qualityAssuranceChecklist": [
      "Delta-E variance maintained strictly below 2.0 against brand Pantone targets",
      "Fine fabric knit, denim twill, and leather grain 100% visible across all shades",
      "Highlights reflect neutral studio light without unnatural tint contamination",
      "Zero color fringe bleeding onto neutral backgrounds or model skin tones"
    ],
    "samples": []
  },
  {
    "slug": "image-masking",
    "title": "Advanced Image Masking Services",
    "shortDesc": "Alpha channel, hair, fur, and transparent fabric isolation for hyper-complex edge geometries.",
    "fullDesc": "When pen-tool clipping paths cannot capture delicate flyaway hair, animal fur, translucent lace, or semi-transparent glass, our image masking specialists deploy multi-channel luminosity masks and refine-edge alpha selections to preserve every microscopic strand.",
    "turnaroundHours": 12,
    "beforeImage": "/images/services/image-masking-before.jpg",
    "afterImage": "/images/services/image-masking-after.jpg",
    "features": [
      "Hair, wool, and fur preservation without jagged clumping",
      "Translucent and sheer fabric opacity masking",
      "Alpha channel layer mask embedded in 16-bit PSD",
      "Edge color decontaminating to eradicate studio color bleed"
    ],
    "deliverables": [
      "Layered PSD with active Alpha Mask",
      "Transparent PNG"
    ],
    "idealFor": [
      "Fashion model photography, pet products, and winter apparel"
    ],
    "faqs": [
      {
        "q": "How does image masking differ from a standard clipping path?",
        "a": "A clipping path is a hard vector outline ideal for solid smooth edges like shoes or electronics. Image masking uses pixel alpha values, making it essential for fine hair, fur, and semi-transparent objects."
      }
    ],
    "metaTitle": "Advanced Image Masking Services | Alpha Channel & Complex Hair Isolation",
    "metaDesc": "Complex Photoshop image masking services. Alpha channel masking, flyaway hair isolation, transparent fur, smoke, and translucent chiffon fabric extraction.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Luminosity Channel Analysis & Edge Mapping",
        "desc": "High-contrast channel isolation locates subtle boundary transitions between fine fibers/hair and varying studio backgrounds."
      },
      {
        "step": 2,
        "title": "Custom Alpha Channel Painting & Refinement",
        "desc": "Hand-painted alpha channel masks capture individual hair strands down to single-pixel translucency with zero edge clumping."
      },
      {
        "step": 3,
        "title": "Decontamination & Spill Suppression",
        "desc": "Specialized color neutralizers strip green/blue studio bounce and backdrop reflections from semi-transparent edges."
      },
      {
        "step": 4,
        "title": "Multi-Background Verification & Stress Test",
        "desc": "Extracted mask validated across white, dark, colored, and complex lifestyle backgrounds to guarantee zero halos or fringing."
      }
    ],
    "industryUseCases": [
      "High-Fashion & Modeling Editorial Publications",
      "Pet Products, Animal Care & Fur Apparel Catalogs",
      "Bridal, Wedding & Fine Art Portrait Studios",
      "Entertainment Key Art & Movie Poster Compositing",
      "Global Creative Studios & Retouching Houses"
    ],
    "qualityAssuranceChecklist": [
      "Individual flyaway hair strands isolated with natural opacity falloff",
      "Translucent fabrics (veil, lace, chiffon) preserve authentic background transmission",
      "Background color spill completely eradicated from subject perimeter",
      "Delivered with 16-bit alpha channel layer preserved in master PSD"
    ],
    "samples": []
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}
