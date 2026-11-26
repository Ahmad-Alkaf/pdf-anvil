import { describe, expect, it } from "vitest";
import { arabicFontFiles, fontPreloadTag, insertInHead, withFontPreloads } from "../scripts/add-font-preloads.mjs";

const INTER = '<link rel="preload" href="/_next/static/media/a-s.p.woff2" as="font" crossorigin="" type="font/woff2"/>';
const GROTESK = '<link rel="preload" href="/_next/static/media/b-s.p.woff2" as="font" crossorigin="" type="font/woff2"/>';
const CSS = '<link rel="stylesheet" href="/_next/static/chunks/x.css" data-precedence="next"/>';
const SCRIPT = '<link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/y.js"/>';
const META = '<meta charSet="utf-8"/>';

const home = `<!DOCTYPE html><html><head>${META}${INTER}${GROTESK}${CSS}${SCRIPT}</head><body></body></html>`;
const notFound = `<!DOCTYPE html><html><head>${META}${CSS}${SCRIPT}</head><body></body></html>`;

describe("withFontPreloads (postbuild step for out/404.html)", () => {
  it("adds the font preload links of the home page before the first stylesheet", () => {
    expect(withFontPreloads(home, notFound)).toBe(
      `<!DOCTYPE html><html><head>${META}${INTER}${GROTESK}${CSS}${SCRIPT}</head><body></body></html>`,
    );
  });

  it("does not copy the script preload links", () => {
    expect(withFontPreloads(home, notFound).split(SCRIPT).length - 1).toBe(1);
  });

  it("changes nothing when the 404 page already has a font preload (Next.js fixed it)", () => {
    const fixed = `<html><head>${INTER}${CSS}</head></html>`;
    expect(withFontPreloads(home, fixed)).toBe(fixed);
  });

  it("changes nothing when the home page has no font preload", () => {
    expect(withFontPreloads(notFound, notFound)).toBe(notFound);
  });

  it("adds the links before </head> when there is no stylesheet in the head", () => {
    const bare = `<html><head>${META}</head><body>${CSS}</body></html>`;
    expect(withFontPreloads(home, bare)).toBe(`<html><head>${META}${INTER}${GROTESK}</head><body>${CSS}</body></html>`);
  });

  it("is idempotent", () => {
    const once = withFontPreloads(home, notFound);
    expect(withFontPreloads(home, once)).toBe(once);
  });
});

// Shape of the built CSS (Next.js 16.4, next/font/google): Vazirmatn is a
// variable font, so the 400 and 500 faces of one subset share one file.
const ARABIC = "U+6??,U+750-77F,U+870-891,U+200C-200E,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC";
const BUILT_CSS = [
  `@font-face{font-family:Inter;font-style:normal;font-weight:100 900;font-display:swap;src:url(../media/inter-s.p.woff2)format("woff2");unicode-range:U+??,U+131}`,
  `@font-face{font-family:Vazirmatn;font-style:normal;font-weight:400;font-display:swap;src:url(../media/vazir-ar.woff2)format("woff2");unicode-range:${ARABIC}}`,
  `@font-face{font-family:Vazirmatn;font-style:normal;font-weight:400;font-display:swap;src:url(../media/vazir-latin.woff2)format("woff2");unicode-range:U+??,U+131,U+152-153}`,
  `@font-face{font-family:Vazirmatn;font-style:normal;font-weight:500;font-display:swap;src:url(../media/vazir-ar.woff2)format("woff2");unicode-range:${ARABIC}}`,
  `@font-face{font-family:Vazirmatn Fallback;src:local(Arial);ascent-override:101.87%;size-adjust:100.66%}`,
].join("");

describe("arabicFontFiles (postbuild step for the right-to-left pages)", () => {
  it("finds the one Arabic file of Vazirmatn and resolves it against the CSS path", () => {
    expect(arabicFontFiles(BUILT_CSS, "/_next/static/chunks/abc.css")).toEqual(["/_next/static/media/vazir-ar.woff2"]);
  });

  it("ignores the Latin subset, the other families, and the fallback face", () => {
    const latinOnly = BUILT_CSS.replaceAll(ARABIC, "U+100-2BA");
    expect(arabicFontFiles(latinOnly, "/_next/static/chunks/abc.css")).toEqual([]);
  });

  it("accepts a quoted family name and a quoted URL", () => {
    const quoted = `@font-face{font-family:"Vazirmatn";src:url("../media/q.woff2") format("woff2");unicode-range:U+6??}`;
    expect(arabicFontFiles(quoted, "/_next/static/chunks/abc.css")).toEqual(["/_next/static/media/q.woff2"]);
  });
});

describe("insertInHead", () => {
  it("adds each tag once and skips tags that the page has", () => {
    const tag = fontPreloadTag("/_next/static/media/vazir-ar.woff2");
    const once = insertInHead(notFound, [tag, tag]);
    expect(once.split(tag).length - 1).toBe(1);
    expect(once.indexOf(tag)).toBeLessThan(once.indexOf(CSS));
    expect(insertInHead(once, [tag])).toBe(once);
  });
});
