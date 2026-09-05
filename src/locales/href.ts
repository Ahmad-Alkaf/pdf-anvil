// URL shape of the locales. Kept apart from the registry so client components
// can build links without bundling every locale's data.

import type { Locale, LocalePage } from "./types";

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Path of a page in a locale. English stays at the root: `/merge-pdf`, `/about`, `/`.
 * Other locales get a prefix: `/es/unir-pdf`, `/es/about`, `/es`.
 * `page` is a locale page, a static path such as "about", or nothing for the home page.
 */
export function localeHref(locale: Locale, page?: LocalePage | string): string {
  const slug = typeof page === "string" ? page : (page?.slug ?? "");
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const path = slug ? `${prefix}/${slug}` : prefix;
  return path || "/";
}
