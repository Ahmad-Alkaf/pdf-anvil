# German (de) locale notes

Written in English so the reviewer can compare quickly. Locale: `de`, script `latin`, `dir: ltr`, `htmlLang: de`, `ogLocale: de_DE`. Slugs are German phrases with umlauts written as ae/oe/ue and ß as ss.

## Form of address

Short UI labels use the pronoun-free infinitive ("Datei hier ablegen oder klicken und auswählen", "Weitere Bilder hinzufügen"). Instructions, hints, steps, and FAQ answers use the formal "Sie" imperative ("Legen Sie eine PDF-Datei im Feld ab"). No "du" anywhere.

## Dropped English variants

None. Every English variant maps to a distinct, searched German phrase or a distinct file format:

- `combine-pdf` is kept as "PDF verbinden" (a searched synonym, see below).
- `extract-pdf-pages` is kept as "PDF trennen" (a searched synonym with the extract-pages angle, like Spanish `separar-pdf`).
- `reduce-pdf-size` is kept as "PDF verkleinern" (very common, at least as common as "komprimieren").
- `jpg-to-pdf`, `png-to-pdf`, `webp-to-pdf`, `scan-to-pdf`, `pdf-to-jpg`, `pdf-to-png` are formats or intents, not synonyms. `webp-to-pdf` has low but real demand ("webp in pdf umwandeln") and costs nothing because its FAQ is already distinct.
- `sign-pdf` is kept as "PDF unterschreiben"; "pdf signieren" sits in its keywords.

## Locale-only variants

- `merge:zusammenfuehren` (slug `pdf-zusammenfuehren`, kind merge): German has three everyday synonyms for merge, and all three are typed. "pdf zusammenfügen" (168K, nav page), "pdf verbinden" (mirrors `combine-pdf`), and "pdf zusammenführen" (Adobe's wording, heavily searched). The page has its own title, intro, three own steps, five own FAQ entries, and keywords. `related` of `merge-pdf` and `combine-pdf` do not point to it on purpose (three merge links on one page would be noise); it links to both of them.

## Variant decisions per kind (kept / rejected)

- merge: zusammenfügen (nav) / verbinden (`combine-pdf`) / zusammenführen (locale-only). "kombinieren" is rare, keywords only.
- split: teilen (nav) / trennen (`extract-pdf-pages`). "aufteilen", "splitten" are keywords of the nav page; "seiten extrahieren" is a keyword of the trennen page.
- compress: komprimieren (nav) / verkleinern (`reduce-pdf-size`). "reduzieren", "kleiner machen" are keywords only.
- rotate: drehen. "rotieren" is not what people type; not even a keyword.
- organize: "pdf seiten sortieren" (nav). "pdf seiten löschen" is the other big phrase of this kind; it leads the title ("PDF-Seiten sortieren und löschen") and the keywords rather than getting its own page (same tool, same intent).
- images-to-pdf: "bild in pdf" (nav), "jpg in pdf", "png in pdf", "webp in pdf", "als pdf scannen". "foto in pdf" is a keyword of the nav and JPG pages.
- pdf-to-images: "pdf in bild" (nav), "pdf in jpg", "pdf in png". "pdf zu jpg" (also typed) is a keyword.
- view: "pdf öffnen" (nav). "pdf anzeigen", "pdf viewer", "pdf reader" are in the title and keywords, not separate pages.
- unlock: "pdf entsperren" (nav). "pdf passwort entfernen" leads the title and keywords ("kennwort" only in keywords).
- protect: "pdf schützen" (nav). "pdf verschlüsseln" is in the title and keywords.
- edit: "pdf bearbeiten" (nav), "pdf unterschreiben" (`sign-pdf`). "pdf editor" is in the title and keywords of the nav page.

## Slug search phrase per page

| slug | id | phrase |
|---|---|---|
| pdf-zusammenfuegen | merge-pdf | pdf zusammenfügen |
| pdf-verbinden | combine-pdf | pdf verbinden |
| pdf-zusammenfuehren | merge:zusammenfuehren | pdf zusammenführen |
| pdf-teilen | split-pdf | pdf teilen |
| pdf-trennen | extract-pdf-pages | pdf trennen / pdf seiten extrahieren |
| pdf-drehen | rotate-pdf | pdf drehen |
| pdf-seiten-sortieren | organize-pdf | pdf seiten sortieren / pdf seiten löschen |
| jpg-in-pdf | jpg-to-pdf | jpg in pdf |
| png-in-pdf | png-to-pdf | png in pdf |
| webp-in-pdf | webp-to-pdf | webp in pdf |
| bild-in-pdf | image-to-pdf | bild in pdf |
| als-pdf-scannen | scan-to-pdf | als pdf scannen / scannen pdf |
| pdf-in-jpg | pdf-to-jpg | pdf in jpg |
| pdf-in-png | pdf-to-png | pdf in png |
| pdf-in-bild | pdf-to-image | pdf in bild |
| pdf-komprimieren | compress-pdf | pdf komprimieren |
| pdf-verkleinern | reduce-pdf-size | pdf verkleinern |
| pdf-entsperren | unlock-pdf | pdf entsperren / pdf passwort entfernen |
| pdf-schuetzen | protect-pdf | pdf schützen / pdf verschlüsseln |
| pdf-oeffnen | pdf-viewer | pdf öffnen / pdf anzeigen |
| pdf-bearbeiten | edit-pdf | pdf bearbeiten / pdf editor |
| pdf-unterschreiben | sign-pdf | pdf unterschreiben / pdf signieren |

Priorities: nav pages 1-11 by German demand (merge 1, compress 2, edit 3, image-to-pdf 4, pdf-to-image 5, split 6, viewer 7, unlock 8, protect 9, rotate 10, organize 11); variants 12-22 (jpg-in-pdf 12, pdf-in-jpg 13, verkleinern 14, zusammenführen 15, unterschreiben 16, verbinden 17, trennen 18, png-in-pdf 19, pdf-in-png 20, scannen 21, webp-in-pdf 22).

## Glossary (one term per concept)

file Datei (PDF-Datei when an article is needed; bare "PDF" in titles and buttons; "PDFs" only in the hero and button labels) · page Seite · upload hochladen (verb) / Upload (noun, "kein Upload") · download herunterladen / Download · browser Browser · device Gerät · computer Computer · phone Handy · drop box das Feld · drop ablegen · click klicken · tap tippen · drag ziehen · hover mit der Maus über ... fahren · button Schaltfläche · toolbar Symbolleiste · tool (page) Tool · tool (edit mode) Werkzeug · password Passwort ("Kennwort" only in keywords) · user password Benutzerpasswort · owner password Besitzerpasswort · permissions Berechtigungen · encryption Verschlüsselung · account Konto · watermark Wasserzeichen · limit Limit · whiteout Abdeckung / abdecken · highlight Markierung / markieren · draw zeichnen · select auswählen · undo Rückgängig · redo Wiederholen · reset Zurücksetzen · zoom in / out vergrößern / verkleinern · fit width An Breite anpassen · fit to image An Bild anpassen · resolution Auflösung · lossless verlustfrei · re-encode neu kodieren · render rendern · vector graphics Vektorgrafiken · viewer (program) Viewer · reader Reader · convert umwandeln · merge zusammenfügen · split teilen · rotate drehen · organize sortieren · compress komprimieren · unlock entsperren · protect schützen · edit bearbeiten · sign unterschreiben · signature Unterschrift · Letter US Letter.

Style: short sentences, present tense, no marketing adjectives, German typography („…“ quotes only where English uses quotes, en dash with spaces, "%" with a space, "E-Mail", "Drag-and-drop").

## Strings without a clean German equivalent, and how they were handled

- `toolShell.howToName`: the test requires the English placeholder `{h1Lower}`, but `lowerFirst()` would turn "Bilder in PDF umwandeln" into "bilder in PDF umwandeln", which is a spelling error in German. Every German h1 therefore starts with an acronym ("PDF …", "JPG …", "PNG …"), which `lowerFirst()` leaves alone, and the template is "{h1Lower} – so geht es online und kostenlos". Consequences: `image-to-pdf` h1 is "JPG, PNG oder WebP in PDF umwandeln" (not "Bilder in PDF umwandeln"), `webp-to-pdf` h1 is "PDF aus WebP-Bildern erstellen" ("WebP" has a lowercase second letter and would become "webP"), and `scan-to-pdf` h1 is "PDF mit dem Handy scannen". The titles carry the noun-first phrases instead.
- "Ctrl+P", "Ctrl+Z", "Ctrl+Shift+Z" are kept as the contract requires. German keyboards label the key "Strg"; "Ctrl" is understood but "Strg" would be more natural. Suggestion for the owner: allow "Strg" in a later pass. "Delete" key is written "Entf" (that is the German key label, not a product name). "Escape" is kept.
- `edit.whiteout`: German has no established word. "Abdecken" (button) / "Abdeckung" (item) is what German PDF editors use; "Korrekturfläche" and "Weißfläche" were rejected as clumsy.
- `compress.smallest`: "Smallest" alone does not work as a German label; "Kleinste Datei" is used, and the FAQ names the level the same way.
- `common.keywords` keeps exactly seven entries (the test compares array lengths).
- "Letter" page size is written "US Letter" as instructed, in the UI and in the FAQ.
- `sign-pdf` title: the English "Draw or Upload Your Signature … No Upload" would contradict itself in German ("hochladen"), so the title says "als Bild einfügen" (insert as an image), and the edit FAQ says "fügen Sie ein Foto Ihrer Unterschrift … hinzu" instead of "hochladen".
- `pdfToImages.summary`: the arrow "→" is kept; it reads fine in German.
- Gender of "PDF": German uses both "das PDF" and "die PDF(-Datei)". The copy avoids the bare noun with an article and says "PDF-Datei" (feminine) whenever an article is needed. Button labels such as "Gedrehte PDF speichern" follow the feminine short form, which is the everyday usage.
- Intros never contain an abbreviation with a period ("z. B.") because `firstSentence()` cuts at the first ". "; "zum Beispiel" is written out everywhere.
