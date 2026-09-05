# Locales: how to add one language

This document is the contract for a translator agent. Read all of it before you write a file. Follow it exactly. The tests in `__tests__/locales.test.ts` check most of the rules; the caller checks the rest.

## What you make

One folder, five files. Nothing outside the folder changes.

```
src/locales/<code>/
  meta.ts        language facts (code, name, direction, script)
  messages.ts    every UI string of the site, translated
  pages.ts       the tool pages of this language
  index.ts       the bundle (copy the English one and change the suggestion text)
  NOTES.md       your decisions: dropped variants, added variants, search phrases
```

`<code>` is the URL segment of the language: lowercase, `es`, `de`, `pt-br`, `ar`, `zh-cn`. The pages of the language are served at `/<code>/` and `/<code>/<slug>`. English stays at the root URLs and is the reference: `src/locales/en/`.

Start from the English files. `src/locales/en/messages.ts` is the complete list of UI strings. `src/lib/tools.ts` holds the English page copy (English `pages.ts` only maps it). The types are in `src/locales/types.ts`. Every interface there has a comment; the comments are part of this contract.

## meta.ts

```ts
import type { LocaleMeta } from "../types";

export const meta: LocaleMeta = {
  code: "es",          // URL segment, same as the folder name
  name: "Español",     // the language, written in the language
  englishName: "Spanish",
  dir: "ltr",          // "rtl" only for right-to-left scripts (Arabic, Hebrew, Persian, Urdu)
  script: "latin",     // "latin" when the language is written with the Latin alphabet, else "other"
  htmlLang: "es",      // BCP 47 tag: "es", "pt-BR", "zh-Hans"
  ogLocale: "es_ES",   // optional Open Graph locale
};
```

`dir: "rtl"` is allowed only with `script: "other"`.

## messages.ts

Export `messages: Messages`. The type is in `src/locales/types.ts`. Rules:

1. **Complete.** Every key of the English object must exist. The typecheck enforces the shape; the test rejects empty strings and extra keys.
2. **Placeholders stay verbatim.** A placeholder looks like `{name}`. Keep every placeholder of the English string, spelled the same, in the translation. You can move it inside the sentence. Do not translate the name inside the braces. Examples: `{n}`, `{name}`, `{brand}`, `{h1Lower}`.
3. **Plurals** are objects `{ one, other }`. `one` is used when the count is exactly 1, `other` for every other count. `{n}` is the count. Both forms are required, also for languages that do not change the word.
4. **`{brand}`, `{kaflabs}`, `{email}`, `{toolList}`, `{privacy}`, `{terms}`** are links that the code inserts. Keep them.
5. **`toolShell.howToName`** builds the name of the HowTo structured data: `{h1}` is the page h1 as written, `{h1Lower}` is the h1 with its first letter lowercased (acronyms such as "PDF" keep their case). Use the one that reads well after your words.
6. **Product names stay.** "PDF Anvil", "KafLabs", "PDF", "JPG", "PNG", "WebP", "ZIP", "DPI", "A4", "Letter", "AES-256", "Ctrl+P", "Cmd+P", "qpdf" are not translated.
7. **No new keys, no removed keys, no changed placeholders.** If a string cannot be expressed with the placeholders it has, say so in NOTES.md and translate as closely as possible.
8. **Keep the tone**: short sentences, one idea per sentence, plain words, present tense. "Drop a PDF into the box" is the register. No marketing adjectives.
9. `errors` and `errorDetails` are the messages the user sees when a file fails. Keep the code keys as they are and translate the values. In `errorDetails` the values are sentence fragments that appear in parentheses after the main message; keep them lowercase and short.

## pages.ts

Export `pages: readonly LocalePage[]`. Each entry is one tool page of your language. The fields are documented in `types.ts`. The rules:

### (a) One nav page per kind, all kinds required

`kind` is one of the values of `ToolKind` in `src/lib/tools.ts`: `merge`, `split`, `rotate`, `organize`, `images-to-pdf`, `pdf-to-images`, `view`, `compress`, `unlock`, `protect`, `edit`. Every kind must have exactly one page with `nav: true`. That page appears in the header, the home grid, and the footer. The English nav pages are the ones with `nav: true` in `src/lib/tools.ts`.

### (b) Variants are optional

A variant is a second page of a kind for a different search phrase (`nav: false`). English has, for example, `combine-pdf` next to `merge-pdf` and `jpg-to-pdf` next to `image-to-pdf`.

- Drop an English variant when your language has no distinct, commonly searched synonym for it. Do not translate a synonym that nobody searches.
- Add a locale-only variant when your language has an extra common synonym or phrasing that English does not have.
- Never publish two pages of the same kind with the same `title`, `h1`, `intro`, or `description`. The test rejects duplicates.
- Every variant needs its own `intro` and at least three FAQ entries of its own (questions that the nav page of that kind does not have). Shared FAQ entries (privacy, limits, free) can be reused on top of those.

### (c) Slugs

- Latin-script locales (`script: "latin"`): lowercase, ASCII `a-z`, `0-9`, and hyphens only. No accents, no other characters. Translate the slug into the most searched phrase of the language: Spanish `merge-pdf` becomes `unir-pdf`, not `fusionar-pdf`, if "unir pdf" is what people search.
- Non-Latin-script locales (`script: "other"`): a mirrored page keeps the English slug unchanged (`slug === id`). A locale-only variant uses an ASCII slug of your choice, for example `tahrir-pdf`. The test rejects anything else.
- Slugs are unique inside the locale. `about` is reserved.

### (d) Ids

`id` is the identity of the page across languages. hreflang links, the language switcher, and the "related tools" links use it.

- A page that mirrors an English page uses the English slug as its id, whatever its own slug is: `{ id: "merge-pdf", slug: "unir-pdf", ... }`.
- A locale-only variant uses `"<kind>:<word>"`, where `<word>` is a short ASCII form of the phrase: `{ id: "edit:tahrir", slug: "tahrir-pdf", kind: "edit" }`. Such an id must not be an English slug.
- Ids are unique inside the locale. A mirrored id must have the same `kind` as the English page.

### (e) Priority

`priority` orders the header, the home grid, and the footer: 1 is first. Order by local search demand of the phrase, not by the English order. Unique per locale. The nav pages should carry the lowest numbers so that they come first in the footer.

### (f) related

`related` lists page ids (not slugs), two to four of them, never the page itself. Use English ids or ids of your own variants. An id that does not exist in your locale falls back to your nav page of that kind, so it is safe to keep the English lists.

### (g) Other fields

- `description`: 120 to 165 characters. The test enforces it.
- `steps`: exactly three strings.
- `intro`: one or two sentences. The first sentence is shown alone on cards, so it must stand on its own and end with a period (or the sentence stop of your script).
- `keywords`: the search phrases in your language, lowercase, no duplicates.
- `capture` and `defaults` are copied from the English page of the same kind and id. Do not invent new values.
- Do not add `accept`, `multiple`, `input`, `output`, or `icon`. They come from the kind.

## index.ts

```ts
import type { LocaleBundle } from "../types";
import { meta } from "./meta";
import { messages } from "./messages";
import { pages } from "./pages";

export const bundle: LocaleBundle = {
  meta,
  messages,
  pages,
  suggestion: "Esta página existe en español", // "This page exists in <language>", in the language
};

export default bundle;
```

`suggestion` is shown to a visitor of another language whose browser prefers yours. Write it in your language.

## NOTES.md

List, with one line each:

- every English variant you dropped, with the reason;
- every locale-only variant you added, with the search phrase that justifies it;
- for every page, the search phrase you chose for the slug;
- anything you could not translate faithfully and why.

## Checks

Run these from the `pdfanvil` folder and fix every failure:

```
npm run typecheck
npm test
```

The tests find your folder on their own; you do not need to register it.

## Do not

- Do not edit `src/locales/index.ts`. The caller registers the locale.
- Do not edit `src/lib/tools.ts`, `src/locales/en/`, or any component.
- Do not run `npm run build` or `npm run dev`.
- Do not add dependencies.
