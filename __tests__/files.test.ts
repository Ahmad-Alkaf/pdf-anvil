import { describe, expect, it } from "vitest";
import {
  acceptToExtensions,
  acceptToInputString,
  baseName,
  formatBytes,
  IMAGE_ACCEPT,
  looksLikePdf,
  matchesAccept,
  pad,
  PDF_ACCEPT,
} from "@/lib/files";

describe("looksLikePdf", () => {
  it("accepts a PDF header at the start", () => {
    expect(looksLikePdf(new TextEncoder().encode("%PDF-1.7\n%âãÏÓ\n"))).toBe(true);
  });

  it("accepts a header after leading junk within 1 KB", () => {
    expect(looksLikePdf(new TextEncoder().encode("\n\n junk %PDF-1.4"))).toBe(true);
  });

  it("rejects other content", () => {
    expect(looksLikePdf(new TextEncoder().encode("PK zip"))).toBe(false);
    expect(looksLikePdf(new Uint8Array(0))).toBe(false);
  });

  it("does not look past the first 1 KB", () => {
    const bytes = new Uint8Array(2048);
    bytes.set(new TextEncoder().encode("%PDF-1.4"), 1500);
    expect(looksLikePdf(bytes)).toBe(false);
  });
});

describe("baseName", () => {
  it("strips the extension", () => {
    expect(baseName("report.pdf")).toBe("report");
    expect(baseName("archive.tar.gz")).toBe("archive.tar");
  });

  it("keeps names without an extension and dotfiles", () => {
    expect(baseName("README")).toBe("README");
    expect(baseName(".hidden")).toBe(".hidden");
  });

  it("replaces characters that are not safe in file names", () => {
    expect(baseName('a/b\\c:d*e?f"g<h>i|j.pdf')).toBe("a-b-c-d-e-f-g-h-i-j");
  });

  it("falls back to 'document' for an empty result", () => {
    expect(baseName(".pdf")).toBe(".pdf");
    expect(baseName("???.pdf")).toBe("-");
    expect(baseName("")).toBe("document");
    expect(baseName("   .pdf")).toBe("document");
  });
});

describe("formatBytes", () => {
  it("formats bytes, KB, MB, and GB", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1023)).toBe("1023 B");
    expect(formatBytes(1024)).toBe("1.0 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(10 * 1024)).toBe("10 KB");
    expect(formatBytes(2.5 * 1024 * 1024)).toBe("2.5 MB");
    expect(formatBytes(3 * 1024 * 1024 * 1024)).toBe("3.0 GB");
    expect(formatBytes(5000 * 1024 * 1024 * 1024)).toBe("5000 GB");
  });
});

describe("pad", () => {
  it("pads with zeros", () => {
    expect(pad(3)).toBe("03");
    expect(pad(12)).toBe("12");
    expect(pad(123)).toBe("123");
    expect(pad(7, 3)).toBe("007");
  });
});

describe("accept helpers", () => {
  it("builds the input accept string", () => {
    expect(acceptToInputString(PDF_ACCEPT)).toBe("application/pdf,.pdf");
    expect(acceptToInputString(IMAGE_ACCEPT)).toBe("image/jpeg,.jpg,.jpeg,image/png,.png,image/webp,.webp");
  });

  it("lists the extensions", () => {
    expect(acceptToExtensions(IMAGE_ACCEPT)).toEqual([".jpg", ".jpeg", ".png", ".webp"]);
  });

  it("matches by MIME type or extension", () => {
    expect(matchesAccept(new File([], "a.pdf", { type: "application/pdf" }), PDF_ACCEPT)).toBe(true);
    expect(matchesAccept(new File([], "A.PDF", { type: "" }), PDF_ACCEPT)).toBe(true);
    expect(matchesAccept(new File([], "photo.bin", { type: "image/png" }), IMAGE_ACCEPT)).toBe(true);
    expect(matchesAccept(new File([], "photo.gif", { type: "image/gif" }), IMAGE_ACCEPT)).toBe(false);
    expect(matchesAccept(new File([], "doc.docx", { type: "" }), PDF_ACCEPT)).toBe(false);
  });
});
