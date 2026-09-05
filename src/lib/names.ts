import { baseName, pad } from "./files";

/**
 * Output file names.
 *
 * Rule: the result gets the same name as the upload. The browser adds " (1)"
 * when a file with that name already exists in the download folder, so the
 * original is never overwritten. A suffix is added only when one run makes
 * more than one file, or when several uploads become one file.
 */

/** Longest base name (without extension) that stays readable in a download bar. */
const MAX_BASE = 60;
/** Each upload name gets at most this many characters inside a combined name. */
const MAX_PART = 32;

/** The base name of an upload, cut to `max` characters. */
export function shortBase(fileName: string, max = MAX_BASE): string {
  const base = baseName(fileName);
  return base.length > max ? base.slice(0, max).replace(/[\s.\-_]+$/, "") || base.slice(0, max) : base;
}

/** Same name as the upload: `report.pdf` -> `report.pdf`, or `report.zip` with another extension. */
export function outputName(fileName: string, ext = "pdf"): string {
  return `${shortBase(fileName)}.${ext}`;
}

/**
 * One result out of many, marked with its page: `report-p03.jpg`, `report-p1-3.pdf`.
 * `page` is a page number or a range label such as `1-3`. `width` zero-pads a number so files sort in order.
 */
export function pageName(fileName: string, page: number | string, ext: string, width = 1): string {
  const tag = typeof page === "number" ? pad(page, width) : page;
  return `${shortBase(fileName)}-p${tag}.${ext}`;
}

/** Turns a split label (`page-3`, `pages-1-3`) into a result name: `report-p3.pdf`, `report-p1-3.pdf`. */
export function splitPartName(fileName: string, label: string, width = 1): string {
  const m = /^pages?-(\d+)(?:-(\d+))?$/.exec(label);
  if (!m) return pageName(fileName, label, "pdf");
  const first = Number(m[1]);
  return pageName(fileName, m[2] ? `${pad(first, width)}-${pad(Number(m[2]), width)}` : first, "pdf", width);
}

/**
 * Several uploads combined into one file. The name says what is inside:
 * `invoice+receipt.pdf`, or `invoice+3-more.pdf` when the full list would be too long.
 */
export function combinedName(fileNames: string[], ext = "pdf"): string {
  const bases = fileNames.map((n) => shortBase(n, MAX_PART));
  if (bases.length === 0) return `combined.${ext}`;
  if (bases.length === 1) return `${bases[0]}.${ext}`;
  const joined = bases.join("+");
  if (joined.length <= MAX_BASE) return `${joined}.${ext}`;
  return `${bases[0]}+${bases.length - 1}-more.${ext}`;
}
