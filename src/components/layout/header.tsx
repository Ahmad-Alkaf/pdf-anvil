"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Check, ChevronDown, Languages, Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ToolIconGlyph } from "@/components/tool-icon";
import { HEADER_LIMIT } from "@/lib/tools";
import { useLocale } from "@/locales/context";
import { localeHref } from "@/locales/href";
import type { LocaleLink } from "@/locales";
import { cn } from "@/lib/utils";

// `false` during server rendering and hydration, `true` after mount.
// Hydration-safe replacement for the "set mounted in an effect" pattern.
const noopSubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

// The header shows a fixed budget of direct links, ordered by search demand
// (`priority` in the registry). Links past MD_LINKS are hidden until the `lg`
// breakpoint. Every tool, direct or not, is also in the "All tools" panel, so a
// new tool never changes the header width.
const MD_LINKS = 3;

/** Close a panel on Escape and on a pointer down outside `ref`. */
function useDismiss(open: boolean, close: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close, ref]);
}

export function Header({ links }: { links: readonly LocaleLink[] }) {
  const pathname = usePathname();
  const { locale, messages, nav } = useLocale();
  const m = messages.header;
  const byPriority = (a: { priority: number }, b: { priority: number }) => a.priority - b.priority;
  const navTools = nav.filter((p) => p.nav).sort(byPriority);
  const variantTools = nav.filter((p) => !p.nav).sort(byPriority);
  const headerTools = navTools.slice(0, HEADER_LIMIT);
  const href = (slug: string) => localeHref(locale, slug);
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const allRef = useRef<HTMLLIElement>(null);
  const allPanelId = useId();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const langPanelId = useId();
  const current = links.find((l) => l.code === locale);
  // The theme is only known in the browser. Reading it during hydration makes the
  // server HTML (light) differ from the first client render (dark) and throws
  // React error #418 for dark-mode visitors. Until mount, both icons are rendered
  // and CSS picks one, so the markup is identical on both sides.
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const [animateIcon, setAnimateIcon] = useState(false);
  const themeLabel = !mounted ? m.toggleTheme : isDark ? m.switchToLight : m.switchToDark;
  const iconAnimation = animateIcon ? "animate-theme-icon-enter motion-reduce:animate-none" : "";

  // Close both menus after navigation (state adjusted during render).
  const [trackedPath, setTrackedPath] = useState(pathname);
  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    setOpen(false);
    setAllOpen(false);
    setLangOpen(false);
  }

  const closeAll = useCallback(() => setAllOpen(false), []);
  const closeLang = useCallback(() => setLangOpen(false), []);
  useDismiss(allOpen, closeAll, allRef);
  useDismiss(langOpen, closeLang, langRef);

  const linkClass = (active: boolean) =>
    cn(
      "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
      active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={localeHref(locale)} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={m.toolsNav} className="hidden shrink-0 md:block">
          <ul className="flex items-center gap-1">
            {headerTools.map((tool, i) => {
              const active = pathname === href(tool.slug);
              return (
                <li key={tool.slug} className={i >= MD_LINKS ? "hidden lg:block" : undefined}>
                  <Link href={href(tool.slug)} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                    {tool.navLabel}
                  </Link>
                </li>
              );
            })}
            <li className="relative" ref={allRef}>
              <button
                type="button"
                className={cn(linkClass(allOpen), "inline-flex items-center gap-1")}
                aria-expanded={allOpen}
                aria-controls={allPanelId}
                aria-haspopup="true"
                onClick={() => setAllOpen((v) => !v)}
              >
                {m.allTools}
                <ChevronDown className={cn("size-4 transition-transform", allOpen && "rotate-180")} aria-hidden="true" />
              </button>
              {allOpen && (
                <div
                  id={allPanelId}
                  className="absolute inset-e-0 top-full mt-2 w-136 max-w-[calc(100vw-2rem)] rounded-xl border bg-card p-3 text-card-foreground shadow-lg"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {navTools.map((tool) => {
                      const active = pathname === href(tool.slug);
                      return (
                        <li key={tool.slug}>
                          <Link
                            href={href(tool.slug)}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                              active ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                            )}
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                              <ToolIconGlyph icon={tool.icon} className="size-4" />
                            </span>
                            {tool.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {variantTools.length > 0 && (
                    <>
                      <p className="mt-3 border-t px-3 pt-3 text-xs font-medium text-muted-foreground">{m.morePages}</p>
                      <ul className="mt-1 flex flex-wrap gap-x-1 gap-y-0.5 px-1">
                        {variantTools.map((tool) => (
                          <li key={tool.slug}>
                            <Link
                              href={href(tool.slug)}
                              aria-current={pathname === href(tool.slug) ? "page" : undefined}
                              className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                              {tool.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          {links.length > 1 && (
            <div className="relative" ref={langRef}>
              <button
                type="button"
                className={cn(linkClass(langOpen), "inline-flex h-9 items-center gap-1.5 px-2.5")}
                aria-label={m.language}
                title={m.language}
                aria-expanded={langOpen}
                aria-controls={langPanelId}
                aria-haspopup="true"
                onClick={() => setLangOpen((v) => !v)}
              >
                <Languages className="size-4.5" aria-hidden="true" />
                <span className="hidden sm:inline">{current?.name ?? locale}</span>
                <ChevronDown className={cn("hidden size-4 transition-transform sm:inline", langOpen && "rotate-180")} aria-hidden="true" />
              </button>
              {langOpen && (
                <nav
                  id={langPanelId}
                  aria-label={m.language}
                  className="absolute inset-e-0 top-full mt-2 w-56 rounded-xl border bg-card p-2 text-card-foreground shadow-lg"
                >
                  <ul className="grid gap-0.5">
                    {links.map((l) => {
                      const active = l.code === locale;
                      return (
                        <li key={l.code}>
                          <Link
                            href={l.href}
                            hrefLang={l.htmlLang}
                            lang={l.htmlLang}
                            aria-current={active ? "true" : undefined}
                            className={cn(
                              "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm",
                              active ? "bg-accent font-medium text-accent-foreground" : "hover:bg-muted",
                            )}
                          >
                            {l.name}
                            {active && <Check className="size-4" aria-hidden="true" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
            </div>
          )}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:active:scale-100"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={() => {
              setAnimateIcon(true);
              setTheme(isDark ? "light" : "dark");
            }}
          >
            {!mounted ? (
              <>
                <Sun className="hidden size-4.5 dark:block" aria-hidden="true" />
                <Moon className="size-4.5 dark:hidden" aria-hidden="true" />
              </>
            ) : isDark ? (
              <Sun key="sun" className={cn("size-4.5", iconAnimation)} aria-hidden="true" />
            ) : (
              <Moon key="moon" className={cn("size-4.5", iconAnimation)} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? m.closeMenu : m.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={m.toolsNav} className="border-t md:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3">
            {navTools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={href(tool.slug)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium",
                    pathname === href(tool.slug) ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                  )}
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
