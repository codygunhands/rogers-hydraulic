/**
 * Renders the 1200x630 social share card (public/og/og-default.png) by
 * screenshotting scripts/og-template.html with headless Chrome — reliable
 * multi-line rendering with the live Oswald webfont. Run: `npm run brand:og`.
 *
 * Requires Google Chrome. Set CHROME_PATH to override the binary location.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = join(ROOT, "scripts", "og-template.html");
const outDir = join(ROOT, "public", "og");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "og-default.png");

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
].filter(Boolean);

let chrome = null;
for (const c of candidates) {
  try {
    execFileSync(c, ["--version"], { stdio: "ignore" });
    chrome = c;
    break;
  } catch {
    /* try next */
  }
}
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to your Chrome/Chromium binary.");
  process.exit(1);
}
if (!existsSync(html)) {
  console.error("Missing scripts/og-template.html");
  process.exit(1);
}

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  "--virtual-time-budget=2500", // let webfonts load
  `--screenshot=${out}`,
  `file://${html}`,
]);

console.log("✔ Generated public/og/og-default.png (1200x630)");
