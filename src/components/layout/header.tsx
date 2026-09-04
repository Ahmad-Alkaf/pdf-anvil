"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { NAV_TOOLS } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const isDark = resolvedTheme === "dark";

  // Close the mobile menu after navigation (state adjusted during render).
  const [trackedPath, setTrackedPath] = useState(pathname);
  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="PDF Anvil home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Tools" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_TOOLS.map((tool) => {
              const active = pathname === `/${tool.slug}`;
              return (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {tool.navLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:active:scale-100"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? (
              <Sun key="sun" className="size-4.5 animate-theme-icon-enter motion-reduce:animate-none" aria-hidden="true" />
            ) : (
              <Moon key="moon" className="size-4.5 animate-theme-icon-enter motion-reduce:animate-none" aria-hidden="true" />
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
