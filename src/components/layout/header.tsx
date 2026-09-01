"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { TOOLS } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            {TOOLS.map((tool) => {
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

      {open && (
        <nav id="mobile-nav" aria-label="Tools" className="border-t md:hidden">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-3">
            {TOOLS.map((tool) => (
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
