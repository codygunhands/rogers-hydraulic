/**
 * Generates the Rogers Hydraulic logo assets — the industrial "block" mark:
 * ROGERS (white) + HYDRAULIC (lime) knocked out of a graphite block with a
 * hi-vis keyline, "& EQUIPMENT SERVICES" (Oswald Regular, tracked) below.
 *
 * Text is OUTLINED (Oswald Bold + Regular) so files carry no font dependency.
 * Run: `npm run brand:svg`. Fonts live in scripts/fonts/ (see README).
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const LOGO = join(PUBLIC, "brand", "logo");
mkdirSync(LOGO, { recursive: true });

const loadFont = (p) => {
  const b = readFileSync(join(ROOT, "scripts", "fonts", p));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const oswB = loadFont("Oswald-Bold.ttf");
const oswR = loadFont("Oswald-Regular.ttf");

const C = {
  graphite: "#1E2329",
  g900: "#14181C",
  hivis: "#D3FF00",
  smoke: "#F4F4F1",
  steel: "#AEB6BF",
  steelD: "#6B7280",
};

function tp(font, text, { x, y, size, tr = 0, fill }) {
  const s = size / font.unitsPerEm;
  const t = tr * size;
  let c = x;
  let d = "";
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    d += g.getPath(c, y, size).toPathData(2) + " ";
    c += g.advanceWidth * s + t;
  }
  return { path: `<path d="${d.trim()}" fill="${fill}"/>`, w: c - x - t };
}
const mw = (f, t, s, tr = 0) => tp(f, t, { x: 0, y: 0, size: s, tr, fill: "#000" }).w;

const CAP = 0.735; // Oswald cap height as fraction of em
const TR = 0.02;
const SUB_TR = 0.27;

/**
 * Block lockup. opts: { block, keyline, rogers, hydraulic, sub, showSub, showBlock, twoTone }
 */
function blockLockup(S, opts) {
  const M = Math.round(S * 0.35);
  const k = Math.max(2, Math.round(S * 0.06));
  const padX = S * 0.42;
  const padY = S * 0.17;
  const capH = S * CAP;

  const rogW = mw(oswB, "ROGERS ", S, TR);
  const hydW = mw(oswB, "HYDRAULIC", S, TR);
  const wordW = rogW + hydW;

  const blockX = M;
  const blockY = M;
  const blockW = wordW + padX * 2;
  const blockH = capH + padY * 2;

  const baseY = blockY + padY + capH; // baseline
  const textX = blockX + padX;

  const parts = [];
  if (opts.showBlock) {
    parts.push(
      `<rect x="${blockX + k / 2}" y="${blockY + k / 2}" width="${blockW - k}" height="${blockH - k}" fill="${opts.block}" stroke="${opts.keyline}" stroke-width="${k}"/>`,
    );
  }
  const rog = tp(oswB, "ROGERS ", { x: textX, y: baseY, size: S, tr: TR, fill: opts.rogers });
  const hyd = tp(oswB, "HYDRAULIC", { x: textX + rogW, y: baseY, size: S, tr: TR, fill: opts.hydraulic });
  parts.push(rog.path, hyd.path);

  let totalH = blockY + blockH + M;
  if (opts.showSub) {
    const subS = S * 0.27;
    const subCap = subS * CAP;
    const subY = blockY + blockH + S * 0.22 + subCap;
    parts.push(tp(oswR, "& EQUIPMENT SERVICES", { x: blockX + 2, y: subY, size: subS, tr: SUB_TR, fill: opts.sub }).path);
    totalH = subY + subS * 0.3 + M;
  }

  const subW = opts.showSub ? mw(oswR, "& EQUIPMENT SERVICES", S * 0.27, SUB_TR) : 0;
  const W = Math.ceil(Math.max(blockX + blockW, blockX + 2 + subW) + M);
  const H = Math.ceil(totalH);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Rogers Hydraulic and Equipment Services">
  <title>Rogers Hydraulic &amp; Equipment Services</title>
  ${parts.join("\n  ")}
</svg>`;
}

/** RH monogram in a keyline block — favicon / avatar. Square. */
function iconRH(px = 100, { withBg = true } = {}) {
  const S = px * 0.62;
  const capH = S * CAP;
  const rW = mw(oswB, "R", S);
  const hW = mw(oswB, "H", S);
  const gap = S * 0.04;
  const totalW = rW + gap + hW;
  const x0 = (px - totalW) / 2;
  const baseY = px / 2 + capH / 2;
  const bg = withBg ? `<rect width="${px}" height="${px}" rx="${px * 0.16}" fill="${C.g900}"/>` : "";
  const key = `<rect x="${px * 0.06}" y="${px * 0.06}" width="${px * 0.88}" height="${px * 0.88}" rx="${px * 0.1}" fill="none" stroke="${C.hivis}" stroke-width="${px * 0.055}"/>`;
  const r = tp(oswB, "R", { x: x0, y: baseY, size: S, fill: C.smoke });
  const h = tp(oswB, "H", { x: x0 + rW + gap, y: baseY, size: S, fill: C.hivis });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${px} ${px}" width="${px}" height="${px}" role="img" aria-label="Rogers Hydraulic">
  <title>Rogers Hydraulic</title>
  ${bg}${key}${r.path}${h.path}
</svg>`;
}

/** Maskable PWA icon: RH on a full graphite field with safe-zone padding. */
function iconMaskable(px = 512) {
  const s = 0.66;
  const core = iconRH(100, { withBg: false })
    .replace(/^<svg[^>]*>/, "")
    .replace(/<\/svg>$/, "")
    .replace(/<title>.*?<\/title>/s, "");
  const off = (px - 100 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${px} ${px}" width="${px}" height="${px}">
  <rect width="${px}" height="${px}" fill="${C.g900}"/>
  <g transform="translate(${off},${off}) scale(${s})">${core}</g>
</svg>`;
}

const files = {
  "logo/logo-block-dark.svg": blockLockup(100, { block: C.g900, keyline: C.hivis, rogers: C.smoke, hydraulic: C.hivis, sub: C.steel, showSub: true, showBlock: true }),
  "logo/logo-block-light.svg": blockLockup(100, { block: C.g900, keyline: C.hivis, rogers: C.smoke, hydraulic: C.hivis, sub: C.steelD, showSub: true, showBlock: true }),
  "logo/logo-mono-black.svg": blockLockup(100, { block: "none", keyline: C.graphite, rogers: C.graphite, hydraulic: C.graphite, sub: C.graphite, showSub: true, showBlock: true }),
  "logo/logo-mono-white.svg": blockLockup(100, { block: "none", keyline: C.smoke, rogers: C.smoke, hydraulic: C.smoke, sub: C.smoke, showSub: true, showBlock: true }),
  "logo/wordmark-dark.svg": blockLockup(100, { block: C.g900, keyline: C.hivis, rogers: C.smoke, hydraulic: C.hivis, sub: C.steel, showSub: false, showBlock: true }),
  "logo/icon-rh.svg": iconRH(120),
  "../favicon.svg": iconRH(64),
  "../icon.svg": iconRH(120),
  "../icon-maskable.svg": iconMaskable(512),
  // OG image (og/og-default.png) is generated separately from scripts/og-template.html
  // via Chrome (npm run brand:og) — reliable multi-line font rendering.
};

let n = 0;
for (const [rel, svg] of Object.entries(files)) {
  const out = rel.startsWith("../") ? join(PUBLIC, rel.slice(3)) : join(PUBLIC, "brand", rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg.trim() + "\n", "utf8");
  n++;
}
console.log(`✔ Generated ${n} logo assets (block wordmark, Oswald outlined).`);
