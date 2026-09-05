"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ToolIconGlyph } from "@/components/tool-icon";
import { HEADER_TOOLS, NAV_TOOLS, VARIANT_TOOLS } from "@/lib/tools";
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

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const allRef = useRef<HTMLLIElement>(null);
  const allPanelId = useId();
  // The theme is only known in the browser. Reading it during hydration makes the
  // server HTML (light) differ from the first client render (dark) and throws
  // React error #418 for dark-mode visitors. Until mount, both icons are rendered
  // and CSS picks one, so the markup is identical on both sides.
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const [animateIcon, setAnimateIcon] = useState(false);
  const themeLabel = !mounted ? "Toggle theme" : isDark ? "Switch to light theme" : "Switch to dark theme";
  const iconAnimation = animateIcon ? "animate-theme-icon-enter motion-reduce:animate-none" : "";

  // Close both menus after navigation (state adjusted during render).
  const [trackedPath, setTrackedPath] = useState(pathname);
  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    setOpen(false);
    setAllOpen(false);
  }

  // "All tools" panel: close on Escape and on a click outside.
  useEffect(() => {
    if (!allOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAllOpen(false);
    }
    function onPointer(e: PointerEvent) {
      if (allRef.current && !allRef.current.contains(e.target as Node)) setAllOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [allOpen]);

  const linkClass = (active: boolean) =>
    cn(
      "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
      active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Tools" className="hidden shrink-0 md:block">
          <ul className="flex items-center gap-1">
            {HEADER_TOOLS.map((tool, i) => {
              const active = pathname === `/${tool.slug}`;
              return (
                <li key={tool.slug} className={i >= MD_LINKS ? "hidden lg:block" : undefined}>
                  <Link href={`/${tool.slug}`} aria-current={active ? "page" : undefined} className={linkClass(active)}>
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
                All tools
                <ChevronDown className={cn("size-4 transition-transform", allOpen && "rotate-180")} aria-hidden="true" />
              </button>
              {allOpen && (
                <div
                  id={allPanelId}
                  className="absolute right-0 top-full mt-2 w-[34rem] max-w-[calc(100vw-2rem)] rounded-xl border bg-card p-3 text-card-foreground shadow-lg"
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {NAV_TOOLS.map((tool) => {
                      const active = pathname === `/${tool.slug}`;
                      return (
                        <li key={tool.slug}>
                          <Link
                            href={`/${tool.slug}`}
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
                  <p className="mt-3 border-t px-3 pt-3 text-xs font-medium text-muted-foreground">More pages</p>
                  <ul className="mt-1 flex flex-wrap gap-x-1 gap-y-0.5 px-1">
                    {VARIANT_TOOLS.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/${tool.slug}`}
                          aria-current={pathname === `/${tool.slug}` ? "page" : undefined}
                          className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
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
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Tools" className="border-t md:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3">
            {NAV_TOOLS.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.slug}`}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium",
                    pathname === `/${tool.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-muted",
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
