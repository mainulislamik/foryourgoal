# FORYOURGOAL — Premium B2B Image Editing & Retouching Studio

Production-ready web platform for **Foryourgoal** (`foryourgoal.com`), specializing in bulk commercial photo editing, clipping path, high-end jewelry/fashion retouching, and e-commerce compliance for international brands.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Standalone output)
- **Language**: TypeScript (strict checking)
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Validation**: Zod schema validation
- **Deployment**: Docker Compose with multi-stage Alpine Node.js 22 runtime
- **Edge CDN & Security**: Cloudflare (Full Strict TLS, DDoS mitigation, Polish/Mirage)
- **Reverse Proxy**: Caddy v2 with automated ACME TLS

## Key Features
1. **Interactive Before/After Image Comparison Slider**: Real-time comparison with zoom and touch drag support.
2. **Dynamic Pricing & Volume Calculator**: Real-time unit pricing and turnaround estimations with tiered bulk volume discounts.
3. **Multi-Step Quote Request Wizard**: 4-step intake flow with magic-byte file signature validation, NDA agreement, and email notifications.
4. **43 Dynamic & SSG Routes**: Comprehensive service pages, industry-specific workflows, case study portfolio, technical SEO blog posts, and complete legal pages.
5. **Technical SEO Architecture**: Dynamic `sitemap.xml`, `robots.txt`, JSON-LD structured data (Organization, Service, FAQPage, Article, BreadcrumbList), and OpenGraph social meta tags.
6. **Zero Memory Leak / 512MB RAM Constraint**: Optimized for low-footprint VPS deployments.

## Local Development
```bash
npm install
npm run dev
```

## Production Docker Build
```bash
docker compose build
docker compose up -d
```
The application will listen on `172.17.0.1:3012` and `127.0.0.1:3012`.
