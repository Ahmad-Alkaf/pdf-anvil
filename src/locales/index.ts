// Registry of the locales. English is first and lives at the root URLs.
// To publish a locale, import its bundle and add it to LOCALES. Nothing else
// changes: routes, sitemap, alternates, header, footer, and the language
// switcher all read from this list. Read README.md in this folder first.

import { HEADER_LIMIT, type ToolIcon } from "@/lib/tools";
import { KIND_SPEC, KINDS } from "./kinds";
import { DEFAULT_LOCALE, localeHref } from "./href";
import ar from "./ar";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import id from "./id";
import pt from "./pt";
import type { Locale, LocaleBundle, LocalePage } from "./types";

export { DEFAULT_LOCALE, localeHref };
export { KIND_SPEC, KINDS, toToolPage } from "./kinds";
export type * from "./types";

export const LOCALES: readonly LocaleBundle[] = [en, ar, de, es, fr, id, pt];

/** Registered locales other than English, in registry order. */
export const EXTRA_LOCALES: readonly LocaleBundle[] = LOCALES.filter((l) => l.meta.code !== DEFAULT_LOCALE);

export function getLocale(code: string): LocaleBundle | undefined {
  return LOCALES.find((l) => l.meta.code === code);
}

/** The bundle of a registered locale. Throws for an unknown code: routes are enumerated from the registry, so this cannot happen at runtime. */
export function getLocaleBundle(code: Locale): LocaleBundle {
  const bundle = getLocale(code);
  if (!bundle) throw new Error(`Unknown locale "${code}"`);
  return bundle;
}

export function findPage(locale: Locale, id: string): LocalePage | undefined {
  return getLocale(locale)?.pages.find((p) => p.id === id);
}

export function findPageBySlug(locale: Locale, slug: string): LocalePage | undefined {
  return getLocale(locale)?.pages.find((p) => p.slug === slug);
}

const byPriority = (a: LocalePage, b: LocalePage) => a.priority - b.priority;

/** Primary page of each kind, most searched first. Home grid and mobile menu. */
export function navPages(locale: Locale): LocalePage[] {
  return [...getLocaleBundle(locale).pages].filter((p) => p.nav).sort(byPriority);
}

/** Keyword variant pages, most searched first. */
export function variantPages(locale: Locale): LocalePage[] {
  return [...getLocaleBundle(locale).pages].filter((p) => !p.nav).sort(byPriority);
}

/** Every page, nav pages first, then variants. Footer and "All tools". */
export function pagesByPriority(locale: Locale): LocalePage[] {
  return [...navPages(locale), ...variantPages(locale)];
}

/** The direct links of the desktop header. */
export function headerPages(locale: Locale): LocalePage[] {
  return navPages(locale).slice(0, HEADER_LIMIT);
}

/**
 * Related pages of `page` in the same locale. An id that does not exist there
 * falls back to the nav page of the same kind (found through the English
 * page of that id). Duplicates and the page itself are dropped.
 */
export function resolveRelated(locale: Locale, page: LocalePage): LocalePage[] {
  const out: LocalePage[] = [];
  for (const id of page.related) {
    let target = findPage(locale, id);
    if (!target) {
      const kind = findPage(DEFAULT_LOCALE, id)?.kind ?? kindOfId(id);
      target = kind ? navPages(locale).find((p) => p.kind === kind) : undefined;
    }
    if (!target || target.id === page.id || out.some((p) => p.id === target!.id)) continue;
    out.push(target);
  }
  return out;
}

/** The kind of a locale-only id "<kind>:<word>", or undefined. */
export function kindOfId(id: string): LocalePage["kind"] | undefined {
  const kind = id.split(":")[0];
  return KINDS.find((k) => k === kind);
}

export interface Alternate {
  hrefLang: string;
  /** Site-relative path. */
  href: string;
}

/** Reserved ids of the static pages, which exist in every locale. */
export const HOME_ID = "home";
export const ABOUT_ID = "about";

/**
 * hreflang links of a page id: one per locale where the id exists, plus
 * "x-default" pointing at English when the English page exists.
 */
export function alternatesFor(id: string): Alternate[] {
  const out: Alternate[] = [];
  for (const locale of LOCALES) {
    const href = hrefOfId(locale, id);
    if (href !== undefined) out.push({ hrefLang: locale.meta.htmlLang, href });
  }
  const english = hrefOfId(en, id);
  if (english !== undefined) out.push({ hrefLang: "x-default", href: english });
  return out;
}

/** `alternatesFor` as the `languages` map of Next metadata and sitemap entries. */
export function alternateLanguages(id: string, base = ""): Record<string, string> {
  return Object.fromEntries(alternatesFor(id).map((a) => [a.hrefLang, `${base}${a.href}`]));
}

function hrefOfId(locale: LocaleBundle, id: string): string | undefined {
  if (id === HOME_ID) return localeHref(locale.meta.code);
  if (id === ABOUT_ID) return localeHref(locale.meta.code, "about");
  const page = locale.pages.find((p) => p.id === id);
  return page ? localeHref(locale.meta.code, page) : undefined;
}

// ---- routing --------------------------------------------------------------

export type Route =
  | { locale: Locale; kind: "home"; id: typeof HOME_ID }
  | { locale: Locale; kind: "about"; id: typeof ABOUT_ID }
  | { locale: Locale; kind: "tool"; id: string; page: LocalePage };

/** Resolve a URL path (as segments) to a locale and a page. */
export function resolveRoute(segments: readonly string[]): Route | undefined {
  const [first, ...rest] = segments;
  const extra = first !== undefined ? EXTRA_LOCALES.find((l) => l.meta.code === first) : undefined;
  const locale = extra ? extra.meta.code : DEFAULT_LOCALE;
  const tail = extra ? rest : segments;
  if (tail.length === 0) return { locale, kind: "home", id: HOME_ID };
  if (tail.length !== 1) return undefined;
  if (tail[0] === "about") return { locale, kind: "about", id: ABOUT_ID };
  const page = findPageBySlug(locale, tail[0]);
  return page ? { locale, kind: "tool", id: page.id, page } : undefined;
}

/** Path segments of a route, for links and static params. */
export function routePath(locale: Locale, page?: LocalePage | "about"): string[] {
  return localeHref(locale, page === "about" ? "about" : page).split("/").filter(Boolean);
}

/** Every page of every locale, as URL segments. Drives generateStaticParams and the sitemap. */
export function staticRoutes(): { locale: Locale; id: string; path: string[] }[] {
  const out: { locale: Locale; id: string; path: string[] }[] = [];
  for (const { meta, pages } of LOCALES) {
    out.push({ locale: meta.code, id: HOME_ID, path: routePath(meta.code) });
    out.push({ locale: meta.code, id: ABOUT_ID, path: routePath(meta.code, "about") });
    for (const page of pages) out.push({ locale: meta.code, id: page.id, path: routePath(meta.code, page) });
  }
  return out;
}

/** Open Graph locale of a bundle. */
export function ogLocale(bundle: LocaleBundle): string {
  return bundle.meta.ogLocale ?? bundle.meta.htmlLang.replace("-", "_");
}

/** The pages a client component needs for navigation, in registry order: no FAQ, no steps. */
export interface NavPage {
  id: string;
  slug: string;
  kind: LocalePage["kind"];
  nav: boolean;
  priority: number;
  name: string;
  navLabel: string;
  icon: ToolIcon;
}

export function toNavPages(locale: Locale): NavPage[] {
  return getLocaleBundle(locale).pages.map(({ id, slug, kind, nav, priority, name, navLabel }) => ({
    id,
    slug,
    kind,
    nav,
    priority,
    name,
    navLabel,
    icon: KIND_SPEC[kind].icon,
  }));
}

/** Links of the language switcher and the suggestion bar for one page id. */
export interface LocaleLink {
  code: Locale;
  htmlLang: string;
  name: string;
  href: string;
  /** "This page exists in Spanish", in Spanish. */
  suggestion: string;
  open: string;
  dismiss: string;
}

export function localeLinks(id: string): LocaleLink[] {
  return LOCALES.map((l) => ({
    code: l.meta.code,
    htmlLang: l.meta.htmlLang,
    name: l.meta.name,
    href: hrefOfId(l, id) ?? localeHref(l.meta.code),
    suggestion: l.suggestion,
    open: l.messages.header.suggestionOpen,
    dismiss: l.messages.header.suggestionDismiss,
  }));
}
