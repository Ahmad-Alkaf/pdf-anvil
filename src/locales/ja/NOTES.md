# Japanese (ja) locale notes

Written in English so the reviewer can compare quickly. Locale: `ja`, script `other`, `dir: ltr`. Every page is mirrored, so every slug keeps its English form (non-Latin-script rule). No locale-only variant was needed.

## Dropped English variants

- `webp-to-pdf` (images-to-pdf): "webp pdf 変換" has small Japanese search demand compared with "jpg pdf 変換" and "画像 pdf 変換". The phrase sits in the keywords of `image-to-pdf`, which accepts WebP anyway.

## Kept English variants and the Japanese phrase behind each

- `combine-pdf` (merge): Japanese has two everyday phrasings next to "結合": "統合" and "まとめる" ("pdf 統合", "pdf まとめる" are both common). The English "combine" page is the natural mirror for them, so it is kept as a mirrored page (id and slug `combine-pdf`) instead of a locale-only variant. This keeps hreflang with the English combine page. Own title, intro, steps, five own FAQ entries, keywords.
- `extract-pdf-pages` (split): "pdf ページ 抽出" is a distinct, searched phrase. Kept.
- `reduce-pdf-size` (compress): "pdf 容量 小さく" / "pdf 容量 減らす" / "pdf 軽量化" is a distinct intent (get under a mail or upload limit). Kept.
- `jpg-to-pdf`, `png-to-pdf`, `scan-to-pdf` (images-to-pdf): "jpg pdf 変換" is a top phrase; "png pdf 変換" is smaller but distinct; "スキャン pdf" / "スマホ スキャン pdf" is common. Kept.
- `pdf-to-jpg`, `pdf-to-png` (pdf-to-images): "pdf jpeg 変換" (Bing 87K) is the largest phrase of the kind; "pdf png 変換" is distinct. Kept.
- `sign-pdf` (edit): "pdf 署名" / "pdf 電子署名" is a distinct, searched phrase. Kept.

## Locale-only variants

None. "統合/まとめる" is covered by `combine-pdf`; no other Japanese synonym is common enough to justify its own page (the test also limits locale-only slugs to English slug words, so `pdf-combiner` would not pass anyway).

## Term choices per kind (chosen / rejected)

- merge: 結合 (nav) / 統合, まとめる (kept together on `combine-pdf`), 連結 (keywords only), 合体 (rejected, colloquial).
- split: 分割 (nav) / 分ける (keywords only). `extract-pdf-pages`: ページ抽出 / 抜き出し, 取り出し (keywords only).
- rotate: 回転 / 向き変更 (keywords only).
- organize: ページ並べ替え (nav name) / 並び替え (keywords only), 整理 (used in copy for "clean"), ページ削除 (leads the keywords because "pdf ページ 削除" is the most typed phrase of the kind).
- images-to-pdf: 画像をPDFに変換 (nav) / 画像 pdf 化 (keywords). Scan page: スキャン in copy, "pdf化" in keywords.
- pdf-to-images: PDFを画像に変換 (nav). JPG page keywords lead with "pdf jpeg 変換" (the searched spelling) and also carry "pdf jpg 変換".
- view: name "PDF閲覧", h1 "PDFを開いて閲覧" / ビューア (copy and keywords; "ビューアー" only in one keyword), リーダー (one FAQ, keywords), "pdf 開く" leads the title.
- compress: 圧縮 (nav) / 容量を小さくする (kept as `reduce-pdf-size`), 軽量化, 軽くする (keywords only), 縮小 (rejected: reads as page scaling).
- unlock: パスワード解除 (nav) / ロック解除, 保護解除, パスワードを外す (keywords only), 復号 (rejected, technical).
- protect: パスワードを設定 (nav name), パスワードで保護 (h1) / 暗号化, ロック, パスワードをかける (keywords only).
- edit: 編集 (nav) / 書き込み, 文字入力 (keywords only). `sign-pdf`: 署名 / サイン, 電子署名 (keywords and copy).

## Slug search phrase per page

| slug | phrase |
|---|---|
| merge-pdf | pdf 結合 |
| combine-pdf | pdf 統合 / pdf まとめる |
| split-pdf | pdf 分割 |
| extract-pdf-pages | pdf ページ 抽出 |
| rotate-pdf | pdf 回転 |
| organize-pdf | pdf ページ 並べ替え / pdf ページ 削除 |
| jpg-to-pdf | jpg pdf 変換 |
| png-to-pdf | png pdf 変換 |
| image-to-pdf | 画像 pdf 変換 |
| scan-to-pdf | スキャン pdf / スマホ スキャン pdf |
| pdf-to-jpg | pdf jpeg 変換 / pdf jpg 変換 |
| pdf-to-png | pdf png 変換 |
| pdf-to-image | pdf 画像 変換 |
| compress-pdf | pdf 圧縮 |
| reduce-pdf-size | pdf 容量 小さく |
| unlock-pdf | pdf パスワード 解除 / pdf ロック解除 |
| protect-pdf | pdf パスワード 設定 / pdf 暗号化 |
| pdf-viewer | pdf 閲覧 / pdf 開く |
| edit-pdf | pdf 編集 |
| sign-pdf | pdf 署名 / pdf 電子署名 |

Priorities: nav pages 1-11 by Japanese demand (merge 1, pdf-to-image 2, image-to-pdf 3, compress 4, edit 5, split 6, viewer 7, unlock 8, protect 9, rotate 10, organize 11); variants 12-20 (pdf-to-jpg 12, jpg-to-pdf 13, combine 14, reduce-size 15, sign 16, extract 17, scan 18, png-to-pdf 19, pdf-to-png 20).

## Glossary (one term per concept)

file ファイル · page ページ · upload アップロード · download ダウンロード · browser ブラウザ · device 端末 (お使いの端末) · computer パソコン · phone スマホ · tablet タブレット · drop ドロップ · click クリック · tap タップ · drag ドラッグ · the drop box 枠 · password パスワード · user password 開くパスワード · owner password 権限パスワード (Adobe Acrobat Japanese terms) · permissions 権限 · encryption 暗号化 · whiteout 白塗り · highlight ハイライト · draw / drawing 手書き · select 選択 · item アイテム · undo 元に戻す · redo やり直す · reset リセット · zoom in / out 拡大 / 縮小 · fit width 幅に合わせる · resolution 解像度 · lossless 無劣化 · balanced バランス · smallest 最小 · watermark 透かし · viewer ビューア · reader リーダー · vector graphics ベクターグラフィック · thumbnail サムネイル · online オンライン · free 無料 · account アカウント · Letter レター · scan スキャン · sharp 鮮明.

Style: polite です・ます for sentences; noun phrases for buttons, labels, and headings; full-width 、。「」（）; half-width digits and Latin letters; no space between Japanese and Latin words except before a unit ("100 MB", "72 DPI", "1600 px") and inside range examples ("1-3, 5, 8-"), where the user types the spaces.

## Strings without a clean Japanese equivalent

- Plurals: Japanese has no plural. `one` and `other` carry the same text with a counter word: "{n}ページ", "{n}個のファイル", "{n}枚の画像", "{n}個のアイテム".
- `toolShell.howToName`: the framework offers `{h1}` and `{h1Lower}`; Japanese has no case, so `{h1Lower}` equals the h1. Every h1 was written as a verb-stem noun phrase so that "{h1Lower}する方法（無料・オンライン）" is grammatical: "PDFを結合する方法（無料・オンライン）". This is why the `combine-pdf` h1 is "PDFファイルを統合" (not "まとめる") and the `reduce-pdf-size` h1 is "PDFの容量を削減" (not "小さくする"); the "まとめる" / "小さくする" phrasing lives in the title, name, action label, and keywords.
- `merge.summary`: `{files}` and `{pages}` are raw numbers, so counters are added: "{files}個のファイル · {pages}ページ". `edit.summary` receives already-pluralized strings: "{pages}に{items}".
- `footer.copyright`: "All rights reserved." is kept in English, which is normal on Japanese sites.
- `common.keywords` keeps exactly seven entries (the test compares array lengths).
- `edit.whiteout`: "白塗り" is the term Japanese PDF editors use; "ホワイトアウト" (loanword, rejected) and "墨消し" (redaction, rejected: the tool does not redact and the FAQ says so).
- `edit.draw`: "手書き" instead of "描画" because the tool label sits next to 署名 (signature) and Japanese users read "手書き署名"; "描画" was rejected as technical.
- Edit tool and Japanese text: the standard PDF fonts (WinAnsi) cannot encode Japanese, so the text tool prints "?" for Japanese input. The English "special character" FAQ was rewritten as "日本語を入力すると「?」になるのはなぜですか？" on `edit-pdf`, with the workaround (type Latin text, or write the Japanese text in another app, screenshot it, and add it with the Image tool). Product suggestion for the owner: embed a Japanese font in the edit tool before promoting the Japanese edit page; until then, the sign page is the safer entry point because a drawn signature needs no font.
- `sign-pdf` title: English "Draw or Upload Your Signature ... No Upload" would contradict itself in Japanese ("アップロード" is the same word), so the title says "手書きまたは画像でサインを入れる".
- `about.limits[2]`: "100 MiB" and the other units (MB, KB, DPI, px) stay in Latin, as is normal on Japanese tech sites.
