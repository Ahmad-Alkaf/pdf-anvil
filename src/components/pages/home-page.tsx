import Link from "next/link";
import { ArrowRight, Lock, Infinity as InfinityIcon, Gift } from "lucide-react";
import { Mark } from "@/components/logo";
import { ToolIconGlyph } from "@/components/tool-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { Faq } from "@/components/seo/faq";
import { homeJsonLd } from "@/lib/seo";
import { KIND_SPEC, getLocaleBundle, localeHref, navPages, variantPages, type Locale } from "@/locales";
import { firstSentence } from "@/locales/format";

const TRUST_ICONS = [Lock, InfinityIcon, Gift] as const;

export function HomePage({ locale }: { locale: Locale }) {
  const { messages } = getLocaleBundle(locale);
  const m = messages.home;
  const nav = navPages(locale);
  const variants = variantPages(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <JsonLd data={homeJsonLd(locale)} />

      <section className="py-14 text-center sm:py-20">
        <div className="animate-fade-in mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
          <Mark className="size-10" />
        </div>
        <h1 className="animate-fade-in-up mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">{messages.common.tagline}</h1>
        <p className="animate-fade-in-up mx-auto mt-5 max-w-2xl text-lg text-muted-foreground [animation-delay:80ms]">{m.hero}</p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {m.trust.map((text, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <li key={text} className="flex items-center gap-1.5">
                <Icon className="size-4 text-primary" aria-hidden="true" /> {text}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="sr-only">
          {m.toolsHeading}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nav.map((tool, i) => (
            <li key={tool.slug} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
              <Link
                href={localeHref(locale, tool)}
                className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ToolIconGlyph icon={KIND_SPEC[tool.kind].icon} className="size-6" />
                </span>
                <span className="mt-4 text-xl font-bold">{tool.name}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{firstSentence(tool.intro)}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {m.openTool}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {variants.length > 0 && (
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span>{m.also}</span>
            {variants.map((tool, i) => (
              <span key={tool.slug}>
                <Link
                  href={localeHref(locale, tool)}
                  className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {tool.name}
                </Link>
                {i < variants.length - 1 ? " ·" : ""}
              </span>
            ))}
          </p>
        )}
      </section>

      <section aria-labelledby="why-heading" className="mt-20 grid gap-8 rounded-2xl border bg-muted/40 p-8 sm:grid-cols-3 sm:p-10">
        <div className="sm:col-span-3">
          <h2 id="why-heading" className="text-2xl font-bold sm:text-3xl">
            {m.whyHeading}
          </h2>
        </div>
        {m.why.map((card) => (
          <div key={card.title}>
            <h3 className="font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
          </div>
        ))}
      </section>

      <div className="mx-auto mt-20 max-w-4xl">
        <Faq items={m.faq} title={messages.toolShell.faq} />
      </div>
    </div>
  );
}
