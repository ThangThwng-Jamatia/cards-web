# Cards Web — Design Breakdown

## Overview

This is the **Minor Devs Studios** portfolio/landing site. It's a dark, cinematic, 3D-interactive UI with depth layering, particle effects, and fluid motion. Everything is built for a premium feel — custom cursor, animated typography, and real WebGL geometry running in the background.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| 3D / WebGL | Three.js + `@react-three/fiber` + `@react-three/drei` |
| Animation (JS) | GSAP 3 + `@gsap/react` + ScrollTrigger plugin |
| Animation (React) | Framer Motion 12 |
| UI Primitives | Radix UI (full suite) |
| Component Scaffolding | shadcn/ui (`components.json`) |
| Marquee | `react-fast-marquee` |
| Icons | Lucide React |
| Font | Geist (Google Fonts) |
| Backend / DB | Supabase |
| Hosting | Vercel + `@vercel/speed-insights` |

---

## How the 3D Interactive UI Was Built

### 1. Hero 3D Scene — `HeroScene.tsx`

A raw Three.js scene (not React Three Fiber) mounted imperatively into a `<div>` ref.

**What's in the scene:**
- **5,000 particle field** — `THREE.Points` with `BufferGeometry`, lavender color (`#c2a4ff`), tiny size (`0.045`), slow rotation on X and Y axes creating a drifting starfield effect.
- **Torus Knot** — `TorusKnotGeometry(1.3, 0.38, 128, 32, 2, 3)` with wireframe `MeshStandardMaterial`, positioned right-of-center, emissive purple glow, slow continuous rotation.
- **Icosahedron** — `IcosahedronGeometry(1.0, 1)` wireframe, positioned top-left, counter-rotating to the torus.
- **Lighting** — Ambient light + two `PointLight`s (one lavender at top-right, one deep purple at bottom-left) for directional emissive bounce.
- **Alpha renderer** — `WebGLRenderer({ alpha: true })` so the scene is transparent and sits behind the text.
- **Clock-driven animation loop** — `THREE.Clock` keeps physics-independent timing. Particles rotate at `t * 0.015 / 0.025`, geometry rotates at fixed increments per frame.

### 2. Depth-Parallax Typography — `app/page.tsx`

The hero heading is split into three independent layers (`line1Ref`, `line2Ref`, `line3Ref`), each assigned a **different parallax speed and direction** via `gsap.to()` on `mousemove`:

```
MINOR   → moves opposite to mouse  (x: -32, y: -20)  ← far layer
DEVS    → moves with mouse          (x: +40, y: +25)  ← close layer (fastest)
STUDIOS → subtle opposite drift     (x: -16, y: -10)  ← mid layer
```

This creates a **fake 3D depth illusion** with only CSS transforms — no real 3D at all. The subtitle and badge also move at different speeds.

**Entrance animation:** Each character is an individual `<span class="hero-char">`. GSAP animates them in with `fromTo({ opacity:0, y:70, rotateX:-90 } → { opacity:1, y:0, rotateX:0 })` with a `stagger: 0.038` — a classic "flip up from below" reveal.

### 3. TiltCard — `components/TiltCard.tsx`

Pure CSS perspective tilt using mouse position math, no library:

```js
const rotateX = (y - rect.height / 2) / intensity;
const rotateY = (rect.width / 2 - x) / intensity;
card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
```

- On `mouseenter`: card lifts (`translateZ`), background and border transition to accent colors.
- On `mouseleave`: transform resets with `transition: transform 0.15s ease`.
- A **radial gradient glow blob** is positioned absolutely at top-right of each card, creating a simulated light source.
- `intensity` and `translateZ` are props — stats grid uses `intensity=22`, philosophy cards use the default `intensity=18`.

### 4. Animated Background — `LiquidLightBackground.tsx` / `GradientBackground.tsx`

Two background systems (used on different pages):

**LiquidLightBackground:**
- 5 large blurred `div`s (up to 800×800px) with `radial-gradient` fills, `blur-[150px]`, animated via Framer Motion with `x/y/scale/opacity/rotate` keyframes.
- Each blob loops with `repeatType: 'mirror'` on different durations (12–20s) so they never sync.
- The entire blob container moves with mouse via `useMotionValue` + `useTransform` parallax (`-20px` to `+20px`).
- A **diagonal shine sweep** — a 200%×200% div with a `linear-gradient` diagonal, animated with a CSS keyframe `shineMove` — slides across continuously.
- **SVG noise texture** (inline data URI `feTurbulence fractalNoise`) at `opacity: 0.015` + `mix-blend-mode: overlay` for organic grain.

**GradientBackground:**
- Uses a `<canvas>` element animated with `requestAnimationFrame`.
- Each frame draws a **rotating linear gradient** (black to dark gray tones) using a time-driven angle: `Math.cos/sin(time)` to compute gradient endpoints.
- Layered with a **breathing radial glow** (`sin(time * 0.4)` opacity) and a **sweeping spotlight** that drifts across the canvas.

### 5. Custom Cursor — `components/CustomCursor.tsx`

Two elements: a `cursor-dot` (small filled circle) and a `cursor-ring` (larger outline circle).

- Dot: snaps to mouse instantly via `gsap.to(dot, { x, y, duration: 0.1 })`.
- Ring: lags behind using a lerp loop — `ringPos += (mouse - ringPos) * 0.12` each frame, then `gsap.set(ring, { x, y })`.
- On hover of interactive elements (`a, button, [data-cursor]`): dot scales to `0`, ring gets `.hovered` class (expands and changes style).

### 6. Loading Screen — `components/LoadingScreen.tsx`

GSAP timeline animates a counter from `00` to `100` over 1.8s with `ease: 'power2.inOut'`, updating both a number display and a `scaleX` progress bar simultaneously. On complete, the screen fades out with `opacity: 0` then unmounts via React state.

### 7. Scroll Reveal

`ScrollTrigger` plugin registered globally. Cards and sections use Framer Motion's `whileInView` with `viewport={{ once: true }}` for scroll-triggered entrances (`opacity: 0 → 1`, `y: 30 → 0`).

---

## CSS Design System

All colors are CSS custom properties in `:root`:

```css
--accentColor:     #c2a4ff   /* lavender purple */
--backgroundColor: #0b080c   /* near-black */
--accentGlow:      rgba(194, 164, 255, 0.25)
--textColor:       #eae5ec
--textMuted:       #888
--borderColor:     rgba(255, 255, 255, 0.06)
```

The cursor is hidden globally (`* { cursor: none !important }`). Scrollbar is styled to 4px width with accent color thumb.

---

## Page Structure

```
/ (Home)
  ├── HeroScene (Three.js WebGL, absolute background)
  ├── Grid overlay (CSS)
  ├── Vignette gradient (CSS)
  ├── Hero typography (3 parallax layers, per-char GSAP)
  ├── TechMarquee (react-fast-marquee)
  ├── Stats grid (TiltCard × 4)
  └── Philosophy grid (TiltCard × 3)

/apps
  └── App cards (TiltCard + AppCard component)

/about
  └── About content

/legal
  └── Legal page
```
