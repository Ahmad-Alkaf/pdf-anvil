# Italian (it): translator notes

Written in English so the reviewer can compare quickly. Locale `it`, Latin script, `dir: ltr`, `htmlLang: it`, `ogLocale: it_IT`. Standard Italian, "tu" form, imperative in UI strings, infinitive in page names, h1, and nav labels (the register of Italian PDF sites such as Smallpdf; iLovePDF uses the imperative, which appears in slugs and keywords where it is the searched form). Demand figures are Bing, 3 months, 2026, as given by the caller; only "unisci pdf" (109K) came with a number.

## Slugs: search phrase per page

| id | slug | phrase | note |
|---|---|---|---|
| merge-pdf | unisci-pdf | "unisci pdf" 109K | nav, priority 1. Imperative chosen over `unire-pdf` because the imperative is the phrase with the number; "unire pdf" and "unire file pdf" lead the title and keywords |
| combine-pdf | combinare-pdf | "combinare pdf" | variant |
| split-pdf | dividere-pdf | "dividere pdf" | nav; "dividi pdf", "tagliare pdf" in keywords |
| extract-pdf-pages | estrarre-pagine-pdf | "estrarre pagine pdf" | variant, extract-pages angle |
| split:separare | separare-pdf | "separare pdf" | locale-only variant, see below |
| rotate-pdf | ruotare-pdf | "ruotare pdf" | nav; "girare pdf" in keywords |
| organize-pdf | riordinare-pagine-pdf | "riordinare pagine pdf" | nav; "eliminare pagine pdf" is the second keyword and leads the description |
| jpg-to-pdf | jpg-in-pdf | "jpg in pdf" | variant |
| png-to-pdf | png-in-pdf | "png in pdf" | variant |
| webp-to-pdf | webp-in-pdf | "webp in pdf" | variant, kept: the format name is the phrase and the FAQ is format-specific |
| image-to-pdf | immagine-in-pdf | "immagine in pdf" | nav (the general term, as in English) |
| scan-to-pdf | scansionare-in-pdf | "scansionare in pdf" | variant |
| pdf-to-jpg | pdf-in-jpg | "pdf in jpg" | variant |
| pdf-to-png | pdf-in-png | "pdf in png" | variant |
| pdf-to-image | pdf-in-immagine | "pdf in immagine" | nav |
| compress-pdf | comprimere-pdf | "comprimere pdf" | nav |
| reduce-pdf-size | ridurre-dimensioni-pdf | "ridurre dimensioni pdf" | variant |
| unlock-pdf | sbloccare-pdf | "sbloccare pdf" | nav; "rimuovere password pdf" in the title and keywords |
| protect-pdf | proteggere-pdf | "proteggere pdf" | nav |
| pdf-viewer | aprire-pdf | "aprire pdf" | nav; "leggere pdf" and "lettore pdf" in the title and keywords; page name "Lettore PDF" |
| edit-pdf | modificare-pdf | "modificare pdf" | nav; "editor pdf" folded into the title and keywords, as English folds "pdf editor" into `edit-pdf` |
| sign-pdf | firmare-pdf | "firmare pdf" | variant |

## English variants dropped

None. Every English variant has a distinct, searched Italian phrase (see the table).

## Locale-only variants added

- `split:separare` (slug `separare-pdf`, kind split): "separare pdf" and "separare pagine pdf" are common searched phrasings that neither "dividere pdf" (split into files) nor "estrarre pagine pdf" (take pages out) covers by name. Own title, description, h1, intro, steps, and five own FAQ entries (how to separate, split in half, separare vs. dividere, phone, quality). Linked from `extract-pdf-pages`.

## Variant decisions

- merge: "unire" (nav) vs. "combinare" (variant). Both are searched; the variant answers "combinare vs. unire" in its own FAQ.
- split: "dividere" (nav), "estrarre pagine" (English variant kept), "separare" (locale-only variant). Three distinct phrases with distinct intents.
- compress: "comprimere" (nav) vs. "ridurre dimensioni" (variant). "ridurre dimensioni pdf" carries the email-limit intent; "ridurre pdf" and "alleggerire pdf" are keywords of the nav page.
- edit: no separate "editor pdf" page; same intent as "modificare pdf". `sign-pdf` kept as `firmare-pdf`.
- images: all four English variants kept (`jpg-in-pdf`, `png-in-pdf`, `webp-in-pdf`, `scansionare-in-pdf`); the nav page is the general `immagine-in-pdf`.

## Priority

Nav pages 1-11 by Italian demand: unisci (1), comprimere (2), modificare (3), dividere (4), immagine in pdf (5), pdf in immagine (6), aprire (7), sbloccare (8), proteggere (9), ruotare (10), riordinare (11). Variants 12-22: jpg in pdf (12), pdf in jpg (13), firmare (14), combinare (15), ridurre dimensioni (16), estrarre pagine (17), separare (18), png in pdf (19), pdf in png (20), scansionare (21), webp (22).

## Strings without a direct equivalent, and how they were handled

- "Whiteout": "bianchetto" (the Italian word for correction fluid, understood by every reader). Tool button "Bianchetto", the item "Rettangolo bianco", prose "coprire con il bianchetto".
- "Letter" page size: "Lettera (Letter)" in the option label and FAQ prose; "Lettera" alone in meta descriptions where length is tight.
- "Upload" vs. "page load": "caricare" / "caricamento" is reserved for upload. Page load is written as "una volta aperta la pagina" so that "caricare" never means two things.
- "Font" vs. "character": Italian "carattere" means both. "font" (invariable loan word, standard in Italian software) is used for typefaces, "carattere" only for a character.
- "Fit width": "Adatta alla larghezza". "Fit to image": "Adatta all'immagine".
- "Press Delete": "Premi Canc" (the key label on Italian keyboards). "Escape": "Esc".
- "Owner password" / "user password": "password del proprietario" / "password utente"; "password di apertura" for the open password. "Permissions": "autorizzazioni".
- `howToName`: "Come {h1Lower} online gratis". Every h1 starts with an infinitive ("Unire file PDF", "Aprire e leggere un PDF"), so the lowercased h1 reads as a verb phrase after "Come".
- `errorDetails`: Italian guillemets « » replace the English straight quotes around `{part}`. Guillemets also mark quoted UI labels in FAQ prose.
- `footer.byline`: "Un prodotto di {brand}".
- Plural of "PDF" and "file": both invariable in Italian ("due PDF", "i file"); `fileCount.other` therefore equals `fileCount.one` except for the number.
- The edit-page FAQ about question marks adds the Italian accented vowels (à, è, é, ì, ò, ù) to the WinAnsi explanation, because an Italian reader's first worry is whether their own letters work.
- "Privacy by design" heading: "Sicuro e privato fin dalla progettazione" (the wording of the Italian GDPR translation), not the anglicism "per design".
- `sign-pdf` title: "Disegna la firma o usa un'immagine" instead of "carica un'immagine", so the title does not say "upload" next to "senza caricare".

## Term glossary (one term per concept)

file (file, invariable), pagina (page), caricare / caricamento (upload), scaricare / download (download, verb / noun), browser, dispositivo (device), computer (desktop computer), telefono (phone), riquadro (the drop box), password, filigrana (watermark), account, mouse, fai clic (click), tocca (tap), premi (press a key), trascina (drag), digita (type), scegli (choose), seleziona (select), aggiungi (add), rimuovi (remove a file or a password), elimina (delete a page or an item), ruota (rotate), riordina (reorder), nitido (sharp), senza perdita (lossless), ricodificare (re-encode), grafica vettoriale (vector graphics), crittografia / crittografato (encryption / encrypted), lettore PDF (PDF viewer or reader as a program; "visualizzatore" only in keywords), scheda (browser tab), popup, miniatura (thumbnail), elemento (item), font (typeface), bianchetto (whiteout), evidenziare / evidenziazione (highlight), gratis (free; "gratuito" as an adjective before a noun).
