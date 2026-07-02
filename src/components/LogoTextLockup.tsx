import * as React from "react";

/**
 * LogoTextLockup — Rogers Hydraulic wordmark logo.
 *
 * Industrial "tool-brand" block (Hilti/DeWalt language): the wordmark is knocked
 * out of a graphite block with a hi-vis keyline. Two-tone — ROGERS (white) +
 * HYDRAULIC (lime) — in Oswald Bold, with "& Equipment Services" below in Oswald
 * Regular (tracked). Live text (next/font Oswald), so it scales crisply.
 */

export type LockupLayout = "horizontal" | "stacked" | "wordmark" | "icon";
export type LockupTheme = "dark" | "light" | "mono-white" | "mono-black";

type ThemeSpec = {
  block: string; // block fill ("transparent" for mono)
  keyline: string; // border color
  rogers: string;
  hydraulic: string;
  sub: string;
  tagline: string;
};

const GRAPHITE_900 = "#14181C";
const HIVIS = "#D3FF00";
const SMOKE = "#F4F4F1";
const GRAPHITE = "#1E2329";

const THEME: Record<LockupTheme, ThemeSpec> = {
  dark: { block: GRAPHITE_900, keyline: HIVIS, rogers: SMOKE, hydraulic: HIVIS, sub: "#AEB6BF", tagline: HIVIS },
  light: { block: GRAPHITE_900, keyline: HIVIS, rogers: SMOKE, hydraulic: HIVIS, sub: "#6B7280", tagline: "#1E2329" },
  "mono-white": { block: "transparent", keyline: SMOKE, rogers: SMOKE, hydraulic: SMOKE, sub: SMOKE, tagline: SMOKE },
  "mono-black": { block: "transparent", keyline: GRAPHITE, rogers: GRAPHITE, hydraulic: GRAPHITE, sub: GRAPHITE, tagline: GRAPHITE },
};

export interface LogoTextLockupProps {
  layout?: LockupLayout;
  theme?: LockupTheme;
  /** Wordmark cap font-size in px; everything scales from this. */
  size?: number;
  withTagline?: boolean;
  className?: string;
  title?: string;
}

export function LogoTextLockup({
  layout = "horizontal",
  theme = "dark",
  size = 30,
  withTagline = false,
  className,
  title = "Rogers Hydraulic & Equipment Services",
}: LogoTextLockupProps) {
  const t = THEME[theme];
  const keylineW = Math.max(2, Math.round(size * 0.055));
  const padX = size * 0.4;
  const padY = size * 0.16;
  const subSize = Math.max(size * 0.26, 8);
  const subGap = size * 0.24;

  const block = (
    <span
      className="inline-flex items-center leading-none"
      style={{
        background: t.block,
        border: `${keylineW}px solid ${t.keyline}`,
        padding: `${padY}px ${padX}px`,
      }}
    >
      <span
        className="font-heading font-bold uppercase leading-none"
        style={{ fontSize: size, letterSpacing: "0.02em", color: t.rogers, marginRight: "0.3em" }}
      >
        Rogers
      </span>
      <span
        className="font-heading font-bold uppercase leading-none"
        style={{ fontSize: size, letterSpacing: "0.02em", color: t.hydraulic }}
      >
        Hydraulic
      </span>
    </span>
  );

  const subline = (
    <span
      className="font-heading font-normal uppercase"
      style={{ fontSize: subSize, letterSpacing: "0.26em", color: t.sub, marginTop: subGap }}
    >
      &amp; Equipment Services
    </span>
  );

  const tagline = withTagline ? (
    <span
      className="font-body font-medium"
      style={{ fontSize: Math.max(size * 0.24, 9), letterSpacing: "0.02em", color: t.tagline, marginTop: subGap * 0.7 }}
    >
      On-Site. After Hours. Back to Work.
    </span>
  ) : null;

  // Icon: compact "RH" two-tone in a keyline block (favicon / avatar contexts).
  if (layout === "icon") {
    const ipad = size * 0.24;
    return (
      <span className={className} role="img" aria-label={title}>
        <span
          className="inline-flex items-center leading-none"
          style={{
            background: t.block,
            border: `${keylineW}px solid ${t.keyline}`,
            padding: `${ipad}px ${ipad * 1.1}px`,
            borderRadius: Math.round(size * 0.12),
          }}
        >
          <span className="font-heading font-bold uppercase leading-none" style={{ fontSize: size, color: t.rogers }}>
            R
          </span>
          <span className="font-heading font-bold uppercase leading-none" style={{ fontSize: size, color: t.hydraulic }}>
            H
          </span>
        </span>
      </span>
    );
  }

  if (layout === "wordmark") {
    return (
      <span className={className} role="img" aria-label={title}>
        {block}
      </span>
    );
  }

  const align = layout === "stacked" ? "items-center text-center" : "items-start";
  return (
    <span className={`inline-flex flex-col ${align} ${className ?? ""}`} role="img" aria-label={title}>
      {block}
      {subline}
      {tagline}
    </span>
  );
}

export default LogoTextLockup;
