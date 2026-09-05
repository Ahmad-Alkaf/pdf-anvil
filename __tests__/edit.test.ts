import { decodePDFRawStream, PDFDocument, PDFName, PDFRawStream, StandardFonts } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { applyEdits, hexToRgb, pageSize, replaceUnsupported, toPageSpace, wrapText, type EditOp } from "@/lib/pdf/edit";
import { PDF_PRODUCER } from "@/lib/site";
import { makeImage, makePdf, openPdf } from "./helpers/fixtures";

/** Decoded text of every content stream of a page, joined. */
function contentOf(doc: PDFDocument, index: number): string {
  const page = doc.getPage(index);
  const contents = page.node.Contents();
  const streams: PDFRawStream[] = [];
  if (contents instanceof PDFRawStream) streams.push(contents);
  else if (contents) {
    const arr = doc.context.lookup(contents);
    if (arr && "asArray" in arr) {
      for (const ref of (arr as { asArray(): unknown[] }).asArray()) {
        const s = doc.context.lookup(ref as Parameters<typeof doc.context.lookup>[0]);
        if (s instanceof PDFRawStream) streams.push(s);
      }
    }
  }
  return streams.map((s) => new TextDecoder("latin1").decode(decodePDFRawStream(s).decode())).join("\n");
}

const contentSize = (doc: PDFDocument, index: number) => contentOf(doc, index).length;

const twoPages = () =>
  makePdf([
    [300, 400],
    [300, 400],
  ]);

async function helvetica() {
  const doc = await PDFDocument.create();
  return doc.embedStandardFont(StandardFonts.Helvetica);
}

describe("applyEdits", () => {
  it("draws a text op on the right page only and keeps the page count", async () => {
    const input = await twoPages();
    const before = await openPdf(input);
    const out = await openPdf(
      await applyEdits(input, [
        { type: "text", page: 1, x: 20, y: 380, width: 200, size: 12, color: "#ff0000", text: "Hello from PDF Anvil", font: "Helvetica" },
      ]),
    );
    expect(out.getPageCount()).toBe(2);
    expect(contentSize(out, 0)).toBe(contentSize(before, 0));
    const content = contentOf(out, 1);
    expect(content).toContain("Tj");
    expect(content).toContain("1 0 0 rg");
    expect(content.length).toBeGreaterThan(contentSize(before, 1));
    // The font is a standard font, not an embedded file.
    const fonts = out.getPage(1).node.Resources()?.lookup(PDFName.of("Font"));
    expect(fonts).toBeDefined();
    expect(out.getProducer()).toBe(PDF_PRODUCER);
  });

  it("draws an opaque whiteout and a translucent multiply highlight", async () => {
    const input = await twoPages();
    const out = await openPdf(
      await applyEdits(input, [
        { type: "rect", page: 0, x: 10, y: 10, width: 100, height: 20, fill: "#ffffff" },
        { type: "rect", page: 0, x: 10, y: 50, width: 100, height: 20, fill: "#ffff00", opacity: 0.4, multiply: true },
      ]),
    );
    const content = contentOf(out, 0);
    // pdf-lib draws rectangles as a filled path translated to (x, y).
    expect(content).toMatch(/1 1 1 rg[\s\S]*1 0 0 1 10 10 cm[\s\S]*0 20 l\s+100 20 l\s+100 0 l\s+h\s+f\s/);
    expect(content).toMatch(/1 1 0 rg[\s\S]*1 0 0 1 10 50 cm/);
    // Opacity and blend mode go through an ExtGState.
    const extG = out.getPage(0).node.Resources()?.lookup(PDFName.of("ExtGState"));
    expect(extG).toBeDefined();
    expect(String(extG)).toMatch(/Multiply/);
  });

  it("embeds a PNG once even when it is placed on two pages", async () => {
    const input = await twoPages();
    const data = await makeImage("png", 40, 20);
    const out = await openPdf(
      await applyEdits(input, [
        { type: "image", page: 0, x: 10, y: 10, width: 80, height: 40, data, mime: "image/png" },
        { type: "image", page: 1, x: 10, y: 10, width: 80, height: 40, data, mime: "image/png" },
      ]),
    );
    expect(contentOf(out, 0)).toContain("Do");
    expect(contentOf(out, 1)).toContain("Do");
    const x0 = out.getPage(0).node.Resources()?.lookup(PDFName.of("XObject"));
    const x1 = out.getPage(1).node.Resources()?.lookup(PDFName.of("XObject"));
    // Both pages point to the same image object (the resource names differ, the ref does not).
    const ref = (s: unknown) => /(\d+ \d+ R)/.exec(String(s))?.[1];
    expect(ref(x0)).toBeDefined();
    expect(ref(x0)).toBe(ref(x1));
  });

  it("embeds a JPEG", async () => {
    const input = await twoPages();
    const data = await makeImage("jpeg", 40, 20);
    const out = await openPdf(
      await applyEdits(input, [{ type: "image", page: 0, x: 10, y: 10, width: 80, height: 40, data, mime: "image/jpeg" }]),
    );
    expect(contentOf(out, 0)).toContain("Do");
  });

  it("rejects an image that cannot be embedded", async () => {
    const input = await twoPages();
    await expect(
      applyEdits(input, [{ type: "image", page: 0, x: 0, y: 0, width: 10, height: 10, data: new Uint8Array([1, 2, 3]), mime: "image/png" }]),
    ).rejects.toMatchObject({ code: "unsupported-image" });
  });

  it("draws a freehand path as one stroked polyline per stroke", async () => {
    const input = await twoPages();
    const out = await openPdf(
      await applyEdits(input, [
        {
          type: "path",
          page: 0,
          points: [
            [
              { x: 10, y: 10 },
              { x: 20, y: 30 },
              { x: 40, y: 10 },
            ],
            [{ x: 100, y: 100 }],
          ],
          color: "#0000ff",
          width: 2,
        },
      ]),
    );
    const content = contentOf(out, 0);
    expect(content).toMatch(/10 10 m\s+20 30 l\s+40 10 l\s+S/);
    expect(content).toMatch(/0 0 1 RG/);
    expect(content).toMatch(/1 J/); // round caps
    expect((content.match(/\bS\b/g) ?? []).length).toBe(2);
  });

  it("skips ops on pages that do not exist", async () => {
    const input = await twoPages();
    const before = await openPdf(input);
    const out = await openPdf(await applyEdits(input, [{ type: "rect", page: 5, x: 0, y: 0, width: 10, height: 10, fill: "#000000" }]));
    expect(out.getPageCount()).toBe(2);
    expect(contentSize(out, 0)).toBe(contentSize(before, 0));
  });

  it("reports progress and rejects input that is not a PDF", async () => {
    const seen: number[] = [];
    await applyEdits(await twoPages(), [{ type: "rect", page: 0, x: 0, y: 0, width: 1, height: 1, fill: "#000000" }], (done) => seen.push(done));
    expect(seen).toEqual([0, 1]);
    await expect(applyEdits(new Uint8Array([1, 2, 3]), [])).rejects.toMatchObject({ code: "not-pdf" });
  });

  it("replaces characters outside WinAnsi with a question mark", async () => {
    const input = await twoPages();
    const out = await openPdf(
      await applyEdits(input, [{ type: "text", page: 0, x: 10, y: 380, width: 280, size: 12, color: "#000000", text: "Café 中文 \u{1F600}", font: "Times" }]),
    );
    // Hex-encoded WinAnsi: "Café ?? ?" (the emoji is one code point, so one "?").
    expect(contentOf(out, 0)).toContain("<436166E9203F3F203F>");
  });
});

describe("rotated pages", () => {
  it("maps the visual frame into page space for every rotation", () => {
    const frame = (rotation: number) => ({ vw: rotation % 180 ? 400 : 300, vh: rotation % 180 ? 300 : 400, rotation, ox: 0, oy: 0 });
    // Visual bottom-left corner.
    expect(toPageSpace(frame(0), 0, 0)).toEqual({ x: 0, y: 0 });
    expect(toPageSpace(frame(90), 0, 0)).toEqual({ x: 300, y: 0 });
    expect(toPageSpace(frame(180), 0, 0)).toEqual({ x: 300, y: 400 });
    expect(toPageSpace(frame(270), 0, 0)).toEqual({ x: 0, y: 400 });
    // Visual top-left corner (where a viewer draws the first line of text).
    expect(toPageSpace(frame(90), 0, 300)).toEqual({ x: 0, y: 0 });
    expect(toPageSpace(frame(270), 0, 300)).toEqual({ x: 300, y: 400 });
    // An interior point.
    expect(toPageSpace(frame(90), 10, 20)).toEqual({ x: 280, y: 10 });
    // A page box that does not start at the origin.
    expect(toPageSpace({ vw: 300, vh: 400, rotation: 0, ox: 5, oy: 7 }, 1, 2)).toEqual({ x: 6, y: 9 });
  });

  it("reports the visual size of a rotated page", async () => {
    const doc = await openPdf(await makePdf([[300, 400]], 90));
    expect(pageSize(doc.getPage(0))).toEqual({ width: 400, height: 300 });
  });

  it("places a rect at the visual bottom-left of a /Rotate 90 page and rotates it", async () => {
    const input = await makePdf([[300, 400]], 90);
    const out = await openPdf(await applyEdits(input, [{ type: "rect", page: 0, x: 0, y: 0, width: 50, height: 10, fill: "#000000" }]));
    const content = contentOf(out, 0);
    // A rotation matrix "0 1 -1 0" (90 degrees) translated to page (300, 0): the unrotated bottom-right corner.
    expect(content).toMatch(/1 0 0 1 300 0 cm\s+\S+ 1 -1 \S+ 0 0 cm/);
    expect(content).toMatch(/0 10 l\s+50 10 l\s+50 0 l\s+h\s+f\s/);
  });

  it("keeps text upright on a /Rotate 180 page", async () => {
    const input = await makePdf([[300, 400]], 180);
    const out = await openPdf(
      await applyEdits(input, [{ type: "text", page: 0, x: 0, y: 400, width: 300, size: 10, color: "#000000", text: "Up", font: "Courier" }]),
    );
    // Text matrix rotated by 180 degrees: "-1 0 0 -1".
    expect(contentOf(out, 0)).toMatch(/-1 \S+ \S+ -1 300 /);
  });
});

describe("wrapText", () => {
  it("wraps long text into several lines that all fit", async () => {
    const font = await helvetica();
    const text = "The quick brown fox jumps over the lazy dog and keeps running through the field";
    const lines = wrapText(text, font, 12, 120);
    expect(lines.length).toBeGreaterThan(1);
    for (const line of lines) expect(font.widthOfTextAtSize(line, 12)).toBeLessThanOrEqual(120);
    expect(lines.join(" ")).toBe(text);
  });

  it("keeps explicit newlines and empty lines", async () => {
    const font = await helvetica();
    expect(wrapText("a\n\nb", font, 12, 200)).toEqual(["a", "", "b"]);
  });

  it("splits a word that is wider than the box", async () => {
    const font = await helvetica();
    const lines = wrapText("Supercalifragilisticexpialidocious", font, 12, 40);
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.join("")).toBe("Supercalifragilisticexpialidocious");
  });
});

describe("replaceUnsupported / hexToRgb", () => {
  it("keeps WinAnsi text and newlines, replaces the rest", async () => {
    const font = await helvetica();
    expect(replaceUnsupported("Café €\nok\t中", font)).toBe("Café €\nok  ?");
  });

  it("parses hex colors and falls back to black", () => {
    expect(hexToRgb("#ff8000")).toMatchObject({ red: 1, green: 128 / 255, blue: 0 });
    expect(hexToRgb("nope")).toMatchObject({ red: 0, green: 0, blue: 0 });
  });
});

describe("op shapes", () => {
  it("accepts every op type in one call", async () => {
    const data = await makeImage("png", 8, 8);
    const ops: EditOp[] = [
      { type: "text", page: 0, x: 0, y: 400, width: 100, size: 12, color: "#000000", text: "x", font: "Helvetica" },
      { type: "rect", page: 0, x: 0, y: 0, width: 10, height: 10, fill: "#ffffff" },
      { type: "image", page: 0, x: 0, y: 0, width: 10, height: 10, data, mime: "image/png" },
      { type: "path", page: 0, points: [[{ x: 0, y: 0 }, { x: 5, y: 5 }]], color: "#000000", width: 1 },
    ];
    const out = await openPdf(await applyEdits(await twoPages(), ops));
    expect(out.getPageCount()).toBe(2);
  });
});
