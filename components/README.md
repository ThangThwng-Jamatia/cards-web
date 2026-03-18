# Components — Context for Claude

Reference this when modifying or adding components. See `../CLAUDE.md` for full project context.

---

## Component Overview

| File | Purpose | Used In |
|------|---------|---------|
| `Navbar.tsx` | Fixed top navigation, scroll-aware styling, mobile hamburger | All pages via `layout.tsx` |
| `Footer.tsx` | 3-column footer with About/Nav/Contact sections | All pages via `layout.tsx` |
| `AppCard.tsx` | Card for a single app with Play Store + Legal links | `app/apps/page.tsx` |
| `LiquidLightBackground.tsx` | Animated liquid blobs + mouse parallax — the main background | All pages individually |
| `AnimatedBackground.tsx` | Alternative background — lighter blob animation | **Not used currently** |
| `GradientBackground.tsx` | Canvas-based moving gradient | **Not used currently** |
| `ui/button.tsx` | shadcn/ui Button with CVA variants | Everywhere |
| `ui/dialog.tsx` | shadcn/ui Dialog/modal | Available but not used |
| `ui/input.tsx` | shadcn/ui Input field | Available but not used |
| `ui/sonner.tsx` | Toast notification wrapper | `layout.tsx` |

---

## LiquidLightBackground — How It Works

This is the most complex component. Key details:

- **5 blobs on desktop, 3 on mobile** — detected with a `useEffect` + `window.innerWidth` check
- **Mouse parallax** — `useMotionValue` + `useTransform` maps mouse position to blob movement
- **Blob colors** — all white/near-white (`rgba(255,255,255,...)`) with varying opacity
- **SVG noise filter** — subtle `feTurbulence` texture overlay for depth
- **Shine effect** — animated white square that slides diagonally, `z-20`
- **Accessibility** — respects `prefers-reduced-motion` via CSS media query on keyframe animations
- **DO NOT** put `LiquidLightBackground` inside `layout.tsx` — each page imports it individually so it mounts fresh per-page

---

## AppCard — Props Interface

```typescript
interface AppCardProps {
  name: string;       // App display name
  description: string; // Short description shown in card body
  category: string;   // Badge text (e.g. "Focus & Productivity")
  playStoreUrl: string; // Full Google Play Store URL
}
```

Adding a new app = add an entry to the `apps` array in `app/apps/page.tsx` and pass to `AppCard`.

---

## Adding a New Component

1. Create file in `components/` with `'use client'` at top if it uses hooks/events
2. Use Framer Motion for any animations — follow the `ease: [0.22, 1, 0.36, 1]` standard
3. Use `cn()` from `@/lib/utils` for class merging
4. Keep dark theme: `bg-black`, `text-white`, `text-neutral-300/400`, `border-white/10`
5. Use `font-light` as default text weight
