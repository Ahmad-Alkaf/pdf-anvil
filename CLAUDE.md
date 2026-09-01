@AGENTS.md

Shared organization rules, product list, and shell rules are in the parent `../CLAUDE.md` (the `kaflabs-org` folder).

## Architecture

**PDF Anvil** (https://pdf-anvil.com) is a free PDF toolbox built with Next.js 16, React 19, and Tailwind CSS 4. Every tool runs in the browser.

- **Browser-only processing.** There are no API routes, no database, no auth, and no uploads. `pdf-lib` edits documents, `pdfjs-dist` renders pages. Never add a server-side file endpoint; the privacy claim on every page depends on it.
- **Registry-driven tools.** `src/lib/tools.ts` holds the six tool definitions (slug, copy, FAQ, steps). `src/app/(tools)/[slug]/page.tsx` renders them statically. The client-side map from slug to tool component is `src/components/tool/tool-registry.client.ts` (each tool is a `next/dynamic` chunk with `ssr: false`). Adding a tool = one registry entry, one pure function in `src/lib/pdf/`, one tool component in `src/components/tool/tools/` built from the shared pieces (dropzone, file list, page grid, action bar, result panel, `useToolRunner`).
- **pdf.js assets** come from `scripts/copy-pdf-assets.mjs` (runs on `predev` and `prebuild`) into `public/pdfjs/<version>/`. Never commit `public/pdfjs`. `src/lib/pdf/pdfjs.ts` is the only file that knows that path.
- **Read files twice.** pdf.js transfers its input buffer to the worker and detaches it. Never hand the same `Uint8Array` to pdf.js and pdf-lib.
- **Icons** come from one SVG path in `src/lib/brand.ts`. Run `npm run icons` to regenerate `public/icons/*` and `src/app/favicon.ico`, and commit the outputs. `icon.tsx`, `apple-icon.tsx`, and `opengraph-image.tsx` render the same path with `ImageResponse`.
- **Deploy** is the `Dockerfile` on Coolify. `NEXT_PUBLIC_*` variables are build-time only.
- **Analytics** is self-hosted Umami, enabled only when both `NEXT_PUBLIC_UMAMI_*` variables are set. `src/lib/analytics.ts` `track()` must never throw.

## Commands

- `npm run dev`, `npm run build`, `npm start`
- `npm run typecheck`, `npm run lint`
- `npm run icons`
