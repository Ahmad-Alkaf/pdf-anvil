@AGENTS.md

Shared organization rules, product list, and shell rules are in the parent `../CLAUDE.md` (the `kaflabs-org` folder).

## Architecture

**PDF Anvil** (https://pdf-anvil.com) is a free PDF toolbox built with Next.js 16, React 19, and Tailwind CSS 4. Every tool runs in the browser.

- **Browser-only processing.** There are no API routes, no database, no auth, and no uploads. `pdf-lib` edits documents, `pdfjs-dist` renders pages. Never add a server-side file endpoint; the privacy claim on every page depends on it.
- **Registry-driven tools.** `src/lib/tools.ts` holds every tool definition (slug, copy, FAQ, steps). `src/app/[[...path]]/page.tsx` renders them statically. The client-side map from slug to tool component is `src/components/tool/tool-registry.client.ts` (each tool is a `next/dynamic` chunk with `ssr: false`). Adding a tool = one registry entry, one pure function in `src/lib/pdf/`, one tool component in `src/components/tool/tools/` built from the shared pieces (dropzone, file list, page grid, action bar, result panel, `useToolRunner`).
- **Routing.** One optional catch-all segment `src/app/[[...path]]/` holds the root layout and the page for every URL: `/`, `/about`, `/<slug>` (English) and `/<locale>`, `/<locale>/about`, `/<locale>/<slug>`. `src/locales/index.ts` `resolveRoute()` maps a path to a locale and a page; `staticRoutes()` feeds `generateStaticParams` and the sitemap. Two dynamic segments with different names cannot share one URL depth in Next.js, so English tool pages and locale home pages must be resolved from the same segment. The 404 page is `src/app/global-not-found.tsx` (`experimental.globalNotFound`), a full document, exported as `out/404.html`. Open Graph images are a static Route Handler, `src/app/og/[[...path]]/route.tsx` (`/og/merge-pdf.png`, `/og/_site.png`, `/og/<locale>/...`), because a metadata image file cannot follow a catch-all segment.
- **Viewer** (`kind: "view"`, `output: "none"`) only shows the file. Pages render lazily into canvases (`src/lib/pdf/render-page.ts`, two at a time, freed when they scroll away). Print opens the original file as a blob URL in a new tab; the browser's own PDF viewer prints it. Do not print the canvases.
- **pdf.js assets** come from `scripts/copy-pdf-assets.mjs` (runs on `predev` and `prebuild`) into `public/pdfjs/<version>/`. Never commit `public/pdfjs`. `src/lib/pdf/pdfjs.ts` is the only file that knows that path.
- **Read files twice.** pdf.js transfers its input buffer to the worker and detaches it. Never hand the same `Uint8Array` to pdf.js and pdf-lib.
- **Icons** come from one SVG path in `src/lib/brand.ts`. Run `npm run icons` to regenerate `public/icons/*` and `src/app/favicon.ico`, and commit the outputs. `icon.tsx`, `apple-icon.tsx`, and `opengraph-image.tsx` render the same path with `ImageResponse`.
- **Static export.** `next.config.ts` sets `output: "export"`; `wrangler.jsonc` serves `out/`. Never add anything that needs a server at runtime. `NEXT_PUBLIC_*` variables are build-time only. Hosting details are in `../kaflabs/DEPLOY-PLAN.md`.
- **Analytics** script renders only when both `NEXT_PUBLIC_UMAMI_*` variables are set. `src/lib/analytics.ts` `track()` must never throw.

## Locales

- One folder per language: `src/locales/<code>/{meta.ts, messages.ts, pages.ts, index.ts, NOTES.md}`. English copy lives in `src/lib/tools.ts` (pages) and `src/locales/en/messages.ts` (every UI string); `src/locales/en/pages.ts` only maps the registry. Components read strings through `useMessages()` / `useLocale()` (`src/locales/context.tsx`); server code uses `getLocaleBundle(locale)`.
- A page `id` is the English slug when the page mirrors an English page, or `<kind>:<word>` for a locale-only variant. Every locale has exactly one `nav: true` page per kind; variants are optional and need their own intro and three own FAQ entries.
- The translator contract is `src/locales/README.md`. A locale is published by adding its bundle to `LOCALES` in `src/locales/index.ts`; `__tests__/locales.test.ts` validates every folder, registered or not.

## Commands

- `npm run dev`, `npm run build`, `npm start`
- `npm run typecheck`, `npm run lint`, `npm test` (Vitest, `__tests__/`; fixtures built with pdf-lib and sharp, no pdf.js rendering)
- `npm run icons`
