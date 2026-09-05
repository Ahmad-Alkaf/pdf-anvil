/// <reference types="vite/client" />
import { describe, expect, it } from "vitest";
import { TOOLS } from "@/lib/tools";
import { DETAIL_MESSAGES, MESSAGES } from "@/lib/pdf/errors";
import {
  ABOUT_ID,
  DEFAULT_LOCALE,
  HOME_ID,
  KINDS,
  LOCALES,
  alternatesFor,
  findPage,
  getLocale,
  kindOfId,
  localeHref,
  navPages,
  resolveRelated,
  resolveRoute,
  staticRoutes,
  type LocaleBundle,
  type LocalePage,
} from "@/locales";
import { bundle as en } from "@/locales/en";
import { firstSentence, format, lowerFirst, plural } from "@/locales/format";
import { preferredLocale } from "@/components/layout/locale-suggestion";

// Every folder under src/locales with an index.ts, registered or not, so a
// translator can validate a locale before the caller registers it.
const FOLDERS = import.meta.glob<{ default: LocaleBundle }>("../src/locales/*/index.ts", { eager: true });
const ALL: LocaleBundle[] = Object.values(FOLDERS).map((m) => m.default);

const LATIN_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ENGLISH_SLUGS = new Set(en.pages.map((p) => p.slug));
const ENGLISH_IDS = new Set(en.pages.map((p) => p.id));

/** Every `{name}` token of a string, in order of first appearance. */
function placeholders(text: string): string[] {
  return [...new Set([...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]))].sort();
}

/** Flatten a messages object into "path.to.key" -> string. Arrays of objects and plurals are walked too. */
function flatten(value: unknown, path = "", out: Record<string, string> = {}): Record<string, string> {
  if (typeof value === "string") {
    out[path] = value;
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => flatten(v, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) flatten(v, path ? `${path}.${k}` : k, out);
  }
  return out;
}

const EN_FLAT = flatten(en.messages);

describe("locale folders", () => {
  it("finds the English folder", () => {
    expect(ALL.some((b) => b.meta.code === "en")).toBe(true);
  });

  for (const bundle of ALL) {
    const code = bundle.meta.code;
    const nav = bundle.pages.filter((p) => p.nav);

    describe(`locale ${code}`, () => {
      it("has one nav page per kind and covers every kind", () => {
        const kinds = nav.map((p) => p.kind);
        expect(new Set(kinds).size, "one nav page per kind").toBe(kinds.length);
        expect([...new Set(kinds)].sort()).toEqual([...KINDS].sort());
      });

      it("has unique slugs that follow the script rule", () => {
        const slugs = bundle.pages.map((p) => p.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
        expect(slugs).not.toContain("about");
        for (const slug of slugs) {
          expect(slug, `${code}/${slug}`).toMatch(LATIN_SLUG);
          if (bundle.meta.script === "other") expect(ENGLISH_SLUGS.has(slug), `${code}/${slug} must keep the English slug`).toBe(true);
        }
      });

      it("has unique ids; mirrored ids exist in English; locale-only ids name their kind", () => {
        const ids = bundle.pages.map((p) => p.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const page of bundle.pages) {
          if (page.id.includes(":")) {
            expect(kindOfId(page.id), `${code}/${page.id}`).toBe(page.kind);
            expect(ENGLISH_SLUGS.has(page.id)).toBe(false);
          } else {
            const english = en.pages.find((p) => p.id === page.id);
            expect(english, `${code}/${page.id} is not an English slug`).toBeDefined();
            expect(page.kind, `${code}/${page.id} kind`).toBe(english!.kind);
          }
        }
      });

      it("only relates to ids that exist somewhere and never to itself", () => {
        for (const page of bundle.pages) {
          expect(page.related.length, page.id).toBeGreaterThan(0);
          for (const id of page.related) {
            expect(id, page.id).not.toBe(page.id);
            const known = ENGLISH_IDS.has(id) || bundle.pages.some((p) => p.id === id);
            expect(known, `${code}/${page.id} -> ${id}`).toBe(true);
          }
        }
      });

      it("gives no two pages of one kind the same title, h1, or intro", () => {
        for (const field of ["title", "h1", "intro", "description"] as const) {
          const values = bundle.pages.map((p) => p[field]);
          expect(new Set(values).size, field).toBe(values.length);
        }
      });

      it("gives every variant its own intro and own FAQ entries", () => {
        // English is the reference and is governed by tools.test.ts (pdf-to-png has two own
        // entries). A translation must give every variant at least three.
        const minimum = code === DEFAULT_LOCALE ? 1 : 3;
        for (const variant of bundle.pages.filter((p) => !p.nav)) {
          const primary = nav.find((p) => p.kind === variant.kind)!;
          expect(variant.intro, variant.slug).not.toBe(primary.intro);
          const primaryQuestions = new Set(primary.faq.map((f) => f.q));
          const own = variant.faq.filter((f) => !primaryQuestions.has(f.q));
          expect(own.length, `${code}/${variant.slug} needs ${minimum} own FAQ entries`).toBeGreaterThanOrEqual(minimum);
        }
      });

      it("has well-formed copy on every page", () => {
        const priorities = bundle.pages.map((p) => p.priority);
        expect(new Set(priorities).size, "unique priority").toBe(priorities.length);
        for (const page of bundle.pages) {
          expect(page.description.length, `${code}/${page.slug} description`).toBeGreaterThanOrEqual(120);
          expect(page.description.length, `${code}/${page.slug} description`).toBeLessThanOrEqual(165);
          expect(page.steps).toHaveLength(3);
          for (const s of page.steps) expect(s.length).toBeGreaterThan(0);
          expect(page.faq.length, page.slug).toBeGreaterThan(0);
          expect(page.keywords.length, page.slug).toBeGreaterThan(0);
          for (const text of [page.name, page.navLabel, page.title, page.h1, page.intro, page.actionLabel]) {
            expect(text.trim().length, page.slug).toBeGreaterThan(0);
          }
        }
      });

      it("has a complete messages object with no empty string and the English placeholders", () => {
        const flat = flatten(bundle.messages);
        for (const [key, english] of Object.entries(EN_FLAT)) {
          const text = flat[key];
          expect(typeof text, `${code} ${key}`).toBe("string");
          expect(text.trim().length, `${code} ${key} is empty`).toBeGreaterThan(0);
          expect(placeholders(text), `${code} ${key} placeholders`).toEqual(placeholders(english));
        }
        for (const key of Object.keys(flat)) expect(key in EN_FLAT, `${code} has extra key ${key}`).toBe(true);
        expect(bundle.suggestion.trim().length).toBeGreaterThan(0);
        expect(bundle.messages.errors).toEqual(expect.objectContaining(Object.fromEntries(Object.keys(MESSAGES).map((k) => [k, expect.any(String)]))));
        expect(Object.keys(bundle.messages.errorDetails).sort()).toEqual(Object.keys(DETAIL_MESSAGES).sort());
      });

      it("has a consistent meta", () => {
        expect(bundle.meta.code).toMatch(/^[a-z]{2,3}(?:-[a-z0-9]{2,8})?$/);
        expect(bundle.meta.htmlLang.toLowerCase().startsWith(bundle.meta.code.split("-")[0])).toBe(true);
        expect(["ltr", "rtl"]).toContain(bundle.meta.dir);
        if (bundle.meta.dir === "rtl") expect(bundle.meta.script).toBe("other");
        expect(bundle.meta.name.length).toBeGreaterThan(0);
        expect(bundle.meta.englishName.length).toBeGreaterThan(0);
      });
    });
  }
});

describe("registry", () => {
  it("puts English first at the root and registers only known folders", () => {
    expect(LOCALES[0].meta.code).toBe(DEFAULT_LOCALE);
    expect(getLocale("en")).toBe(en);
    expect(getLocale("zz")).toBeUndefined();
    for (const l of LOCALES) expect(ALL.map((b) => b.meta.code)).toContain(l.meta.code);
  });

  it("keeps the English pages equal to TOOLS one to one", () => {
    expect(en.pages).toHaveLength(TOOLS.length);
    en.pages.forEach((page, i) => {
      const tool = TOOLS[i];
      expect(page.id).toBe(tool.slug);
      expect(page.slug).toBe(tool.slug);
      const copy = Object.fromEntries(Object.entries(tool).filter(([k]) => !["icon", "accept", "multiple", "input", "output"].includes(k)));
      expect(page).toEqual({ id: tool.slug, ...copy });
    });
  });

  it("shapes hrefs by locale", () => {
    const page = en.pages[0];
    expect(localeHref("en")).toBe("/");
    expect(localeHref("en", "about")).toBe("/about");
    expect(localeHref("en", page)).toBe(`/${page.slug}`);
    expect(localeHref("es")).toBe("/es");
    expect(localeHref("es", "about")).toBe("/es/about");
    expect(localeHref("es", { ...page, slug: "unir-pdf" })).toBe("/es/unir-pdf");
  });

  it("lists symmetric alternates with x-default only when English exists", () => {
    const ids = new Set<string>([HOME_ID, ABOUT_ID]);
    for (const l of LOCALES) for (const p of l.pages) ids.add(p.id);
    for (const id of ids) {
      const alternates = alternatesFor(id);
      const langs = alternates.map((a) => a.hrefLang);
      expect(new Set(langs).size, id).toBe(langs.length);
      const hasEnglish = id === HOME_ID || id === ABOUT_ID || ENGLISH_IDS.has(id);
      expect(langs.includes("x-default"), id).toBe(hasEnglish);
      if (hasEnglish) expect(alternates.find((a) => a.hrefLang === "x-default")!.href).toBe(alternates.find((a) => a.hrefLang === en.meta.htmlLang)!.href);
      // Symmetric: every listed locale lists the same set for this id.
      for (const a of alternates.filter((x) => x.hrefLang !== "x-default")) {
        const locale = LOCALES.find((l) => l.meta.htmlLang === a.hrefLang)!;
        const there = alternatesFor(id).map((x) => x.hrefLang);
        expect(there, `${locale.meta.code} ${id}`).toEqual(langs);
      }
      if (!hasEnglish) expect(alternates).toHaveLength(1);
    }
  });

  it("resolves related ids with a fallback to the nav page of the kind", () => {
    for (const l of LOCALES) {
      for (const page of l.pages) {
        const related = resolveRelated(l.meta.code, page);
        expect(related.length, `${l.meta.code}/${page.slug}`).toBeGreaterThan(0);
        expect(related.map((p) => p.id)).not.toContain(page.id);
        expect(new Set(related.map((p) => p.id)).size).toBe(related.length);
      }
    }
    const merge = findPage("en", "merge-pdf")!;
    const fake: LocalePage = { ...merge, id: "merge:test", slug: "x", related: ["edit:unknown", "sign-pdf", "sign-pdf", "merge-pdf"] };
    expect(resolveRelated("en", fake).map((p) => p.id)).toEqual(["edit-pdf", "sign-pdf", "merge-pdf"]);
    expect(navPages("en").map((p) => p.kind)).toEqual([...new Set(navPages("en").map((p) => p.kind))]);
  });

  it("resolves every static route back to itself", () => {
    const routes = staticRoutes();
    expect(routes.length).toBe(LOCALES.reduce((n, l) => n + l.pages.length + 2, 0));
    for (const r of routes) {
      const route = resolveRoute(r.path);
      expect(route, r.path.join("/")).toBeDefined();
      expect(route!.locale).toBe(r.locale);
      expect(route!.id).toBe(r.id);
    }
    expect(resolveRoute(["nope"])).toBeUndefined();
    expect(resolveRoute(["about", "x"])).toBeUndefined();
    expect(resolveRoute(["en"])).toBeUndefined();
  });
});

describe("format helpers", () => {
  it("fills placeholders and plurals", () => {
    expect(format("Reading file {i} of {total}", { i: 1, total: 2 })).toBe("Reading file 1 of 2");
    expect(format("{missing} stays", {})).toBe("{missing} stays");
    expect(plural({ one: "{n} page", other: "{n} pages" }, 1)).toBe("1 page");
    expect(plural({ one: "{n} page", other: "{n} pages" }, 3)).toBe("3 pages");
  });

  it("cuts the first sentence like the English cards did", () => {
    for (const tool of TOOLS) expect(firstSentence(tool.intro)).toBe(tool.intro.split(". ")[0] + ".");
    expect(firstSentence("ファイルを結合します。順序を変更できます。")).toBe("ファイルを結合します。");
    expect(firstSentence("No stop here")).toBe("No stop here");
  });

  it("lowercases the first letter unless the word is an acronym", () => {
    for (const tool of TOOLS) expect(lowerFirst(tool.h1)).toBe(tool.h1.charAt(0).toLowerCase() + tool.h1.slice(1));
    expect(lowerFirst("PDF zusammenführen")).toBe("PDF zusammenführen");
  });

  it("picks the browser language that matches a registered locale first", () => {
    const links = [
      { code: "en", htmlLang: "en" },
      { code: "pt-br", htmlLang: "pt-BR" },
      { code: "es", htmlLang: "es" },
    ].map((l) => ({ ...l, name: l.code, href: "/", suggestion: "", open: "", dismiss: "" }));
    expect(preferredLocale(["es-MX", "en"], links)?.code).toBe("es");
    expect(preferredLocale(["en-US", "es"], links)?.code).toBe("en");
    expect(preferredLocale(["pt-PT"], links)?.code).toBe("pt-br");
    expect(preferredLocale(["de"], links)).toBeUndefined();
  });
});
