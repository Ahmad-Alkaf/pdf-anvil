"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Languages, X } from "lucide-react";
import type { Locale, LocaleLink } from "@/locales";

const STORAGE_KEY = "pdfanvil.locale-suggestion.dismissed";

/**
 * Picks the registered locale that the browser prefers most. Walks
 * `navigator.languages` in order and returns the first registered match
 * (exact tag first, then the primary language), or undefined.
 */
export function preferredLocale(browserLanguages: readonly string[], links: readonly LocaleLink[]): LocaleLink | undefined {
  for (const tag of browserLanguages) {
    const lower = tag.toLowerCase();
    const primary = lower.split("-")[0];
    const exact = links.find((l) => l.htmlLang.toLowerCase() === lower);
    if (exact) return exact;
    const byPrimary = links.find((l) => l.htmlLang.toLowerCase().split("-")[0] === primary);
    if (byPrimary) return byPrimary;
  }
  return undefined;
}

// The browser preference and the dismissal flag are external state. They are
// read through useSyncExternalStore, so the server HTML (no bar) and the first
// client render agree, and the bar appears only after hydration.
const listeners = new Set<() => void>();
function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}
function isDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
function dismiss() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // storage blocked: the bar stays away until the next page load
  }
  for (const callback of listeners) callback();
}

/**
 * One-time bar under the header: "This page exists in Spanish" with a link,
 * when the browser prefers a registered locale over the current one. Never
 * redirects. Dismissed once, it stays away (localStorage).
 */
export function LocaleSuggestion({ current, links }: { current: Locale; links: readonly LocaleLink[] }) {
  const code = useSyncExternalStore(
    subscribe,
    () => (isDismissed() ? "" : (preferredLocale(navigator.languages ?? [navigator.language], links)?.code ?? "")),
    () => "",
  );
  const target = code && code !== current ? links.find((l) => l.code === code) : undefined;
  if (!target) return null;

  return (
    <div lang={target.htmlLang} className="border-b bg-accent/60 text-sm text-accent-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <Languages className="size-4 shrink-0" aria-hidden="true" />
        <p className="min-w-0 flex-1">
          {target.suggestion}{" "}
          <Link href={target.href} hrefLang={target.htmlLang} className="font-semibold underline underline-offset-4 hover:text-primary">
            {target.open}
          </Link>
        </p>
        <button type="button" onClick={dismiss} aria-label={target.dismiss} title={target.dismiss} className="rounded-md p-1 hover:bg-background/60">
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
