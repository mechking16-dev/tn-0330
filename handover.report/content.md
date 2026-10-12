# TN Footwear — demo handover

**Ready for presentation, not an authorised public launch.** The website uses actual imagery from TN Footwear's public TikTok catalogue, with reuse authorised by you in this conversation. Product labels, prices and size ranges remain illustrative. A forest-green, charcoal and off-white identity is your approved proposal—not a verified TN brand palette.

## Open and demonstrate

The website is running at **http://localhost:4200/** inside the development sandbox. Use the Runable website preview on your laptop or phone; your phone's own localhost does not point to this sandbox.

From the project root `/home/user/tn-footwear`:

```bash
bun run dev --host 0.0.0.0
```

The port is fixed by `__ports.cjs` at 4200. On a laptop with a local copy of the project, install with `bun install`, run the command above, and open `http://<laptop-LAN-IP>:4200/` on a phone on the same network. Allow port 4200 through the laptop firewall if needed. This sandbox is not on your home Wi-Fi, so its LAN address is not a phone-access route. Publishing and domains are handled through Runable's website UI.

Suggested walkthrough: hero → collection → Retro runners filter → reset → open a pair → select EU size → enquiry preview → copy draft → store details. No message is sent by the demo.

## Research and identity

Research date: **12 October 2026**.

- [TN TikTok profile](https://www.tiktok.com/@tnfootwear0), opened in the browser, lists iLanga Mall Shop 55, 8th Avenue / Jason Moyo and Washington at +263715088283.
- [September 26 post](https://www.tiktok.com/@tnfootwear0/video/7689756349407726849) repeats the new address and lists +263781787619, +263781772948 and +263715088283. Public profile and posts are corroborating sources from the same account, not independent verification of ownership.
- Earlier public posts point to AutoQuip Building Shop 64. The relocation posts explain the discrepancy. The demo uses the iLanga address with owner confirmation pending.
- [Facebook page](https://www.facebook.com/p/TN-Footwear-61575800916500/) and [Instagram profile](https://www.instagram.com/tn.foot.wear/) were found in search, but their pages required login. They were not inspected for logo/photo detail.
- The opened TikTok profile picture shows shoes beside a Puma box. It is **not a TN logo**. Green cannot responsibly be called TN's brand colour merely because it appears on that manufacturer box.
- Approved proposed palette: forest **#285943**, off-white **#F5F3EE**, charcoal **#171717**. The typography-only TN FOOTWEAR wordmark and favicon are provisional. Barlow Condensed is used for headlines and system Arial for body text.

## Image and product provenance

All shipped photos are local WebP files. No remote social-media CDN URLs are required to render the catalogue. Some are public video covers and some are extracted frames, so sharpness and composition vary. Cropping preserves the products; no authenticity is asserted. Owner-supplied studio photos would improve the paid launch.

| Demo label | Demo USD | Image source | Notes |
|---|---:|---|---|
| The Everyday Low | 16 | [Public post](https://www.tiktok.com/@tnfootwear0/video/7695838059018915092) | Handheld white sneaker cover; also hero image |
| The Terrace Classic | 20 | [Public post](https://www.tiktok.com/@tnfootwear0/video/7695425620842499348) | White/charcoal pair |
| The Silver Runner | 25 | [Public post](https://www.tiktok.com/@tnfootwear0/video/7692371866320669972) | Silver mesh sneaker cover |
| The Pink Rope Low | 25 | [Public post](https://www.tiktok.com/@tnfootwear0/video/7689756349407726849) | Frame showing pink rope-laced pair |
| The Forest Runner | 28 | [Public post](https://www.tiktok.com/@tnfootwear0/video/7686419770866027797) | Frame showing green running-style pair |
| The Blue Stripe Low | 20 | [Public post](https://www.tiktok.com/@tnfootwear0/video/7695307689496268052) | On-foot pale-blue/white pair |

These are generic descriptive demo labels, not official product titles. Some numerical price examples match seller captions, but none is represented as a current confirmed price. All size ranges are examples, all stock statuses unknown, all product verification flags illustrative. Categories are proposed groupings of displayed styles; there are no misleading empty formal-shoe categories.

## Configuration and files

Fresh managed template; no existing user project replaced. Bun, React 19, TypeScript, Vite and Wouter. No new dependencies, custom backend routes, database schema, checkout, payment or login features. Template infrastructure and platform analytics are retained.

Created/modified implementation files:

- `design.md` — approved palette, identity, layout and interaction principles.
- `task.md` — work log and verification notes.
- `packages/web/src/web/pages/catalogue.tsx` — hero, catalogue, filters/search/sort, menu, about/contact and native product/enquiry dialog.
- `packages/web/src/web/pages/index.tsx` — composition-only home-page export.
- `packages/web/src/web/data/config.ts` — central demo, branding, contact, map and canonical controls.
- `packages/web/src/web/data/products.ts` — six products, SKUs, demo sizes/prices, source links and stock status.
- `packages/web/src/web/lib/enquiry.ts` — message construction, confirmation gate, destination validation and URL encoding.
- `packages/web/src/web/styles.css` — responsive styling, focus and reduced-motion behaviour.
- `packages/web/index.html` — title, metadata, theme, font preload and demo noindex directive.
- `packages/web/public/favicon.svg` — provisional TN mark.
- `packages/web/public/fonts/barlow-condensed-bold.ttf` — self-hosted display font.
- `packages/web/public/images/` — `hero.webp`, `court-white.webp`, `terrace-white.webp`, `silver-runner.webp`, `rope-pink.webp`, `forest-runner.webp`, `terrace-blue.webp`.
- `tests/browser-check.py`, `tests/browser-results.json`, `tests/browser-run.log` — reproducible browser checks and actual results.
- `handover.report/content.md` — this handover.

Package licence spot-check: React, React DOM, Vite, Hono, Tailwind and TanStack Query MIT; Wouter Unlicense; Lucide ISC. This is not a full transitive legal audit. Barlow is distributed under the SIL Open Font License; retain its licence with the font. Photo reuse is based on your stated permission, not an independently checked ownership contract.

### Enquiry activation

`config.ts` keeps `whatsappNumber` empty and `contactConfirmed: false`. Until confirmed, buttons open a visible draft and no `wa.me` link is created. After owner approval, set a digits-only international destination and set confirmation true. The helper accepts 8–15 digits, rejects leading zero, letters, plus signs and punctuation, and encodes the complete message. A WhatsApp click is never treated as a confirmed order.

`demoMode` controls the global demo notice. It does not automatically make illustrative data verified. Replace/approve data before disabling demo notices. Product-level demo labels remain visible until the UI and verified production dataset are reviewed. `logoApproved` controls the provisional-identity footer label. Leave `canonicalUrl` empty until a real approved domain exists.

## Actual test report

| Check | Result |
|---|---|
| `bun run build` | PASS |
| `bun run lint` | PASS, zero errors/warnings |
| `bun run typecheck` | PASS for all template packages |
| Chrome browser widths 360, 390, 430, 1366px | PASS: no horizontal overflow, six cards, all seven catalogue/hero images load |
| Categories and reset | PASS: two styles in each proposed category; reset returns six |
| Search and empty-state reset | PASS |
| Price sort | PASS: descending starts at $28 |
| Product preview / selected size | PASS: EU 42 and TN-DEMO-01 included in draft |
| Unconfigured WhatsApp | PASS: clear no-message notice; zero live `wa.me` links |
| Destination validation / URL encoding | PASS: rejects invalid/unconfirmed numbers; exact message round-trip |
| Navigation | PASS: home/shop/about/contact targets exist; mobile Shop closes menu; Escape closes menu/dialog |
| Browser runtime errors | None captured |
| Production claims | No ratings, testimonials, authenticity assertions, live-stock or order-confirmation claims added |

Lighthouse was **not run**, so no score is claimed. Vite reports a bundle-size warning: main JavaScript approximately **513 KB minified / 158 KB gzip** including managed runtime/provider infrastructure. CSS is about **29 KB / 6.9 KB gzip**. Build succeeds; no paid runtime API is needed for this catalogue. Platform analytics remains enabled as required by the template. Browser checks were local Chrome tests, not a physical-device or Zimbabwe mobile-network benchmark.

## Remaining launch work and scope

Unconfirmed: official logo and brand preferences, phone ownership/WhatsApp activation, current address, opening hours, exact product titles/brands/authenticity, stock, size systems, prices, photo rights scope, production domain, business approval of website copy.

This demo is catalogue browsing and enquiry preparation only. A lean paid production conversion is estimated at **2–4 implementation days after receiving approved assets/data**, covering brand/content replacement, 6–8 verified products, owner-confirmed WhatsApp, contact details, domain/metadata configuration, performance/accessibility review and device QA. This is an indicative scope, not a quote or a delivery commitment. Additional catalogue volume/content cleanup may extend it. Launch should include measured Lighthouse/network testing and written sign-off. Cart, online payments, inventory sync, accounts, admin and delivery management are separate projects.
