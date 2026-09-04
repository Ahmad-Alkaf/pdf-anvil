import { ImageResponse } from "next/og";
import { BRAND_RED, MARK_PATH, MARK_VIEWBOX } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_RED,
          borderRadius: 40,
        }}
      >
        <svg width={116} height={116} viewBox={MARK_VIEWBOX} fill="#ffffff" fillRule="evenodd">
          <path d={MARK_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
