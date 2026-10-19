# Before/After Slider Fullscreen Modal Preview Implementation Plan

> **For Hermes:** Use the plan below to implement the interactive fullscreen popup comparison modal across all service and portfolio cards.

**Goal:** Allow users to click a dedicated "Full Screen / Expand" button on any Before/After slider to open a high-resolution, full-screen interactive modal popup where they can slide between Before and After in high fidelity.

**Architecture:** 
1. Build a self-contained, keyboard-accessible, and mobile-friendly React Portal / Modal component (`BeforeAfterModal.tsx`) or integrate modal capabilities directly into `BeforeAfterSlider.tsx`.
2. Provide a floating "Maximize / Fullscreen" button (`<Maximize2 />`) on every Before/After slider canvas (services cards, homepage grid, service detail pages, and portfolio).
3. In the fullscreen modal, render the interactive comparison canvas in full viewport dimensions with zoom, pan, keyboard arrow controls (← / →), and escape key (`Esc`) listener.

**Tech Stack:** Next.js (App Router), React 19, Tailwind CSS, Lucide Icons (`Maximize2`, `Minimize2`, `X`, `MoveHorizontal`, `ZoomIn`, `ZoomOut`), React Portal.

---

### Task 1: Design & Architect the Fullscreen Comparison Modal

**Files:**
- Create: `src/components/ui/BeforeAfterModal.tsx`
- Modify: `src/components/ui/BeforeAfterSlider.tsx`

**Features & Capabilities:**
1. **Trigger Button:** A sleek, glassmorphic button on the slider (top-right or top-left, e.g., icon `<Maximize2 className="w-3.5 h-3.5" />`) labeled "Fullscreen" or icon-only on mobile.
2. **Modal Backdrop:** Fixed backdrop (`fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6`).
3. **Modal Canvas:** Large viewport-adaptive container (`w-full max-w-6xl max-h-[88vh] aspect-[4/3] sm:aspect-[16/10] relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black`).
4. **Interactive Controls inside Modal:**
   - Interactive Before/After slider line with dragging and touch support.
   - Header with Service Title, Before/After labels (`Original RAW` vs `Retouched Asset`), and Close button (`Esc` / `<X />`).
   - Zoom in/out toggle (`1x` vs `1.5x` / `2x`) for pixel-level inspection.
   - Bottom instructional bar (`Drag slider or use Left/Right arrows to inspect details | Press Esc to close`).
5. **Body Scroll Lock:** Prevent background page scrolling while modal is open (`document.body.style.overflow = "hidden"`).
6. **Portal Mounting:** Use `createPortal(..., document.body)` so the modal is never clipped by parent card overflow (`overflow-hidden`).

---

### Task 2: Implement BeforeAfterModal & Integrate into BeforeAfterSlider

**Step 1:** Create `src/components/ui/BeforeAfterModal.tsx` handling the portal rendering, key events (Escape, Left, Right), drag mechanics, and smooth exit transitions.
**Step 2:** Update `src/components/ui/BeforeAfterSlider.tsx` to:
   - Accept optional `enableFullscreen?: boolean` (defaults to `true`).
   - Render the `<button onClick={() => setIsFullscreen(true)}>` on the top right alongside the zoom button.
   - Open the modal when clicked.
**Step 3:** Run `npx tsc --noEmit` to verify type safety.

---

### Task 3: Test on Public Services Page & Mobile Viewports

**Verification Steps:**
1. Build check: `npm run build` or `npx tsc --noEmit`.
2. Headless Chrome screenshot verification:
   - Verify the fullscreen button appears clearly on all cards.
   - Verify clicking opens the modal overlay and renders the high-res Before/After slider.
3. Test keyboard shortcuts:
   - Arrow keys slide between Before and After.
   - Esc key closes the modal.
4. Verify responsive design on mobile (touch events) and desktop.

---

### Task 4: Git Commit & Production VPS Deployment

**Verification & Delivery:**
1. Commit code to GitHub repo:
   `git add . && git commit -m "feat(ui): add interactive fullscreen popup preview for Before/After sliders" && git push origin main`
2. Sync & rebuild on production VPS:
   `ssh root@163.227.239.114 "cd /root/foryourgoal && git pull && docker compose up -d --build web"`
3. Verify live site HTTP 200 OK and visual audit.
