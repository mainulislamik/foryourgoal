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
  },
  {
    "slug": "multi-clipping-path",
    "title": "Multi Clipping Path Service | Color Separation & Vector Cutouts",
    "shortDesc": "Precision multi-path clipping for color variant isolation, garment separation, and selective retouching with hand-drawn pen tool paths.",
    "fullDesc": "Multi clipping path service goes beyond a single outline by dividing complex products into individually labelable sub-regions — body panels, straps, hardware, labels — each saved as a named Photoshop path. This granular segmentation lets downstream designers recolor components, apply different backgrounds per region, isolate accessories, and generate complete color-variant SKU libraries from a single photography session. Every sub-path is hand-drawn at 200% zoom by senior retouchers using Adobe Photoshop's Pen Tool, eliminating AI artifacts on multi-component garments, footwear, bags, and multi-piece product assemblies.",
    "startingPrice": "$1.20",
    "rating": "4.9",
    "reviewCount": "980",
    "turnaroundHours": 12,
    "beforeImage": "/images/services/multi-clipping-path-before.jpg",
    "afterImage": "/images/services/multi-clipping-path-after.jpg",
    "features": [
      "Unlimited named sub-paths per image for complete component segmentation",
      "100% hand-drawn Pen Tool paths — zero AI magic-wand approximations",
      "Selective color isolation for garment body, lining, zipper, buttons, and labels",
      "Layered PSD delivery with each named path selectable independently",
      "Configurable 0.2–0.5px inward boundary offset for zero-halo extraction",
      "Compatible with Adobe InDesign, Illustrator, and online DAM platforms"
    ],
    "deliverables": [
      "Original file with multiple named embedded clipping paths",
      "Layered PSD with component layers activated per named path",
      "Transparent PNG per isolated component on request",
      "Pure white background JPEG for each color variant"
    ],
    "idealFor": [
      "Fashion apparel brands needing full-garment color variant libraries",
      "Footwear brands isolating sole, upper, tongue, and hardware independently",
      "Bag and luggage manufacturers separating body, handles, and hardware"
    ],
    "faqs": [
      {
        "q": "What is multi clipping path and how does it differ from a standard clipping path?",
        "a": "A standard clipping path creates one outline around the entire subject. A multi clipping path service creates multiple named paths — each around a separate component (e.g., garment body, buttons, lining) — allowing each region to be recolored, isolated, or hidden independently in Photoshop or InDesign."
      },
      {
        "q": "How many sub-paths can you create per image?",
        "a": "There is no hard limit. For complex garments we routinely create 8–15 named paths per image. Each additional named path is priced per our volume rate card."
      },
      {
        "q": "Which file formats do you deliver multi-path files in?",
        "a": "We deliver layered PSDs with all active named paths, original JPEG/TIFF with embedded paths, and optionally transparent PNGs for each isolated component."
      },
      {
        "q": "Can I use multi clipping path files in Adobe InDesign for catalog production?",
        "a": "Yes, named Photoshop paths are fully recognized in InDesign. You can select any named path from the clipping path dialog when placing images, enabling precise print-catalog component isolation."
      },
      {
        "q": "What types of products are best suited for multi clipping path?",
        "a": "Multi clipping path excels for apparel (jacket, trousers, shirt as separate paths), footwear (sole, upper, laces), handbags (body, handle, zipper, hardware), bicycles, furniture, and any multi-component product requiring regional editing."
      },
      {
        "q": "What is your turnaround for multi-path orders?",
        "a": "Standard multi-path orders are delivered within 12–24 hours. Express 6-hour delivery is available for urgent production batches at a premium rate."
      }
    ],
    "metaTitle": "Multi Clipping Path Service | Color Separation & Vector Cutouts",
    "metaDesc": "Professional multi clipping path services for color variant isolation, garment component segmentation, and selective retouching. Hand-drawn Photoshop Pen Tool paths from $0.20/image.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Component Architecture Mapping",
        "desc": "Senior retouchers analyze each product at 200% zoom to plan named path taxonomy — body panels, hardware, labels, lining — creating a structured naming convention that matches the client's DAM or catalog workflow."
      },
      {
        "step": 2,
        "title": "Sequential Hand-Drawn Sub-Path Tracing",
        "desc": "Each sub-component is traced with the Photoshop Pen Tool in isolation, maintaining intentional 0.3px inner boundary insets to guarantee zero background halo bleed between component layers."
      },
      {
        "step": 3,
        "title": "Named Path Layer Organization & Validation",
        "desc": "All paths are exported as distinctly labeled Photoshop paths (e.g., 'Garment Body', 'Zipper', 'Collar') verified against original specifications to ensure no component overlap or gap."
      },
      {
        "step": 4,
        "title": "Multi-Background Stress QA at 300% Zoom",
        "desc": "Extracted components are validated against high-contrast solid colors and lifestyle backgrounds to confirm immaculate boundary precision across every named sub-path."
      }
    ],
    "industryUseCases": [
      "Fashion Apparel Brands & Wholesale Lookbook Publishers",
      "Footwear Manufacturers & Athletic Sneaker Retailers",
      "Handbag, Luggage & Leather Goods Catalog Studios",
      "Furniture & Home Décor Multi-Component SKU Libraries",
      "Global Advertising Agencies & Commercial Photo Studios"
    ],
    "qualityAssuranceChecklist": [
      "All named paths traceable without crossing, gaps, or stray anchor points",
      "0.2–0.4px inward offset applied uniformly across every sub-component boundary",
      "Closed vector bezier paths with optimal anchor density for smooth curves",
      "Delivery verified against client's color variant workflow before dispatch"
    ],
    "samples": []
  },
  {
    "slug": "neck-joint-service",
    "title": "Ghost Mannequin Neck Joint Service | 3D Hollow Apparel Effect",
    "shortDesc": "Seamless collar stitching and neck joint photo editing to give apparel an authentic 3D hollow mannequin look.",
    "fullDesc": "The neck joint (ghost mannequin) service composites two separate apparel photographs — the exterior front-on mannequin shot and the inside-out collar/neck-label secondary exposure — into one seamlessly integrated floating garment visual. The result is a realistic three-dimensional hollow body effect: the collar opening is fully visible, interior size tags and brand labels are legible, and the garment appears to have authentic volume and drape without any mannequin or model interference. Our retouchers meticulously align collar seams at the sub-pixel level, blend interior fabric tones to match exterior lighting, and apply graduated ambient shadows to the interior collar rim for convincing anatomical depth.",
    "startingPrice": "$0.80",
    "rating": "4.9",
    "reviewCount": "1150",
    "turnaroundHours": 12,
    "beforeImage": "/images/services/neck-joint-before.jpg",
    "afterImage": "/images/services/neck-joint-after.jpg",
    "features": [
      "Sub-pixel precision collar seam stitching for invisible compositing joins",
      "Interior neck label, size tag, and brand embroidery clearly visible",
      "Bilateral shoulder and sleeve symmetry correction via micro warping",
      "Graduated ambient occlusion shadow inside the collar for 3D depth",
      "Bottom hem, cuff, and placket jointing for full-length garments and coats",
      "Natural fabric drape and crease preservation without artificial flattening"
    ],
    "deliverables": [
      "Transparent PNG with hollow neck opening on white background",
      "Pure white RGB JPEG for Amazon, Shopify, and wholesale catalogs",
      "Layered PSD with composited interior collar layer intact"
    ],
    "idealFor": [
      "Fashion apparel brands and activewear lines avoiding model photography costs",
      "Wholesale exporters requiring line-sheet product imagery at scale",
      "E-commerce brands standardizing catalog visuals across hundreds of SKUs"
    ],
    "faqs": [
      {
        "q": "What photos do I need to send for the neck joint service?",
        "a": "You need two shots: (1) the garment on the mannequin from the front, and (2) the collar/neck lining photographed inside-out or laid flat to reveal the inner neck label, seams, and fabric lining."
      },
      {
        "q": "Can you handle neck joints for hoodies, turtlenecks, and dress shirts?",
        "a": "Yes. We specialize in collared shirts, round-neck tees, hoodies, turtlenecks, V-necks, polo shirts, and structured blazer collars — each requiring different seam alignment and interior shadow techniques."
      },
      {
        "q": "What if my inner-collar photo is slightly blurry or has a different lighting angle?",
        "a": "Our retouchers use color grading and sharpening adjustments to match the inner-collar lighting to the exterior shot. Significant blur may require a reshoot, but minor discrepancies are routinely corrected."
      },
      {
        "q": "Do you add natural shadows inside the collar opening?",
        "a": "Yes. We apply graduated ambient occlusion shadows along the inner collar rim, deepening toward the garment interior, creating authentic three-dimensional depth rather than a flat cutout appearance."
      },
      {
        "q": "Can I send bulk apparel batches for neck joint production?",
        "a": "Absolutely. We process 500–5,000+ garments per day across our 24/7 production shifts. Volume pricing tiers are available starting from 100+ images."
      },
      {
        "q": "What is your revision policy for neck joint orders?",
        "a": "We offer unlimited revisions until you are fully satisfied. Our senior QC supervisors review every composite before delivery, achieving 99.5% first-pass acceptance on standard garment types."
      }
    ],
    "metaTitle": "Ghost Mannequin Neck Joint Service | 3D Hollow Apparel Effect",
    "metaDesc": "Professional ghost mannequin neck joint photo editing. Seamless collar compositing, interior label visibility, and 3D hollow body effect for apparel e-commerce from $0.80/image.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Bilateral Garment Alignment & Axis Calibration",
        "desc": "Front mannequin capture and interior neck lining exposure are superimposed and aligned along the anatomical vertical axis and shoulder seam reference points for precise spatial registration."
      },
      {
        "step": 2,
        "title": "Collar Seam Stitching & Interior Integration",
        "desc": "The inner collar lining, size tags, and interior fabric are seamlessly blended into the exterior garment using precision warping, clone-stamp refinement, and pen-tool joint boundary matching."
      },
      {
        "step": 3,
        "title": "3D Interior Shadow Simulation",
        "desc": "Graduated ambient occlusion layers applied beneath the collar rim and along interior fabric edges simulate the natural shadow that an open collar casts inside a real garment."
      },
      {
        "step": 4,
        "title": "Hemline, Cuff & Symmetry Final QC",
        "desc": "Micro-level warping and bilateral symmetry checks ensure sleeve openings, bottom hemlines, and button plackets maintain natural proportion and visual balance before delivery."
      }
    ],
    "industryUseCases": [
      "Fast-Fashion E-Commerce Brands & Department Store Retailers",
      "Sports Performance, Athleisure & Activewear Catalog Studios",
      "Swimwear, Lingerie & Undergarment Imagery Producers",
      "Apparel Contract Manufacturers & Export Houses",
      "Wholesale Trade Show Lookbooks & B2B Line Sheets"
    ],
    "qualityAssuranceChecklist": [
      "Collar seam join invisible at 200% zoom with zero visible composite boundary",
      "Interior size labels and brand tags sharp, readable, and correctly oriented",
      "Ambient occlusion shadow gradient smooth with no banding or flat cutout effect",
      "Shoulder seam, sleeve, and hemline bilateral symmetry verified along center axis"
    ],
    "samples": []
  },
  {
    "slug": "shadow-creation",
    "title": "Product Shadow Creation Service | Drop, Natural & Reflection Shadows",
    "shortDesc": "Add realistic drop shadows, natural contact shadows, and luxury mirror reflection effects to ground your e-commerce products.",
    "fullDesc": "Floating product cutouts on pure white backgrounds look artificial and unconvincing without a convincing shadow to anchor them to a surface. Our product shadow creation service engineers three primary shadow types: drop shadows (soft Gaussian blur shadows beneath the product), natural contact shadows (dense ambient occlusion that grounds the product base with authentic physical contact), and mirror reflections (a faded reversed duplicate of the product for luxury bottle, cosmetic, and electronics photography). Each shadow is crafted to exactly match the product's original studio lighting angle, color temperature, and edge softness for a result indistinguishable from a real studio capture.",
    "startingPrice": "$0.45",
    "rating": "4.9",
    "reviewCount": "1420",
    "turnaroundHours": 6,
    "beforeImage": "/images/services/shadow-creation-before.jpg",
    "afterImage": "/images/services/shadow-creation-after.jpg",
    "features": [
      "Natural contact shadow grounding for hard-edge and curved-base products",
      "Custom drop shadow with calibrated softness, angle, distance, and opacity",
      "Mirror and acrylic surface reflection for luxury product presentations",
      "Directional cast shadows matching original studio light source angles",
      "Shadow color temperature tuned to match warm, cool, or neutral lighting",
      "Layered shadow delivery allowing client-side softness and opacity adjustments"
    ],
    "deliverables": [
      "Transparent PNG with embedded soft shadow on alpha channel",
      "White background JPEG with final composite shadow",
      "Layered PSD with separate shadow layers for client control"
    ],
    "idealFor": [
      "Footwear brands requiring grounded shoe photography on white backgrounds",
      "Cosmetics, perfume, and skincare brands using mirror reflection effects",
      "Electronics, appliances, and consumer goods on e-commerce hero pages"
    ],
    "faqs": [
      {
        "q": "What types of product shadows can you create?",
        "a": "We create three primary types: (1) drop shadow — a soft blurred shadow beneath the product, (2) natural/contact shadow — a dense ambient occlusion at the product base, and (3) mirror/reflection shadow — an inverted product reflection for glossy surface effects."
      },
      {
        "q": "How do you determine the correct shadow angle and direction?",
        "a": "We analyze existing reflections on the product surface to determine the original studio lighting angle and elevation, then construct the shadow trajectory to match that light source exactly for a physically accurate result."
      },
      {
        "q": "Can you add shadows to products that already have backgrounds removed?",
        "a": "Yes. Simply send us your pre-cut transparent PNG and we will apply the requested shadow type directly, matching the product's proportions and base geometry."
      },
      {
        "q": "Do you deliver the shadow on a separate layer?",
        "a": "Yes. All deliveries include a layered PSD with the shadow isolated on its own adjustment layer group, allowing you to tune opacity, spread, or color without regenerating the file."
      },
      {
        "q": "What is the turnaround for shadow creation orders?",
        "a": "Standard product shadow creation is delivered within 6–12 hours. Complex mirror reflections or multi-shadow layering for lifestyle compositions have a 12–24 hour SLA."
      },
      {
        "q": "Can you replicate a specific shadow style from a reference image I provide?",
        "a": "Absolutely. Send us a reference image showing your desired shadow style and we will calibrate our approach to match the softness, angle, color, and opacity of your provided reference."
      }
    ],
    "metaTitle": "Product Shadow Creation Service | Drop, Natural & Reflection Shadows",
    "metaDesc": "Professional product shadow creation services. Realistic drop shadows, contact shadows, and luxury mirror reflection effects for e-commerce photography from $0.45/image.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Light Source Angle & Color Temperature Mapping",
        "desc": "Internal product specular highlights and reflections are analyzed to precisely calculate the original studio light source angle, elevation, and color temperature before any shadow is constructed."
      },
      {
        "step": 2,
        "title": "Base Contact Shadow Rendering",
        "desc": "Dense ambient occlusion shadow is hand-painted along the full product base perimeter, with varying density to match the pressure distribution of a real object resting on a surface."
      },
      {
        "step": 3,
        "title": "Progressive Gaussian Falloff Application",
        "desc": "Outer drop shadow opacity and blur radius scale exponentially with distance from the product base, mimicking the natural atmospheric diffusion of real-world directional studio lighting."
      },
      {
        "step": 4,
        "title": "Mirror Reflection Compositing & Distortion",
        "desc": "For glossy surface reflections, an inverted product duplicate is blended with a vertical perspective gradient and optional lens distortion to simulate an authentic acrylic or lacquered surface."
      }
    ],
    "industryUseCases": [
      "Footwear & Athletic Sneaker Brand Catalogs",
      "Cosmetics, Perfume Flacon & Skincare Jar Photography",
      "Consumer Electronics & Premium Desktop Peripheral Brands",
      "Furniture, Lighting & Home Décor E-Commerce Retailers",
      "Luxury Lifestyle Hero Banner & Campaign Designers"
    ],
    "qualityAssuranceChecklist": [
      "Contact shadow density greatest at product base, fading smoothly outward",
      "Shadow color temperature matches studio ambient to avoid cold or warm bias",
      "Mirror reflection blends naturally with no sharp horizontal cutoff line",
      "Shadow layers separated in PSD for independent opacity adjustments by client"
    ],
    "samples": []
  },
  {
    "slug": "amazon-product-photo-editing",
    "title": "Amazon Product Photo Editing Service | 100% White Background & Compliance",
    "shortDesc": "100% compliant Amazon product image optimization: pure #FFFFFF white background, 85% frame fill ratio, and 2000px high-res zoom ready.",
    "fullDesc": "Amazon's main product image requirements are strict: pure white backgrounds (RGB 255, 255, 255), products occupying 85% or more of the image frame, a minimum of 1,000 pixels on the longest side for zoom functionality, no watermarks, text, or borders. Non-compliant images are suppressed from search results, causing significant revenue loss. Our Amazon product photo editing service guarantees full technical compliance, optimizing every image for Amazon's A9 search algorithm while ensuring your products look their absolute best. Every image is inspected against Amazon's current image guidelines before delivery, covering main images, secondary lifestyle angles, and A+ content infographics.",
    "startingPrice": "$0.39",
    "rating": "5.0",
    "reviewCount": "2100",
    "turnaroundHours": 6,
    "beforeImage": "/images/services/amazon-editing-before.jpg",
    "afterImage": "/images/services/amazon-editing-after.jpg",
    "features": [
      "Pure #FFFFFF (RGB 255,255,255) white background guaranteed — zero gray gradient",
      "85% frame fill ratio compliance for Amazon main image requirements",
      "Minimum 2000×2000px output for full Amazon zoom functionality",
      "Complete removal of watermarks, shadows, props, and non-product elements",
      "Color accuracy preservation to reduce return rates from color mismatch",
      "Amazon A+ content hero image preparation for brand-registered sellers"
    ],
    "deliverables": [
      "Amazon-compliant JPEG at 2000×2000px on pure white background",
      "High-resolution transparent PNG for multi-platform use",
      "Optimized WebP version for Amazon international marketplace listings"
    ],
    "idealFor": [
      "Amazon FBA sellers launching new ASIN listings requiring compliant main images",
      "Brand-registered Amazon sellers creating A+ content and storefront visuals",
      "Wholesale suppliers and distributors standardizing thousands of SKU images"
    ],
    "faqs": [
      {
        "q": "What are Amazon's current product image requirements?",
        "a": "Amazon requires main images on a pure white background (RGB 255,255,255), product filling at least 85% of the frame, minimum 1,000px on the longest side (2,000px+ recommended for zoom), no watermarks, borders, text, or multiple products in a single main image."
      },
      {
        "q": "Will my images pass Amazon's automated image quality check after your editing?",
        "a": "Yes. We run every edited image against Amazon's stated technical guidelines checklist before delivery and have a 99.7% first-submission compliance rate across 100,000+ ASINs processed."
      },
      {
        "q": "Can you also prepare secondary angles and lifestyle images for Amazon?",
        "a": "Absolutely. Beyond the main white background image, we edit secondary product angles, infographic overlays, comparison charts, and lifestyle composites for the full 9-image Amazon gallery slot."
      },
      {
        "q": "What is the minimum resolution you output for Amazon?",
        "a": "We deliver at minimum 2,000×2,000 pixels (2000px shortest side) which activates Amazon's high-resolution zoom feature, significantly improving buyer conversion on product detail pages."
      },
      {
        "q": "How do you handle products with transparent or reflective surfaces?",
        "a": "Glass bottles, clear packaging, and reflective electronics receive specialized treatment: we retain natural product transparency, add subtle contact shadows, and ensure the background reads as true white without gray contamination through transparency."
      },
      {
        "q": "Do you offer bulk pricing for Amazon seller accounts with large catalogs?",
        "a": "Yes. Volume pricing tiers start at 50 images. Enterprise accounts with 500+ images monthly receive dedicated account management, priority processing queues, and locked SLA guarantees."
      }
    ],
    "metaTitle": "Amazon Product Photo Editing Service | 100% White Background & Compliance",
    "metaDesc": "Amazon-compliant product image editing: pure white #FFFFFF backgrounds, 85% frame fill, 2000px zoom ready. Guaranteed first-submission compliance from $0.39/image.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Amazon Compliance Audit & Pixel Budget Planning",
        "desc": "Each submitted image is assessed against current Amazon image policy: background purity, frame fill ratio, minimum resolution, and absence of prohibited elements before retouching begins."
      },
      {
        "step": 2,
        "title": "Professional Background Removal & White Fill",
        "desc": "Hand-drawn clipping paths isolate the product with crisp sub-pixel boundary precision, then pure #FFFFFF (RGB 255,255,255) is applied uniformly with zero gradient vignette or gray contamination."
      },
      {
        "step": 3,
        "title": "Frame Ratio Optimization & Canvas Calibration",
        "desc": "Products are repositioned and scaled to occupy precisely 85–90% of the canvas area, centered with uniform border margins meeting Amazon's frame fill requirements."
      },
      {
        "step": 4,
        "title": "High-Resolution Export & Compliance Verification",
        "desc": "Final images exported at 2000×2000px minimum, sRGB color profile preserved, and every image verified against Amazon's technical guidelines checklist before batch delivery."
      }
    ],
    "industryUseCases": [
      "Amazon FBA & FBM Private Label Sellers",
      "Amazon Brand Registry & A+ Content Publishers",
      "Wholesale Distributors & 3P Marketplace Aggregators",
      "Consumer Electronics & Gadget Amazon Launch Campaigns",
      "Grocery, Health & Personal Care Amazon Category Sellers"
    ],
    "qualityAssuranceChecklist": [
      "Background pixel sampled at multiple locations confirming pure RGB 255,255,255",
      "Product occupies minimum 85% of frame area with uniform border margins",
      "Output resolution minimum 2000px on shortest side for Amazon zoom activation",
      "Zero watermarks, text overlays, props, or multi-product compositions present"
    ],
    "samples": []
  },
  {
    "slug": "shopify-image-editing",
    "title": "Shopify Product Image Editing Service | WebP & Retina Optimization",
    "shortDesc": "High-converting square crops, WebP compression, uniform margins, and retina-ready visuals tailored specifically for Shopify stores.",
    "fullDesc": "Shopify's recommended product image specifications — 2048×2048px square format, 1:1 aspect ratio, WebP encoding, and consistent margins — directly impact both store loading performance and buyer conversion rates. Inconsistent image sizes, varying crop ratios, or unoptimized JPEG files create jarring visual inconsistency in Shopify collection grids and slow page load speeds that hurt SEO rankings. Our Shopify product image editing service delivers a complete optimization pipeline: background removal, square crop standardization, uniform padding, retina-quality output at 2048px, and WebP conversion, ensuring your store grid looks pixel-perfect across desktop and mobile Retina displays.",
    "startingPrice": "$0.35",
    "rating": "4.9",
    "reviewCount": "1650",
    "turnaroundHours": 6,
    "beforeImage": "/images/services/shopify-editing-before.jpg",
    "afterImage": "/images/services/shopify-editing-after.jpg",
    "features": [
      "Square 1:1 aspect ratio crop standardization for uniform Shopify collection grids",
      "2048×2048px retina-ready output for crisp display on high-DPI screens",
      "WebP format conversion for fast page loads and improved Shopify SEO scores",
      "Consistent 8–10% uniform padding margins across your entire product catalog",
      "Background removal to white, transparent, or custom Shopify theme color",
      "Batch processing maintaining visual consistency across all collection pages"
    ],
    "deliverables": [
      "2048×2048px WebP for Shopify primary product listing upload",
      "2048×2048px JPEG fallback for browser compatibility",
      "Transparent PNG for Shopify theme overlay and lifestyle composite use"
    ],
    "idealFor": [
      "Shopify DTC brand founders standardizing catalog images for new store launches",
      "Shopify Plus merchants optimizing large SKU collections for performance",
      "Shopify dropshippers standardizing supplier images for consistent brand presence"
    ],
    "faqs": [
      {
        "q": "What image size does Shopify recommend for product photos?",
        "a": "Shopify recommends 2048×2048px square images with consistent cropping and a 1:1 aspect ratio. This maximizes zoom quality, ensures consistent collection grid display, and supports Retina display clarity."
      },
      {
        "q": "Why should I use WebP format for Shopify product images?",
        "a": "WebP images are 25–35% smaller than equivalent JPEG files, reducing page load time. Shopify natively serves WebP images to compatible browsers, improving Core Web Vitals scores which directly affect Google search rankings."
      },
      {
        "q": "Can you ensure consistent padding and margins across my entire product catalog?",
        "a": "Yes. We apply a locked uniform margin template (typically 8–10% padding on all four sides) across your entire catalog batch, ensuring every product sits identically within its frame for a professional, cohesive collection grid."
      },
      {
        "q": "Do you handle both main product images and variant swatches?",
        "a": "Yes. We process both primary product images and variant shots (alternate colors, angles), applying consistent cropping and background treatment so all variants display uniformly in Shopify's variant selector."
      },
      {
        "q": "Can you match my Shopify theme's background color instead of white?",
        "a": "Yes. Provide your Shopify theme's background HEX code and we will apply it as the canvas color instead of white, ensuring seamless edge blending with your store's visual aesthetic."
      },
      {
        "q": "What is the fastest turnaround for Shopify image editing?",
        "a": "Standard Shopify image batches are completed in 6–12 hours. For new store launch deadlines, we offer 4-hour express delivery for batches up to 100 images with advance notice."
      }
    ],
    "metaTitle": "Shopify Product Image Editing Service | WebP & Retina Optimization",
    "metaDesc": "Shopify product image optimization: 2048px square crops, WebP conversion, uniform margins, and retina-ready quality for high-converting stores. From $0.35/image.",
    "technicalWorkflow": [
      {
        "step": 1,
        "title": "Shopify Theme & Grid Consistency Audit",
        "desc": "Target Shopify theme layout, collection grid aspect ratios, and product page zoom requirements are reviewed to define the precise canvas dimensions, padding percentage, and background color specification."
      },
      {
        "step": 2,
        "title": "Background Removal & Edge Refinement",
        "desc": "Hand-drawn clipping paths with sub-pixel edge precision isolate each product from its studio background, with decontamination to remove ambient color bounce on product edges."
      },
      {
        "step": 3,
        "title": "Square Canvas Standardization & Margin Lock",
        "desc": "Products are centered on 2048×2048px square canvases with uniform locked padding margins, guaranteeing pixel-identical positioning across all SKUs in the collection grid."
      },
      {
        "step": 4,
        "title": "WebP Encoding & Retina Quality Export",
        "desc": "Final images encoded to WebP at quality 85 (optimal file-size/quality balance for Shopify), with JPEG fallback and Retina verification at 2× pixel density for high-DPI screens."
      }
    ],
    "industryUseCases": [
      "Shopify DTC Apparel, Footwear & Accessories Brands",
      "Shopify Plus Enterprise Merchants with 1,000+ SKU Catalogs",
      "Shopify Dropshipping Stores Standardizing Supplier Assets",
      "Health, Beauty & Wellness DTC Shopify Storefronts",
      "Home Décor, Furniture & Lifestyle Product Shopify Brands"
    ],
    "qualityAssuranceChecklist": [
      "All images confirmed square 1:1 at 2048×2048px with uniform padding margins",
      "WebP encoding verified at quality 85 for optimal Shopify performance balance",
      "Background color matches client specification with zero fringe or gradient bleed",
      "Product centering and margin consistency verified across all batch images simultaneously"
    ],
    "samples": []
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}
