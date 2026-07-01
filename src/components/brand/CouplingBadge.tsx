import * as React from "react";

/**
 * CouplingBadge — the Rogers Hydraulic monogram mark.
 *
 * A blocky stencil "R" whose leg terminates in a hex hydraulic coupling nut,
 * set on a rounded service-plate. Geometry is 100% vector (no font dependency)
 * so it renders identically as a React component, a standalone SVG file, and a
 * favicon — and stays legible from 16px to a truck door.
 *
 * Reused as: header mark, footer mark, favicon, and OG badge.
 */

export type BadgeVariant =
  | "dark" // graphite plate, lime mark — for dark backgrounds
  | "light" // smoke plate, graphite mark, lime bore — for light backgrounds
  | "mono-black" // one-color black on transparent
  | "mono-white" // one-color white on transparent
  | "lime"; // one-color lime on transparent (stamp on photos)

type Palette = {
  plate: string; // plate fill ("none" for transparent)
  stroke: string; // plate border ("none" to skip)
  mark: string; // the R + hex body
  bore: string; // the coupling center hole
};

const GRAPHITE = "#1E2329";
const GRAPHITE_900 = "#14181C";
const HIVIS = "#D3FF00";
const SMOKE = "#F4F4F1";

const PALETTES: Record<BadgeVariant, Palette> = {
  dark: { plate: GRAPHITE_900, stroke: HIVIS, mark: HIVIS, bore: GRAPHITE_900 },
  light: { plate: SMOKE, stroke: GRAPHITE, mark: GRAPHITE, bore: HIVIS },
  "mono-black": { plate: "none", stroke: GRAPHITE, mark: GRAPHITE, bore: "none" },
  "mono-white": { plate: "none", stroke: SMOKE, mark: SMOKE, bore: "none" },
  lime: { plate: "none", stroke: HIVIS, mark: HIVIS, bore: "none" },
};

// Hex coupling nut (flat-top), center (63,70) r≈11
const HEX_POINTS = "74,70 68.5,60.5 57.5,60.5 52,70 57.5,79.5 68.5,79.5";
// Diagonal leg of the R, running into the hex fitting
const LEG_POINTS = "39,54 51,54 67,78 55,78";

export interface CouplingBadgeProps
  extends Omit<React.SVGProps<SVGSVGElement>, "children"> {
  variant?: BadgeVariant;
  size?: number | string;
  /** Accessible label; omit + set aria-hidden for decorative use. */
  title?: string;
  /** Draw the rounded plate + border. Off = mark only. */
  plate?: boolean;
}

export function CouplingBadge({
  variant = "dark",
  size = 40,
  title,
  plate = true,
  ...props
}: CouplingBadgeProps) {
  const p = PALETTES[variant];
  const decorative = !title;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title ? <title>{title}</title> : null}

      {plate && p.plate !== "none" ? (
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="15"
          fill={p.plate}
          stroke={p.stroke}
          strokeWidth={p.stroke === "none" ? 0 : 4.5}
        />
      ) : null}

      {/* Stencil R + hex coupling. Same-color shapes union visually. */}
      <g fill={p.mark}>
        {/* stem */}
        <rect x="25" y="22" width="12" height="56" />
        {/* bowl: top bar, right wall, bottom bar (10x10 counter left open) */}
        <rect x="25" y="22" width="34" height="12" />
        <rect x="47" y="22" width="12" height="34" />
        <rect x="25" y="44" width="34" height="12" />
        {/* diagonal leg */}
        <polygon points={LEG_POINTS} />
        {/* hex coupling nut at the foot of the leg */}
        <polygon points={HEX_POINTS} />
      </g>

      {/* Coupling bore (center hole of the hex fitting). Mono/stamp variants
          render a solid nut — the bore reads via the hex silhouette. */}
      {p.bore !== "none" ? (
        <circle cx="63" cy="70" r="4.2" fill={p.bore} />
      ) : null}
    </svg>
  );
}

export default CouplingBadge;
