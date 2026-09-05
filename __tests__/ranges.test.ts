import { describe, expect, it } from "vitest";
import { PdfError } from "@/lib/pdf/errors";
import { parseRanges, rangeIndices, rangeLabel } from "@/lib/pdf/ranges";

function badRange(fn: () => unknown, detail: RegExp) {
  try {
    fn();
  } catch (err) {
    expect(err).toBeInstanceOf(PdfError);
    expect((err as PdfError).code).toBe("bad-range");
    expect((err as PdfError).message).toMatch(detail);
    return;
  }
  throw new Error("expected a bad-range PdfError");
}

describe("parseRanges", () => {
  it("parses single pages, closed ranges, and open-ended ranges", () => {
    expect(parseRanges("1-3, 5, 8-", 10)).toEqual([
      { start: 1, end: 3 },
      { start: 5, end: 5 },
      { start: 8, end: 10 },
    ]);
  });

  it("treats a leading dash as 'from page 1'", () => {
    expect(parseRanges("-3", 10)).toEqual([{ start: 1, end: 3 }]);
  });

  it("accepts spaces as separators and ignores extra whitespace", () => {
    expect(parseRanges("  1 2   3-4 ", 4)).toEqual([
      { start: 1, end: 1 },
      { start: 2, end: 2 },
      { start: 3, end: 4 },
    ]);
  });

  it("allows the same page in several ranges", () => {
    expect(parseRanges("1-2, 2-3", 3)).toEqual([
      { start: 1, end: 2 },
      { start: 2, end: 3 },
    ]);
  });

  it("rejects empty input", () => {
    badRange(() => parseRanges("", 5), /at least one/);
    badRange(() => parseRanges("   ", 5), /at least one/);
  });

  it("rejects text that is not a page or range", () => {
    badRange(() => parseRanges("abc", 5), /"abc" is not a page or range/);
    badRange(() => parseRanges("1-3-5", 5), /not a page or range/);
    badRange(() => parseRanges("-", 5), /not a page or range/);
    badRange(() => parseRanges("1,,x", 5), /not a page or range/);
  });

  it("rejects page 0", () => {
    badRange(() => parseRanges("0", 5), /start at 1/);
    badRange(() => parseRanges("0-2", 5), /start at 1/);
  });

  it("rejects pages beyond the document", () => {
    badRange(() => parseRanges("6", 5), /has 5 pages/);
    badRange(() => parseRanges("2-9", 5), /has 5 pages/);
  });

  it("rejects ranges that end before they start", () => {
    badRange(() => parseRanges("5-3", 10), /ends before it starts/);
  });
});

describe("rangeLabel", () => {
  it("names single pages and ranges", () => {
    expect(rangeLabel({ start: 3, end: 3 })).toBe("page-3");
    expect(rangeLabel({ start: 1, end: 3 })).toBe("pages-1-3");
  });
});

describe("rangeIndices", () => {
  it("returns 0-based indices", () => {
    expect(rangeIndices({ start: 1, end: 1 })).toEqual([0]);
    expect(rangeIndices({ start: 2, end: 4 })).toEqual([1, 2, 3]);
  });
});
