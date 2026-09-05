import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { LOCALE_FONTS } from "@/lib/og-fonts";

const fontsDir = fileURLToPath(new URL("../src/assets/fonts/", import.meta.url));
const localesDir = fileURLToPath(new URL("../src/locales/", import.meta.url));

/** Every non-ASCII character in the copy of one locale folder. */
function localeChars(code: string): Set<string> {
  const dir = `${localesDir}${code}/`;
  const chars = new Set<string>();
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".ts")) continue;
    for (const ch of readFileSync(dir + name, "utf8")) if (ch.codePointAt(0)! > 0x7f) chars.add(ch);
  }
  return chars;
}

describe("Open Graph fonts", () => {
  for (const [code, font] of Object.entries(LOCALE_FONTS)) {
    it(`${code}: the bundled font file exists`, () => {
      expect(existsSync(fontsDir + font.file), font.file).toBe(true);
    });

    if (!font.subset) continue;
    it(`${code}: the subset font covers every character of the locale copy`, () => {
      if (!existsSync(`${localesDir}${code}/index.ts`)) return;
      const sidecar = `${fontsDir}${font.file}.chars.txt`;
      expect(existsSync(sidecar), `${sidecar} is missing; run scripts/subset-og-font.py`).toBe(true);
      const covered = new Set(readFileSync(sidecar, "utf8"));
      const missing = [...localeChars(code)].filter((ch) => !covered.has(ch));
      expect(missing, `characters missing from ${font.file}; run scripts/subset-og-font.py ${code} ... and commit both files`).toEqual([]);
    });
  }
});
