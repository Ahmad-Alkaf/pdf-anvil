# French (fr) locale notes

Written in English so the reviewer can compare quickly. Locale: `fr`, script `latin`, `dir: ltr`, `htmlLang: fr`, `ogLocale: fr_FR`. Neutral French for France, Belgium, Switzerland, Canada, and Africa, "vous" form. Slugs are the most searched French phrase, ASCII only (accents dropped: `deverrouiller-pdf`, `proteger-pdf`, `reorganiser-pages-pdf`).

## Dropped English variants

None. Every English variant has a distinct, searched French phrase (see the slug table). `webp-to-pdf` is low demand but a distinct format, not a synonym, so it stays.

## Locale-only variants

- `edit:editeur` (slug `editeur-pdf`, kind edit): "éditeur pdf" / "éditeur pdf gratuit" / "éditer pdf" are typed as often as an anglicism as "modifier pdf" is in proper French. The nav page is `modifier-pdf` ("modifier pdf" 46K); the variant carries the "éditeur" angle (no install, free, works on a phone, undo, forms) with its own title, intro, steps, six own FAQ entries, and keywords. Priority 17.

## Variant decisions per kind (kept as page / kept as keyword only)

- merge: `fusionner-pdf` (nav, "fusionner pdf" 136K) / `combiner-pdf` kept as the `combine-pdf` variant: "combiner pdf" and "assembler pdf" are both common and both live on that page ("assembler" in title, FAQ, and keywords). "regrouper", "joindre", "réunir" are keywords only.
- split: `diviser-pdf` (nav) / "séparer pdf" is the same intent as "diviser", so it goes into the nav title ("Diviser ou séparer un PDF") and keywords, not a third page. `extraire-pages-pdf` kept as the `extract-pdf-pages` variant: "extraire pages pdf" is a distinct intent. "découper", "scinder" keywords only.
- compress: `compresser-pdf` (nav, 103K) / `reduire-taille-pdf` kept as the `reduce-pdf-size` variant ("réduire taille pdf" is common and a distinct phrasing). "alléger", "réduire poids" keywords only.
- edit: `modifier-pdf` (nav) / `editeur-pdf` locale-only variant (above) / `signer-pdf` kept ("signer pdf" is a distinct, searched intent).
- images-to-pdf: `image-en-pdf` (nav, the general term as in English) / `jpg-en-pdf`, `png-en-pdf`, `webp-en-pdf`, `scanner-en-pdf` kept ("jpg en pdf" is the most typed image phrase; "scanner en pdf" is common).
- pdf-to-images: `pdf-en-image` (nav) / `pdf-en-jpg`, `pdf-en-png` kept.
- rotate: "pivoter pdf" and "faire pivoter pdf" are one page (`pivoter-pdf`); "tourner", "retourner" keywords only.
- organize: "réorganiser pages pdf" leads the slug (`reorganiser-pages-pdf`); "organiser pdf", "supprimer pages pdf" keywords only.
- view: "ouvrir pdf" is the most typed phrase, so the slug is `ouvrir-pdf`; the page name is "Lecteur PDF" and "lire pdf", "visionneuse pdf" are keywords.
- unlock: `deverrouiller-pdf`; "supprimer mot de passe pdf", "enlever", "déprotéger", "débloquer" keywords only (same intent, one tool).
- protect: `proteger-pdf`; "verrouiller", "chiffrer", "crypter", "sécuriser" keywords only.

## Slug search phrase per page

| slug | id | phrase |
|---|---|---|
| fusionner-pdf | merge-pdf | fusionner pdf |
| combiner-pdf | combine-pdf | combiner pdf / assembler pdf |
| diviser-pdf | split-pdf | diviser pdf / séparer pdf |
| extraire-pages-pdf | extract-pdf-pages | extraire pages pdf |
| pivoter-pdf | rotate-pdf | pivoter pdf / faire pivoter pdf |
| reorganiser-pages-pdf | organize-pdf | réorganiser pages pdf |
| jpg-en-pdf | jpg-to-pdf | jpg en pdf |
| png-en-pdf | png-to-pdf | png en pdf |
| webp-en-pdf | webp-to-pdf | webp en pdf |
| image-en-pdf | image-to-pdf | image en pdf |
| scanner-en-pdf | scan-to-pdf | scanner en pdf |
| pdf-en-jpg | pdf-to-jpg | pdf en jpg |
| pdf-en-png | pdf-to-png | pdf en png |
| pdf-en-image | pdf-to-image | pdf en image |
| compresser-pdf | compress-pdf | compresser pdf |
| reduire-taille-pdf | reduce-pdf-size | réduire taille pdf |
| deverrouiller-pdf | unlock-pdf | déverrouiller pdf / supprimer mot de passe pdf |
| proteger-pdf | protect-pdf | protéger pdf / verrouiller pdf |
| ouvrir-pdf | pdf-viewer | ouvrir pdf / lire pdf |
| modifier-pdf | edit-pdf | modifier pdf |
| editeur-pdf | edit:editeur | éditeur pdf / éditer pdf |
| signer-pdf | sign-pdf | signer pdf |

Priorities: nav pages 1-11 by French demand (merge 1, compress 2, edit 3, image-to-pdf 4, split 5, pdf-to-image 6, viewer 7, unlock 8, protect 9, rotate 10, organize 11); variants 12-22 (jpg-en-pdf 12, pdf-en-jpg 13, combiner 14, reduire-taille 15, signer 16, editeur 17, extraire 18, scanner 19, png-en-pdf 20, pdf-en-png 21, webp 22).

## Glossary (one term per concept)

file fichier · page page · upload téléverser / téléversement (never "télécharger", which is download) · download télécharger · browser navigateur · device appareil · computer ordinateur · phone téléphone · the drop box la zone · drop déposer · click cliquer · tap toucher · drag faire glisser · hover survoler · thumbnail vignette · password mot de passe · open password mot de passe d'ouverture · user password mot de passe utilisateur · owner password mot de passe propriétaire · permissions autorisations · limits (of a PDF) restrictions · encryption chiffrement · viewer (program) visionneuse; "Lecteur PDF" is the view page name because "lecteur pdf" is the searched phrase · reader (person) lecteur · whiteout (tool button) Masquer, (feature) masque blanc, (item) rectangle blanc · highlight surligner / surlignage · draw dessiner · pen stylet (device), stylo (tool) · select sélectionner · undo annuler · redo rétablir · reset réinitialiser · start over recommencer · dismiss fermer · zoom in / out zoom avant / arrière · fit width ajuster à la largeur · resolution résolution · lossless sans perte · watermark filigrane · vector graphics graphiques vectoriels · scan (noun) scan, (verb) scanner · screenshot capture d'écran · Letter Lettre US · online en ligne · at once aussitôt · Delete key Suppr · Escape Échap.

Typography: non-breaking space (U+00A0) before : ; ? ! % and inside « », applied by script to every string literal. Guillemets only where the English uses quotes. Digits as in English; "Mo"/"Ko" for MB/KB in prose, "MiB" kept in the about limits as in English.

## Strings without a clean French equivalent

- `toolShell.howToName`: "Comment {h1Lower} en ligne gratuitement". Every h1 starts with an infinitive ("Fusionner des fichiers PDF", "Faire pivoter les pages d'un PDF", "Ouvrir et lire un PDF"), so the lowercased h1 reads correctly after "Comment".
- `compress.saved` ("Saved"): "Gain", the usual French label for the size saved.
- `edit.whiteout`: no single French word. The button says "Masquer"; prose says "masque blanc"; the item label is "Rectangle blanc". "Caviarder" was rejected because it implies redaction, which the tool does not do (the FAQ says so).
- `view.blocked`: "pop-up" kept (the term Chrome and Firefox use in French).
- `imagesToPdf.letter`: "Lettre US" so that a French reader does not confuse it with a letter (mail).
- `common.keywords` keeps exactly seven entries because the test compares array lengths.
- `edit-pdf` "special character" FAQ: reworded to say that WinAnsi includes French accents, ç and œ, so a French reader knows accented text works.
- `sign-pdf` title: "Draw or Upload Your Signature ... No Upload" would read as a contradiction with "téléverser", so it says "Dessiner ou insérer votre signature".
