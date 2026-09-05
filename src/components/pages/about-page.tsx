import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { KAFLABS_PRIVACY_URL, KAFLABS_TERMS_URL, KAFLABS_URL, SUPPORT_EMAIL } from "@/lib/site";
import { aboutJsonLd } from "@/lib/seo";
import { getLocaleBundle, localeHref, type Locale } from "@/locales";
import { formatJsx } from "@/locales/format";

export function AboutPage({ locale }: { locale: Locale }) {
  const m = getLocaleBundle(locale).messages.about;
  const linkClass = "underline underline-offset-4";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 pb-20 sm:px-6 sm:py-16">
      <JsonLd data={aboutJsonLd(locale)} />
      <header>
        <h1 className="text-4xl font-bold sm:text-5xl">{m.h1}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {formatJsx(m.intro, {
            kaflabs: (
              <a className={linkClass} href={KAFLABS_URL}>
                KafLabs
              </a>
            ),
          })}
        </p>
      </header>

      <section className="mt-12 space-y-4" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="text-2xl font-bold">
          {m.files.heading}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{m.files.p1}</p>
        <p className="leading-relaxed text-muted-foreground">{m.files.p2}</p>
      </section>

      <section className="mt-12 space-y-4" aria-labelledby="security-boundary">
        <h2 id="security-boundary" className="text-2xl font-bold">
          {m.privacy.heading}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{m.privacy.p}</p>
      </section>

      <section className="mt-12" aria-labelledby="limits">
        <h2 id="limits" className="text-2xl font-bold">
          {m.limits.heading}
        </h2>
        <ul className="mt-4 list-disc space-y-3 ps-5 leading-relaxed text-muted-foreground">
          {m.limits.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-4" aria-labelledby="contact">
        <h2 id="contact" className="text-2xl font-bold">
          {m.contact.heading}
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          {formatJsx(m.contact.p, {
            email: (
              <a className={linkClass} href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
            ),
          })}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatJsx(m.contact.links, {
            toolList: (
              <Link className={linkClass} href={localeHref(locale)}>
                {m.contact.toolList}
              </Link>
            ),
            privacy: (
              <a className={linkClass} href={KAFLABS_PRIVACY_URL}>
                {m.contact.privacy}
              </a>
            ),
            terms: (
              <a className={linkClass} href={KAFLABS_TERMS_URL}>
                {m.contact.terms}
              </a>
            ),
          })}
        </p>
      </section>
    </article>
  );
}
