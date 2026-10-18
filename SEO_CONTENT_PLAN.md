# FORYOURGOAL — Technical SEO & Content Architecture Plan

## 1. SEO Strategy & Market Positioning
**Target Audience**: International B2B buyers (US, UK, Germany, Canada, Australia, Scandinavia) seeking dependable, high-volume, pixel-accurate photo retouching and editing outsourcing.
**Search Intent Focus**: Commercial and Transactional intent keywords with high purchasing propensity.

---

## 2. Core Keyword Clusters & Landing Page Mapping

| Primary Keyword Cluster | Search Intent | Target URL | Primary Title Tag Template |
|---|---|---|---|
| **Professional Photo Editing Services** | Commercial / Transactional | `/` | Professional Image Editing & Photo Retouching Services \| Foryourgoal |
| **Clipping Path Services** | Transactional | `/services/clipping-path` | Hand-Drawn Clipping Path Services from $0.49 \| Foryourgoal |
| **E-Commerce Image Editing** | Commercial | `/services/ecommerce-image-editing` | E-Commerce Product Photo Editing & Optimization \| Foryourgoal |
| **Background Removal Services** | Transactional | `/services/background-removal` | Bulk Background Removal Services (White & Transparent) \| Foryourgoal |
| **Product Photo Retouching** | Commercial / Transactional | `/services/product-photo-retouching` | High-End Product Retouching Services for Brands \| Foryourgoal |
| **Ghost Mannequin Photo Editing** | Transactional | `/services/ghost-mannequin` | Ghost Mannequin & Neck Joint Photo Editing Services \| Foryourgoal |
| **Jewelry Photo Retouching** | High-Value Commercial | `/services/jewelry-retouching` | Luxury Jewelry Retouching Services (Diamond & Gem) \| Foryourgoal |
| **Multiple Clipping Path / Color Variant** | Transactional | `/services/multi-clipping-path` | Multi-Clipping Path & Color Separation Services \| Foryourgoal |
| **Image Masking Services** | Technical Transactional | `/services/image-masking` | Advanced Image Masking Services (Fur, Hair, Alpha) \| Foryourgoal |
| **Shadow & Reflection Creation** | Transactional | `/services/shadow-reflection` | Natural Shadow & Reflection Creation Services \| Foryourgoal |
| **Apparel & Fashion Retouching** | Commercial | `/industries/fashion-apparel` | Fashion & Apparel Photo Retouching Studio \| Foryourgoal |
| **Amazon / Shopify Product Photo Editing** | Transactional | `/industries/ecommerce-marketplaces` | Amazon, Shopify & Marketplace Compliant Photo Editing \| Foryourgoal |
| **Commercial Studio & Photographer Outsourcing** | Commercial | `/industries/photographers-studios` | Photo Editing Outsourcing for Commercial Photographers \| Foryourgoal |
| **Photo Editing Pricing & Rates** | Transactional | `/pricing` | Transparent Photo Editing Pricing & Volume Discounts \| Foryourgoal |
| **Get a Quote / Free Sample Trial** | Conversion | `/request-a-quote` | Request an Instant Photo Editing Quote & Free Trial \| Foryourgoal |

---

## 3. On-Page SEO Standard Operating Procedure

### Metadata Rules
1. **Title Tag**: Primary Keyword + High-Value Modifier + Unique Value Proposition + `| Foryourgoal` (Max 60 characters).
2. **Meta Description**: Active verb + target audience + specific turnaround/pricing benefit + direct CTA (145–158 characters).
3. **Heading Hierarchy**:
   - Exactly one `<h1>` per page matching the primary search intent.
   - `<h2>` sections for core capabilities, process, pricing/SLA, and FAQs.
   - `<h3>` subsections for specific techniques, specifications, and deliverables.
4. **Canonical URLs**: Self-referencing strict canonical tag `<link rel="canonical" href="https://foryourgoal.com/..." />`.
5. **Open Graph & Twitter Cards**: Dynamic 1200x630px social cards with branded typography and clear service identification.

---

## 4. Structured Data (JSON-LD) Specification

### 1. `Organization` & `ProfessionalService` (Global / Home)
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Foryourgoal",
  "url": "https://foryourgoal.com",
  "logo": "https://foryourgoal.com/images/foryourgoal-logo.png",
  "image": "https://foryourgoal.com/images/foryourgoal-og.jpg",
  "description": "Professional image editing and photo retouching studio providing high-volume clipping path, product retouching, and ghost mannequin services for global e-commerce and creative brands.",
  "priceRange": "$$",
  "telephone": "+1-800-000-0000",
  "email": "support@foryourgoal.com",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BD"
  }
}
```

### 2. `Service` (Service Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Clipping Path Service",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Foryourgoal"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Image Editing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hand-Drawn Photoshop Clipping Path"
        },
        "price": "0.49",
        "priceCurrency": "USD"
      }
    ]
  }
}
```

### 3. `FAQPage` (FAQ and Service Pages)
All service pages will include 4–6 specific technical FAQs marked up with full `FAQPage` JSON-LD to qualify for search rich snippets.

### 4. `BreadcrumbList` (All Subpages)
Strict hierarchical breadcrumbs enabling Google to present intuitive navigation trails in SERPs.

---

## 5. Technical Crawl & Indexing Configuration
- **Dynamic XML Sitemap** (`/sitemap.xml`): Auto-generated including all active services, industries, blog posts, portfolio items, and static pages with accurate `<lastmod>` timestamps.
- **`robots.txt`**:
  - Allow all legitimate search engine crawlers (`Googlebot`, `Bingbot`, `Slurp`, `DuckDuckBot`).
  - Disallow `/admin/`, `/api/`, `/quote-confirmation/`, and private upload routes.
  - Sitemaps index explicitly referenced.
- **Images Optimization**:
  - Modern formats: WebP / AVIF with fallback.
  - Descriptive, keyword-rich alt tags on every functional image.
  - Explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
