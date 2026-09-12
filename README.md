# PDF Anvil

Free PDF tools that run in your browser. Merge, split, rotate, organize, convert images to PDF, and
convert PDF pages to images. Files never leave the device. No account, no upload, no limits.

A [KafLabs](https://kaflabs.com) product. Live at https://pdf-anvil.com.

[Open PDF Anvil](https://pdf-anvil.com) · [View source](https://github.com/Ahmad-Alkaf/pdf-anvil)

![PDF Anvil home page with its PDF tools and public source link](docs/screenshots/home.jpg)

## Design decisions

- All file processing runs in the browser. Documents do not need a server upload or an account.
- A static Next.js export serves the interface and tool pages without a processing server.
- A shared tool registry supplies the routes and page content. Each tool loads its own client component when needed.
- Locale bundles keep the interface and tool pages available in multiple languages, with tests for missing keys and invalid routes.

## Development

```
npm install
npm run dev
```

`npm run dev` and `npm run build` first run `scripts/copy-pdf-assets.mjs`, which copies the pdf.js
worker, cmaps, fonts, and wasm files into `public/pdfjs/<version>/`. That folder is git-ignored.

Other scripts:

```
npm run typecheck
npm run lint
npm test
npm run icons
```

`npm run icons` regenerates `public/icons/*.png` and `src/app/favicon.ico` from the SVG mark in
`src/lib/brand.ts`. Commit the outputs.

## Environment variables

All variables are inlined at build time. See `.env.example`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Public site URL for canonical links, sitemap, and Open Graph |
| `NEXT_PUBLIC_UMAMI_SRC` | Optional Umami `script.js` URL. Empty disables the script |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional Umami website id |

## Add a tool

1. Add an entry to `src/lib/tools.ts` (slug, copy, steps, FAQ, related tools).
2. Add a pure function in `src/lib/pdf/` that takes bytes and options and returns output bytes.
3. Add a tool component in `src/components/tool/tools/` that uses the shared pieces (dropzone, file list, page grid, action bar, result panel).
4. Map the slug in `src/components/tool/tool-registry.client.ts`.

The route, metadata, sitemap, header, footer, and related-tools links update from the registry.

## Checks and license

Run `npm run typecheck`, `npm run lint`, and `npm test` before submitting a change.
Vitest checks the PDF operations, tool registry, and locale contracts. Run `npm run build` to check the static export.

The source is public under [PolyForm Noncommercial 1.0.0](LICENSE). See the license for permitted uses and conditions.
