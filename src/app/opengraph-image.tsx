import { OG_SIZE, renderOg } from "@/lib/og";
import { SITE_TAGLINE } from "@/lib/site";

export const alt = "PDF Anvil – Free PDF tools that run in your browser";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: SITE_TAGLINE,
    subtitle: "Merge, split, rotate, organize, and convert PDFs privately.",
  });
}
