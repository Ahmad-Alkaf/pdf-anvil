import Link from "next/link";
import { TOOLS } from "@/lib/tools";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="font-heading text-sm font-semibold tracking-widest text-primary uppercase">404</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">This page does not exist</h1>
      <p className="mt-4 text-muted-foreground">Try one of the tools instead.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {TOOLS.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${t.slug}`}
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
