# Portuguese (pt) locale notes

Target: Brazilian Portuguese, no slang, second person "você". The text reads
fine in Portugal; a few Brazilian terms are noted at the end.

## Dropped English variants

- `webp-to-pdf`: "webp para pdf" has very little Portuguese search demand. The nav
  page `imagem-para-pdf` names WebP in its title, intro, and FAQ, so the query is
  still covered.

## Added locale-only variants

- `split:separar` at `separar-pdf`: "separar pdf" and "separar páginas pdf" are
  common Portuguese phrasings next to "dividir pdf", with their own wording
  (separar / cortar). The page has four own FAQ entries.

## Slug per page (search phrase that decides it)

| id | slug | phrase |
|---|---|---|
| merge-pdf | juntar-pdf | "juntar pdf" (434K, top query) |
| combine-pdf | unir-pdf | "unir pdf"; "combinar pdf" and "mesclar pdf" as keywords |
| split-pdf | dividir-pdf | "dividir pdf" |
| split:separar | separar-pdf | "separar pdf" |
| extract-pdf-pages | extrair-paginas-pdf | "extrair páginas pdf" (accent dropped in the slug) |
| rotate-pdf | girar-pdf | "girar pdf"; "rodar pdf" (Portugal) as keyword |
| organize-pdf | organizar-pdf | "organizar pdf" |
| image-to-pdf | imagem-para-pdf | "imagem para pdf" |
| jpg-to-pdf | jpg-para-pdf | "jpg para pdf" |
| png-to-pdf | png-para-pdf | "png para pdf" |
| scan-to-pdf | digitalizar-para-pdf | "digitalizar para pdf"; "escanear" (Brazil, colloquial) as keyword |
| pdf-to-image | pdf-para-imagem | "pdf para imagem" |
| pdf-to-jpg | pdf-para-jpg | "pdf para jpg" |
| pdf-to-png | pdf-para-png | "pdf para png" |
| compress-pdf | comprimir-pdf | "comprimir pdf" |
| reduce-pdf-size | reduzir-tamanho-pdf | "reduzir tamanho pdf" |
| unlock-pdf | desbloquear-pdf | "desbloquear pdf"; "remover senha pdf" as keyword |
| protect-pdf | proteger-pdf | "proteger pdf" |
| pdf-viewer | abrir-pdf | "abrir pdf"; "leitor de pdf" is the page name |
| edit-pdf | editar-pdf | "editar pdf" / "editor de pdf" |
| sign-pdf | assinar-pdf | "assinar pdf" |

Priority: nav pages 1-11 (juntar, editar, comprimir, imagem para pdf, pdf para
imagem, dividir, abrir, desbloquear, girar, proteger, organizar), then variants
12-21 by demand (jpg para pdf, pdf para jpg, assinar, unir, separar, reduzir
tamanho, png para pdf, pdf para png, extrair páginas, digitalizar).

## Strings without a direct equivalent

- "Whiteout": no single Portuguese word. Toolbar label is "Cobrir"; the item is
  a "retângulo branco"; the intro of Editar PDF says "retângulos brancos".
- "Highlight": "Destacar" (tool) and "Destaque" (item). "Marca-texto" is the pen,
  not the action, so it is not used.
- "Upload": the site never uploads, so the concept is "envio" / "enviado". The
  "Take a photo" flow and the signature image use "escolha" (pick a file), never
  "envie", to avoid a clash with "sem envio".
- "Download": verb "baixar" everywhere; the noun stays "download" (standard in
  Brazil and understood in Portugal).
- "Letter" page size: "Carta (Letter)" in the UI and FAQs, as instructed.
- "Preview" (the macOS app): "Pré-Visualização", its Portuguese product name.
- "Escape" key: "Esc", the key cap label.
- `howToName`: "Como {h1Lower} online e grátis". Every h1 starts with a verb in
  the infinitive, so the lowercased form reads as one sentence.
- Edit PDF FAQ on WinAnsi: one sentence added to say that Portuguese accented
  letters (ã, ç, é) work, because that is the first question a Portuguese reader
  has. The rest of the answer is the English content.

## Brazil / Portugal choices

- "arquivo" (PT: ficheiro), "senha" (PT: palavra-passe), "usuário" (PT:
  utilizador), "mouse" (PT: rato), "celular" (PT: telemóvel), "tela" (PT: ecrã),
  "salvar" (PT: guardar). All are understood in Portugal; Brazil carries most of
  the search demand.
- Gerund progress labels ("Lendo", "Salvando") are Brazilian; Portugal would say
  "A ler". Kept for consistency with the target.
