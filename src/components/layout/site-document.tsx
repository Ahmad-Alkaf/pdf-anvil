import { Inter, Space_Grotesk, Vazirmatn } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/providers/theme-provider";
import { LocaleProvider } from "@/locales/context";
import { getLocaleBundle, localeLinks, toNavPages, type Locale } from "@/locales";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LocaleSuggestion } from "@/components/layout/locale-suggestion";
import { SITE_DOMAIN, UMAMI_SRC, UMAMI_WEBSITE_ID } from "@/lib/site";
import "@/app/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Arabic (and Persian) glyphs. Not preloaded: only right-to-left pages use it,
// and the browser fetches a font file only when text needs it.
const vazirmatn = Vazirmatn({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const analyticsEnabled = Boolean(UMAMI_SRC && UMAMI_WEBSITE_ID);

/**
 * The whole HTML document of one locale: html, body, providers, header,
 * footer. The root layout and the global 404 page both render it, so every
 * page of the site has the same shell.
 *
 * `pageId` is the cross-locale id of the current page ("merge-pdf", "home",
 * "about"). The language switcher and the suggestion bar link to the same
 * page in the other locales, or to their home page when it does not exist.
 */
export function SiteDocument({ locale, pageId, children }: { locale: Locale; pageId: string; children: React.ReactNode }) {
  const bundle = getLocaleBundle(locale);
  const links = localeLinks(pageId);
  return (
    <html
      lang={bundle.meta.htmlLang}
      dir={bundle.meta.dir}
      className={`${inter.variable} ${spaceGrotesk.variable} ${vazirmatn.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <LocaleProvider value={{ locale, meta: bundle.meta, messages: bundle.messages, nav: toNavPages(locale) }}>
            <Header links={links} />
            {links.length > 1 && <LocaleSuggestion current={locale} links={links} />}
            <main className="flex-1">{children}</main>
            <Footer locale={locale} links={links} />
          </LocaleProvider>
        </ThemeProvider>
        {analyticsEnabled && (
          <Script
            src={UMAMI_SRC}
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains={SITE_DOMAIN}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
