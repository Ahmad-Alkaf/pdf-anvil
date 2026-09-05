import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_RED, MARK_PATH, MARK_VIEWBOX } from "./brand";
import { SITE_DOMAIN } from "./site";

export { OG_SIZE } from "./og-size";
import { OG_SIZE } from "./og-size";

let fontPromise: Promise<ArrayBuffer> | null = null;
function loadFont(): Promise<ArrayBuffer> {
  fontPromise ??= readFile(join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Bold.woff")).then(
    (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer,
  );
  return fontPromise;
}

export async function renderOg({ title, subtitle, footer }: { title: string; subtitle: string; footer: string }) {
  const font = await loadFont();
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
          fontFamily: "Space Grotesk",
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
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#57534e" }}>{subtitle}</div>
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
      fonts: [{ name: "Space Grotesk", data: font, weight: 700, style: "normal" }],
    },
  );
}
