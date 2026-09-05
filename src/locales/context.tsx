"use client";

// The locale of the current page, for client components. The root layout
// renders the provider with the bundle of the locale; components read
// strings through `useMessages()` and navigation data through `useLocale()`.

import { createContext, useContext, type ReactNode } from "react";
import type { NavPage } from "./index";
import type { Locale, LocaleMeta, Messages } from "./types";

export interface LocaleContextValue {
  locale: Locale;
  meta: LocaleMeta;
  messages: Messages;
  /** Every page of the locale, in registry order. Sort by `priority` for menus. */
  nav: NavPage[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ value, children }: { value: LocaleContextValue; children: ReactNode }) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function useMessages(): Messages {
  return useLocale().messages;
}
