# Arabic (ar) locale notes

Written in English so the reviewer can compare quickly. Locale: `ar`, script `other`, `dir: rtl`. Every mirrored page keeps its English slug (non-Latin-script rule).

## Dropped English variants

- `combine-pdf` (merge): Arabic has one everyday word for merge, "دمج". "Combine" and "join" have no separately searched synonym ("تجميع", "ضم" are rare and go into the keywords of `merge-pdf`).
- `webp-to-pdf` (images-to-pdf): "تحويل webp الى pdf" has negligible Arabic search demand. The phrase sits in the keywords of `image-to-pdf`, which accepts WebP anyway.

## Locale-only variants

- `edit:tahrir` (slug `tahrir-pdf`, kind edit): Arabic has two common words for edit. "تعديل" (nav page `edit-pdf`) and "تحرير" ("تحرير ملف pdf", "محرر ملفات pdf", "برنامج تحرير pdf") are both typed. The page has its own title, intro, steps, five own FAQ entries, and keywords.
  **Blocked by the test.** `__tests__/locales.test.ts` line 77 requires every slug of a `script: "other"` locale to be an English slug, so an ASCII locale-only slug (allowed by README section (c)/(d)) fails. The page is kept as the export `TAHRIR_VARIANT` in `pages.ts` and is not in `pages`. To publish it: relax the test for ids that contain ":" , push `TAHRIR_VARIANT` into `pages`, and add `"edit:tahrir"` to the `related` list of `edit-pdf`. Priority 16 is reserved for it.

## Term choices per kind (chosen / rejected)

- merge: دمج / تجميع, ضم, جمع (rejected: rare in search; used in keywords only).
- split: تقسيم / فصل, تجزئة, قص (rejected: less searched; keywords only). `extract-pdf-pages` kept as "استخراج صفحات من PDF", a distinct, searched phrase.
- rotate: تدوير / قلب, تغيير اتجاه (rejected: ambiguous; keywords only).
- organize: ترتيب / تنظيم (rejected: formal, less typed). "حذف صفحات من pdf" is the most typed phrase of this kind and leads the title and keywords.
- images-to-pdf: تحويل صورة إلى PDF (nav) / تحويل الصور (used in h1 plural). JPG and PNG pages kept: "تحويل jpg الى pdf" is a top phrase, "png" is smaller but distinct. Scan page: "مسح ضوئي" in copy, "سكانر" and "ماسح ضوئي" in keywords.
- pdf-to-images: تحويل PDF إلى صورة (nav); JPG and PNG pages kept for the same reason.
- view: name "قارئ PDF", h1 "فتح ملف PDF وقراءته" / عارض (formal, keywords only). "فتح ملف pdf" is the most typed phrase, so it leads the title.
- compress: ضغط (nav, Bing 71K) / تصغير حجم (kept as the `reduce-pdf-size` variant, distinct and heavily typed together with "تقليل حجم"), تخفيض (keywords only).
- unlock: فك حماية (nav) / إزالة كلمة المرور, فتح ملف مقفل, فك قفل, فك تشفير (all in the title or keywords of the one page, not separate pages: same intent, one tool).
- protect: حماية بكلمة مرور / تشفير, قفل, وضع كلمة سر (keywords only).
- edit: تعديل (nav) / تحرير (locale-only variant, see above). sign-pdf kept as "توقيع PDF" ("توقيع ملف pdf" is a distinct, searched phrase).

## Slug search phrase per page

| slug | phrase |
|---|---|
| merge-pdf | دمج ملفات pdf |
| split-pdf | تقسيم ملف pdf |
| extract-pdf-pages | استخراج صفحات من pdf |
| rotate-pdf | تدوير ملف pdf |
| organize-pdf | ترتيب صفحات pdf / حذف صفحات من pdf |
| jpg-to-pdf | تحويل jpg الى pdf |
| png-to-pdf | تحويل png الى pdf |
| image-to-pdf | تحويل صورة الى pdf |
| scan-to-pdf | سكانر pdf / مسح ضوئي pdf |
| pdf-to-jpg | تحويل pdf الى jpg |
| pdf-to-png | تحويل pdf الى png |
| pdf-to-image | تحويل pdf الى صورة |
| compress-pdf | ضغط ملف pdf |
| reduce-pdf-size | تصغير حجم ملف pdf |
| unlock-pdf | فك حماية ملف pdf |
| protect-pdf | حماية ملف pdf بكلمة مرور |
| pdf-viewer | فتح ملف pdf / قارئ pdf |
| edit-pdf | تعديل ملف pdf |
| sign-pdf | توقيع ملف pdf |
| pdf-editor (locale-only `edit:tahrir`) | تحرير ملف pdf / محرر pdf |

Priorities: nav pages 1-11 by Arabic demand (merge 1, image-to-pdf 2, compress 3, pdf-to-image 4, edit 5, split 6, viewer 7, unlock 8, protect 9, rotate 10, organize 11); variants 12-20 (jpg-to-pdf 12, pdf-to-jpg 13, sign 14, reduce-size 15, tahrir (pdf-editor) 16, scan 17, png-to-pdf 18, extract 19, pdf-to-png 20).

## Glossary (one term per concept)

file ملف · page صفحة · upload رفع · download (a file) تنزيل · page load تحميل الصفحة · browser المتصفح · device جهازك · computer الحاسوب · phone الهاتف · drop أفلت · click انقر · tap / key press اضغط · drag اسحب · password كلمة المرور (كلمة السر only in keywords) · encryption تشفير · whiteout تبييض · highlight تمييز · draw رسم · select تحديد · undo تراجع · redo إعادة · reset إعادة الضبط · zoom in / out تكبير / تصغير · resolution الدقة · lossless بدون فقدان · watermark علامة مائية · viewer (program) عارض / برنامج عرض · reader قارئ · vector graphics الرسوم المتجهة · online عبر الإنترنت (copy), اون لاين (keywords).

Style: Modern Standard Arabic, imperative singular, verbal noun (المصدر) in headings and buttons, Western digits, Arabic punctuation (، ؛ ؟), guillemets «» for quoted UI labels, Latin product and format names kept.

## Strings without a clean Arabic equivalent

- Plurals: Arabic has six plural forms; the framework has `one` and `other`. `other` uses the partitive form "{n} من الصفحات", which is grammatical for every count (2, 3-10, 11+), instead of "{n} صفحات", which is wrong above 10. `one` is "{n} صفحة" ("1 صفحة"). `merge.summary` and `organize.output` use the label form "الملفات: {files} · الصفحات: {pages}" for the same reason.
- `pdfToImages.summary`: the arrow "→" is not mirrored in RTL text, so it is replaced by the word "إلى".
- `toolShell.howToName`: uses `{h1Lower}` because the test requires the English placeholder; Arabic has no case, so it equals the h1. Result: "كيفية دمج ملفات PDF عبر الإنترنت مجانًا".
- `edit.whiteout`: no established Arabic word. "تبييض" (whitening) is short and understood in Arabic PDF editors; "طمس" was rejected because it implies redaction, which the tool does not do (the FAQ says so).
- Edit tool and Arabic text: the standard PDF fonts (WinAnsi) cannot encode Arabic, so the text tool prints "?" for Arabic input. The English "special character" FAQ was rewritten as "لماذا تظهر الحروف العربية كعلامات استفهام؟" on `edit-pdf` and the tahrir variant, with the workaround (Latin text, or add the Arabic text as an image). Product suggestion for the owner: embed an Arabic font in the edit tool before promoting the Arabic edit pages.
- `sign-pdf` title: the English "Draw or Upload Your Signature ... No Upload" would contradict itself in Arabic ("ارفع" = upload), so the title says "أضف صورته" (add its image).
- `about.limits[2]`: "100 MiB" and other units (MB, KB, DPI, px) stay in Latin, as is normal on Arabic tech sites.
- `common.keywords` had to keep exactly seven entries (the test compares array lengths), so the transliteration "بي دي اف" replaced one of the lower-demand English phrases.
