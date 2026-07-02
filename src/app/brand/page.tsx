import type { Metadata } from "next";
import Image from "next/image";
import { LogoTextLockup } from "@/components/LogoTextLockup";
import { CopyHex } from "@/components/brand/CopyHex";
import { colors } from "@/config/brand";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Brand Guidelines",
  description: "Internal brand system reference for Rogers Hydraulic & Equipment Services.",
  robots: { index: false, follow: false },
};

const PALETTE: { name: string; hex: string; role: string; text: "dark" | "light" }[] = [
  { name: "Graphite", hex: colors.graphite, role: "Primary dark — page, trucks, uniforms", text: "light" },
  { name: "Graphite 900", hex: colors.graphite900, role: "Logo block / deepest plate", text: "light" },
  { name: "Graphite 700", hex: colors.graphite700, role: "Raised surface / card", text: "light" },
  { name: "Graphite 600", hex: colors.graphite600, role: "Border on dark", text: "light" },
  { name: "Hi-Vis Lime", hex: colors.hivis, role: "LEAD accent — logo keyline, CTAs, HYDRAULIC", text: "dark" },
  { name: "Hi-Vis Lime Dark", hex: colors.hivisDark, role: "Lime hover / pressed", text: "dark" },
  { name: "Signal Amber", hex: colors.amber, role: "SECONDARY — caution / after-hours", text: "dark" },
  { name: "White Smoke", hex: colors.smoke, role: "ROGERS / text on dark", text: "dark" },
  { name: "Steel", hex: colors.steel, role: "Muted labels", text: "light" },
];

const LOGO_FILES = [
  "logo-block-dark",
  "logo-block-light",
  "logo-mono-black",
  "logo-mono-white",
  "wordmark-dark",
  "icon-rh",
];

const DO = [
  "Wordmark knocked out of a solid graphite block",
  "Hi-vis lime keyline on the block",
  "Two-tone: ROGERS white, HYDRAULIC lime",
  "Oswald Bold wordmark, Oswald Regular sub-line",
  "Generous clear space around the block",
];
const DONT = [
  "No emblem / mascot / coupling icon",
  "No Texas outline, stars, or flags",
  "No red (that's the competitors' lane)",
  "No gradients, bevels, or drop shadows on the mark",
  "Don't stretch or recolor the block",
];

const TAGLINES = [
  { line: "On-Site. After Hours. Back to Work.", use: "Master tagline" },
  { line: "Mobile Hydraulic & Equipment Repair.", use: "Most descriptive" },
  { line: "When It's Down, We Roll.", use: "Truck-side line" },
  { line: "Emergency Hose & Equipment Service.", use: "Service headers / ads" },
];

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-graphite-600 py-14">
      <div className="container-x">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold uppercase tracking-stencil text-smoke md:text-4xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export default function BrandPage() {
  return (
    <main className="bg-plate min-h-dvh pb-20">
      <header className="border-b border-graphite-600 bg-graphite-900">
        <div className="container-x flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <LogoTextLockup layout="horizontal" theme="dark" size={44} />
          <div className="max-w-sm">
            <p className="eyebrow">Internal reference</p>
            <h1 className="mt-2 text-4xl font-bold uppercase leading-none tracking-stencil text-smoke">
              Brand Guidelines
            </h1>
            <p className="mt-4 font-body text-sm leading-relaxed text-steel">
              The identity system for {business.businessName}. Industrial tool-brand language —
              a wordmark knocked out of a graphite block with a hi-vis keyline. Built to live on a
              black service truck, a hi-vis vest, and an invoice.
            </p>
          </div>
        </div>
      </header>

      <Section eyebrow="Logo" title="The Mark">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex min-h-[160px] items-center justify-center rounded-md border border-graphite-600 bg-graphite-900 p-10">
            <LogoTextLockup layout="horizontal" theme="dark" size={40} />
          </div>
          <div className="flex min-h-[160px] items-center justify-center rounded-md border border-graphite-500 bg-smoke p-10">
            <LogoTextLockup layout="horizontal" theme="light" size={40} />
          </div>
          <div className="flex min-h-[140px] items-center justify-center rounded-md border border-graphite-600 bg-graphite-900 p-10">
            <LogoTextLockup layout="wordmark" theme="mono-white" size={38} />
          </div>
          <div className="flex min-h-[140px] items-center justify-center rounded-md border border-graphite-500 bg-smoke p-10">
            <LogoTextLockup layout="wordmark" theme="mono-black" size={38} />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-4 rounded-md border border-graphite-600 bg-graphite-900 p-6">
            <LogoTextLockup layout="icon" theme="dark" size={34} />
            <span className="font-body text-sm text-steel">Icon / favicon (RH)</span>
          </div>
        </div>
        <p className="mt-6 font-body text-sm text-steel">
          Live components (Oswald via <code className="text-smoke">next/font</code>). Minimum clear
          space = the block&apos;s keyline-to-cap height on all sides.
        </p>
      </Section>

      <Section eyebrow="Color" title="Palette">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PALETTE.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-md border border-graphite-600">
              <div className="flex h-24 items-end justify-between p-3" style={{ background: c.hex, color: c.text === "dark" ? "#1E2329" : "#F4F4F1" }}>
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

      <Section eyebrow="Type" title="Typography">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-md border border-graphite-600 bg-graphite-900 p-8">
            <p className="eyebrow">Display / Headings / Logo</p>
            <p className="mt-2 font-body text-sm text-steel">Oswald — 700 (logo &amp; headings), 500/400 (labels, sub-line)</p>
            <p className="mt-6 font-heading text-6xl font-bold uppercase leading-none text-smoke">Equipment</p>
            <p className="font-heading text-6xl font-bold uppercase leading-none text-hivis">Down?</p>
            <p className="mt-4 font-heading text-2xl font-normal uppercase tracking-[0.26em] text-steel">
              &amp; Equipment Services
            </p>
          </div>
          <div className="rounded-md border border-graphite-600 bg-graphite-900 p-8">
            <p className="eyebrow">Body / UI</p>
            <p className="mt-2 font-body text-sm text-steel">Inter — 400 / 500 / 600 / 700</p>
            <p className="mt-6 font-body text-lg leading-relaxed text-smoke">
              A failed hydraulic hose, leaking cylinder, or disabled machine can stop a job and
              strand a crew. Rogers brings practical field repair directly to the site.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Rules" title="Do & Don't">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-md border-l-4 border-hivis bg-graphite-900 p-6">
            <h3 className="font-heading text-xl font-bold uppercase text-hivis">Do</h3>
            <ul className="mt-4 space-y-2">
              {DO.map((d) => (<li key={d} className="font-body text-sm text-smoke">{d}</li>))}
            </ul>
          </div>
          <div className="rounded-md border-l-4 border-amber bg-graphite-900 p-6">
            <h3 className="font-heading text-xl font-bold uppercase text-amber">Don&apos;t</h3>
            <ul className="mt-4 space-y-2">
              {DONT.map((d) => (<li key={d} className="font-body text-sm text-steel">{d}</li>))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Voice" title="Taglines">
        <div className="grid gap-4 sm:grid-cols-2">
          {TAGLINES.map((t) => (
            <div key={t.line} className="rounded-md border border-graphite-600 bg-graphite-900 p-6">
              <p className="font-heading text-2xl font-bold uppercase leading-tight text-smoke">{t.line}</p>
              <p className="mt-2 font-body text-xs uppercase tracking-widest text-steel">{t.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Assets" title="Downloads">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOGO_FILES.map((f) => (
            <a key={f} href={`/brand/logo/${f}.svg`} download className="flex items-center justify-between rounded-sm border border-graphite-600 bg-graphite-900 px-4 py-3 font-body text-sm text-smoke transition-colors hover:border-hivis hover:text-hivis">
              <span>{f}.svg</span>
              <span aria-hidden className="text-steel">↓</span>
            </a>
          ))}
          <a href="/brand/tokens.json" download className="flex items-center justify-between rounded-sm border border-graphite-600 bg-graphite-900 px-4 py-3 font-body text-sm text-smoke transition-colors hover:border-hivis hover:text-hivis">
            <span>tokens.json</span><span aria-hidden className="text-steel">↓</span>
          </a>
          <a href="/og/og-default.png" download className="flex items-center justify-between rounded-sm border border-graphite-600 bg-graphite-900 px-4 py-3 font-body text-sm text-smoke transition-colors hover:border-hivis hover:text-hivis">
            <span>og-default.png</span><span aria-hidden className="text-steel">↓</span>
          </a>
        </div>
        <div className="mt-8 overflow-hidden rounded-md border border-graphite-600">
          <Image src="/og/og-default.png" alt="Social share card preview" width={1200} height={630} className="h-auto w-full" />
        </div>
      </Section>
    </main>
  );
}
