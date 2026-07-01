/**
 * BRAND TOKEN SOURCE OF TRUTH — Rogers Hydraulic & Equipment Services.
 *
 * Everything visual reads from here: Tailwind config, components, the /brand
 * page, the OG image, and the standalone SVG assets. Keep this in sync with
 * `tailwind.config.ts` and the CSS variables in `globals.css`.
 *
 * Direction: industrial minimalism. Graphite base, Hi-Vis Lime lead accent,
 * Signal Amber secondary. Barlow Condensed (stencil-feel) headings, Inter body.
 */

export const colors = {
  // Base
  graphite: "#1E2329", // primary dark — trucks, uniforms, page background
  graphite900: "#14181C", // deepest — near-black plate
  graphite800: "#1E2329",
  graphite700: "#282E36", // raised surface / card
  graphite600: "#333A44", // border on dark
  graphite500: "#3F4752", // hairline / muted border

  // Accents
  hivis: "#D3FF00", // LEAD accent — CTAs, truck stripes, icon strokes (sparingly)
  hivisDark: "#B8E000", // hover / pressed state for lime
  amber: "#F79A1B", // SECONDARY — caution / warning / after-hours callouts

  // Neutrals
  smoke: "#F4F4F1", // light background / body text on dark
  steel: "#6B7280", // secondary text / muted labels
  white: "#FFFFFF",
  black: "#000000",
} as const;

/** Semantic color roles — reference these, not raw hexes, in app code. */
export const roles = {
  bg: colors.graphite,
  bgDeep: colors.graphite900,
  surface: colors.graphite700,
  border: colors.graphite600,
  borderMuted: colors.graphite500,
  accent: colors.hivis,
  accentHover: colors.hivisDark,
  warning: colors.amber,
  textOnDark: colors.smoke,
  textMutedOnDark: colors.steel,
  textOnLight: colors.graphite,
  textOnAccent: colors.graphite, // lime is bright — always dark text on it
} as const;

export const fonts = {
  heading: "var(--font-barlow)", // Barlow Condensed — condensed industrial display
  body: "var(--font-inter)", // Inter — clean UI/body
  headingStack:
    "var(--font-barlow), 'Barlow Condensed', 'Oswald', system-ui, sans-serif",
  bodyStack: "var(--font-inter), Inter, system-ui, sans-serif",
} as const;

/** Type scale (rem) — condensed display headings, comfortable body. */
export const typeScale = {
  display: "clamp(2.75rem, 6vw, 5rem)", // hero
  h1: "clamp(2.25rem, 4.5vw, 3.5rem)",
  h2: "clamp(1.75rem, 3vw, 2.5rem)",
  h3: "1.5rem",
  h4: "1.25rem",
  body: "1rem",
  small: "0.875rem",
  micro: "0.75rem",
} as const;

export const radii = {
  none: "0px",
  sm: "2px", // industrial: sharp, minimal rounding
  md: "4px",
  lg: "6px",
  badge: "8px",
} as const;

export const strokes = {
  hairline: "1px",
  rule: "3px", // hi-vis divider rule weight
  heavy: "6px", // truck-stripe weight
  iconStroke: 6, // SVG icon stroke (in a 100-unit viewbox)
} as const;

export const space = {
  // 8px rhythm
  section: "clamp(3.5rem, 8vw, 6rem)", // vertical padding between sections
  gutter: "1.5rem",
  maxWidth: "1200px",
} as const;

export const brand = {
  name: "Rogers Hydraulic & Equipment Services",
  display: "ROGERS HYDRAULIC",
  displayLine1: "ROGERS",
  displayLine2: "HYDRAULIC",
  secondary: "EQUIPMENT SERVICES",
  tagline: "On-Site. After Hours. Back to Work.",
  colors,
  roles,
  fonts,
  typeScale,
  radii,
  strokes,
  space,
} as const;

export type Brand = typeof brand;
export default brand;
