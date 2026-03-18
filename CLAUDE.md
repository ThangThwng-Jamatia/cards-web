# Minor Devs Studios — Website Project Context

> This file exists so Claude Code has full context at the start of every session.
> Update the **Progress** and **Next Goals** sections as work progresses.

---

## What This Project Is

**Minor Devs Studios** is a solo developer portfolio website for a young solopreneur who builds and publishes minimal productivity mobile apps. The site showcases published Android apps and establishes the studio's brand identity.

- **Live domain:** minordevstudios.com
- **Deployed on:** Vercel (auto-deploy on push)
- **Contact:** minordevsbusiness@gmail.com
- **GitHub:** https://github.com/ThangThwng-Jamatia

### Brand Voice & Design Philosophy
- Minimal, clean, dark aesthetic (black backgrounds, white text)
- Light font weights (300–400) throughout
- Smooth Framer Motion animations on all interactions
- Tagline: *"Building helpful and minimal apps to improve the Young Stars."*
- Studio tagline in footer: *"Made To Inspire"*

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 13.5.1 (App Router) |
| Language | TypeScript 5.2.2 |
| UI Library | React 18.2.0 |
| Styling | Tailwind CSS 3.3.3 |
| Animations | Framer Motion 12.x |
| Components | shadcn/ui + Radix UI primitives |
| Icons | lucide-react 0.446.0 |
| Fonts | Inter (Google Fonts, weights 300/400/500/600) |
| Analytics | Google Tag Manager (GTM-NLD8HVTW) + GA4 (G-7SHWG8FLE0) |
| Performance | @vercel/speed-insights |
| DB Client | @supabase/supabase-js (installed, not yet used) |
| Form handling | react-hook-form + zod |
| Toasts | sonner |

---

## File Structure

```
cards-web/
├── app/
│   ├── layout.tsx          # Root layout — Navbar, Footer, analytics scripts, metadata, JSON-LD
│   ├── page.tsx            # Home — hero section with LiquidLightBackground + 2 CTA buttons
│   ├── about/page.tsx      # About — developer bio, Email + GitHub social links
│   ├── apps/page.tsx       # Apps — grid of AppCard components, currently 2 published apps
│   ├── legal/page.tsx      # Legal — Privacy Policy + Terms of Use
│   ├── sitemap.ts          # Auto-generated XML sitemap
│   └── globals.css         # Global styles, Tailwind base, custom animation keyframes
│
├── components/
│   ├── Navbar.tsx          # Fixed top nav, scroll-aware bg, mobile hamburger menu
│   ├── Footer.tsx          # 3-column footer: About / Nav links / Contact
│   ├── AppCard.tsx         # Card for a single app — name, description, category, Play Store link
│   ├── LiquidLightBackground.tsx  # PRIMARY background — animated liquid light blobs, mouse parallax
│   ├── AnimatedBackground.tsx     # Alternative background (not currently used)
│   ├── GradientBackground.tsx     # Canvas-based gradient (not currently used)
│   └── ui/                 # shadcn/ui primitives: button, dialog, input, sonner
│
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│
├── public/                 # Static assets — favicons, manifests, sitemap.xml, robots.txt
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Published Apps (currently on site)

| App | Category | Play Store |
|-----|----------|-----------|
| Minor Challenges | Focus & Productivity | [link](https://play.google.com/store/apps/details?id=com.minor.challenges) |
| Minor Builds: Habit Tracker | Habits & Productivity | [link](https://play.google.com/store/apps/details?id=com.minorbuilds.app) |

A third app slot ("Expense AI") is commented out in `apps/page.tsx` — not yet launched.

---

## What Is Fully Completed

- [x] Home page with hero section and animated background
- [x] About page with developer bio and social links
- [x] Apps page showcasing 2 published apps
- [x] Legal page (Privacy Policy + Terms of Use)
- [x] Navbar (desktop + mobile responsive with hamburger)
- [x] Footer (3-column layout with all links)
- [x] AppCard component
- [x] LiquidLightBackground (liquid blob animations + mouse parallax)
- [x] Framer Motion animations on all pages
- [x] SEO: metadata, Open Graph, Twitter cards, canonical URLs, JSON-LD schema
- [x] Sitemap (auto-generated via `sitemap.ts` + static `sitemap.xml`)
- [x] `robots.txt` configured
- [x] PWA manifest + icons (all sizes)
- [x] Analytics: Google Tag Manager + GA4 integrated in layout
- [x] Vercel Speed Insights integrated
- [x] Vercel deployment configured

---

## What Is NOT Done / Incomplete

- [ ] Google Search Console verification — placeholder `'your-google-verification-code'` still in `layout.tsx` metadata
- [ ] Supabase not connected — package installed but zero usage in code
- [ ] No contact form — only a mailto link exists
- [ ] No blog or case studies for individual apps
- [ ] Social links on About page are limited (YouTube/Instagram commented out — no accounts yet)
- [ ] Twitter/X schema references `@minordevstudios` but unclear if that account is active
- [ ] Expense AI app slot commented out, waiting for that app to launch

---

## Next Goals

> Updated at the start of each session. See STATUS.md for session-specific tracking and ROADMAP.md for full feature backlog.

### Goal 1: Build Contact Form with Supabase Backend (Phase 2)
**What:** Replace mailto link with functional contact form. Collect visitor inquiries in Supabase, send confirmation email, store for follow-up.
**Progress:** 0%
**Notes:** Requires Supabase connection, email service integration (Resend/SendGrid), form validation with zod/react-hook-form

### Goal 2: Fix Google Search Console Verification (CRITICAL)
**What:** Replace placeholder verification code in `layout.tsx:71` with real code from Google Search Console. Verify site is being properly indexed.
**Progress:** 0%
**Notes:** Without this, search indexing may be incomplete. Needs GSC account access and real verification string.

---

## Session Progress Log

> Append a new entry at the end of each session summarizing what was done.

| Date | What was done |
|------|--------------|
| 2026-03-18 (Morning) | Initial CLAUDE.md files created. Full project audit complete. Project is production-ready with 2 published apps live. |
| 2026-03-18 (Afternoon) | Renamed MD files for clarity. Created STATUS.md (session tracking), ROADMAP.md (feature backlog), ISSUES.md (bugs/tech debt). Updated Next Goals in CLAUDE.md with real priorities. |

---

## Code Conventions

- **All interactive components** use `'use client'` directive at the top
- **Animations:** Always use Framer Motion — `motion.div`, `whileHover`, `whileTap`, `initial/animate/transition`
- **Standard easing:** `ease: [0.22, 1, 0.36, 1]` used consistently across all page animations
- **Standard entrance:** `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}`
- **Staggered children:** Use `delay: 0.3 + index * 0.15` pattern
- **Colors:** Dark theme only — `bg-black`, `text-white`, `text-neutral-300/400`, `border-white/10`
- **Glass effect:** `bg-white/5 backdrop-blur-sm border border-white/10` for cards/overlays
- **Class merging:** Always use `cn()` from `@/lib/utils` when combining Tailwind classes
- **Imports:** Use `@/` path alias (maps to project root)
- **Font weights:** Keep text `font-light` (300) as the default — only go heavier for emphasis

## Important Notes

- **Background:** Only `LiquidLightBackground` is used. `AnimatedBackground` and `GradientBackground` are unused alternatives kept for reference.
- **Inter font** loaded with weights 300/400/500/600 — don't add new weights without a reason.
- **`@supabase/supabase-js`** is installed — if a database feature is added (e.g. contact form, newsletter), Supabase is the intended backend.
- **No `.env` file** in repo — environment variable `NEXT_PUBLIC_SITE_URL` is set in Vercel dashboard.
- **Google verification** in `layout.tsx` line 71 is still a placeholder — needs real code from Search Console.
