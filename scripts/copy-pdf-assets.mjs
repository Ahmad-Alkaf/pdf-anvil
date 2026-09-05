// Copies runtime assets that are loaded lazily by URL, not bundled:
//   - pdf.js worker and its cmaps, standard fonts, wasm, icc profiles
//     -> public/pdfjs/<version>/   (used by src/lib/pdf/pdfjs.ts)
//   - qpdf compiled to WebAssembly (glue + wasm from the pdfstudio package)
//     -> public/qpdf/<version>/    (used by src/lib/pdf/qpdf.ts)
// Runs before `next dev` and `next build` (npm pre-scripts).
// public/pdfjs/ and public/qpdf/ are git-ignored and regenerated on every run.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function copyPackageAssets(pkgName, outName, entries) {
  const pkgDir = join(root, "node_modules", pkgName);
  if (!existsSync(pkgDir)) {
    console.error(`[copy-pdf-assets] ${pkgName} is not installed. Run npm install first.`);
    process.exit(1);
  }

  const { version } = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
  const outRoot = join(root, "public", outName);
  const out = join(outRoot, version);

  rmSync(outRoot, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  for (const [from, to] of entries) {
    const src = join(pkgDir, from);
    if (!existsSync(src)) {
      console.warn(`[copy-pdf-assets] missing ${pkgName}/${from}, skipped`);
      continue;
    }
    cpSync(src, join(out, to), { recursive: true });
  }

  console.log(`[copy-pdf-assets] ${pkgName} ${version} -> public/${outName}/${version}/`);
}

copyPackageAssets("pdfjs-dist", "pdfjs", [
  ["build/pdf.worker.min.mjs", "pdf.worker.min.mjs"],
  ["cmaps", "cmaps"],
  ["standard_fonts", "standard_fonts"],
  ["wasm", "wasm"],
  ["iccs", "iccs"],
]);

copyPackageAssets("pdfstudio", "qpdf", [
  ["dist/wasm/qpdf.js", "qpdf.js"],
  ["dist/wasm/qpdf.wasm", "qpdf.wasm"],
]);
