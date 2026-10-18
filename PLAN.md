# FORYOURGOAL — Master Project & Execution Plan

## 1. Project Overview & Business Model
**Foryourgoal** (`foryourgoal.com`) is a premium international B2B image-editing and photo-retouching studio platform. The business serves e-commerce enterprises, high-volume online retailers, product photographers, advertising agencies, fashion houses, and creative studios across North America, Europe, Oceania, and global markets.

### Key Value Propositions
- **Pixel-level precision & human artistry**: 100% hand-crafted clipping paths and high-end natural retouching.
- **Enterprise-grade turnaround**: 6 to 24-hour turnaround options with strict SLA guarantees.
- **Volume scalability**: Capacity to process 5,000+ images per day while maintaining rigorous multi-tier QA.
- **Total confidentiality & security**: Enterprise NDA guarantees, encrypted file transfers, and strict data-retention policies.
- **Transparent, volume-tiered pricing**: Per-image pricing starting from accessible entry tiers with dynamic quoting for custom briefs.

---

## 2. Infrastructure & Environment Alignment
- **Host Target**: Remote Production VPS (`stockwhisk` / `163.227.239.114`).
- **Resource Constraints**:
  - Total RAM: 5.6 GiB (~2.5 GiB available, 1.0 GiB swap active).
  - Storage: 36 GiB available on `/dev/vda1`.
  - Memory Caps: Containers strictly capped (`deploy.resources.limits.memory`) to prevent host OOM killer cascades.
- **Reverse Proxy**: Central Docker container `stockwhisk_updated-caddy-1` managing automatic HTTPS, rate limiting, and domain routing for `stockwhisk.com`, `trycalc.net`, `amarpdf.net`, and existing `mail.foryourgoal.com`.
- **Domain & Cloudflare Routing**:
  - Domain: `foryourgoal.com`
  - Cloudflare Nameservers: `igor.ns.cloudflare.com` & `kristina.ns.cloudflare.com`
  - Proxy Architecture: Cloudflare SSL mode `Full (strict)` -> Caddy Reverse Proxy -> Dockerized Services.

---

## 3. Technology Stack Selection
| Layer | Selected Technology | Version / Rationale |
|---|---|---|
| **Frontend Framework** | Next.js (App Router) | Latest stable compatible with React 19 / Node 22 LTS |
| **Language** | TypeScript | Strict mode enabled (`strict: true`, no implicit any) |
| **Styling & Design System** | Tailwind CSS v4 & Lucide Icons | High-performance CSS variable-driven design tokens |
| **Component Primitives** | Radix UI / Accessible Primitives | Fully WCAG 2.1 AA accessible, ARIA compliant |
| **Animations** | Motion for React (framer-motion) | Respects `prefers-reduced-motion`, hardware-accelerated |
| **CMS & Data Engine** | Payload CMS 3.x with PostgreSQL | Headless, robust schema, typed collections, zero runtime overhead for public cached pages |
| **Validation** | Zod v3 | Server-side & client-side strict schema validation |
| **Storage Engine** | S3-compatible / Local Persistent Encrypted Volumes | Private uploads with short-lived signed URLs for quote briefs |
| **E-Commerce & Quoting** | Custom Multi-Step Interactive Quote Engine | Instant volume calculator, SLA selection, drag-and-drop secure file staging |
| **Email Delivery** | Transactional SMTP via Docker Mailserver | Integrated with host's `mail.foryourgoal.com` / `docker-mailserver` |
| **Testing** | Playwright E2E + Vitest / TypeScript compiler | Rigorous route, accessibility, and form validation tests |

---

## 4. Port Allocation Map (StockWhisk VPS)
To prevent collisions with existing services on the VPS:
- Occupied ports on host: 3000 (stockwhisk FE), 3002 (trycalc FE), 3005 (amarpdf FE internal), 3009 (amarpdf FE host), 3050 (wa-crm FE), 5001 (wa-engine), 5432 (stockwhisk db), 8000 (stockwhisk BE), 8050 (wa-crm BE), 8085 (omnipdf BE), 8088 (trycalc BE), 8095 (amarpdf BE), 8888 (snappymail/searxng).
- **Allocated for ForYourGoal**:
  - `foryourgoal-frontend`: `172.17.0.1:3012 -> 3000`
  - `foryourgoal-cms`: `172.17.0.1:8098 -> 3000` (or unified Next.js + Payload app)
  - `foryourgoal-db`: Isolated PostgreSQL service on internal Docker network or dedicated port `127.0.0.1:5436`.

---

## 5. Development Milestones & Phased Execution
1. **Milestone 1: Architectural Foundation & Planning Artifacts**
   - Create `PLAN.md`, `ARCHITECTURE.md`, `SEO_CONTENT_PLAN.md`, `SECURITY.md`, and `IMPLEMENTATION_CHECKLIST.md`.
   - Provide exact Cloudflare DNS configuration steps to user.
2. **Milestone 2: Application Scaffolding & Design System**
   - Initialize Next.js 15+ App Router application with TypeScript and Tailwind CSS.
   - Establish brand tokens: Midnight navy (`#101321`), Ivory (`#F6F5F0`), Violet (`#745CFF`), Lime (`#D6FF70`).
   - Build core UI components: Header/Nav, Footer, Custom Wordmark, Accessible Mobile Drawer, Buttons, Cards, Badge, Slider.
3. **Milestone 3: Interactive Features & Core Pages**
   - Implement interactive Before/After image comparison with keyboard & touch accessibility.
   - Build dynamic multi-step Request a Quote engine with client/server Zod validation and file dropzone.
   - Build Portfolio gallery with category filters (Clipping Path, Retouching, Ghost Mannequin, Jewelry, etc.).
   - Build Pricing page with dynamic volume calculator and turnaround toggles.
   - Build Services hub (`/services`) and detail pages (`/services/[slug]`).
   - Build Industries hub (`/industries`) and detail pages (`/industries/[slug]`).
   - Build Company pages: `/about`, `/how-it-works`, `/faq`, `/contact`, `/careers`, `/privacy-policy`, `/terms`.
   - Build Blog engine with articles, authors, category tagging, and JSON-LD schema.
4. **Milestone 4: CMS, API Endpoints & State Management**
   - Configure Payload CMS / PostgreSQL schema for services, portfolio, blog, quotes, and site settings.
   - Implement API routes for quote submission, email notifications, and health checks.
5. **Milestone 5: SEO, Performance & Accessibility Verification**
   - Implement OpenGraph, Twitter Cards, Canonical tags, dynamic `sitemap.xml`, and `robots.txt`.
   - Add Schema.org structured data (`Organization`, `Service`, `BreadcrumbList`, `FAQPage`, `Article`).
   - Optimize Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).
   - Ensure WCAG 2.1 AA compliance (contrast, focus states, screen reader semantics).
6. **Milestone 6: Dockerization & Production Readiness**
   - Build multi-stage optimized `Dockerfile` and `docker-compose.yml` with memory limits.
   - Verify production build and run automated validation tests.
   - Prepare Caddy reverse proxy configuration block for `foryourgoal.com` and `www.foryourgoal.com`.
   - Commit code to Git repository and push.
