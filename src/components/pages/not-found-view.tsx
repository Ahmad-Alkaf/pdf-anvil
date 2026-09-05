"use client";

import Link from "next/link";
import { useLocale } from "@/locales/context";
import { localeHref } from "@/locales/href";

/**
 * 404 content. Reads the locale from the provider of the layout it renders
 * in, so the same view serves every locale and the global 404 page.
 */
export function NotFoundView() {
  const { locale, messages, nav } = useLocale();
  const m = messages.notFound;
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="font-heading text-sm font-semibold tracking-widest text-primary uppercase">{m.code}</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{m.title}</h1>
      <p className="mt-4 text-muted-foreground">{m.text}</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {nav.map((t) => (
          <li key={t.slug}>
            <Link
              href={localeHref(locale, t.slug)}
              className="rounded-full border px-4 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
