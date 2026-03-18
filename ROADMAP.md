# Feature Roadmap — Minor Devs Studios Website

> Prioritized backlog of features to build. **Tied to real business goals for the studio.**

---

## Phase 1: Foundation (✓ COMPLETE)

All items below are **done** and live on minordevstudios.com:

- [x] Home page with hero + CTA buttons
- [x] About page with bio + GitHub link
- [x] Apps showcase page with 2 apps (Minor Challenges, Minor Builds)
- [x] Legal page (Privacy + Terms)
- [x] Navbar (desktop + mobile hamburger)
- [x] Footer with links + contact
- [x] SEO (metadata, OG tags, Twitter cards, JSON-LD, sitemap, robots.txt)
- [x] PWA manifest + app icons
- [x] Framer Motion animations throughout
- [x] Vercel deployment (auto-deploy on push)
- [x] Analytics (GTM + GA4)

**Why complete:** Studio needs a live, professional presence to showcase apps.

---

## Phase 2: Engagement & Contact (NEXT PRIORITY)

### Goal: Convert visitors → leads/subscribers

| Feature | Why | Effort | Priority | Status |
|---------|-----|--------|----------|--------|
| **Contact Form** | Replace mailto link; collect inquiries with Supabase | 🟡 Medium | 🔴 HIGH | Not started |
| **Email Capture** | Newsletter signup on home page (footer ready) | 🟡 Medium | 🟡 MEDIUM | Not started |
| **Live Chat / Support Link** | Quick way for users to reach out | 🟢 Small | 🟡 MEDIUM | Not started |

**Timeline:** Aim to ship contact form + email capture by end of next session.

---

## Phase 3: Social Proof & Case Studies (LATER)

### Goal: Build trust + show impact

| Feature | Why | Effort | Priority | Status |
|---------|-----|--------|----------|--------|
| **Blog / Articles** | Write about app building, productivity tips | 🟠 Large | 🟡 MEDIUM | Not started |
| **App Case Studies** | Deep dive: how I built Minor Challenges / Minor Builds | 🟠 Large | 🟡 MEDIUM | Not started |
| **Video / YouTube** | Demos, dev vlogs — build audience | 🟠 Large | 🟡 MEDIUM | Not started |
| **Social Links** | YouTube, Instagram, Twitter — once accounts exist | 🟢 Small | 🟡 MEDIUM | Partially done (GitHub only) |

**Timeline:** Phase 3 can wait — focus on direct contact + community first.

---

## Phase 4: Monetization & Expansion (FUTURE)

### Goal: Turn traffic into revenue (if applicable)

| Feature | Why | Effort | Priority | Status |
|---------|-----|--------|----------|--------|
| **Email Newsletter** | Share builds, updates, tips weekly | 🟡 Medium | 🔴 HIGH (after Phase 2) | Not started |
| **Affiliate Links** | Link to tools/apps the studio uses | 🟢 Small | 🟢 LOW | Not started |
| **Courses / Templates** | Sell small guides on app building (future) | 🟠 Large | 🟢 LOW | Not started |

**Timeline:** Consider after Phase 2 + Phase 3 are partially complete.

---

## Unblocked Items (Can Start Anytime)

- [ ] **Add Expense AI app** — waiting for app launch, but can create placeholder card now
- [ ] **Update social links** — add Twitter/X, YouTube, Instagram once accounts are set up
- [ ] **Improve mobile responsiveness** — test on more devices, refine tap targets
- [ ] **Accessibility audit** — test with screen readers, check WCAG compliance

---

## Blocked Items (Need Decision)

| Item | Blocker | Decision Needed |
|------|---------|-----------------|
| Google Search Console verification | Not yet set up | Get real verification code from GSC, add to layout.tsx metadata |
| Supabase backend | Package installed but unused | When building Phase 2 features (contact form, email capture) |
| YouTube / Instagram presence | Accounts don't exist yet | Decide if studio should have these; set up if yes |
| Expense AI showcase | App not yet launched | Plan: add placeholder or wait for launch before adding to site? |

---

## Notes for Next Session

- **Phase 2 is next** — start with contact form (Supabase + email integration)
- **Don't skip planning** — decide on Phase 2 approach before coding
- **Keep mobile-first** — all new features must work on phones
- **Animations matter** — use standard Framer Motion patterns from CLAUDE.md
- **Test in production** — Vercel auto-deploys, so test thoroughly before pushing
