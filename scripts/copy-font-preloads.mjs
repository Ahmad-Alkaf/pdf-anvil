// Copies the font preload links of the home page (out/index.html) into the
// 404 page of the static export (out/404.html and its copy out/_not-found.html).
// Runs after `next build` (npm post-script).
//
// Why: Next.js 16.4 emits no font preload links in the page of
// src/app/global-not-found.tsx. Its font manifest has the entry
// "[project]/src/app/_not-found/page", but the render looks up the path of
// global-not-found, finds nothing, and skips the preloads. Without them the
// fonts arrive late and swap at about 3 s on a slow phone, the tool links of
// the 404 page wrap into one more row, and the footer moves (phone CLS 0.161).
// The step does nothing when a 404 file already has a font preload link, so it
// stops when Next.js emits the links itself; then delete it.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const FONT_PRELOAD = /<link rel="preload" href="[^"]+" as="font"[^>]*\/>/g;

/**
 * Returns the HTML document `target` with the font preload links of `source`
 * added before its first stylesheet link (or before `</head>`). Returns
 * `target` unchanged when it already has a font preload link, when `source`
 * has none, or when `target` has no `</head>`.
 * @param {string} source
 * @param {string} target
 * @returns {string}
 */
export function withFontPreloads(source, target) {
  const tags = source.match(FONT_PRELOAD) ?? [];
  if (tags.length === 0 || hasFontPreload(target)) return target;
  const headEnd = target.indexOf("</head>");
  if (headEnd === -1) return target;
  const stylesheet = target.indexOf('<link rel="stylesheet"');
  const at = stylesheet !== -1 && stylesheet < headEnd ? stylesheet : headEnd;
  return target.slice(0, at) + tags.join("") + target.slice(at);
}

/** @param {string} html */
function hasFontPreload(html) {
  return (html.match(FONT_PRELOAD) ?? []).length > 0;
}

function main() {
  const out = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
  const source = join(out, "index.html");
  if (!existsSync(source)) {
    console.warn("[copy-font-preloads] out/index.html is missing; nothing changed.");
    return;
  }
  const sourceHtml = readFileSync(source, "utf8");
  for (const name of ["404.html", "_not-found.html"]) {
    const file = join(out, name);
    if (!existsSync(file)) {
      console.warn(`[copy-font-preloads] out/${name} is missing; skipped.`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    const result = withFontPreloads(sourceHtml, html);
    if (result === html) {
      console.log(`[copy-font-preloads] out/${name} unchanged (it has font preloads, or index.html has none).`);
    } else {
      writeFileSync(file, result);
      console.log(`[copy-font-preloads] added the font preload links to out/${name}.`);
    }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
