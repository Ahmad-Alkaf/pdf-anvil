import { describe, expect, it } from "vitest";
import { withFontPreloads } from "../scripts/copy-font-preloads.mjs";

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
