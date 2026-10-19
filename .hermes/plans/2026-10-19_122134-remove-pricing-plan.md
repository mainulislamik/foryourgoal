# Implementation Plan: Complete Removal of Pricing from ForYourGoal

> **For Hermes:** Use this step-by-step implementation plan to transition ForYourGoal from fixed/matrix pricing to a high-touch 100% custom enterprise quotation model.

**Goal:** Remove all public pricing tables, price tags (e.g., "$0.49/image"), volume calculators, and direct "/pricing" navigation links across the entire site, refocusing user acquisition strictly on custom project scoping, tailored SLA proposals, and the free 2-image sample pilot at `/request-a-quote`.

**Architecture:** 
- Eliminate public pricing endpoints and navigation items.
- Replace `/pricing` route with an automated 308 permanent redirect to `/request-a-quote` to preserve SEO link equity and prevent 404s for previous visitors.
- Update header, mobile drawer, footer, service CTAs, home hero, and FAQs to speak in terms of "Custom Project Estimates", "Tailored SLAs", and "Invoicing Terms" rather than fixed retail/matrix price tags.
- Delete unused pricing components (`PricingCalculator.tsx`).

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Docker.

---

### Task 1: Navigation Updates (Header & Footer)

**Objective:** Remove all public links to "/pricing" from the desktop navbar, mobile navigation drawer, and global footer.

**Files:**
- Modify: `src/components/layout/Header.tsx:300-315` & `src/components/layout/Header.tsx:424-435`
- Modify: `src/components/layout/Footer.tsx:168-175`

**Step 1: Header Desktop Navigation**
In `src/components/layout/Header.tsx`, remove the desktop "Pricing" nav link button:
```tsx
// Remove:
<Link
  href="/pricing"
  className={cn(
    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
    pathname === "/pricing" ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
  )}
>
  Pricing
</Link>
```

**Step 2: Header Mobile Drawer**
In `src/components/layout/Header.tsx`, remove the mobile drawer "Pricing & Volume Calculator" row.

**Step 3: Global Footer**
In `src/components/layout/Footer.tsx`, remove the "Pricing Matrix" link under the Solutions column.

---

### Task 2: Homepage & Service Detail CTAs Refocus

**Objective:** Replace all calls-to-action that point to "/pricing" with links to custom quote requests or workflow discovery.

**Files:**
- Modify: `src/app/page.tsx:200-210`, `src/app/page.tsx:390-405`, `src/app/page.tsx:440-460`
- Modify: `src/app/services/[slug]/page.tsx:145-155`

**Step 1: Homepage Hero & Banner CTAs**
- In `src/app/page.tsx`, change secondary button "Explore Specs & Pricing" to "Explore Our Workflow" (`href="/how-it-works"`).
- In the FAQ section heading subtitle: update "Everything you need to know about pricing, turnaround..." to "Everything you need to know about turnaround speeds, quality control, file formats, and free trial pilots."
- In the bottom CTA card: change "Send us your brief... complete with custom pricing and zero obligation" to "...complete with your tailored project scope and zero obligation." Change the secondary button from `/pricing` ("View Volume Pricing") to `/portfolio` ("View Client Portfolio").

**Step 2: Service Detail Pages**
- In `src/app/services/[slug]/page.tsx`, update the action button from `href="/pricing"` ("Explore Pricing & SLAs") to `href="/request-a-quote"` ("Request Custom Proposal & SLA").

---

### Task 3: FAQ & Copy Adjustments (Remove $0.49/image & Price Badges)

**Objective:** Clean up hardcoded dollar amounts and convert pricing FAQs into enterprise invoicing & estimation policies.

**Files:**
- Modify: `src/data/faqs.ts`
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/faq/layout.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/request-a-quote/layout.tsx`

**Step 1: Update FAQs in `src/data/faqs.ts`**
- Change category `"pricing"` to `"invoicing"` or `"terms"`.
- Update Question 6:
  - Old: "How does your volume pricing and discount structure work? Pricing scales with monthly image volume. Clipping path starts from $0.49/image..."
  - New: "How are project estimates and volume rates determined?"
  - Answer: "Every client workflow is unique. We provide tailored project estimates based on image complexity (simple clipping path vs. intricate multi-layer retouching), monthly throughput volume, and required turnaround SLA. Enterprise clients with guaranteed monthly volumes receive dedicated artist allocations and discounted per-image contract rates."
- Update Question 7:
  - Keep focused on payment methods: "What payment methods and invoicing terms do you support?" (Net-30, Wire Transfer, Credit Card, PayPal).

**Step 2: FAQ Filter Tab & Layout Meta**
- In `src/app/faq/page.tsx`, update tab label `{ id: "pricing", label: "Invoicing & Terms" }`.
- In `src/app/faq/layout.tsx`, change description from "pricing" to "turnaround speeds, quality assurance, project estimates, and confidentiality."
- In `src/app/contact/page.tsx`: change "Receive custom tiered volume pricing" to "Receive tailored project proposal & SLA".
- In `src/app/request-a-quote/layout.tsx`: change "volume pricing" to "custom enterprise quotation".

---

### Task 4: Route Handling for `/pricing` & Component Cleanup

**Objective:** Ensure previous search engine links and bookmarks to `/pricing` redirect permanently (308) to `/request-a-quote` and remove the standalone calculator.

**Files:**
- Modify / Replace: `src/app/pricing/page.tsx` (or `next.config.ts` redirects)
- Remove: `src/components/pricing/PricingCalculator.tsx`
- Modify: `src/app/sitemap.ts` (remove `"/pricing"`)

**Step 1: Next.js Redirect**
In `src/app/pricing/page.tsx`, implement a permanent server redirect:
```tsx
import { redirect } from "next/navigation";

export default function PricingPage() {
  redirect("/request-a-quote");
}
```
Or configure `redirects()` in `next.config.ts`:
```ts
async redirects() {
  return [
    {
      source: "/pricing",
      destination: "/request-a-quote",
      permanent: true,
    },
  ];
}
```

**Step 2: Remove Component**
Delete `src/components/pricing/PricingCalculator.tsx` to keep the codebase clean and avoid dead code.

**Step 3: Sitemap Update**
In `src/app/sitemap.ts`, remove `"/pricing"` from the sitemap routes array.

---

### Verification & Testing Checklist

1. **Build Validation:**
   - Run `npm run build` locally in `/home/imon/foryourgoal`. Ensure all routes compile with 0 TypeScript/ESLint errors.
2. **Search Verification:**
   - Run ripgrep for `pricing`, `Pricing`, and `\$[0-9]` across `src/` to confirm zero unintended remnants.
3. **Link & Redirect Validation:**
   - Test `curl -I https://foryourgoal.com/pricing` to verify 308 redirect to `/request-a-quote`.
   - Verify header navbar and footer contain no broken links.
4. **Git & Deploy:**
   - Commit and push to `origin main`.
   - Deploy to VPS `stockwhisk` (`163.227.239.114`) via Docker rebuild.
   - Verify live site visual appearance and navigation.
