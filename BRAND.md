# Rogers Hydraulic & Equipment Services — Brand Guidelines

One-page reference. The live version (with downloads) is at `/brand`.
All tokens live in [`src/config/brand.ts`](src/config/brand.ts); the portable
export is [`public/brand/tokens.json`](public/brand/tokens.json).

---

## Positioning

The local field-service specialist for hydraulic hose and equipment downtime.
It should feel like a serious industrial field-service operator — a mark that
belongs on a black service truck, an enclosed trailer, a hi-vis vest, a hose
bin, and an invoice.

**Not:** a sports team, western/rustic, patriotic, or fake-oilfield brand.

- **Core promise:** On-Site. After Hours. Back to Work.
- **Hero:** Blown Hydraulic Hose? We Come To You.

---

## Name usage

| Context | Form |
|---|---|
| Legal | Rogers Hydraulic & Equipment Services, LLC |
| Formal / footer | Rogers Hydraulic & Equipment Services |
| Display lockup | **ROGERS HYDRAULIC** (large) / EQUIPMENT SERVICES (secondary) |
| Short | Rogers Hydraulic |

---

## Logo

- **System:** stencil-block wordmark + hose-coupling monogram badge.
- **Badge:** a blocky stencil **R** whose leg ends in a hex hydraulic coupling
  nut. Font-independent vector; doubles as favicon and app icon.
- **Components:** `src/components/LogoTextLockup.tsx`, `src/components/brand/CouplingBadge.tsx`.
- **Files:** `public/brand/logo/*.svg` (outlined — no font dependency; safe to
  hand to a sign shop). Regenerate with `npm run brand:svg`.
- **Clear space:** minimum = the height of the coupling badge on all sides.
- **Minimum size:** badge reads down to 16px (favicon).

---

## Color

| Role | Name | Hex |
|---|---|---|
| Base | Graphite | `#1E2329` |
| Deep plate | Graphite 900 | `#14181C` |
| **Lead accent** | **Hi-Vis Lime** | `#D3FF00` |
| Lime pressed | Hi-Vis Lime Dark | `#B8E000` |
| Secondary accent | Signal Amber | `#F79A1B` |
| Light neutral | White Smoke | `#F4F4F1` |
| Muted | Steel | `#6B7280` |

Lime is the lead accent but is used **sparingly** — CTAs, truck stripes, icon
strokes, emergency callouts. Amber is for caution / after-hours only. On dark
backgrounds, use a lighter steel (`#AEB6BF`) for small secondary text so it stays
legible.

---

## Typography

- **Display / headings:** Barlow Condensed (600 / 700 / 800), UPPERCASE for
  display. Fallback: Oswald.
- **Body / UI:** Inter (400–700).
- **Numerals** (phone): same condensed family — critical for truck read distance.

Wired via `next/font` in `src/app/layout.tsx` (`--font-barlow`, `--font-inter`).

---

## Iconography — do / don't

**Do:** simple coupling/line geometry · thick strokes, sharp corners · giant
readable phone number · graphite + lime, high contrast · generous clear space.

**Don't:** shields/crests/emblems · Texas outline, stars, flags · crossed
wrenches or gear clip-art · mascots or cowboy/western styling · chrome bevels or
distressed sports fonts.

---

## Voice

Direct. Practical. No fluff. No "premium solutions," no corporate filler, no
exaggerated claims. Say: mobile, on-site, after-hours, equipment, hose, dispatch,
uptime, field repair. Use "availability varies" where honest.

**Taglines:** On-Site. After Hours. Back to Work. (master) · Mobile Hydraulic &
Equipment Repair. · When It's Down, We Roll. · Emergency Hose & Equipment Service.

---

## Vehicle livery rules (layout only)

Keep both sides brutally simple. Oversized, high-contrast lettering; visibility
beats completeness. Do not clutter with a long service menu.

```
ROGERS HYDRAULIC
Equipment Service · Mobile Hose · After Hours
[PHONE]
Serving Madison & Brazos Counties
```

Black truck / black enclosed trailer as the field; lime only on accent lines and
the phone block. (A real photo of the truck will replace this layout guide later.)

---

## Regenerating assets

```bash
npm run brand:svg     # logo SVGs + favicon.svg + og-default.svg (outlined)
npm run brand:icons   # PNG app icons, favicon.ico, og-default.png
```
Geometry source of truth: `scripts/generate-brand-svgs.mjs` (keep in sync with
`CouplingBadge.tsx`). Barlow TTFs for outlining live in `scripts/fonts/`.
