# Spanish (es): translator notes

Neutral Spanish for a worldwide audience, "tú" form. Demand figures are Bing, 3 months, 2026, as given by the caller.

## Slugs: search phrase per page

| id | slug | phrase | note |
|---|---|---|---|
| merge-pdf | unir-pdf | "unir pdf" 1.0M | nav, priority 1 |
| combine-pdf | combinar-pdf | "combinar pdf" / "juntar pdf" | variant, see below |
| split-pdf | dividir-pdf | "dividir pdf" 221K | nav |
| extract-pdf-pages | separar-pdf | "separar pdf" 102K | variant, extract-pages angle |
| rotate-pdf | rotar-pdf | "rotar pdf" | nav; "girar pdf" also exists, kept as keyword. iLovePDF, the leading Spanish site, uses "Rotar PDF"; "rotar" is the neutral term across regions |
| organize-pdf | organizar-pdf | "ordenar pdf" 38K, "organizar pdf" | nav; "ordenar pdf" is the first keyword |
| jpg-to-pdf | jpg-a-pdf | "jpg a pdf" 118K + "convertir jpg a pdf" 110K | variant |
| png-to-pdf | png-a-pdf | "png a pdf" | variant |
| webp-to-pdf | webp-a-pdf | "webp a pdf" | variant |
| image-to-pdf | imagen-a-pdf | "imagen a pdf" 58K | nav (the general term, as in English; "jpg a pdf" has more demand but only names one format) |
| scan-to-pdf | escanear-a-pdf | "escanear a pdf" | variant |
| pdf-to-jpg | pdf-a-jpg | "pdf a jpg" | variant |
| pdf-to-png | pdf-a-png | "pdf a png" | variant |
| pdf-to-image | pdf-a-imagen | "pdf a imagen" | nav |
| compress-pdf | comprimir-pdf | "comprimir pdf" 389K | nav |
| reduce-pdf-size | reducir-tamano-pdf | "reducir tamaño pdf" / "reducir peso pdf" | variant; "ñ" written as "n" (ASCII slug rule) |
| unlock-pdf | desbloquear-pdf | "desbloquear pdf" / "quitar contraseña pdf" | nav |
| protect-pdf | proteger-pdf | "proteger pdf" / "poner contraseña a un pdf" | nav |
| pdf-viewer | abrir-pdf | "abrir pdf" | nav; chosen over "visor-pdf" because "abrir pdf online" is the action people search for; "visor de pdf" and "lector de pdf" are keywords and the page name is "Visor de PDF" |
| edit-pdf | editar-pdf | "editar pdf" 277K | nav; "editor de pdf" 65K folded into the title and keywords |
| sign-pdf | firmar-pdf | "firmar pdf" | variant |

## English variants dropped

None. Every English variant has a distinct, searched Spanish phrase.

## Variant decisions

- merge: `combine-pdf` kept as `combinar-pdf`. "combinar pdf" and "juntar pdf" are real second phrasings with their own demand; the page covers both ("Junta varios PDF en uno" in the title, "juntar" in keywords). Own FAQ: how to combine, free, phone, combine vs. unir, page quality.
- split: `extract-pdf-pages` kept as `separar-pdf` ("separar pdf" 102K). The nav page `dividir-pdf` covers the split-into-files angle; `separar-pdf` covers the extract-pages angle ("separar páginas de un PDF", "extraer páginas"). Own FAQ: how to separate pages, one page, each page as its own file, non-adjacent pages, free.
- edit: no `editor-de-pdf` variant. "editor de pdf" (65K) is the noun form of the same intent as "editar pdf" (277K). English folds "pdf editor" into `edit-pdf` the same way. It is in the title ("Editor de PDF gratis") and keywords. `sign-pdf` kept as `firmar-pdf`.
- compress: `reduce-pdf-size` kept as `reducir-tamano-pdf`. "reducir tamaño pdf" and "reducir peso pdf" are common phrasings with an email-limit intent that "comprimir pdf" does not carry.
- images: all four format variants kept (`jpg-a-pdf`, `png-a-pdf`, `webp-a-pdf`, `escanear-a-pdf`); each is a natural Spanish phrase. Nav stays on `imagen-a-pdf`, the general term.

## Locale-only variants added

None.

## Priority

Nav pages 1-11 by local demand: unir (1.0M), comprimir (389K), editar (277K + 65K), dividir (221K), imagen a pdf (58K, plus the format variants behind it), pdf a imagen, abrir pdf, organizar (38K), desbloquear, proteger, rotar. Variants 12-21: jpg a pdf (228K) first, then pdf a jpg, firmar, separar (102K), combinar, png a pdf, reducir tamaño, pdf a png, escanear, webp.

## Strings without a direct equivalent, and how they were handled

- "Whiteout": no single Spanish word. Tool button is "Tapar" (verb), the item is "Rectángulo blanco", and prose says "tapar con blanco" / "rectángulos blancos para tapar".
- "Letter" page size: "Carta (Letter)" in the option label and in FAQ prose; "Carta" alone in meta descriptions where length is tight.
- "Take a photo": "Tomar una foto" (neutral; Spain says "hacer una foto", both are understood).
- "Press Delete": "Presiona Supr" (the key label on Spanish keyboards in every region).
- `howToName`: "Cómo {h1Lower} online gratis". Every h1 starts with an infinitive ("Unir archivos PDF", "Abrir y leer un PDF"), so the lowercased h1 reads as a verb phrase after "Cómo".
- `errorDetails`: Spanish quotation marks « » replace the English straight quotes around `{part}`.
- Plural of "PDF": invariable in Spanish ("dos PDF", "los PDF"), per RAE. "archivos PDF" is used where a countable noun reads better.
- The edit-page FAQ about question marks adds "incluidas la ñ y las vocales con tilde" to the WinAnsi explanation, because a Spanish reader's first worry is whether their own letters work.

## Term glossary (one term per concept)

archivo (file), página (page), subir (upload), descargar (download), navegador (browser), dispositivo (device), recuadro (the drop box), contraseña (password), marca de agua (watermark), computadora (desktop computer), teléfono (phone), ratón (mouse), presionar (press a key), tocar (tap), hacer clic (click), arrastrar (drag), elegir (choose), añadir (add), quitar (remove a file / password), eliminar (delete a page or item), rotar (rotate), nítido (sharp), sin pérdida (lossless).
