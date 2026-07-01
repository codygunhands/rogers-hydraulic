# Rogers Hydraulic & Equipment Services — Website

Production marketing site for a mobile hydraulic hose repair / equipment field-service
business in the Madison–Brazos corridor of East Texas. Built to generate phone calls and
service requests.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · zod. Static-first, fast,
accessible, with local SEO, structured data (JSON-LD), a sitemap, robots, and an `llms.txt`
for AI search (GEO).

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm run brand:svg  # regenerate logo/OG SVGs (outlined) into public/
npm run brand:icons# regenerate PNG app icons + favicon.ico + og-default.png
```

---

## Everything Dylan needs to replace

All placeholders live in **`src/config/business.ts`** — change them there and they update
site-wide (header, footer, metadata, JSON-LD, `llms.txt`, forms). Search the repo for
`REPLACE`.

| Value | Current placeholder | Where |
|---|---|---|
| Phone (display) | `936-000-0000` | `business.phone` |
| Phone (tel link) | `tel:+19360000000` | `business.phoneHref` |
| Email | `service@rogershydraulic.com` | `business.email` |
| Domain / base URL | `rogershydraulic.com` | `business.domain`, `business.baseUrl` |
| Google Business Profile | *(empty)* | `business.googleBusinessUrl` |
| Social links | *(empty)* | `business.socialLinks` |
| Street address | *(none — omitted from schema)* | `business.address` (leave `null` if service-area only) |
| Licensed & insured claim | `false` | `business.flags.licensedAndInsured` (only set `true` if true) |

**Analytics/tracking** are off until you set env vars (nothing is hardcoded):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION=xxxx        # Search Console meta verification
NEXT_PUBLIC_META_PIXEL_ID=xxxx           # optional
NEXT_PUBLIC_CALL_TRACKING_NUMBER=936-... # optional display override
```

**Lead delivery (the contact / request forms):** the API route
`src/app/api/request-service/route.ts` validates and returns success, with a clearly marked
`TODO` to drop in an email provider (Resend / SendGrid / SMTP). Add the provider key and the
two lines shown in the file, and leads start arriving by email. Until then, requests succeed
for the user and are logged server-side.

---

## Brand system

- Live reference + downloads: **`/brand`** (noindex).
- Tokens: `src/config/brand.ts` + `public/brand/tokens.json`. One-page guide: `BRAND.md`.
- Logo components: `src/components/LogoTextLockup.tsx`, `src/components/brand/CouplingBadge.tsx`.
- Standalone logo files (outlined, portable): `public/brand/logo/*.svg`.

---

## Deploy — DigitalOcean App Platform

The app spec is in **`.do/app.yaml`** (Node service, `basic-xxs`, port 8080).

```bash
# first deploy
doctl apps create --spec .do/app.yaml

# subsequent deploys (after pushing to the repo)
doctl apps list                                  # get the app id
doctl apps create-deployment <APP_ID>
```

The default URL is `https://<app>.ondigitalocean.app`. To use `rogershydraulic.com`, add it
as a domain in the App Platform dashboard and point DNS, then update `business.baseUrl`.

> Also deployable to Vercel (`vercel --prod`) with zero config if preferred.

---

## Post-launch checklist

1. Replace the config values above (phone, email, domain).
2. Wire lead email delivery in `api/request-service/route.ts`.
3. Create the **Google Business Profile**, add `googleBusinessUrl`, and get reviews (do not
   fabricate any).
4. Add the site to **Google Search Console**, set `NEXT_PUBLIC_GSC_VERIFICATION`, submit
   `/sitemap.xml`.
5. Add **Google Analytics** (`NEXT_PUBLIC_GA_ID`).
6. Point the custom domain and update `business.baseUrl`.
