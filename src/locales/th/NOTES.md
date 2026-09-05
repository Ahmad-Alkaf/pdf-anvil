# Thai (th) locale notes

Written in English so the reviewer can compare quickly. Locale: `th`, script `other`, `dir: ltr`. Every page mirrors an English page and keeps its English slug (non-Latin-script rule). Search demand: Bing, 3 months, 2026.

## Dropped English variants

- `webp-to-pdf` (images-to-pdf): "แปลง webp เป็น pdf" has negligible Thai demand. The phrase sits in the keywords of `image-to-pdf`, which accepts WebP anyway.

## Locale-only variants

None. Every common Thai synonym pair maps onto an existing English variant, so a mirrored page (with its cross-locale id and hreflang link) serves it better than a locale-only id:

- "รวมไฟล์ pdf" (160K) vs "ต่อไฟล์ pdf": `merge-pdf` is รวมไฟล์, `combine-pdf` is ต่อไฟล์ (same intent as English "combine/join").
- "แยกไฟล์ pdf" vs "ตัดไฟล์ pdf": `split-pdf` is แยกไฟล์, `extract-pdf-pages` is ตัดหน้า/ตัดไฟล์ (Thai "ตัด" is what people type when they want some pages out of a file).
- "ย่อไฟล์ pdf" / "บีบอัด pdf" vs "ลดขนาด pdf": `compress-pdf` is ย่อไฟล์ with บีบอัด in the title and keywords (same word family, one page), `reduce-pdf-size` is ลดขนาดไฟล์.
- "ปลดล็อค pdf" / "ถอดรหัส pdf", "ใส่รหัส pdf" / "ล็อค pdf", "เปิดไฟล์ pdf" / "อ่าน pdf", "เซ็น pdf" / "ลายเซ็น pdf": same intent, one tool; the second phrase leads the title or the keywords of the one page.

Note for the owner: the test only accepts locale-only slugs built from the words of the English slugs plus editor, viewer, reader, converter, compressor, merger, splitter. A slug such as `pdf-joiner` would fail; `pdf-merger` would pass. Not needed here.

## Term choices per kind (chosen / rejected)

- merge: รวมไฟล์ (nav) / ต่อไฟล์ (kept as the `combine-pdf` variant) / ผสาน (formal, FAQ only), เชื่อม (rare).
- split: แยกไฟล์ (nav) / ตัดหน้า, ตัดไฟล์ (kept as `extract-pdf-pages`; name "ตัดหน้า PDF", title leads with "ตัดไฟล์ PDF") / แบ่งไฟล์ (keywords only), ดึงหน้า (intro and keywords).
- rotate: หมุน / กลับด้าน, พลิก (title and keywords only; ambiguous as a verb).
- organize: จัดเรียงหน้า (h1, name) with "เรียงหน้า pdf" (the typed form) leading the title and keywords / จัดการหน้า (vague), เรียงลำดับ (long). "ลบหน้า pdf" is the second most typed phrase of this kind and sits in the keywords.
- images-to-pdf: แปลงรูปเป็น PDF (nav, name) with h1 "แปลงรูปภาพเป็น PDF" / ทำรูปเป็น pdf (keywords only). JPG and PNG pages kept ("jpg เป็น pdf" is a top phrase; "png เป็น pdf" smaller but distinct). Scan page kept: "สแกน pdf" is common; copy uses สแกน, กล้องมือถือ.
- pdf-to-images: แปลง PDF เป็นรูป (nav) / แปลงเป็นภาพ (keywords). JPG and PNG pages kept for the same reason.
- view: name "เปิดไฟล์ PDF", h1 "เปิดและอ่านไฟล์ PDF" ("เปิดไฟล์ pdf" and "อ่าน pdf" are the typed phrases). Viewer program = โปรแกรมดู PDF, reader = โปรแกรมอ่าน PDF / ตัวดู (rejected, jargon).
- compress: ย่อไฟล์ (nav, most typed) / บีบอัด (title, level label "ระดับการบีบอัด", keywords), ลดขนาด (kept as `reduce-pdf-size`), ลดไซส์ (slang, keywords only).
- unlock: ปลดล็อก (Royal Institute spelling in copy) / ปลดล็อค (the spelling most people type, keywords only), ถอดรหัส, ถอดรหัสผ่าน (title and keywords), เอารหัสออก (keywords).
- protect: ใส่รหัสผ่าน (copy) with "ใส่รหัส pdf" and "ล็อกไฟล์ PDF" in the title / ล็อค (keywords), เข้ารหัส (used only for "encrypt" in the technical sense), ป้องกัน (rejected: reads as "prevent").
- edit: แก้ไข (nav; "แก้ไข pdf" and "แก้ไขไฟล์ pdf" are both typed, both in title and keywords) / แก้ (short form, keywords), ปรับแต่ง (rejected: means "customise"). `sign-pdf` kept as เซ็น PDF ("เซ็น pdf", "ลายเซ็น pdf" are distinct, searched phrases) / ลงนาม (formal, rejected).

## Slug search phrase per page

| slug | phrase |
|---|---|
| merge-pdf | รวมไฟล์ pdf, รวม pdf |
| combine-pdf | ต่อไฟล์ pdf |
| split-pdf | แยกไฟล์ pdf |
| extract-pdf-pages | ตัดไฟล์ pdf, ตัดหน้า pdf |
| rotate-pdf | หมุน pdf |
| organize-pdf | เรียงหน้า pdf, ลบหน้า pdf |
| jpg-to-pdf | jpg เป็น pdf |
| png-to-pdf | png เป็น pdf |
| image-to-pdf | แปลงรูปเป็น pdf |
| scan-to-pdf | สแกน pdf, สแกนเอกสารเป็น pdf |
| pdf-to-jpg | pdf เป็น jpg |
| pdf-to-png | pdf เป็น png |
| pdf-to-image | แปลง pdf เป็นรูป |
| compress-pdf | ย่อไฟล์ pdf, บีบอัด pdf |
| reduce-pdf-size | ลดขนาด pdf, ลดขนาดไฟล์ pdf |
| unlock-pdf | ปลดล็อค pdf, ถอดรหัส pdf |
| protect-pdf | ใส่รหัส pdf, ล็อค pdf |
| pdf-viewer | เปิดไฟล์ pdf, อ่าน pdf |
| edit-pdf | แก้ไข pdf, แก้ไขไฟล์ pdf |
| sign-pdf | เซ็น pdf, ลายเซ็น pdf |

Priorities: nav pages 1-11 by Thai demand (merge 1, image-to-pdf 2, compress 3, pdf-to-image 4, edit 5, split 6, viewer 7, unlock 8, protect 9, rotate 10, organize 11); variants 12-20 (jpg-to-pdf 12, pdf-to-jpg 13, combine 14, reduce-size 15, sign 16, extract 17, scan 18, png-to-pdf 19, pdf-to-png 20).

## Glossary (one term per concept)

file ไฟล์ · page หน้า · upload อัปโหลด · download ดาวน์โหลด · browser เบราว์เซอร์ · device อุปกรณ์ · computer คอมพิวเตอร์ · phone มือถือ · server เซิร์ฟเวอร์ · drop ลาก...มาวาง · click คลิก · tap แตะ · drag ลาก · hover ชี้เมาส์ · password รหัสผ่าน · user/owner password รหัสผ่านผู้ใช้ / รหัสผ่านเจ้าของ · encryption การเข้ารหัส · permissions สิทธิ์ · whiteout ปิดทับ · highlight ไฮไลต์ · draw วาด · select เลือก · undo เลิกทำ · redo ทำซ้ำ · reset รีเซ็ต · zoom in/out ซูมเข้า / ซูมออก · resolution ความละเอียด · lossless ไม่สูญเสียคุณภาพ · balanced สมดุล · smallest เล็กที่สุด · watermark ลายน้ำ · image รูป (UI, copy) / รูปภาพ (headings) · photo รูปถ่าย · screenshot ภาพหน้าจอ · scan สแกน · signature ลายเซ็น · vector graphics กราฟิกเวกเตอร์ · viewer program โปรแกรมดู PDF · reader โปรแกรมอ่าน PDF · online ออนไลน์ · account บัญชี · free ฟรี · quality คุณภาพ · item รายการ · font ฟอนต์ · ZIP/DPI/MB/KB/px stay Latin.

Style: polite everyday Thai as Thai web tools write it, "คุณ" for the user, no ครับ/ค่ะ, present tense, short sentences. Thai has no sentence-final period: sentences are separated by a single space, strings end without a stop unless a Latin word, digit, or bracket ends them. Arabic digits. A space always separates Thai text from a Latin word, a number, or a placeholder. Quoted UI labels use straight double quotes. FAQ questions end with "?", as Thai web FAQs do.

## Strings without a clean Thai equivalent

- Intro on cards: `firstSentence()` cuts at a Latin or CJK stop only. Thai has neither, so the card shows the whole intro. Every intro is therefore kept to two or three short clauses so the card stays readable. Product suggestion: let the helper also cut at the first space-separated clause for `th`, or add a `cardSummary` field.
- Plurals: Thai nouns do not inflect; `one` and `other` are identical ("{n} หน้า").
- `toolShell.howToName`: uses `{h1Lower}` because the test requires the English placeholder; Thai has no case, so it equals the h1. Result: "วิธีรวมไฟล์ PDF ออนไลน์ฟรี". A space precedes "ออนไลน์" because most h1s end in "PDF"; for the two h1s that end in a Thai word ("แปลง PDF เป็นรูปภาพ") the space reads as a normal phrase break.
- `edit.whiteout`: no established Thai word. "ปิดทับ" (cover over) is what Thai PDF editors and users say; "ไวท์เอาท์" (the correction-fluid brand word) was rejected as slang, "ลบ" was rejected because the tool does not delete (the FAQ says so).
- Edit tool and Thai text: the standard PDF fonts (WinAnsi) cannot encode Thai, so the text tool prints "?" for Thai input. The English "special character" FAQ was rewritten as "ทำไมตัวอักษรภาษาไทยแสดงเป็นเครื่องหมายคำถาม?" on `edit-pdf` with the workaround (type in English, or type the Thai text in any program, take a screenshot, and add it with the Image tool). The `sign-pdf` "add the date" FAQ says to type the date as digits for the same reason. Product suggestion for the owner: embed a Thai font (for example Sarabun or Noto Sans Thai) in the edit tool before promoting the Thai edit and sign pages.
- `sign-pdf` title and the edit "How do I sign" FAQ: the English "upload your signature" would contradict "no upload" in Thai (อัปโหลด is the same word), so the copy says "ใส่รูปลายเซ็น" / "เพิ่มรูปลายเซ็น" (add its image).
- `about.contact.links`: Thai has no article or comma list of this shape; rendered as "ดู{toolList} รวมถึง{privacy}และ{terms}ของ KafLabs".
- `footer.copyright`: "© {year} {brand} สงวนลิขสิทธิ์" with no period; Thai copyright lines carry none.
- `common.keywords` keeps exactly seven entries (the test compares array lengths); the seven most typed Thai phrases were chosen.
- Units (MB, MiB, KB, px, DPI, pt) and product names stay Latin, as on Thai tech sites. "100 MB" in LIMIT_FAQ follows the English page copy; "100 MiB" in the About limits follows the English About text.
