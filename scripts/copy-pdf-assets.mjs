// Copies the pdf.js worker and its runtime assets (cmaps, standard fonts,
// wasm, icc profiles) into public/pdfjs/<version>/ so they are served as
// static files. Runs before `next dev` and `next build` (npm pre-scripts).
// public/pdfjs/ is git-ignored and regenerated on every run.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkgDir = join(root, "node_modules", "pdfjs-dist");

if (!existsSync(pkgDir)) {
  console.error("[copy-pdf-assets] pdfjs-dist is not installed. Run npm install first.");
  process.exit(1);
}

const { version } = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
const outRoot = join(root, "public", "pdfjs");
const out = join(outRoot, version);

rmSync(outRoot, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const entries = [
  ["build/pdf.worker.min.mjs", "pdf.worker.min.mjs"],
  ["cmaps", "cmaps"],
  ["standard_fonts", "standard_fonts"],
  ["wasm", "wasm"],
  ["iccs", "iccs"],
];

for (const [from, to] of entries) {
  const src = join(pkgDir, from);
  if (!existsSync(src)) {
    console.warn(`[copy-pdf-assets] missing ${from}, skipped`);
    continue;
  }
  cpSync(src, join(out, to), { recursive: true });
}

console.log(`[copy-pdf-assets] pdfjs-dist ${version} -> public/pdfjs/${version}/`);
