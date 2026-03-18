# Known Issues & Tech Debt — Minor Devs Studios Website

> Bugs, incomplete work, and technical debt that should be tracked. **Not critical to fix immediately, but should be aware.**

---

## 🔴 Critical (Blocks Features)

| Issue | Impact | Cause | Fix |
|-------|--------|-------|-----|
| **Google Search Console not verified** | Site not properly indexed in Google | Placeholder verification code in `layout.tsx:71` | Get real code from Search Console, update metadata |
| **Supabase not connected** | Can't build contact form, email features | Package installed but zero integration | Connect when building Phase 2 features (ROADMAP.md) |

---

## 🟡 Medium (Should Fix Soon)

| Issue | Impact | Cause | Fix |
|-------|--------|-------|-----|
| **Contact form missing** | No way to collect inquiries except mailto | Was deferred for MVP | Build form with Supabase (Phase 2) |
| **Email newsletter not set up** | Can't build subscriber list | No backend yet | Set up email service (Supabase + Resend/SendGrid) |
| **Social links incomplete** | YouTube/Instagram commented out | No accounts created yet | Set up accounts OR remove links entirely |

---

## 🟢 Low (Nice to Have)

| Issue | Impact | Cause | Fix |
|-------|--------|-------|-----|
| **AnimatedBackground unused** | Code bloat | Created as alternative, not needed | Can delete or keep as reference |
| **GradientBackground unused** | Code bloat | Created as alternative, not needed | Can delete or keep as reference |
| **Twitter/X schema mentions `@minordevstudios`** | Unclear if account exists | Schema added but account status unknown | Verify account exists OR update/remove schema |
| **Expense AI app commented out** | App slot empty | Third app not yet launched | Add when app is ready OR remove placeholder |

---

## 📝 Code Quality Observations

- **No breaking issues found** — codebase is clean and well-structured
- **Linting** — runs fine (`npm run lint`)
- **TypeScript** — no type errors (`npm run typecheck`)
- **Performance** — Vercel Speed Insights integrated, no reported slowness

---

## Accessibility Notes

- [x] Dark theme respects user preferences (`prefers-color-scheme`)
- [x] LiquidLightBackground respects `prefers-reduced-motion`
- [x] Focus states on buttons and links
- [ ] Should test with screen reader (NVDA/JAWS) on full site
- [ ] Should verify color contrast ratios on all text (looks good, but should audit)

---

## SEO Checklist

- [x] Meta titles & descriptions
- [x] Open Graph tags
- [x] Twitter cards
- [x] Canonical URLs
- [x] JSON-LD schema (with Twitter/X mention that needs verification)
- [x] Sitemap (both generated + static)
- [x] robots.txt
- [ ] Google Search Console verification (CRITICAL — see above)
- [ ] Bing Webmaster Tools (optional but good for coverage)

---

## Testing Checklist

- [ ] **Mobile testing** — iPhone, Android (current UI works but should verify on real devices)
- [ ] **Browser testing** — Chrome, Firefox, Safari (likely fine, but worth checking)
- [ ] **Accessibility** — Screen reader testing, keyboard navigation
- [ ] **Performance** — Lighthouse score (check on Vercel Analytics)
- [ ] **Link checking** — All Play Store links, GitHub links, email, etc. working

---

## Next Steps

1. **Critical first:** Fix Google Search Console verification
2. **Then:** Review git status and commit pending changes
3. **Then:** Start Phase 2 (ROADMAP.md) — contact form + email
4. **Optional:** Clean up unused components (AnimatedBackground, GradientBackground)
