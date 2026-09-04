import { ImageResponse } from "next/og";
import { BRAND_RED, MARK_PATH, MARK_VIEWBOX } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={30} height={30} viewBox={MARK_VIEWBOX} fill={BRAND_RED} fillRule="evenodd">
          <path d={MARK_PATH} />
        </svg>
      </div>
    ),
    size,
  );
}
