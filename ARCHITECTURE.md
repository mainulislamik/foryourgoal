# FORYOURGOAL — System Architecture & Specification

## 1. High-Level Architecture Overview

```
                      +---------------------------------------+
                      |           Internet Clients            |
                      +-------------------+-------------------+
                                          |
                                          v
                      +---------------------------------------+
                      |         Cloudflare Edge Network       |
                      |   - DNS (foryourgoal.com, www)        |
                      |   - SSL / TLS: Full (Strict)          |
                      |   - DDoS & Bot Mitigation             |
                      |   - HTTP/3 & Brotli Caching           |
                      +-------------------+-------------------+
                                          | HTTPS :443
                                          v
                      +---------------------------------------+
                      |       Production VPS (163.227.239.114)|
                      |                                       |
                      |   +-------------------------------+   |
                      |   | Central Caddy Reverse Proxy   |   |
                      |   | (stockwhisk_updated-caddy-1)  |   |
                      |   +---------------+---------------+   |
                      |                   |                   |
                      |         +---------+---------+         |
                      |         |                   |         |
                      |         v                   v         |
                      |  [Other Apps]    [ForYourGoal App]    |
                      |  - stockwhisk    - frontend:3012      |
                      |  - trycalc       - cms/api:8098       |
                      |  - amarpdf       - postgres:5436      |
                      |  - snappymail    - encrypted uploads  |
                      +---------------------------------------+
```

---

## 2. Complete Routing & Page Architecture

### Public Routes Map
| Route | Type | Description | Primary Conversion Goal |
|---|---|---|---|
| `/` | SSR / ISR | High-impact homepage, before/after slider, core services, trust badges | Primary quote CTA & sample booking |
| `/services/` | SSG / ISR | Comprehensive service catalog & comparison grid | Direct lead to service detail |
| `/services/[slug]/` | Dynamic ISR | Deep-dive service landing pages with dedicated pricing & samples | Service-specific quote request |
| `/industries/` | SSG / ISR | Industry-tailored solutions (E-commerce, Fashion, Jewelry, Real Estate, Automotive) | B2B enterprise persona match |
| `/industries/[slug]/` | Dynamic ISR | Deep-dive industry pages with specialized workflows & requirements | Enterprise RFP / high-volume consultation |
| `/portfolio/` | SSG / ISR | Interactive filterable gallery (by category, turnaround, complexity) | Visual proof of quality |
| `/portfolio/[slug]/` | Dynamic ISR | Case study breakdown: before/after, challenges, retouching technique | High-confidence conversion |
| `/how-it-works/` | SSG | 4-step workflow: Upload -> Edit & QA -> Review -> Download | Friction reduction & trust building |
| `/pricing/` | SSG / Client | Interactive volume calculator, SLA toggles, service comparison matrix | Transparent self-service quoting |
| `/request-a-quote/` | Client / SSR | Multi-step dynamic quote & sample evaluation form with secure upload | Core lead capture engine |
| `/about/` | SSG | Studio philosophy, capacity, quality assurance protocols, security standards | Brand credibility & B2B verification |
| `/blog/` | SSG / ISR | Knowledge hub: e-commerce photography guides, retouching best practices | Organic top-of-funnel SEO traffic |
| `/blog/[slug]/` | Dynamic ISR | Full editorial article with table of contents, author bio, related guides | Content engagement & lead capture |
| `/faq/` | SSG | Categorized frequently asked questions with instant accordion navigation | Pre-sales objection handling |
| `/contact/` | SSG / Client | Direct studio inquiry form, office coordinates, live support hours | Direct agency communications |
| `/careers/` | SSG / ISR | Open positions for senior retouchers, QA leads, and account managers | Talent acquisition pipeline |
| `/careers/[slug]/` | Dynamic ISR | Job specifications and direct encrypted application form | Candidate submission |
| `/privacy-policy/` | Static | Comprehensive GDPR, CCPA, and enterprise NDA compliance details | Legal compliance & data integrity |
| `/terms/` | Static | Service level agreements, turnaround guarantees, revision policies | Commercial terms clarity |
| `/admin/*` | SSR / Protected | Payload CMS administration dashboard for full content & lead management | Operational administration |

---

## 3. CMS Collections & Data Schema

### 1. `SiteSettings` (Global Single)
- `companyName`: string (Foryourgoal)
- `tagline`: string
- `supportEmail`: string (configured for notifications)
- `businessAddress`: string
- `operatingHours`: string
- `socialLinks`: array of `{ platform, url }`
- `activeAnnouncement`: `{ enabled, message, link }`

### 2. `Services` (Collection)
- `title`: string (e.g., "Clipping Path Services")
- `slug`: string (unique, indexed)
- `shortDescription`: string (for cards & meta tags)
- `fullDescription`: richText
- `heroImage`: relationship -> Media
- `beforeAfterPair`: `{ before: relationship -> Media, after: relationship -> Media, label }`
- `startingPrice`: number (USD)
- `turnaroundHours`: number
- `featuresList`: array of `{ title, description }`
- `idealFor`: array of strings
- `metaTitle`: string
- `metaDescription`: string

### 3. `Industries` (Collection)
- `title`: string (e.g., "E-Commerce & Marketplaces")
- `slug`: string
- `tagline`: string
- `overview`: richText
- `painPoints`: array of `{ problem, solution }`
- `recommendedServices`: relationship -> Services[]
- `heroImage`: relationship -> Media
- `metaTitle`: string
- `metaDescription`: string

### 4. `PortfolioItems` (Collection)
- `title`: string
- `slug`: string
- `category`: relationship -> Services
- `industry`: relationship -> Industries
- `beforeImage`: relationship -> Media
- `afterImage`: relationship -> Media
- `editingTechniques`: array of strings
- `turnaroundTime`: string
- `isFeatured`: boolean

### 5. `QuoteRequests` (Collection / Lead Pipeline)
- `referenceId`: string (e.g., `FYG-2026-XXXX`)
- `status`: select (`new`, `in_review`, `quoted`, `sample_in_progress`, `won`, `archived`)
- `fullName`: string
- `businessEmail`: string
- `companyName`: string
- `websiteUrl`: string (optional)
- `selectedServices`: relationship -> Services[]
- `estimatedVolume`: select (`1-20`, `21-100`, `101-500`, `501-2000`, `2000+`)
- `deadline`: select (`rush_6h`, `urgent_12h`, `standard_24h`, `flexible_48h`)
- `fileFormat`: array of strings (`JPG`, `PNG`, `PSD`, `TIFF`, `WebP`)
- `colorProfile`: select (`sRGB`, `AdobeRGB`, `ProPhoto`, `Original`)
- `projectBrief`: text
- `uploadedFiles`: relationship -> Media[]
- `ipAddress`: string (hashed for privacy/fraud prevention)
- `createdAt`: date

### 6. `BlogPosts` (Collection)
- `title`: string
- `slug`: string
- `author`: relationship -> Authors
- `category`: string
- `excerpt`: string
- `content`: richText
- `coverImage`: relationship -> Media
- `readingTime`: number
- `publishedAt`: date
- `metaTitle`: string
- `metaDescription`: string

### 7. `FAQs` (Collection)
- `question`: string
- `answer`: richText
- `category`: select (`general`, `services`, `pricing_turnaround`, `security_nda`, `billing`)
- `sortOrder`: number

---

## 4. Multi-Step Quote Engine Logic

```
   [Step 1: Scope & Services]
   - Select services (Clipping Path, Retouching, Ghost Mannequin, Color Correction, etc.)
   - Specify output format & resolution requirements
   
   [Step 2: Volume & Turnaround]
   - Image volume estimate (1-20, 21-100, 101-500, 500-2000, 2000+)
   - Turnaround SLA requirement (6h Rush, 12h Fast, 24h Standard, 48h Flexible)
   - Real-time estimated pricing bracket indicator

   [Step 3: Sample Upload & Specifications]
   - Optional drag-and-drop sample files (max 100MB per bundle, validated MIME signatures)
   - Special retouching instructions, background preference (pure white, transparent, custom), shadow requirements

   [Step 4: Contact & Verification]
   - Name, business email, company name, phone/WhatsApp (optional)
   - NDA acknowledgement checkbox
   - CSRF & rate limit validation
   - Server-side Zod validation -> Database record creation -> Transactional email alerts to operations & client
```

---

## 5. Deployment & Container Architecture

### Service Network Config
- Container name: `foryourgoal-app`
- Docker network: `stockwhisk-network` (or host gateway `172.17.0.1`)
- Port exposed to host: `172.17.0.1:3012:3000`
- Resource Limits:
  - CPU limit: `2.0`
  - Memory limit: `1024M` (preventing any impact on StockWhisk or TryCalc)
  - Restart policy: `unless-stopped`
- Reverse Proxy: Caddy block in `/root/stockwhisk/stockwhisk_updated/Caddyfile`:
  ```caddyfile
  foryourgoal.com, www.foryourgoal.com {
      encode gzip zstd
      header {
          Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
          X-Content-Type-Options "nosniff"
          X-Frame-Options "SAMEORIGIN"
          Referrer-Policy "strict-origin-when-cross-origin"
          -Server
      }
      request_body {
          max_size 100MB
      }
      log {
          output file /data/foryourgoal_access.log {
              roll_size 10MiB
              roll_keep 5
          }
      }
      handle {
          reverse_proxy 172.17.0.1:3012
      }
  }
  ```
