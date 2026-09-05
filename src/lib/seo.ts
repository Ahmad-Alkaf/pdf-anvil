// Metadata and JSON-LD per locale. Server-only helpers; the pages and the
// root layout call them with a resolved route.

import type { Metadata, Viewport } from "next";
import {
  ABOUT_ID,
  HOME_ID,
  alternateLanguages,
  getLocaleBundle,
  localeHref,
  ogLocale,
  resolveRoute,
  staticRoutes,
  type Locale,
  type LocaleBundle,
  type LocalePage,
  type Route,
} from "@/locales";
import { format, lowerFirst } from "@/locales/format";
import { OG_SIZE } from "./og-size";
import { KAFLABS_URL, SITE_NAME, SITE_URL } from "./site";

export const SITE_VIEWPORT: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
  colorScheme: "light dark",
};

const PUBLISHER = { "@type": "Organization", name: "KafLabs", url: KAFLABS_URL };

// ---- Open Graph images ------------------------------------------------------
// Rendered by src/app/og/[[...path]]/route.tsx. Slugs are lowercase a-z, 0-9,
// and hyphens, so a leading underscore can never collide with a page.

/** File name of the site image inside a locale folder of /og. */
export const OG_SITE_FILE = "_site.png";

/** Site-relative path of the Open Graph image of a locale page, or of the site image. */
export function ogImagePath(locale: Locale, page?: LocalePage): string {
  const prefix = locale === "en" ? "/og" : `/og/${locale}`;
  return page ? `${prefix}/${page.slug}.png` : `${prefix}/${OG_SITE_FILE}`;
}

/** Every image file, as params of the /og route. */
export function ogImageParams(): { path: string[] }[] {
  return staticRoutes()
    .filter((r) => r.id !== ABOUT_ID)
    .map((r) => {
      const file = r.id === HOME_ID ? OG_SITE_FILE : `${r.path[r.path.length - 1]}.png`;
      const dir = r.id === HOME_ID ? r.path : r.path.slice(0, -1);
      return { path: [...dir, file] };
    });
}

/** Resolve the params of the /og route back to a locale and page. */
export function parseOgPath(segments: readonly string[]): { locale: Locale; page: string; route: Route } | undefined {
  if (segments.length === 0) return undefined;
  const file = segments[segments.length - 1];
  if (!file.endsWith(".png")) return undefined;
  const name = file.slice(0, -".png".length);
  const dir = segments.slice(0, -1);
  const route = resolveRoute(name === OG_SITE_FILE.slice(0, -".png".length) ? dir : [...dir, name]);
  if (!route || (route.kind !== "tool" && `${name}.png` !== OG_SITE_FILE)) return undefined;
  return { locale: route.locale, page: file, route };
}

function ogImages(locale: Locale, page?: LocalePage, alt?: string) {
  return [{ url: ogImagePath(locale, page), width: OG_SIZE.width, height: OG_SIZE.height, type: "image/png", ...(alt ? { alt } : {}) }];
}

function siteTitle(bundle: LocaleBundle): string {
  return `${SITE_NAME} – ${bundle.messages.common.tagline}`;
}

/**
 * "<page title> | PDF Anvil". The layout's `title.template` does not apply to
 * a page of the same route segment, and every page shares the one catch-all
 * segment with the root layout, so the suffix is added here.
 */
function pageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

/** Metadata of the root layout: defaults every page inherits. */
export function rootMetadata(locale: Locale): Metadata {
  const bundle = getLocaleBundle(locale);
  const { common } = bundle.messages;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteTitle(bundle),
      template: `%s | ${SITE_NAME}`,
    },
    description: common.description,
    applicationName: SITE_NAME,
    keywords: common.keywords,
    alternates: { canonical: localeHref(locale) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: `${SITE_URL}${localeHref(locale) === "/" ? "" : localeHref(locale)}`,
      title: siteTitle(bundle),
      description: common.description,
      locale: ogLocale(bundle),
      images: ogImages(locale, undefined, `${SITE_NAME} - ${common.tagline}`),
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle(bundle),
      description: common.description,
      images: ogImages(locale, undefined, `${SITE_NAME} - ${common.tagline}`),
    },
    robots: { index: true, follow: true },
  };
}

export function homeMetadata(locale: Locale): Metadata {
  return {
    alternates: { canonical: localeHref(locale), languages: alternateLanguages(HOME_ID) },
  };
}

export function aboutMetadata(locale: Locale): Metadata {
  const { about } = getLocaleBundle(locale).messages;
  return {
    title: pageTitle(about.metaTitle),
    description: about.metaDescription,
    alternates: { canonical: localeHref(locale, "about"), languages: alternateLanguages(ABOUT_ID) },
  };
}

export function toolMetadata(locale: Locale, page: LocalePage): Metadata {
  const bundle = getLocaleBundle(locale);
  const path = localeHref(locale, page);
  const url = `${SITE_URL}${path}`;
  return {
    title: pageTitle(page.title),
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: path, languages: alternateLanguages(page.id) },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: pageTitle(page.title),
      description: page.description,
      locale: ogLocale(bundle),
      images: ogImages(locale, page),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle(page.title),
      description: page.description,
      images: ogImages(locale, page),
    },
  };
}

// ---- JSON-LD --------------------------------------------------------------

export function homeJsonLd(locale: Locale): object[] {
  const bundle = getLocaleBundle(locale);
  const { common, home } = bundle.messages;
  const inLanguage = bundle.meta.htmlLang;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: common.description,
      inLanguage,
      publisher: PUBLISHER,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage,
      mainEntity: home.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export function aboutJsonLd(locale: Locale): object {
  const bundle = getLocaleBundle(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: bundle.meta.htmlLang,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web browser",
    browserRequirements: "JavaScript and a current web browser",
    isAccessibleForFree: true,
    publisher: PUBLISHER,
  };
}

export function toolJsonLd(locale: Locale, page: LocalePage): object[] {
  const bundle = getLocaleBundle(locale);
  const inLanguage = bundle.meta.htmlLang;
  const url = `${SITE_URL}${localeHref(locale, page)}`;
  const homeUrl = `${SITE_URL}${localeHref(locale) === "/" ? "" : localeHref(locale)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${page.name} – ${SITE_NAME}`,
      url,
      inLanguage,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript",
      description: page.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      isAccessibleForFree: true,
      publisher: PUBLISHER,
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      // "How to merge PDF files online for free". The H1 is a verb phrase.
      name: format(bundle.messages.toolShell.howToName, { h1: page.h1, h1Lower: lowerFirst(page.h1) }),
      description: page.intro,
      inLanguage,
      totalTime: "PT1M",
      step: page.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage,
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: homeUrl },
        { "@type": "ListItem", position: 2, name: page.name, item: url },
      ],
    },
  ];
}
