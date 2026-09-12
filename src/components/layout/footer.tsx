import Link from "next/link";
import { Logo } from "@/components/logo";
import { GITHUB_REPOSITORY_URL, KAFLABS_PRIVACY_URL, KAFLABS_TERMS_URL, KAFLABS_URL, SUPPORT_EMAIL } from "@/lib/site";
import { getLocaleBundle, localeHref, pagesByPriority, type Locale, type LocaleLink } from "@/locales";
import { formatJsx } from "@/locales/format";

export function Footer({ locale, links }: { locale: Locale; links: readonly LocaleLink[] }) {
  const { messages } = getLocaleBundle(locale);
  const m = messages.footer;
  const brand = (
    <a
      href={KAFLABS_URL}
      target="_blank"
      rel="noopener"
      className="underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground"
    >
      KafLabs
    </a>
  );
  const brandPlain = (
    <a href={KAFLABS_URL} target="_blank" rel="noopener" className="transition-colors hover:text-foreground">
      KafLabs
    </a>
  );
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.4fr]">
          <div>
            <Link href={localeHref(locale)}>
              <Logo size="lg" />
            </Link>
            <p className="mt-3 max-w-72 text-sm leading-relaxed text-muted-foreground">{m.blurb}</p>
            <p className="mt-4 text-xs text-muted-foreground">{formatJsx(m.byline, { brand })}</p>
            {links.length > 1 && (
              <nav aria-label={messages.header.language} className="mt-4">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  {links.map((l) => (
                    <li key={l.code}>
                      {l.code === locale ? (
                        <span aria-current="true" className="font-semibold">
                          {l.name}
                        </span>
                      ) : (
                        <Link
                          href={l.href}
                          hrefLang={l.htmlLang}
                          lang={l.htmlLang}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {l.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold">{m.tools}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3">
              {pagesByPriority(locale).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={localeHref(locale, tool)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t pt-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-muted-foreground">
            {formatJsx(m.copyright, { year: new Date().getFullYear(), brand: brandPlain })}
          </span>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href={GITHUB_REPOSITORY_URL} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {m.source}
            </a>
            <Link href={localeHref(locale, "about")} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {m.about}
            </Link>
            <a
              href={KAFLABS_PRIVACY_URL}
              target="_blank"
              rel="noopener"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {m.privacy}
            </a>
            <a
              href={KAFLABS_TERMS_URL}
              target="_blank"
              rel="noopener"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {m.terms}
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {m.support}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
