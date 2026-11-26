// Adds font preload links that Next.js does not emit to the HTML files of the
// static export. Runs after `next build` (npm post-script). Both parts only
// warn when they find nothing, so they cannot stop a deploy.
//
// 1. The 404 page (out/404.html and its copy out/_not-found.html) gets the
//    font preload links of the home page (out/index.html). Next.js 16.4 emits
//    none for src/app/global-not-found.tsx: its font manifest has the entry
//    "[project]/src/app/_not-found/page", but the render looks up the path of
//    global-not-found and finds nothing. Without them the fonts swap at about
//    3 s on a slow phone, the tool links wrap again, and the footer moves
//    (phone CLS 0.161). The part does nothing when a 404 file already has a
//    font preload link; then Next.js emits them itself and the part can go.
//
// 2. Each right-to-left page (`dir="rtl"`, Arabic) gets a preload link for the
//    Arabic file of Vazirmatn. site-document.tsx loads Vazirmatn with
//    `preload: false`, because a preload there would add the file to every
//    page. Without it the font swaps at about 2.4 s on a slow phone and the
//    hero text wraps into more lines (phone CLS 0.079 on /ar).
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const FONT_PRELOAD = /<link rel="preload" href="[^"]+" as="font"[^>]*\/>/g;
const STYLESHEET = /<link rel="stylesheet" href="([^"]+\.css)"/g;
// The Arabic block U+0600-06FF, as Google Fonts writes it in unicode-range.
const ARABIC_RANGE = "U+6??";
const ARABIC_FAMILY = "Vazirmatn";

/** @param {string} href */
export function fontPreloadTag(href) {
  return `<link rel="preload" href="${href}" as="font" crossorigin="" type="font/woff2"/>`;
}

/** @param {string} html */
function hasFontPreload(html) {
  return (html.match(FONT_PRELOAD) ?? []).length > 0;
}

/**
 * Returns the HTML document `target` with `tags` added before its first
 * stylesheet link in the head (or before `</head>`). Leaves out each tag that
 * is already in the document. Returns `target` unchanged when nothing is new
 * or when it has no `</head>`.
 * @param {string} target
 * @param {readonly string[]} tags
 * @returns {string}
 */
export function insertInHead(target, tags) {
  const added = [...new Set(tags)].filter((tag) => !target.includes(tag));
  const headEnd = target.indexOf("</head>");
  if (added.length === 0 || headEnd === -1) return target;
  const stylesheet = target.indexOf('<link rel="stylesheet"');
  const at = stylesheet !== -1 && stylesheet < headEnd ? stylesheet : headEnd;
  return target.slice(0, at) + added.join("") + target.slice(at);
}

/**
 * Returns the HTML document `target` with the font preload links of `source`
 * added. Returns `target` unchanged when it already has a font preload link
 * or when `source` has none.
 * @param {string} source
 * @param {string} target
 * @returns {string}
 */
export function withFontPreloads(source, target) {
  if (hasFontPreload(target)) return target;
  return insertInHead(target, source.match(FONT_PRELOAD) ?? []);
}

/**
 * Returns the URL paths of the Arabic font files of `family` in a built CSS
 * file: the `src` of each `@font-face` with that family and the Arabic block
 * in its `unicode-range`. Relative URLs resolve against `cssPath`.
 * @param {string} css
 * @param {string} cssPath URL path of the CSS file, for example "/_next/static/chunks/a.css"
 * @param {string} [family]
 * @returns {string[]}
 */
export function arabicFontFiles(css, cssPath, family = ARABIC_FAMILY) {
  const files = new Set();
  for (const [face] of css.matchAll(/@font-face\s*\{[^}]*\}/g)) {
    const name = face.match(/font-family:\s*["']?([^;"'}]+)/)?.[1]?.trim();
    const range = face.match(/unicode-range:\s*([^;}]+)/)?.[1] ?? "";
    const src = face.match(/url\(\s*["']?([^"')]+\.woff2)["']?\s*\)/)?.[1];
    if (name !== family || !src || !range.split(",").some((r) => r.trim() === ARABIC_RANGE)) continue;
    files.add(new URL(src, `https://build.invalid${cssPath}`).pathname);
  }
  return [...files];
}

/** @param {string} dir @returns {string[]} */
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "_next" ? [] : htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

/** @param {string} out */
function addTo404(out) {
  const source = join(out, "index.html");
  if (!existsSync(source)) return console.warn("[add-font-preloads] out/index.html is missing; the 404 part did nothing.");
  const sourceHtml = readFileSync(source, "utf8");
  for (const name of ["404.html", "_not-found.html"]) {
    const file = join(out, name);
    if (!existsSync(file)) {
      console.warn(`[add-font-preloads] out/${name} is missing; skipped.`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    const result = withFontPreloads(sourceHtml, html);
    if (result === html) console.log(`[add-font-preloads] out/${name} unchanged (it has font preloads, or index.html has none).`);
    else {
      writeFileSync(file, result);
      console.log(`[add-font-preloads] added the font preload links to out/${name}.`);
    }
  }
}

/** @param {string} out */
function addToRtlPages(out) {
  const pages = htmlFiles(out).filter((file) => /<html[^>]*\sdir="rtl"/.test(readFileSync(file, "utf8").slice(0, 2000)));
  if (pages.length === 0) return console.log("[add-font-preloads] no right-to-left page.");
  /** @type {Map<string, string[]>} */
  const byCss = new Map();
  let changed = 0;
  for (const file of pages) {
    const html = readFileSync(file, "utf8");
    /** @type {string[]} */
    const tags = [];
    for (const [, cssPath] of html.matchAll(STYLESHEET)) {
      if (!byCss.has(cssPath)) {
        const cssFile = join(out, cssPath);
        byCss.set(cssPath, existsSync(cssFile) ? arabicFontFiles(readFileSync(cssFile, "utf8"), cssPath) : []);
      }
      tags.push(...(byCss.get(cssPath) ?? []).map(fontPreloadTag));
    }
    if (tags.length === 0) {
      console.warn(`[add-font-preloads] no ${ARABIC_FAMILY} Arabic font file in the CSS of out/${relative(out, file)}; skipped.`);
      continue;
    }
    const result = insertInHead(html, tags);
    if (result !== html) {
      writeFileSync(file, result);
      changed++;
    }
  }
  console.log(`[add-font-preloads] added the ${ARABIC_FAMILY} Arabic preload link to ${changed} of ${pages.length} right-to-left pages.`);
}

function main() {
  const out = join(dirname(fileURLToPath(import.meta.url)), "..", "out");
  if (!existsSync(out)) return console.warn("[add-font-preloads] out/ is missing; nothing changed.");
  addTo404(out);
  addToRtlPages(out);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
