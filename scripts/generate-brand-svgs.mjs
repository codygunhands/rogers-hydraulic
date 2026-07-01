/**
 * Generates the standalone brand SVG assets in public/brand/logo/ (+ favicon.svg,
 * icon.svg) from a single source of geometry — the same coupling-monogram used by
 * src/components/brand/CouplingBadge.tsx. Run: `npm run brand:svg`.
 *
 * Keep the geometry here in sync with CouplingBadge.tsx.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const loadFont = (p) => {
  const buf = readFileSync(p);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LOGO_DIR = join(ROOT, "public", "brand", "logo");
const PUBLIC_DIR = join(ROOT, "public");
mkdirSync(LOGO_DIR, { recursive: true });

// Load Barlow Condensed and outline text → vector paths so standalone logo
// files carry NO font dependency (portable to any renderer, no clipping).
const fontExtraBold = loadFont(join(ROOT, "scripts", "fonts", "BarlowCondensed-ExtraBold.ttf"));
const fontSemiBold = loadFont(join(ROOT, "scripts", "fonts", "BarlowCondensed-SemiBold.ttf"));

/**
 * Render a string as an SVG <path> at a given baseline, tracked to `tracking`
 * (em) between glyphs. Returns { d, width } so callers can center/lay out.
 */
function textPath(font, text, { x = 0, y = 0, fontSize, tracking = 0, fill }) {
  const scale = fontSize / font.unitsPerEm;
  const trackPx = tracking * fontSize;
  let cursor = x;
  let d = "";
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    const gp = glyph.getPath(cursor, y, fontSize);
    d += gp.toPathData(2) + " ";
    cursor += glyph.advanceWidth * scale + trackPx;
  }
  const width = cursor - x - (text.length ? trackPx : 0);
  return { path: `<path d="${d.trim()}" fill="${fill}"/>`, width };
}

const C = {
  graphite: "#1E2329",
  graphite900: "#14181C",
  hivis: "#D3FF00",
  smoke: "#F4F4F1",
  steel: "#6B7280",
  white: "#FFFFFF",
};

/** The coupling-monogram mark, drawn inside a 100x100 space. */
function mark({ fill, bore }) {
  return `
    <g fill="${fill}">
      <rect x="25" y="22" width="12" height="56"/>
      <rect x="25" y="22" width="34" height="12"/>
      <rect x="47" y="22" width="12" height="34"/>
      <rect x="25" y="44" width="34" height="12"/>
      <polygon points="39,54 51,54 67,78 55,78"/>
      <polygon points="74,70 68.5,60.5 57.5,60.5 52,70 57.5,79.5 68.5,79.5"/>
    </g>
    ${bore ? `<circle cx="63" cy="70" r="4.2" fill="${bore}"/>` : ""}`;
}

/** Full badge (plate + mark) in a 100x100 viewBox. */
function badge({ plate, stroke, fill, bore }) {
  const plateEl =
    plate && plate !== "none"
      ? `<rect x="4" y="4" width="92" height="92" rx="15" fill="${plate}" stroke="${stroke}" stroke-width="4.5"/>`
      : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Rogers Hydraulic">
  <title>Rogers Hydraulic coupling badge</title>
  ${plateEl}${mark({ fill, bore })}
</svg>`;
}

const BADGES = {
  "badge-dark": { plate: C.graphite900, stroke: C.hivis, fill: C.hivis, bore: C.graphite900 },
  "badge-light": { plate: C.smoke, stroke: C.graphite, fill: C.graphite, bore: C.hivis },
  "badge-mono-black": { plate: "none", fill: C.graphite, bore: null },
  "badge-mono-white": { plate: "none", fill: C.smoke, bore: null },
  "badge-lime": { plate: "none", fill: C.hivis, bore: null },
};

const plateOf = (spec, x = 0, y = 0) =>
  spec.plate && spec.plate !== "none"
    ? `<rect x="${x}" y="${y}" width="100" height="100" rx="15" fill="${spec.plate}" stroke="${spec.stroke}" stroke-width="4.5"/>`
    : "";

/** Outlined wordmark block, top-left origin at (x,y). Returns svg + measured width. */
function wordmarkBlock({ x, y, primary, secondary, rule, primarySize = 64 }) {
  const secSize = 20;
  const p1 = textPath(fontExtraBold, "ROGERS HYDRAULIC", {
    x,
    y: y + primarySize,
    fontSize: primarySize,
    tracking: 0.005,
    fill: primary,
  });
  const p2 = textPath(fontSemiBold, "EQUIPMENT SERVICES", {
    x: x + 1,
    y: y + primarySize + 26,
    fontSize: secSize,
    tracking: 0.34,
    fill: secondary,
  });
  const svg = `${p1.path}
    ${p2.path}
    <rect x="${x + 1}" y="${y + primarySize + 36}" width="58" height="4" rx="2" fill="${rule}"/>`;
  return { svg, width: Math.max(p1.width, p2.width) };
}

/** Horizontal lockup: badge + outlined wordmark. */
function lockupHorizontalClean({ badgeSpec, primary, secondary, rule }) {
  const wm = wordmarkBlock({ x: 134, y: 12, primary, secondary, rule });
  const w = Math.ceil(134 + wm.width + 12);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 130" role="img" aria-label="Rogers Hydraulic and Equipment Services">
  <title>Rogers Hydraulic &amp; Equipment Services</title>
  <g transform="translate(10,15)">${plateOf(badgeSpec)}${mark({ fill: badgeSpec.fill, bore: badgeSpec.bore })}</g>
  ${wm.svg}
</svg>`;
}

/** Stacked lockup: badge centered above outlined wordmark. */
function lockupStacked({ badgeSpec, primary, secondary, rule }) {
  const primarySize = 60;
  const p1 = textPath(fontExtraBold, "ROGERS HYDRAULIC", {
    x: 0,
    y: 0,
    fontSize: primarySize,
    tracking: 0.005,
    fill: primary,
  });
  const W = Math.ceil(Math.max(p1.width + 24, 300));
  const cx = W / 2;
  const badgeX = cx - 65; // badge 130 wide (scaled)
  const t1 = textPath(fontExtraBold, "ROGERS HYDRAULIC", {
    x: cx - p1.width / 2,
    y: 184,
    fontSize: primarySize,
    tracking: 0.005,
    fill: primary,
  });
  const p2 = textPath(fontSemiBold, "EQUIPMENT SERVICES", {
    x: 0,
    y: 0,
    fontSize: 19,
    tracking: 0.36,
    fill: secondary,
  });
  const t2 = textPath(fontSemiBold, "EQUIPMENT SERVICES", {
    x: cx - p2.width / 2,
    y: 210,
    fontSize: 19,
    tracking: 0.36,
    fill: secondary,
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} 264" role="img" aria-label="Rogers Hydraulic and Equipment Services">
  <title>Rogers Hydraulic &amp; Equipment Services</title>
  <g transform="translate(${badgeX},12) scale(1.3)">${plateOf(badgeSpec)}${mark({ fill: badgeSpec.fill, bore: badgeSpec.bore })}</g>
  ${t1.path}
  ${t2.path}
  <rect x="${cx - 29}" y="224" width="58" height="4" rx="2" fill="${rule}"/>
</svg>`;
}

/** Wordmark-only, outlined. */
function wordmark({ primary, secondary, rule }) {
  const wm = wordmarkBlock({ x: 6, y: 6, primary, secondary, rule, primarySize: 66 });
  const w = Math.ceil(6 + wm.width + 8);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 128" role="img" aria-label="Rogers Hydraulic and Equipment Services">
  <title>Rogers Hydraulic &amp; Equipment Services</title>
  ${wm.svg}
</svg>`;
}

/** 1200x630 social share card (OpenGraph / Twitter). Outlined text. */
function ogImage() {
  const b = BADGES["badge-dark"];
  const title = textPath(fontExtraBold, "ROGERS HYDRAULIC", {
    x: 80,
    y: 300,
    fontSize: 108,
    tracking: 0.005,
    fill: C.smoke,
  });
  const sub = textPath(fontSemiBold, "EQUIPMENT SERVICES", {
    x: 82,
    y: 348,
    fontSize: 34,
    tracking: 0.34,
    fill: "#AEB6BF",
  });
  const promise = textPath(fontExtraBold, "ON-SITE. AFTER HOURS. BACK TO WORK.", {
    x: 80,
    y: 448,
    fontSize: 44,
    tracking: 0.01,
    fill: C.hivis,
  });
  const area = textPath(fontSemiBold, "Serving Madison County, Brazos County, and surrounding East Texas", {
    x: 82,
    y: 520,
    fontSize: 27,
    tracking: 0.02,
    fill: C.smoke,
  });
  const services = textPath(fontSemiBold, "Mobile Hydraulic Hose Repair  ·  Field Equipment Service  ·  Trailer Repair  ·  After-Hours", {
    x: 82,
    y: 560,
    fontSize: 21,
    tracking: 0.02,
    fill: "#AEB6BF",
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Rogers Hydraulic and Equipment Services">
  <rect width="1200" height="630" fill="${C.graphite}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="1200" height="10" fill="${C.hivis}"/>
  <g transform="translate(80,80) scale(1.25)">${plateOf(b)}${mark({ fill: b.fill, bore: b.bore })}</g>
  ${title.path}
  ${sub.path}
  <rect x="82" y="380" width="120" height="6" rx="3" fill="${C.hivis}"/>
  ${promise.path}
  ${area.path}
  ${services.path}
  <rect x="0" y="620" width="1200" height="10" fill="${C.hivis}"/>
</svg>`;
}

const files = {};

// Badges
for (const [name, spec] of Object.entries(BADGES)) {
  files[`logo/${name}.svg`] = badge(spec);
}

// Social share card (SVG source; rasterized to PNG by generate-icons.mjs)
files["../og/og-default.svg"] = ogImage();

// Lockups
// Secondary line on dark uses a lighter steel for legibility (steel #6B7280 is
// only ~2.5:1 on graphite; #AEB6BF is ~5.5:1 while staying subordinate).
const darkTheme = { primary: C.smoke, secondary: "#AEB6BF", rule: C.hivis };
const lightTheme = { primary: C.graphite, secondary: C.steel, rule: C.hivis };
const monoBlack = { primary: C.graphite, secondary: C.graphite, rule: C.graphite };
const monoWhite = { primary: C.smoke, secondary: C.smoke, rule: C.smoke };

files["logo/lockup-horizontal-dark.svg"] = lockupHorizontalClean({ badgeSpec: BADGES["badge-dark"], ...darkTheme });
files["logo/lockup-horizontal-light.svg"] = lockupHorizontalClean({ badgeSpec: BADGES["badge-light"], ...lightTheme });
files["logo/lockup-stacked-dark.svg"] = lockupStacked({ badgeSpec: BADGES["badge-dark"], ...darkTheme });
files["logo/lockup-stacked-light.svg"] = lockupStacked({ badgeSpec: BADGES["badge-light"], ...lightTheme });
files["logo/lockup-mono-black.svg"] = lockupHorizontalClean({ badgeSpec: BADGES["badge-mono-black"], ...monoBlack });
files["logo/lockup-mono-white.svg"] = lockupHorizontalClean({ badgeSpec: BADGES["badge-mono-white"], ...monoWhite });
files["logo/wordmark-dark.svg"] = wordmark(darkTheme);
files["logo/wordmark-light.svg"] = wordmark(lightTheme);

// Favicon + icon (badge-dark, optimized square)
files["../favicon.svg"] = badge(BADGES["badge-dark"]);
files["../icon.svg"] = badge(BADGES["badge-dark"]);

let count = 0;
for (const [rel, svg] of Object.entries(files)) {
  const out = rel.startsWith("../")
    ? join(PUBLIC_DIR, rel.slice(3))
    : join(PUBLIC_DIR, "brand", rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg.trim() + "\n", "utf8");
  count++;
}

console.log(`✔ Generated ${count} brand SVG files.`);
