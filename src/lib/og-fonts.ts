// Fonts for the Open Graph images. Bundled files in src/assets/fonts, never
// fetched: Satori (next/og) would otherwise download a fallback font for
// scripts the Latin font cannot cover, and its parser fails on some of those.
// One entry per non-Latin locale. Big CJK fonts are subset to the characters
// the locale uses (scripts/subset-og-font.py) and carry a `.chars.txt` sidecar
// that __tests__/og-fonts.test.ts checks against the locale copy.
export interface OgFont {
  file: string;
  family: string;
  /** True when the file is a subset with a `<file>.chars.txt` sidecar. */
  subset?: boolean;
}

export const LATIN_FONT: OgFont = { file: "SpaceGrotesk-Bold.woff", family: "Space Grotesk" };

export const LOCALE_FONTS: Record<string, OgFont> = {
  ar: { file: "Vazirmatn-Bold.ttf", family: "Vazirmatn" }, // OFL, Arabic and Persian
  th: { file: "Sarabun-Bold.ttf", family: "Sarabun" }, // OFL, Thai
  ja: { file: "NotoSansJP-Bold.subset.otf", family: "Noto Sans JP", subset: true }, // OFL, Japanese
};
