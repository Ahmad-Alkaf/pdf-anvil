// Single source for the PDF Anvil mark. Every icon, logo, and share image
// renders MARK_PATH. Change the shape here and run `npm run icons`.

export const BRAND_RED = "#DC2626";
export const BRAND_RED_DARK = "#B91C1C";
export const MARK_VIEWBOX = "0 0 64 64";

// Anvil silhouette: rounded horn on the left, flat face with the top-right
// corner cut like a folded page, narrow waist, wide foot. The small triangle
// is a hole (fill-rule evenodd) that draws the fold flap. Reads at 16 px.
export const MARK_PATH = [
  "M14 14",
  "H48",
  "L58 24",
  "V28",
  "H42",
  "V44",
  "H50",
  "V50",
  "H56",
  "V56",
  "H8",
  "V50",
  "H14",
  "V44",
  "H22",
  "V28",
  "H16",
  "C10 28 4 24 4 20",
  "C4 16 9 14 14 14",
  "Z",
  "M49.5 16.5",
  "V23",
  "H56",
  "Z",
].join(" ");
