# FORYOURGOAL — Implementation & Verification Checklist

## Phase 1: Initial Discovery, Infrastructure & Planning
- [x] Inspect host environment (StockWhisk VPS `163.227.239.114`, available RAM ~2.5 GiB, 36 GiB disk).
- [x] Check active ports and services to prevent port collisions (Allocated: `172.17.0.1:3012` for Next.js app).
- [x] Analyze Caddy reverse proxy configuration on VPS (`/root/stockwhisk/stockwhisk_updated/Caddyfile`).
- [x] Check Cloudflare DNS status for `foryourgoal.com` (NS delegated to Cloudflare; apex & www records pending).
- [x] Draft `PLAN.md` with complete project roadmap and architecture.
- [x] Draft `ARCHITECTURE.md` with routing, schemas, and container network layout.
- [x] Draft `SEO_CONTENT_PLAN.md` with keyword mapping and structured data standards.
- [x] Draft `SECURITY.md` with threat model, MIME validation, and header specs.
- [x] Draft `IMPLEMENTATION_CHECKLIST.md` (this document).

---

## Phase 2: Application Scaffolding & Design System
- [ ] Initialize Next.js 15+ App Router TypeScript project with strict type checks.
- [ ] Configure Tailwind CSS v4 with brand design tokens:
  - Midnight Navy: `#101321` (Backgrounds, hero contrast, primary text)
  - Ivory: `#F6F5F0` (Card backgrounds, clean surface contrast)
  - Violet: `#745CFF` (Primary actions, brand accents, highlights)
  - Lime Accent: `#D6FF70` (Badges, high-conversion micro-accents, CTAs)
- [ ] Create custom Foryourgoal SVG wordmark, responsive logo, and favicon bundle.
- [ ] Build global layout components:
  - Header with sticky blur, desktop mega-navigation, and dynamic CTA.
  - Accessible mobile drawer with ARIA dialog semantics.
  - Comprehensive footer with service links, trust badges, enterprise SLA details, and copyright.
  - Breadcrumbs with schema markup.
- [ ] Configure `Motion for React` with full `prefers-reduced-motion` compliance.

---

## Phase 3: Interactive Components & Quote Engine
- [ ] Build high-performance, touch & keyboard-accessible Before/After Image Comparison Slider:
  - ARIA slider semantics (`role="slider"`, `aria-valuenow`, keyboard arrow controls).
  - Smooth drag handling for mobile touch and desktop pointer.
  - Zoom inspection toggle for pixel-level detail review.
- [ ] Build multi-step Request a Quote & Free Sample wizard:
  - Step 1: Service selection (Clipping path, retouching, mannequin, jewelry, etc.).
  - Step 2: Volume tier selection & SLA turnaround timeline.
  - Step 3: File specifications (format, background color, shadow preferences).
  - Step 4: Secure drag-and-drop file upload with progress indicator.
  - Step 5: Contact information, NDA agreement, and verification.
  - Server-side Zod validation and safe error handling.
- [ ] Build interactive Pricing Volume Calculator with dynamic savings tiers.
- [ ] Build filterable Portfolio Grid with instant category filtering.

---

## Phase 4: Full Page & Route Implementation
- [ ] `/`: High-converting Homepage with interactive hero, before/after slider, service grid, process timeline, trust metrics, FAQs, and quote CTA.
- [ ] `/services/`: Complete services index with categorization and feature breakdown.
- [ ] `/services/[slug]/`: Deep-dive service pages for:
  - `clipping-path`
  - `background-removal`
  - `multi-clipping-path`
  - `image-masking`
  - `product-photo-retouching`
  - `ghost-mannequin`
  - `jewelry-retouching`
  - `color-correction`
  - `shadow-reflection`
  - `raster-to-vector`
- [ ] `/industries/`: Industry solutions index.
- [ ] `/industries/[slug]/`: Dedicated pages for:
  - `ecommerce-marketplaces`
  - `fashion-apparel`
  - `jewelry-luxury`
  - `photographers-studios`
  - `advertising-agencies`
- [ ] `/portfolio/`: Interactive filterable gallery with live modal inspection.
- [ ] `/portfolio/[slug]/`: Case study deep-dives with before/after comparison and technical turnaround metrics.
- [ ] `/how-it-works/`: Detailed 4-step production workflow, security protocols, and QA gates.
- [ ] `/pricing/`: Transparent tiered pricing matrix, volume discounts, and custom enterprise quoting.
- [ ] `/request-a-quote/`: Full-page standalone quote & free sample workflow.
- [ ] `/about/`: Studio story, production capacity (5,000+ photos/day), 24/7 global operations, and QA methodology.
- [ ] `/blog/`: Knowledge center with e-commerce photography and image editing guides.
- [ ] `/blog/[slug]/`: Editorial blog articles with table of contents, author bios, and JSON-LD markup.
- [ ] `/faq/`: Categorized FAQ repository with search and instant accordion filters.
- [ ] `/contact/`: Direct contact page with business coordinates, inquiry form, and WhatsApp button.
- [ ] `/careers/`: Company culture, benefits, and open positions.
- [ ] `/careers/[slug]/`: Job specification and resume upload form.
- [ ] `/privacy-policy/`: GDPR/CCPA compliant privacy policy with strict NDA and image-ownership clauses.
- [ ] `/terms/`: Commercial terms of service, SLA turnaround conditions, and revision policy.
- [ ] Error states: Custom `not-found.tsx` (404), `error.tsx` (500 boundary), and `loading.tsx` skeletons.

---

## Phase 5: Technical SEO, Structured Data & Accessibility
- [ ] Dynamic XML sitemap generator (`/sitemap.xml`) including all pages and slugs.
- [ ] Dynamic `robots.txt` with crawler permissions and sitemap index reference.
- [ ] Schema.org JSON-LD structured data:
  - `ProfessionalService` / `Organization` on homepage.
  - `Service` & `OfferCatalog` on all service pages.
  - `FAQPage` on FAQ and service pages.
  - `BreadcrumbList` on all interior pages.
  - `Article` on blog posts.
- [ ] OpenGraph & Twitter Card metadata across all routes.
- [ ] WCAG 2.1 AA accessibility audit:
  - Color contrast ratios >= 4.5:1.
  - Keyboard focus rings and tab ordering.
  - Screen reader accessible form labels and ARIA attributes.
  - Skip to main content link.

---

## Phase 6: Testing, Dockerization & Server Deployment
- [ ] Production build verification (`npm run build` with zero TypeScript or linting errors).
- [ ] Automated route checks and API test execution.
- [ ] Multi-stage production `Dockerfile` with standalone Next.js output and non-root execution.
- [ ] `docker-compose.yml` with strict memory limit (`1024M`) and host binding `172.17.0.1:3012:3000`.
- [ ] Caddy reverse proxy integration snippet for `/root/stockwhisk/stockwhisk_updated/Caddyfile`.
- [ ] Cloudflare DNS and SSL configuration step-by-step guidance.
- [ ] Git commit and push to repository.
