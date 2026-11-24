"use client";

import { useLayoutEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { resolveTheme, THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Each navigation changes the `[[...path]]` param, so the root layout mounts again and React
 * resets the attributes of <html>. next-themes adds the theme class again only in an effect,
 * which runs after the browser paints, so a dark page showed one or more light frames (a white
 * flash) at each navigation. A layout effect runs before that paint and puts the class and the
 * color scheme back, with the same values that next-themes then sets.
 */
function ThemeAttributesRestore() {
  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Storage blocked: next-themes then uses the system theme too.
    }
    const theme = resolveTheme(stored, matchMedia("(prefers-color-scheme: dark)").matches);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, []);
  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey={THEME_STORAGE_KEY}
    >
      <ThemeAttributesRestore />
      {children}
    </NextThemesProvider>
  );
}
