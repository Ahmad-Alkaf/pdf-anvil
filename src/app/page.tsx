import Link from "next/link";
import { ArrowRight, Lock, Infinity as InfinityIcon, Gift } from "lucide-react";
import { Mark } from "@/components/logo";
import { ToolIconGlyph } from "@/components/tool-icon";
import { JsonLd } from "@/components/seo/json-ld";
import { Faq } from "@/components/seo/faq";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

const HOME_FAQ = [
  {
    q: "How can the tools be free with no limits?",
    a: "Your own device does the work. There is no server that processes files, so there is no processing cost for us to pass on. The site is a small static app.",
  },
  {
    q: "Do you store my files?",
    a: "No. Files are never uploaded. They are opened in your browser, edited there, and the result is saved from there. Close the tab and nothing is left.",
  },
  {
    q: "Do I need to install anything or create an account?",
    a: "No. Open a tool, drop a file, download the result. No sign-up, no extension, no app.",
  },
  {
    q: "Which browsers work?",
    a: "Current versions of Chrome, Edge, Firefox, and Safari on desktop and mobile. Very large files need a device with enough memory.",
  },
  {
    q: "Who makes PDF Anvil?",
    a: "PDF Anvil is a KafLabs product. KafLabs builds small, free, privacy-first web tools.",
  },
];

export default function HomePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@type": "Organization", name: "KafLabs", url: "https://kaflabs.com" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOME_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <JsonLd data={jsonLd} />

      <section className="py-14 text-center sm:py-20">
        <div className="animate-fade-in mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
          <Mark className="size-10" />
        </div>
        <h1 className="animate-fade-in-up mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">{SITE_TAGLINE}</h1>
        <p className="animate-fade-in-up mx-auto mt-5 max-w-2xl text-lg text-muted-foreground [animation-delay:80ms]">
          Merge, split, rotate, organize, and convert PDFs. No upload, no account, no limits. Your files never leave
          your device.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Lock className="size-4 text-primary" aria-hidden="true" /> 100% in your browser
          </li>
          <li className="flex items-center gap-1.5">
            <InfinityIcon className="size-4 text-primary" aria-hidden="true" /> No file or page limits
          </li>
          <li className="flex items-center gap-1.5">
            <Gift className="size-4 text-primary" aria-hidden="true" /> Free, no watermark
          </li>
        </ul>
      </section>

      <section aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="sr-only">
          Tools
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <li key={tool.slug} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
              <Link
                href={`/${tool.slug}`}
                className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ToolIconGlyph icon={tool.icon} className="size-6" />
                </span>
                <span className="mt-4 text-xl font-bold">{tool.name}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.intro.split(". ")[0]}.</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Open tool
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="why-heading" className="mt-20 grid gap-8 rounded-2xl border bg-muted/40 p-8 sm:grid-cols-3 sm:p-10">
        <div className="sm:col-span-3">
          <h2 id="why-heading" className="text-2xl font-bold sm:text-3xl">
            Why in the browser?
          </h2>
        </div>
        <div>
          <h3 className="font-semibold">Privacy you can verify</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Open the network tab of your browser while you use a tool. You will see no upload. The document is
            processed by code that runs on your device.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Fast, with no queue</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            No waiting for an upload, a server queue, and a download. Most operations finish in under a second.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Free without a catch</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            No premium tier, no daily quota, no watermark, no account. The tools cost nothing to run per file, so
            they cost nothing to use.
          </p>
        </div>
      </section>

      <div className="mx-auto mt-20 max-w-4xl">
        <Faq items={HOME_FAQ} />
      </div>
    </div>
  );
}
