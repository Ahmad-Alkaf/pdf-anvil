# Bahasa Indonesia (`id`): translator notes

Search figures are Bing, 3 months, 2026, as given by the caller. Phrases marked "common" had no figure.

## English variants dropped

- `combine-pdf` (merge): Indonesian has one word family for merge. "gabung pdf" (396K), "gabungkan pdf" (129K), and "menggabungkan pdf" (58K) are the same verb in three forms, not synonyms. One page, all three forms in `keywords`. "satukan pdf" exists but is rare; it sits in `keywords` only.
- `extract-pdf-pages` (split): "ekstrak halaman pdf" and "ambil halaman pdf" are not common search phrases. The split nav page answers the extract question in its FAQ, and "ambil halaman pdf" is in its `keywords`.
- `webp-to-pdf` (images-to-pdf): "webp ke pdf" has no measurable demand in Indonesian. WebP is still accepted by the tool and named on the `gambar-ke-pdf` page.

## Locale-only variants added

- `split:pecah` at `pecah-pdf`: "pecah pdf" is a distinct verb (pecah = break into parts) and a common search phrase next to "pisahkan pdf". Own intro, own steps, five own FAQ entries (per-10-pages, email size, quality, pecah vs pisahkan).

## Nav page choice inside a kind

- `images-to-pdf`: the nav page is `jpg-to-pdf` (`jpg-ke-pdf`), not `image-to-pdf`. "jpg ke pdf" is far more searched in Indonesian than "gambar ke pdf". `image-to-pdf` stays as the variant `gambar-ke-pdf`.
- `pdf-to-images`: the nav page is `pdf-to-jpg` (`pdf-ke-jpg`) for the same reason. `pdf-to-image` stays as the variant `pdf-ke-gambar`.

## Slug per page (search phrase)

| id | slug | phrase |
|---|---|---|
| merge-pdf | gabung-pdf | "gabung pdf" 396K |
| split-pdf | pisahkan-pdf | "pisahkan pdf" 45K; "pecah pdf" gets its own page |
| split:pecah | pecah-pdf | "pecah pdf" common |
| rotate-pdf | putar-pdf | "putar pdf" common |
| organize-pdf | atur-halaman-pdf | "atur halaman pdf", "hapus halaman pdf" common |
| jpg-to-pdf | jpg-ke-pdf | "jpg ke pdf" common, highest of the image phrases |
| image-to-pdf | gambar-ke-pdf | "gambar ke pdf" common |
| png-to-pdf | png-ke-pdf | "png ke pdf" |
| scan-to-pdf | scan-ke-pdf | "scan ke pdf", "scan dokumen ke pdf"; "pindai" is formal and rarely typed |
| pdf-to-jpg | pdf-ke-jpg | "pdf ke jpg" common, highest of the image phrases |
| pdf-to-image | pdf-ke-gambar | "pdf ke gambar" common |
| pdf-to-png | pdf-ke-png | "pdf ke png" |
| compress-pdf | kompres-pdf | "kompres pdf" common |
| reduce-pdf-size | perkecil-ukuran-pdf | "perkecil ukuran pdf" common, distinct wording from "kompres" |
| unlock-pdf | buka-kunci-pdf | "buka kunci pdf"; "hapus password pdf" in title and keywords |
| protect-pdf | proteksi-pdf | "proteksi pdf"; "kunci pdf" in title and keywords |
| pdf-viewer | baca-pdf | "baca pdf" / "buka pdf" |
| edit-pdf | edit-pdf | "edit pdf" (same word in Indonesian) |
| sign-pdf | tanda-tangan-pdf | "tanda tangan pdf" common |

Priority: nav pages 1-11 (gabung, kompres, jpg ke pdf, pdf ke jpg, edit, pisahkan, baca, buka kunci, proteksi, putar, atur halaman), variants 12-19 (tanda tangan, perkecil ukuran, gambar ke pdf, pecah, pdf ke gambar, scan, png ke pdf, pdf ke png).

## Term choices

One term per concept, used on every page and in every UI string:

- file = "file" (not "berkas"); browser = "browser" (not "peramban"); device = "perangkat"
- download = "unduh" / "terunduh"; upload = "unggah"
- password = "password" (what Indonesian users type and search; "kata sandi" is not used anywhere)
- drag = "seret"; drop zone = "kotak"; click = "klik"; tap (phone) = "ketuk"; hover = "arahkan kursor"
- scan = "scan" / "hasil scan" (not "pindai"); phone = "ponsel" in copy, "hp" only in keywords
- convert = "ubah ... ke ..." (matches the searched "ubah pdf ke word" pattern); action label "Ubah ke gambar"
- lossless = "tanpa penurunan kualitas" (compress level label, PNG hint, PNG pages)
- whiteout = "penutup putih"; highlight = "stabilo"; draw tool = "Pena", a drawing = "coretan"; a physical pen on a touch screen = "stylus" (never "pena", to keep it apart from the tool)
- viewer = "penampil"; PDF reader = "PDF reader" (search term, kept on the viewer page)
- undo = "Urungkan", redo = "Ulangi", reset = "Atur ulang", dismiss = "Tutup"
- watermark = "watermark"; account = "akun"; the user is "Anda" throughout

## Strings without an exact equivalent

- `common.pageCount`, `fileCount`, `imageCount`, `itemCount`, `split.makes`, `organize.willRemove`, `compress.noteReencoded`, `dropzone.skipped`: Indonesian nouns do not change with the count, so `one` and `other` are identical.
- `toolShell.howToName`: "Cara {h1Lower} online gratis". Every h1 is written as a short base-form verb phrase ("Gabung file PDF", "Ubah JPG ke PDF") so that the HowTo name reads like an Indonesian search query ("cara gabung file PDF online gratis").
- `compress.saved` ("Saved"): rendered as "Hemat", the word Indonesian apps use next to a saved percentage.
- `imagesToPdf.none` ("None" margin): "Tanpa", which reads as "tanpa margin" next to the label.
- `edit.draw` ("Draw"): "Pena" (pen), because "Gambar" is already the Image tool and "Coret" reads as "cross out".
- `header.suggestionDismiss` and `common.dismiss`: both "Tutup" (close); Indonesian has no shorter dismiss word.
- The English `sign-pdf` description says "upload an image" of the signature next to "no upload". The Indonesian copy says "pakai foto tanda tangan" (use a photo of your signature) to avoid the contradiction with "tanpa unggah".
- `footer.copyright`: "Hak cipta dilindungi." (the usual short Indonesian form).
