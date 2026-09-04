import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { KAFLABS_URL, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About PDF Anvil",
  description: "Learn who makes PDF Anvil, how its private PDF tools work, and the limits of browser-based file processing.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web browser",
    browserRequirements: "JavaScript and a current web browser",
    isAccessibleForFree: true,
    publisher: { "@type": "Organization", name: "KafLabs", url: KAFLABS_URL },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 pb-20 sm:px-6 sm:py-16">
      <JsonLd data={jsonLd} />
      <header>
        <h1 className="text-4xl font-bold sm:text-5xl">About PDF Anvil</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          PDF Anvil is a free, browser-based PDF tool from <a className="underline underline-offset-4" href={KAFLABS_URL}>KafLabs</a>.
          It helps you merge, split, rotate, organize, and convert files without an account or a file upload service.
        </p>
      </header>

      <section className="mt-12 space-y-4" aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="text-2xl font-bold">Your files stay on your device</h2>
        <p className="leading-relaxed text-muted-foreground">
          The page downloads application code to your browser. When you select a file, the browser reads and processes it on your device.
          PDF Anvil does not upload selected files to a server for processing or keep a server-side copy of them.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The tools use browser APIs with PDF.js, pdf-lib, and fflate. The result is created in your browser and saved through its normal download feature.
          After the page assets load, file processing does not require an internet connection.
        </p>
      </section>

      <section className="mt-12 space-y-4" aria-labelledby="security-boundary">
        <h2 id="security-boundary" className="text-2xl font-bold">What this privacy model protects</h2>
        <p className="leading-relaxed text-muted-foreground">
          Browser-based processing removes a common risk: sending a document to a third-party conversion server. Your selected files are not sent to a processing server, so PDF Anvil has no server-side file copy, retention, or access to the document contents during processing.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="limits">
        <h2 id="limits" className="text-2xl font-bold">Supported files and limits</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted-foreground">
          <li>PDF tools accept normal, unencrypted PDF files. Password-protected and damaged PDFs can fail to open.</li>
          <li>Image-to-PDF accepts JPG, PNG, and WebP files. JPG and PNG are embedded directly. WebP is decoded and stored as PNG in the new PDF.</li>
          <li>There is no service-side file, page, or daily quota. Your device memory and browser limits still apply. The tool shows a warning for files over 100 MiB.</li>
          <li>PDF-to-image offers 72, 150, and 300 DPI. Very large pages are reduced to stay within a 16-million-pixel browser canvas limit.</li>
          <li>Use a current version of Chrome, Edge, Firefox, or Safari. Large or complex files can take longer or fail on devices with limited memory.</li>
        </ul>
      </section>

      <section className="mt-12 space-y-4" aria-labelledby="contact">
        <h2 id="contact" className="text-2xl font-bold">Ownership and support</h2>
        <p className="leading-relaxed text-muted-foreground">
          KafLabs maintains PDF Anvil. For support or a problem report, email <a className="underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
        <p className="text-sm text-muted-foreground">
          Read the <Link className="underline underline-offset-4" href="/">tool list</Link>, KafLabs <a className="underline underline-offset-4" href="https://kaflabs.com/privacy.html">Privacy Policy</a>, and <a className="underline underline-offset-4" href="https://kaflabs.com/terms.html">Terms</a>.
        </p>
      </section>
    </article>
  );
}
