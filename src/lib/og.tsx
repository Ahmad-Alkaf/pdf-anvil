import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type React from "react";
import { ImageResponse } from "next/og";
import { BRAND_RED, MARK_PATH, MARK_VIEWBOX } from "./brand";
import { SITE_DOMAIN } from "./site";

export { OG_SIZE } from "./og-size";
import { OG_SIZE } from "./og-size";

// Fonts are bundled files, never fetched. Satori (next/og) would otherwise
// download a fallback font for scripts the Latin font cannot cover, and its
// parser fails on some of those files. Add one entry per non-Latin locale.
// Vazirmatn (OFL 1.1) covers Arabic and Persian.
const LATIN_FONT = { file: "SpaceGrotesk-Bold.woff", family: "Space Grotesk" };
const LOCALE_FONTS: Record<string, { file: string; family: string }> = {
  ar: { file: "Vazirmatn-Bold.ttf", family: "Vazirmatn" },
};

const fontCache = new Map<string, Promise<ArrayBuffer>>();
function loadFont(file: string): Promise<ArrayBuffer> {
  let p = fontCache.get(file);
  if (!p) {
    p = readFile(join(process.cwd(), "src/assets/fonts", file)).then(
      (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer,
    );
    fontCache.set(file, p);
  }
  return p;
}

const RTL_CHAR = /[֐-ࣿיִ-﷿ﹰ-﻿]/;
const LTR_CHAR = /[A-Za-z0-9]/;

/**
 * Split a line into items whose visual order is decided by flex layout, not by
 * Satori. Satori shapes the letters of one Arabic word correctly, but it
 * misorders words inside a longer right-to-left run and places an embedded
 * Latin word such as "PDF" at the wrong end of the line. So every
 * right-to-left word is its own item, consecutive left-to-right words stay
 * together as one item, and punctuation-only tokens attach to the item before
 * them. A row-reverse flex container then lays the items out right to left.
 */
export function bidiRuns(text: string): { dir: "ltr" | "rtl"; text: string }[] {
  const runs: { dir: "ltr" | "rtl"; text: string }[] = [];
  const push = (token: string) => {
    const dir: "ltr" | "rtl" | null = RTL_CHAR.test(token) ? "rtl" : LTR_CHAR.test(token) ? "ltr" : null;
    const last = runs[runs.length - 1];
    if (last && dir === "ltr" && last.dir === "ltr") last.text += ` ${token}`;
    else runs.push({ dir: dir ?? "rtl", text: token });
  };
  for (const word of text.split(/\s+/).filter(Boolean)) {
    // Satori draws trailing punctuation of an Arabic word on its right side.
    // As a separate item it lands to the left of the word, where it belongs.
    const m = RTL_CHAR.test(word) ? /^(.*?)([.,:;!?،؛؟…]+)$/.exec(word) : null;
    if (m && m[1]) {
      push(m[1]);
      push(m[2]);
    } else push(word);
  }
  return runs;
}
function Line({ text, dir, style }: { text: string; dir: "ltr" | "rtl"; style: React.CSSProperties }) {
  if (dir === "ltr") return <div style={{ display: "flex", ...style }}>{text}</div>;
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", columnGap: "0.14em", ...style }}>
      {bidiRuns(text).map((run, i) => (
        <span key={i} style={{ direction: run.dir }}>
          {run.text}
        </span>
      ))}
    </div>
  );
}

export interface OgInput {
  title: string;
  subtitle: string;
  footer: string;
  /** Locale code; picks the extra font and the text direction. */
  locale?: string;
  dir?: "ltr" | "rtl";
}

export async function renderOg({ title, subtitle, footer, locale = "en", dir = "ltr" }: OgInput) {
  const extra = LOCALE_FONTS[locale];
  const [latin, extraData] = await Promise.all([loadFont(LATIN_FONT.file), extra ? loadFont(extra.file) : undefined]);
  const fonts = [{ name: LATIN_FONT.family, data: latin, weight: 700 as const, style: "normal" as const }];
  if (extra && extraData) fonts.push({ name: extra.family, data: extraData, weight: 700, style: "normal" });
  // The locale font comes first so its glyphs win; Latin letters fall back to Space Grotesk.
  const fontFamily = extra ? `${extra.family}, ${LATIN_FONT.family}` : LATIN_FONT.family;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #fffaf8 0%, #fff1ee 100%)",
          color: "#1c1917",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width={72} height={72} viewBox={MARK_VIEWBOX} fill={BRAND_RED} fillRule="evenodd">
            <path d={MARK_PATH} />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            PDF<span style={{ color: BRAND_RED, marginLeft: 12 }}>Anvil</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Line text={title} dir={dir} style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: dir === "rtl" ? 0 : -2, maxWidth: 1000 }} />
          <Line text={subtitle} dir={dir} style={{ fontSize: 32, color: "#57534e" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#78716c" }}>
          <span>{SITE_DOMAIN}</span>
          <span>{footer}</span>
        </div>
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -140,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: BRAND_RED,
            opacity: 0.08,
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts,
    },
  );
}
