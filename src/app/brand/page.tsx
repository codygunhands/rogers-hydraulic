import type { Metadata } from "next";
import Image from "next/image";
import { LogoTextLockup } from "@/components/LogoTextLockup";
import { CouplingBadge, type BadgeVariant } from "@/components/brand/CouplingBadge";
import { CopyHex } from "@/components/brand/CopyHex";
import { colors } from "@/config/brand";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Brand Guidelines",
  description: "Internal brand system reference for Rogers Hydraulic & Equipment Services.",
  robots: { index: false, follow: false },
};

/* ---- data ---------------------------------------------------------- */

const PALETTE: { name: string; hex: string; role: string; text: "dark" | "light" }[] = [
  { name: "Graphite", hex: colors.graphite, role: "Primary dark — page, trucks, uniforms", text: "light" },
  { name: "Graphite 900", hex: colors.graphite900, role: "Deepest plate / near-black", text: "light" },
  { name: "Graphite 700", hex: colors.graphite700, role: "Raised surface / card", text: "light" },
  { name: "Graphite 600", hex: colors.graphite600, role: "Border on dark", text: "light" },
  { name: "Hi-Vis Lime", hex: colors.hivis, role: "LEAD accent — CTAs, stripes, icon strokes (sparingly)", text: "dark" },
  { name: "Hi-Vis Lime Dark", hex: colors.hivisDark, role: "Lime hover / pressed", text: "dark" },
  { name: "Signal Amber", hex: colors.amber, role: "SECONDARY — caution / warning / after-hours", text: "dark" },
  { name: "White Smoke", hex: colors.smoke, role: "Light background / text on dark", text: "dark" },
  { name: "Steel", hex: colors.steel, role: "Muted labels (use lighter on dark)", text: "light" },
];

const BADGE_VARIANTS: { variant: BadgeVariant; label: string; bg: string }[] = [
  { variant: "dark", label: "badge-dark", bg: "#1E2329" },
  { variant: "light", label: "badge-light", bg: "#F4F4F1" },
  { variant: "mono-white", label: "badge-mono-white", bg: "#1E2329" },
  { variant: "mono-black", label: "badge-mono-black", bg: "#F4F4F1" },
  { variant: "lime", label: "badge-lime", bg: "#1E2329" },
];

const LOGO_FILES = [
  "lockup-horizontal-dark",
  "lockup-horizontal-light",
  "lockup-stacked-dark",
  "lockup-stacked-light",
  "wordmark-dark",
  "wordmark-light",
  "lockup-mono-black",
  "lockup-mono-white",
  "badge-dark",
  "badge-light",
  "badge-mono-black",
  "badge-mono-white",
  "badge-lime",
];

const DO = [
  "Simple coupling / line geometry",
  "Thick strokes, sharp corners",
  "Giant, readable phone number",
  "Graphite + lime, high contrast",
  "Lots of clear space around the mark",
];
const DONT = [
  "Shields, crests, or badges-as-emblems",
  "Texas outline, stars, or flags",
  "Crossed wrenches or gear clip-art",
  "Mascots, cowboy / western styling",
  "Chrome bevels or distressed sports fonts",
];

const TAGLINES = [
  { line: "On-Site. After Hours. Back to Work.", use: "Master tagline" },
  { line: "Mobile Hydraulic & Equipment Repair.", use: "Most descriptive" },
  { line: "When It's Down, We Roll.", use: "Truck-side line" },
  { line: "Emergency Hose & Equipment Service.", use: "Service headers / ads" },
];

/* ---- local presentational helpers ---------------------------------- */

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-graphite-600 py-14">
      <div className="container-x">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-stencil text-smoke md:text-4xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/* ---- page ---------------------------------------------------------- */

export default function BrandPage() {
  return (
    <main className="bg-plate min-h-dvh pb-20">
      {/* Header band */}
      <header className="border-b border-graphite-600 bg-graphite-900">
        <div className="container-x flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <LogoTextLockup layout="stacked" theme="dark" size={56} withTagline />
          <div className="max-w-sm">
            <p className="eyebrow">Internal reference</p>
            <h1 className="mt-2 text-4xl font-extrabold uppercase leading-none tracking-stencil text-smoke">
              Brand Guidelines
            </h1>
            <p className="mt-4 font-body text-sm leading-relaxed text-steel">
              The identity system for {business.businessName}. Industrial minimalism —
              a mark that belongs on a black service truck, a hi-vis vest, a hose bin,
              and an invoice. Not a sports team, not western, not an oilfield knock-off.
            </p>
          </div>
        </div>
      </header>

      {/* Logo lockups (live) */}
      <Section eyebrow="Logo" title="Lockups">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex min-h-[180px] items-center justify-center rounded-md border border-graphite-600 bg-graphite-900 p-8">
            <LogoTextLockup layout="horizontal" theme="dark" size={52} />
          </div>
          <div className="flex min-h-[180px] items-center justify-center rounded-md border border-graphite-500 bg-smoke p-8">
            <LogoTextLockup layout="horizontal" theme="light" size={52} />
          </div>
          <div className="flex min-h-[220px] items-center justify-center rounded-md border border-graphite-600 bg-graphite-900 p-8">
            <LogoTextLockup layout="stacked" theme="dark" size={48} />
          </div>
          <div className="flex min-h-[220px] items-center justify-center rounded-md border border-graphite-500 bg-smoke p-8">
            <LogoTextLockup layout="stacked" theme="light" size={48} />
          </div>
        </div>
        <p className="mt-4 font-body text-sm text-steel">
          Live components (Barlow Condensed via <code className="text-smoke">next/font</code>).
          The wordmark is real text; the badge is vector. Minimum clear space = the height
          of the coupling badge on all sides.
        </p>
      </Section>

      {/* Badge */}
      <Section eyebrow="Symbol" title="Coupling Badge">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {BADGE_VARIANTS.map((b) => (
            <div key={b.label} className="overflow-hidden rounded-md border border-graphite-600">
              <div className="flex items-center justify-center p-8" style={{ background: b.bg }}>
                <CouplingBadge variant={b.variant} size={84} title={`Rogers Hydraulic badge — ${b.label}`} />
              </div>
              <div className="bg-graphite-900 px-3 py-2 font-body text-xs text-steel">{b.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-steel">
          A blocky stencil <span className="text-smoke">R</span> whose leg terminates in a hex
          hydraulic coupling nut. Font-independent vector — identical from a 16px favicon to a
          truck door. Doubles as the favicon and app icon.
        </p>
      </Section>

      {/* Colors */}
      <Section eyebrow="Color" title="Palette">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PALETTE.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-md border border-graphite-600">
              <div
                className="flex h-24 items-end justify-between p-3"
                style={{ background: c.hex, color: c.text === "dark" ? "#1E2329" : "#F4F4F1" }}
              >
                <span className="font-heading text-lg font-bold uppercase">{c.name}</span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-graphite-900 p-3">
                <span className="font-body text-xs leading-snug text-steel">{c.role}</span>
                <CopyHex hex={c.hex} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section eyebrow="Type" title="Typography">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-md border border-graphite-600 bg-graphite-900 p-8">
            <p className="eyebrow">Display / Headings</p>
            <p className="mt-2 font-body text-sm text-steel">Barlow Condensed — 600 / 700 / 800, uppercase</p>
            <p className="mt-6 font-heading text-6xl font-extrabold uppercase leading-none text-smoke">
              Equipment
            </p>
            <p className="font-heading text-6xl font-extrabold uppercase leading-none text-hivis">Down?</p>
            <p className="mt-4 font-heading text-2xl font-semibold uppercase tracking-widest text-steel">
              Mobile Hose Repair
            </p>
          </div>
          <div className="rounded-md border border-graphite-600 bg-graphite-900 p-8">
            <p className="eyebrow">Body / UI</p>
            <p className="mt-2 font-body text-sm text-steel">Inter — 400 / 500 / 600 / 700</p>
            <p className="mt-6 font-body text-lg leading-relaxed text-smoke">
              A failed hydraulic hose, leaking cylinder, or disabled machine can stop a job and
              strand a crew. Rogers brings practical field repair directly to the site.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-steel">
              Direct. Practical. No fluff. No premium-for-premium's-sake, no corporate filler,
              no exaggerated claims. Availability varies by call volume, access, and parts.
            </p>
          </div>
        </div>
      </Section>

      {/* Do / Don't */}
      <Section eyebrow="Rules" title="Iconography Do & Don't">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border-l-4 border-hivis bg-graphite-900 p-6">
            <h3 className="font-heading text-xl font-bold uppercase text-hivis">Do</h3>
            <ul className="mt-4 space-y-2">
              {DO.map((d) => (
                <li key={d} className="font-body text-sm text-smoke">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border-l-4 border-amber bg-graphite-900 p-6">
            <h3 className="font-heading text-xl font-bold uppercase text-amber">Don&apos;t</h3>
            <ul className="mt-4 space-y-2">
              {DONT.map((d) => (
                <li key={d} className="font-body text-sm text-steel">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Voice & taglines */}
      <Section eyebrow="Voice" title="Taglines">
        <div className="grid gap-4 sm:grid-cols-2">
          {TAGLINES.map((t) => (
            <div key={t.line} className="rounded-md border border-graphite-600 bg-graphite-900 p-6">
              <p className="font-heading text-2xl font-bold uppercase leading-tight text-smoke">
                {t.line}
              </p>
              <p className="mt-2 font-body text-xs uppercase tracking-widest text-steel">{t.use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Livery rules (text — real truck photo to come later) */}
      <Section eyebrow="Application" title="Vehicle Livery Rules">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-md border border-graphite-600 bg-graphite-900 p-6 font-body text-sm leading-relaxed text-smoke">
            <p className="text-steel">Keep driver-side and passenger-side layout brutally simple:</p>
            <div className="mt-4 space-y-1">
              <p className="font-heading text-2xl font-extrabold uppercase text-smoke">Rogers Hydraulic</p>
              <p className="font-heading text-sm uppercase tracking-widest text-steel">
                Equipment Service · Mobile Hose · After Hours
              </p>
              <p className="mt-3 font-heading text-3xl font-extrabold text-hivis">{business.phone}</p>
              <p className="text-steel">Serving Madison &amp; Brazos Counties</p>
            </div>
          </div>
          <ul className="space-y-3 rounded-md border border-graphite-600 bg-graphite-900 p-6 font-body text-sm text-steel">
            <li>Oversized, high-contrast lettering. Visibility beats completeness.</li>
            <li>Do not clutter the truck with a long service menu.</li>
            <li>Lime used sparingly — accent lines and the phone block only.</li>
            <li>Black truck / black enclosed trailer as the field.</li>
            <li className="text-smoke">A real photo of the truck will replace this layout guide later.</li>
          </ul>
        </div>
      </Section>

      {/* Downloads */}
      <Section eyebrow="Assets" title="Downloads">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOGO_FILES.map((f) => (
            <a
              key={f}
              href={`/brand/logo/${f}.svg`}
              download
              className="flex items-center justify-between rounded-sm border border-graphite-600 bg-graphite-900 px-4 py-3 font-body text-sm text-smoke transition-colors hover:border-hivis hover:text-hivis"
            >
              <span>{f}.svg</span>
              <span aria-hidden className="text-steel">↓</span>
            </a>
          ))}
          <a
            href="/brand/tokens.json"
            download
            className="flex items-center justify-between rounded-sm border border-graphite-600 bg-graphite-900 px-4 py-3 font-body text-sm text-smoke transition-colors hover:border-hivis hover:text-hivis"
          >
            <span>tokens.json</span>
            <span aria-hidden className="text-steel">↓</span>
          </a>
          <a
            href="/og/og-default.png"
            download
            className="flex items-center justify-between rounded-sm border border-graphite-600 bg-graphite-900 px-4 py-3 font-body text-sm text-smoke transition-colors hover:border-hivis hover:text-hivis"
          >
            <span>og-default.png</span>
            <span aria-hidden className="text-steel">↓</span>
          </a>
        </div>

        {/* Preview of the social card */}
        <div className="mt-8 overflow-hidden rounded-md border border-graphite-600">
          <Image
            src="/og/og-default.png"
            alt="Social share card preview"
            width={1200}
            height={630}
            className="h-auto w-full"
          />
        </div>
      </Section>
    </main>
  );
}
