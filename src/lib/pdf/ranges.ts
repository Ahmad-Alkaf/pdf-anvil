import { PdfError } from "./errors";

export interface PageRange {
  start: number; // 1-based inclusive
  end: number; // 1-based inclusive
}

/**
 * Parse "1-3, 5, 8-" into ranges validated against pageCount.
 * Throws PdfError("bad-range") with a detail for the first problem.
 */
export function parseRanges(input: string, pageCount: number): PageRange[] {
  const text = input.trim();
  if (!text) throw new PdfError("bad-range", "enter at least one page or range");
  const parts = text.split(/[,\s]+/).filter(Boolean);
  const ranges: PageRange[] = [];

  for (const part of parts) {
    const m = /^(\d+)?(?:-(\d+)?)?$/.exec(part);
    if (!m || (m[1] === undefined && m[2] === undefined)) {
      throw new PdfError("bad-range", `"${part}" is not a page or range`);
    }
    const hasDash = part.includes("-");
    const start = m[1] !== undefined ? Number(m[1]) : 1;
    const end = hasDash ? (m[2] !== undefined ? Number(m[2]) : pageCount) : start;

    if (start < 1) throw new PdfError("bad-range", "pages start at 1");
    if (end > pageCount) throw new PdfError("bad-range", `this PDF has ${pageCount} pages`);
    if (start > end) throw new PdfError("bad-range", `"${part}" ends before it starts`);
    ranges.push({ start, end });
  }
  return ranges;
}

export function rangeLabel(r: PageRange): string {
  return r.start === r.end ? `page-${r.start}` : `pages-${r.start}-${r.end}`;
}

/** 0-based page indices for a range. */
export function rangeIndices(r: PageRange): number[] {
  const out: number[] = [];
  for (let p = r.start; p <= r.end; p++) out.push(p - 1);
  return out;
}
