/**
 * Rasterizes favicon.svg into the PNG/ICO app-icon set and writes a maskable
 * PWA icon SVG. Requires rsvg-convert (librsvg) and ImageMagick (magick).
 * Run: `npm run brand:icons` (run `npm run brand:svg` first to produce favicon.svg).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const FAVICON_SVG = join(PUBLIC, "favicon.svg");

if (!existsSync(FAVICON_SVG)) {
  console.error("Missing public/favicon.svg — run `npm run brand:svg` first.");
  process.exit(1);
}

function has(bin) {
  try {
    execFileSync("which", [bin], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (!has("rsvg-convert")) {
  console.error("rsvg-convert not found. Install librsvg (brew install librsvg).");
  process.exit(1);
}
const magick = has("magick") ? "magick" : has("convert") ? "convert" : null;

const GRAPHITE_900 = "#14181C";

/** Maskable icon: badge on a full graphite field (safe-zone padding built in). */
const MASKABLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${GRAPHITE_900}"/>
  <g transform="translate(14,14) scale(0.72)">
    <rect x="4" y="4" width="92" height="92" rx="15" fill="${GRAPHITE_900}" stroke="#D3FF00" stroke-width="4.5"/>
    <g fill="#D3FF00">
      <rect x="25" y="22" width="12" height="56"/>
      <rect x="25" y="22" width="34" height="12"/>
      <rect x="47" y="22" width="12" height="34"/>
      <rect x="25" y="44" width="34" height="12"/>
      <polygon points="39,54 51,54 67,78 55,78"/>
      <polygon points="74,70 68.5,60.5 57.5,60.5 52,70 57.5,79.5 68.5,79.5"/>
    </g>
    <circle cx="63" cy="70" r="4.2" fill="${GRAPHITE_900}"/>
  </g>
</svg>`;
const maskablePath = join(PUBLIC, "icon-maskable.svg");
writeFileSync(maskablePath, MASKABLE.trim() + "\n");

function png(src, out, size, bg) {
  const args = ["-w", String(size), "-h", String(size)];
  if (bg) args.push("-b", bg);
  args.push(src, "-o", out);
  execFileSync("rsvg-convert", args);
}

mkdirSync(PUBLIC, { recursive: true });

// PWA + Apple icons (opaque graphite background for correct display)
png(maskablePath, join(PUBLIC, "icon-192.png"), 192);
png(maskablePath, join(PUBLIC, "icon-512.png"), 512);
png(maskablePath, join(PUBLIC, "apple-icon.png"), 180);
// Small favicons from the transparent badge on graphite
png(FAVICON_SVG, join(PUBLIC, "favicon-32.png"), 32, GRAPHITE_900);
png(FAVICON_SVG, join(PUBLIC, "favicon-16.png"), 16, GRAPHITE_900);

// Multi-resolution favicon.ico
if (magick) {
  const ico48 = join(PUBLIC, "favicon-48.png");
  png(FAVICON_SVG, ico48, 48, GRAPHITE_900);
  execFileSync(magick, [
    join(PUBLIC, "favicon-16.png"),
    join(PUBLIC, "favicon-32.png"),
    ico48,
    join(PUBLIC, "favicon.ico"),
  ]);
} else {
  console.warn("ImageMagick not found — skipped favicon.ico (PNG icons still generated).");
}

// Rasterize the social share card (og-default.svg -> og-default.png, 1200x630)
const ogSvg = join(PUBLIC, "og", "og-default.svg");
if (existsSync(ogSvg)) {
  execFileSync("rsvg-convert", ["-w", "1200", "-h", "630", ogSvg, "-o", join(PUBLIC, "og", "og-default.png")]);
  console.log("✔ Generated og/og-default.png (1200x630)");
} else {
  console.warn("Missing public/og/og-default.svg — run `npm run brand:svg` first (skipped OG png).");
}

console.log("✔ Generated app icons: icon-192/512, apple-icon (180), favicon 16/32, favicon.ico, icon-maskable.svg");
