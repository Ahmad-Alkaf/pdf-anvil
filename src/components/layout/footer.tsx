import Link from "next/link";
import { Logo } from "@/components/logo";
import { KAFLABS_PRIVACY_URL, KAFLABS_TERMS_URL, KAFLABS_URL, SUPPORT_EMAIL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_1.4fr]">
          <div>
            <Link href="/" aria-label="PDF Anvil home">
              <Logo size="lg" />
            </Link>
            <p className="mt-3 max-w-72 text-sm leading-relaxed text-muted-foreground">
              Free PDF tools that run in your browser. No upload, no account, no limits.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              A{" "}
              <a
                href={KAFLABS_URL}
                target="_blank"
                rel="noopener"
                className="underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground"
              >
                KafLabs
              </a>{" "}
              product
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Tools</h4>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3">
              {TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
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
            &copy; {new Date().getFullYear()}{" "}
            <a href={KAFLABS_URL} target="_blank" rel="noopener" className="transition-colors hover:text-foreground">
              KafLabs
            </a>
            . All rights reserved.
          </span>
          <div className="flex gap-4">
            <a
              href={KAFLABS_PRIVACY_URL}
              target="_blank"
              rel="noopener"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </a>
            <a
              href={KAFLABS_TERMS_URL}
              target="_blank"
              rel="noopener"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
