import { ToolShell } from "@/components/tool/tool-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { HowItWorks } from "@/components/seo/how-it-works";
import { Faq } from "@/components/seo/faq";
import { PrivacyNote } from "@/components/seo/privacy-note";
import { RelatedTools } from "@/components/seo/related-tools";
import { toolJsonLd } from "@/lib/seo";
import { getLocaleBundle, resolveRelated, toToolPage, type Locale, type LocalePage } from "@/locales";

export function ToolPage({ locale, page }: { locale: Locale; page: LocalePage }) {
  const { messages } = getLocaleBundle(locale);
  const m = messages.toolShell;

  return (
    <article className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <JsonLd data={toolJsonLd(locale, page)} />
      <header className="py-8 text-center sm:py-12">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{page.h1}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{page.intro}</p>
      </header>

      <ToolShell tool={toToolPage(page)} />

      <div className="mx-auto mt-16 max-w-4xl space-y-14">
        <HowItWorks steps={page.steps} title={m.howItWorks} />
        <PrivacyNote heading={m.privacy.heading} points={m.privacy.points} />
        <Faq items={page.faq} title={m.faq} />
        <RelatedTools locale={locale} pages={resolveRelated(locale, page)} title={m.related} />
      </div>
    </article>
  );
}
