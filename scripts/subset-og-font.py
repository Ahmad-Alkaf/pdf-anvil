"""Subset a big Open Graph font to the characters one locale uses.

Usage:
  python scripts/subset-og-font.py <locale> <source font> <output font>
Example:
  python scripts/subset-og-font.py ja NotoSansJP-Bold.otf src/assets/fonts/NotoSansJP-Bold.subset.otf

Needs fonttools: python -m pip install --user fonttools

The subset keeps every non-ASCII character found in src/locales/<locale>/*.ts,
plus ASCII, plus the kana blocks and CJK punctuation for Japanese, so a small
copy edit rarely needs a new subset. It writes <output>.chars.txt next to the
font; __tests__/og-fonts.test.ts fails when the locale copy uses a character
that is not in that file, which means: run this script again and commit both.
"""
import glob
import os
import re
import subprocess
import sys

locale, src, out = sys.argv[1], sys.argv[2], sys.argv[3]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
chars = set()
for path in glob.glob(os.path.join(root, "src", "locales", locale, "*.ts")):
    with open(path, encoding="utf-8") as f:
        chars.update(ch for ch in f.read() if ord(ch) > 0x7F)
chars.update(chr(c) for c in range(0x20, 0x7F))
if locale == "ja":
    for a, b in ((0x3000, 0x303F), (0x3040, 0x309F), (0x30A0, 0x30FF), (0xFF01, 0xFF5E)):
        chars.update(chr(c) for c in range(a, b + 1))
text = "".join(sorted(chars))
subprocess.run(
    [sys.executable, "-m", "fontTools.subset", src, f"--text={text}", f"--output-file={out}",
     "--layout-features=*", "--no-hinting", "--desubroutinize"],
    check=True,
)
with open(out + ".chars.txt", "w", encoding="utf-8") as f:
    f.write(text)
print(f"{out}: {os.path.getsize(out)} bytes, {len(chars)} characters")
