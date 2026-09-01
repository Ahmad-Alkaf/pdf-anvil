// Renders the SVG mark from src/lib/brand.ts into the static icon files:
//   public/icons/icon-{72,96,128,144,152,192,384,512}.png  (red tile, white mark)
//   public/icons/icon-512-maskable.png                     (full-bleed, safe zone)
//   src/app/favicon.ico                                    (16/32/48 PNG-in-ICO)
// Run: npm run icons. Commit the outputs.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { BRAND_RED, MARK_PATH, MARK_VIEWBOX } from "../src/lib/brand";

const root = join(import.meta.dirname, "..");
const iconsDir = join(root, "public", "icons");

function tileSvg(size: number, markRatio: number, radiusRatio: number, bg: string, fg: string): string {
  const r = size * radiusRatio;
  const m = size * markRatio;
  const off = (size - m) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${bg}"/>
  <svg x="${off}" y="${off}" width="${m}" height="${m}" viewBox="${MARK_VIEWBOX}">
    <path d="${MARK_PATH}" fill="${fg}" fill-rule="evenodd"/>
  </svg>
</svg>`;
}

function markOnlySvg(size: number, fill: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${MARK_VIEWBOX}">
  <path d="${MARK_PATH}" fill="${fill}" fill-rule="evenodd"/>
</svg>`;
}

async function png(svg: string, size: number): Promise<Buffer> {
  return sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();
}

/** Minimal ICO writer: PNG-encoded entries (supported by all modern browsers and Windows). */
function buildIco(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  const entries: Buffer[] = [];
  let offset = 6 + 16 * images.length;
  for (const img of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 0);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(img.data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  await mkdir(iconsDir, { recursive: true });

  for (const size of [72, 96, 128, 144, 152, 192, 384, 512]) {
    const data = await png(tileSvg(size, 0.64, 0.22, BRAND_RED, "#ffffff"), size);
    await writeFile(join(iconsDir, `icon-${size}.png`), data);
  }
  await writeFile(join(iconsDir, "icon-512-maskable.png"), await png(tileSvg(512, 0.5, 0, BRAND_RED, "#ffffff"), 512));

  // Favicon: red mark on transparent, crisp at 16 px.
  const ico = buildIco(
    await Promise.all(
      [16, 32, 48].map(async (size) => ({ size, data: await png(markOnlySvg(size, BRAND_RED), size) })),
    ),
  );
  await writeFile(join(root, "src", "app", "favicon.ico"), ico);

  // Preview file for humans (not used by the app).
  await writeFile(join(iconsDir, "preview-512.png"), await png(markOnlySvg(512, BRAND_RED), 512));

  console.log("[icons] wrote public/icons/* and src/app/favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
