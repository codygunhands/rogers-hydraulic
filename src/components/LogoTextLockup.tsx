import * as React from "react";
import { CouplingBadge, type BadgeVariant } from "./brand/CouplingBadge";

/**
 * LogoTextLockup — master logo lockup (badge + stencil wordmark).
 *
 * The wordmark is live text in Barlow Condensed (crisp, selectable, accessible)
 * rather than baked SVG, so it scales perfectly and stays semantic. The badge is
 * the vector CouplingBadge. Used in the header (horizontal), footer (stacked),
 * and hero (large stacked).
 */

export type LockupLayout = "horizontal" | "stacked" | "wordmark" | "icon";
export type LockupTheme = "dark" | "light" | "mono-white" | "mono-black";

const THEME: Record<
  LockupTheme,
  { badge: BadgeVariant; primary: string; secondary: string; rule: string }
> = {
  dark: { badge: "dark", primary: "#F4F4F1", secondary: "#AEB6BF", rule: "#D3FF00" },
  light: { badge: "light", primary: "#1E2329", secondary: "#6B7280", rule: "#D3FF00" },
  "mono-white": { badge: "mono-white", primary: "#F4F4F1", secondary: "#F4F4F1", rule: "#F4F4F1" },
  "mono-black": { badge: "mono-black", primary: "#1E2329", secondary: "#1E2329", rule: "#1E2329" },
};

export interface LogoTextLockupProps {
  layout?: LockupLayout;
  theme?: LockupTheme;
  /** Pixel height of the badge; wordmark scales proportionally. */
  size?: number;
  withTagline?: boolean;
  className?: string;
  /** Accessible name for the whole lockup (rendered as a group label). */
  title?: string;
}

export function LogoTextLockup({
  layout = "horizontal",
  theme = "dark",
  size = 44,
  withTagline = false,
  className,
  title = "Rogers Hydraulic & Equipment Services",
}: LogoTextLockupProps) {
  const t = THEME[theme];
  const primarySize = size * 0.6;
  const secondarySize = Math.max(size * 0.19, 9);
  const taglineSize = Math.max(size * 0.16, 9);

  const wordmark = (
    <span className="flex flex-col justify-center leading-none">
      <span
        className="font-heading font-extrabold uppercase leading-[0.92]"
        style={{ color: t.primary, fontSize: primarySize, letterSpacing: "0.005em" }}
      >
        Rogers Hydraulic
      </span>
      <span
        className="mt-[0.35em] font-heading font-semibold uppercase"
        style={{
          color: t.secondary,
          fontSize: secondarySize,
          letterSpacing: "0.28em",
        }}
      >
        Equipment Services
      </span>
      {withTagline ? (
        <span
          className="mt-[0.5em] font-body font-medium"
          style={{ color: t.rule, fontSize: taglineSize, letterSpacing: "0.02em" }}
        >
          On-Site. After Hours. Back to Work.
        </span>
      ) : null}
    </span>
  );

  if (layout === "icon") {
    return (
      <span className={className} aria-label={title} role="img">
        <CouplingBadge variant={t.badge} size={size} />
      </span>
    );
  }

  if (layout === "wordmark") {
    return (
      <span className={className} aria-label={title} role="img">
        {wordmark}
      </span>
    );
  }

  if (layout === "stacked") {
    return (
      <span
        className={`flex flex-col items-center text-center ${className ?? ""}`}
        aria-label={title}
        role="img"
      >
        <CouplingBadge variant={t.badge} size={size * 1.3} />
        <span className="mt-3 flex flex-col items-center leading-none">
          <span
            className="font-heading font-extrabold uppercase leading-[0.92]"
            style={{ color: t.primary, fontSize: primarySize }}
          >
            Rogers Hydraulic
          </span>
          <span
            className="mt-[0.4em] font-heading font-semibold uppercase"
            style={{ color: t.secondary, fontSize: secondarySize, letterSpacing: "0.28em" }}
          >
            Equipment Services
          </span>
          {withTagline ? (
            <span
              className="mt-2 h-[3px] w-14 rounded-sm"
              style={{ background: t.rule }}
              aria-hidden
            />
          ) : null}
        </span>
      </span>
    );
  }

  // horizontal (default)
  return (
    <span
      className={`inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label={title}
      role="img"
    >
      <CouplingBadge variant={t.badge} size={size} />
      {wordmark}
    </span>
  );
}

export default LogoTextLockup;
