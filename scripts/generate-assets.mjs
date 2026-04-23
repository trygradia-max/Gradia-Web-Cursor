/**
 * Generates favicons from public/images/gradia-logo.png:
 * - App Router: app/favicon.ico, app/icon.png, app/apple-icon.png (tab + home-screen)
 * - Legacy public: public/favicon.ico, public/apple-touch-icon.png
 * - OG: public/images/og-image.jpg (from SVG)
 * Run: node scripts/generate-assets.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const appDir = join(root, "app");
const imagesDir = join(publicDir, "images");

const brandDark = "#0a0a0a";
const brandPrimary = "#3b6ef5";

const logoPath = join(imagesDir, "gradia-logo.png");

const iconPad = {
  fit: "contain",
  background: { r: 255, g: 255, b: 255, alpha: 1 },
};

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${brandDark}"/>
  <rect x="420" y="412" width="360" height="3" fill="${brandPrimary}" rx="1.5" opacity="0.9"/>
  <text x="520" y="292" text-anchor="start" font-family="Georgia, serif" font-size="96" fill="#ffffff">Gradia</text>
  <circle cx="700" cy="268" r="11" fill="${brandPrimary}"/>
  <text x="600" y="372" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#f8fafc">The Vertical Company</text>
</svg>`;

await mkdir(imagesDir, { recursive: true });

const faviconPng32 = await sharp(logoPath).resize(32, 32).png().toBuffer();
const faviconPng16 = await sharp(logoPath).resize(16, 16).png().toBuffer();
const icoBuffer = await pngToIco([faviconPng16, faviconPng32]);

await writeFile(join(publicDir, "favicon.ico"), icoBuffer);
await writeFile(join(appDir, "favicon.ico"), icoBuffer);

await sharp(logoPath).resize(180, 180).png().toFile(join(publicDir, "apple-touch-icon.png"));

await sharp(logoPath)
  .resize(512, 512, iconPad)
  .png()
  .toFile(join(appDir, "icon.png"));

await sharp(logoPath)
  .resize(180, 180, iconPad)
  .png()
  .toFile(join(appDir, "apple-icon.png"));

await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88 }).toFile(join(imagesDir, "og-image.jpg"));

console.log(
  "Wrote app/favicon.ico, app/icon.png, app/apple-icon.png; public/favicon.ico, public/apple-touch-icon.png; public/images/og-image.jpg",
);
