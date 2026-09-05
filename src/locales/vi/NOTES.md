# Vietnamese (vi) locale notes

Written in English so the reviewer can compare quickly. Locale: `vi`, script `latin`, `dir: ltr`. Slugs are the most searched Vietnamese phrase with diacritics stripped (đ becomes d).

## Dropped English variants

- `webp-to-pdf` (images-to-pdf): "webp sang pdf" has negligible Vietnamese search demand. WebP is named in the copy and keywords of `image-to-pdf` (`anh-sang-pdf`), which accepts WebP anyway.

## Locale-only variants

- None. Every common Vietnamese synonym maps onto an existing English variant, so the pages keep their English ids and hreflang links:
  - "gộp file pdf" mirrors `combine-pdf` (slug `gop-file-pdf`). "Ghép" (Bing 110K) is the nav page; "gộp" is the second most typed word and gets its own page. "Nối file pdf" is a third synonym with less demand; it sits in the keywords of both pages and in the "gộp, ghép và nối" FAQ.
  - "cắt file pdf" / "cắt trang pdf" mirrors `extract-pdf-pages` (slug `cat-file-pdf`). "Tách" is the nav page (split into files); "cắt" is what people type when they want some pages out of a file, which is the extract intent.
  - "giảm dung lượng pdf" mirrors `reduce-pdf-size` (slug `giam-dung-luong-pdf`). "Nén pdf" is the nav page; "giảm dung lượng" is typed almost as often and is a distinct phrase.
- "sửa file pdf" is a shortened form of "chỉnh sửa pdf", not a distinct synonym. It is a keyword of `chinh-sua-pdf`, not a page.
- "chuyển pdf sang word" (Bing 123K) has no tool on the site. Not mapped anywhere.

## Slug search phrase per page

| slug | id | phrase |
|---|---|---|
| ghep-file-pdf | merge-pdf | ghép file pdf |
| gop-file-pdf | combine-pdf | gộp file pdf |
| tach-file-pdf | split-pdf | tách file pdf |
| cat-file-pdf | extract-pdf-pages | cắt file pdf / cắt trang pdf |
| xoay-pdf | rotate-pdf | xoay pdf |
| sap-xep-trang-pdf | organize-pdf | sắp xếp trang pdf / xóa trang pdf |
| anh-sang-pdf | image-to-pdf | chuyển ảnh sang pdf |
| jpg-sang-pdf | jpg-to-pdf | jpg sang pdf |
| png-sang-pdf | png-to-pdf | png sang pdf |
| scan-pdf | scan-to-pdf | scan pdf / scan tài liệu sang pdf |
| pdf-sang-anh | pdf-to-image | chuyển pdf sang ảnh |
| pdf-sang-jpg | pdf-to-jpg | pdf sang jpg |
| pdf-sang-png | pdf-to-png | pdf sang png |
| nen-pdf | compress-pdf | nén pdf |
| giam-dung-luong-pdf | reduce-pdf-size | giảm dung lượng pdf |
| mo-khoa-pdf | unlock-pdf | mở khóa pdf / gỡ mật khẩu pdf |
| dat-mat-khau-pdf | protect-pdf | đặt mật khẩu pdf / bảo vệ pdf |
| doc-pdf | pdf-viewer | đọc pdf / mở file pdf |
| chinh-sua-pdf | edit-pdf | chỉnh sửa pdf / sửa file pdf |
| ky-pdf | sign-pdf | ký pdf / chữ ký pdf |

Priorities: nav pages 1-11 by Vietnamese demand (merge 1, image-to-pdf 2, compress 3, pdf-to-image 4, edit 5, split 6, viewer 7, unlock 8, protect 9, rotate 10, organize 11); variants 12-20 (combine 12, jpg-to-pdf 13, pdf-to-jpg 14, reduce-size 15, extract 16, sign 17, scan 18, png-to-pdf 19, pdf-to-png 20).

Keywords carry each phrase with and without diacritics ("ghép file pdf", "ghep file pdf") because Vietnamese users type both.

## Glossary (one term per concept)

file: file (not "tệp"; "tệp" is the formal UI word, but users search and say "file") · page: trang · upload: tải lên · download: tải xuống (folder: thư mục tải xuống) · browser: trình duyệt · device: thiết bị · computer: máy tính · phone: điện thoại · server: máy chủ · drop: kéo thả · click: nhấp · tap: chạm · key press: nhấn · drag: kéo · hover: di chuột lên · password: mật khẩu · user password: mật khẩu người dùng · owner password: mật khẩu chủ sở hữu · encryption: mã hóa · re-encode (images): nén lại · render: dựng · whiteout: che trắng (rectangle: ô che trắng) · highlight: tô sáng · draw: vẽ · text (the tool and the object): văn bản (hộp văn bản); text as letters on a page: chữ · image: ảnh · select: chọn · undo: hoàn tác · redo: làm lại · reset: đặt lại · zoom in / out: phóng to / thu nhỏ · fit width: vừa chiều rộng · resolution: độ phân giải · lossless (level): không giảm chất lượng · watermark: watermark · viewer (a program): trình xem PDF · reader (the page and the concept): trình đọc PDF · vector graphics: đồ họa vector · page size: khổ trang · scan: scan (verb and "bản scan"; "quét" only in keywords) · online: online ("trực tuyến" is formal and less typed) · free: miễn phí · account: tài khoản · limit: giới hạn; daily quota: hạn mức mỗi ngày · size (bytes): dung lượng.

Style: "bạn" for the user, imperative for steps, sentence case in titles (Vietnamese does not title-case every word), curly quotes “ ” around quoted UI labels, digits and units (MB, KB, DPI, px) as in English, product and format names kept.

## Strings without a clean Vietnamese equivalent

- Plurals: Vietnamese has no plural form, so `one` and `other` are identical in every `Plural` ("{n} trang"). Both forms are given because the type requires them.
- `toolShell.dropzone.dropFiles` / `dropFile`: plural marked with "các" ("Kéo thả các file") so the two strings differ.
- `toolShell.howToName`: uses `{h1Lower}`; `lowerFirst("Ghép file PDF")` gives "ghép file PDF", so the HowTo name reads "Cách ghép file PDF online miễn phí".
- `toolShell.howItWorks`: "How it works" rendered as "Cách thực hiện" (how to do it) because the section lists steps for the user.
- `edit.whiteout`: no established Vietnamese word. "Che trắng" (cover with white) was chosen over "xóa trắng" (delete white), because the FAQ says the covered text stays in the file; "xóa" would promise removal.
- `edit.text`: "Văn bản" for the tool and the text box (standard UI term), "chữ" when the copy talks about letters on the page. The English "Text" covers both.
- `pdfToImages.summary`: the arrow "→" is kept; it reads fine in Vietnamese.
- Edit tool and Vietnamese text: the standard PDF fonts (WinAnsi) cannot encode most Vietnamese letters (ă, ơ, ư, đ, and every tone-marked vowel), so the text tool prints "?" for them. The English "special character" FAQ was rewritten as "Vì sao chữ tiếng Việt có dấu hiện thành dấu hỏi?" on `chinh-sua-pdf`, with the workaround (type without diacritics, or add the text as an image). Product suggestion for the owner: embed a Vietnamese-capable font in the edit tool before promoting the Vietnamese edit and sign pages.
- `sign-pdf` title: "Upload Your Signature" would contradict "No Upload" in Vietnamese ("tải lên" is the same word), so the title says "chèn ảnh chữ ký" (insert a signature image).
- `common.keywords` keeps exactly seven entries because the test compares the flattened key set.
- `about.limits[2]`: "100 MiB" and other units stay in Latin, as on Vietnamese tech sites.
