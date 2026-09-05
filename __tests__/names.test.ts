import { describe, expect, it } from "vitest";
import { combinedName, outputName, pageName, shortBase, splitPartName } from "@/lib/names";

describe("shortBase", () => {
  it("keeps short names as they are", () => {
    expect(shortBase("report.pdf")).toBe("report");
  });

  it("cuts long names and drops a dangling separator", () => {
    const long = `${"a".repeat(59)}-abc.pdf`;
    expect(shortBase(long)).toBe("a".repeat(59));
    expect(shortBase("x".repeat(100) + ".pdf", 10)).toBe("x".repeat(10));
  });
});

describe("outputName", () => {
  it("keeps the upload name and swaps the extension", () => {
    expect(outputName("report.pdf")).toBe("report.pdf");
    expect(outputName("report.PDF", "zip")).toBe("report.zip");
    expect(outputName("scan", "pdf")).toBe("scan.pdf");
  });
});

describe("pageName", () => {
  it("marks the page and pads to the given width", () => {
    expect(pageName("report.pdf", 3, "jpg", 2)).toBe("report-p03.jpg");
    expect(pageName("report.pdf", 12, "png", 3)).toBe("report-p012.png");
    expect(pageName("report.pdf", "1-3", "pdf")).toBe("report-p1-3.pdf");
  });
});

describe("splitPartName", () => {
  it("converts split labels", () => {
    expect(splitPartName("report.pdf", "page-3")).toBe("report-p3.pdf");
    expect(splitPartName("report.pdf", "page-3", 2)).toBe("report-p03.pdf");
    expect(splitPartName("report.pdf", "pages-1-3", 2)).toBe("report-p01-03.pdf");
    expect(splitPartName("report.pdf", "odd")).toBe("report-podd.pdf");
  });
});

describe("combinedName", () => {
  it("joins two or three short names with +", () => {
    expect(combinedName(["invoice.pdf", "receipt.pdf"])).toBe("invoice+receipt.pdf");
    expect(combinedName(["a.pdf", "b.pdf", "c.pdf"])).toBe("a+b+c.pdf");
  });

  it("uses the first name and a count when the list is long", () => {
    const names = Array.from({ length: 5 }, (_, i) => `quarterly-report-${i + 1}.pdf`);
    expect(combinedName(names)).toBe("quarterly-report-1+4-more.pdf");
    expect(combinedName(["x".repeat(40) + ".pdf", "y".repeat(40) + ".pdf"])).toBe(`${"x".repeat(32)}+1-more.pdf`);
  });

  it("handles one or zero names", () => {
    expect(combinedName(["photo.jpg"])).toBe("photo.pdf");
    expect(combinedName([])).toBe("combined.pdf");
  });
});
