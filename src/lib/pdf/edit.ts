// Annotation-style edits: text, rectangles (whiteout, highlight), images, and
// freehand ink drawn over existing pages. Existing page content is never
// changed, only covered.
//
// Coordinates. Every op is placed in the *visual frame* of its page: the page
// as a viewer shows it, with /Rotate applied. The origin is the bottom-left
// corner of that visual page, the unit is the PDF point, x grows to the right
// and y grows upward. `pageSize(page)` gives the size of that frame. The UI
// converts screen pixels to this frame and never needs to know about /Rotate;
// `applyEdits` maps the frame into the page's own coordinate space and rotates
// the drawn content so that it reads upright in a viewer.

import {
  BlendMode,
  degrees,
  LineCapStyle,
  LineJoinStyle,
  lineTo,
  moveTo,
  type PDFFont,
  type PDFImage,
  type PDFPage,
  popGraphicsState,
  pushGraphicsState,
  rgb,
  setLineCap,
  setLineJoin,
  setLineWidth,
  setStrokingColor,
  StandardFonts,
  stroke,
} from "pdf-lib";
import { loadPdf, saveStamped } from "./load";
import { PdfError } from "./errors";
import type { Progress } from "./merge";

export type EditFont = "Helvetica" | "Times" | "Courier";

export interface Point {
  x: number;
  y: number;
}

/** Text box. (x, y) is the TOP-left corner; lines flow downward and wrap inside `width`. */
export interface TextOp {
  type: "text";
  /** 0-based page index. */
  page: number;
  x: number;
  y: number;
  width: number;
  /** Font size in points. */
  size: number;
  /** "#rrggbb" */
  color: string;
  text: string;
  font: EditFont;
}

/** Filled rectangle. (x, y) is the bottom-left corner. Whiteout: opaque white. Highlight: yellow, opacity 0.4, multiply. */
export interface RectOp {
  type: "rect";
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  /** "#rrggbb" */
  fill: string;
  /** 0..1, default 1. */
  opacity?: number;
  /** Multiply blend so the text under a highlight stays readable. */
  multiply?: boolean;
}

/** Image (also a signature). (x, y) is the bottom-left corner. */
export interface ImageOp {
  type: "image";
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  data: Uint8Array;
  mime: "image/png" | "image/jpeg";
}

/** Freehand ink: one polyline per stroke. */
export interface PathOp {
  type: "path";
  page: number;
  points: Point[][];
  /** "#rrggbb" */
  color: string;
  /** Stroke width in points. */
  width: number;
}

export type EditOp = TextOp | RectOp | ImageOp | PathOp;

/** Line height as a multiple of the font size. Matches the editor's CSS line-height. */
export const LINE_HEIGHT = 1.2;

const FONT_NAMES: Record<EditFont, StandardFonts> = {
  Helvetica: StandardFonts.Helvetica,
  Times: StandardFonts.TimesRoman,
  Courier: StandardFonts.Courier,
};

const norm360 = (deg: number) => (((Math.round(deg / 90) * 90) % 360) + 360) % 360;

export interface VisualFrame {
  /** Visual width and height (after /Rotate). */
  vw: number;
  vh: number;
  /** /Rotate, normalized to 0, 90, 180, 270. */
  rotation: number;
  /** Origin of the page box in the page's own space. */
  ox: number;
  oy: number;
}

function frameOf(page: PDFPage): VisualFrame {
  const box = page.getCropBox();
  const rotation = norm360(page.getRotation().angle);
  const swap = rotation === 90 || rotation === 270;
  return {
    vw: swap ? box.height : box.width,
    vh: swap ? box.width : box.height,
    rotation,
    ox: box.x,
    oy: box.y,
  };
}

/** Size of the visual frame of a page: what a viewer shows, with /Rotate applied. */
export function pageSize(page: PDFPage): { width: number; height: number } {
  const f = frameOf(page);
  return { width: f.vw, height: f.vh };
}

/**
 * Map a point in the visual frame (origin bottom-left of the displayed page)
 * into the page's own coordinate space. Exported for tests.
 */
export function toPageSpace(frame: VisualFrame, u: number, v: number): Point {
  const { vw, vh, rotation, ox, oy } = frame;
  switch (rotation) {
    case 90:
      return { x: ox + vh - v, y: oy + u };
    case 180:
      return { x: ox + vw - u, y: oy + vh - v };
    case 270:
      return { x: ox + v, y: oy + vw - u };
    default:
      return { x: ox + u, y: oy + v };
  }
}

export function hexToRgb(hex: string) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return rgb(0, 0, 0);
  const n = parseInt(m[1], 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

/**
 * Replace every character the standard font cannot encode (anything outside
 * WinAnsi) with "?". Newlines are kept; tabs become spaces.
 */
export function replaceUnsupported(text: string, font: PDFFont): string {
  const supported = new Set(font.getCharacterSet());
  let out = "";
  for (const ch of text.replace(/\r\n?/g, "\n").replace(/\t/g, "  ")) {
    if (ch === "\n") out += ch;
    else out += supported.has(ch.codePointAt(0) ?? -1) ? ch : "?";
  }
  return out;
}

/**
 * Break text into lines that fit inside `width` at `size`, using the font's
 * own metrics. Explicit newlines start a new line. A word wider than the box
 * is split between characters. `text` must already be encodable by `font`.
 */
export function wrapText(text: string, font: PDFFont, size: number, width: number): string[] {
  const fits = (s: string) => font.widthOfTextAtSize(s, size) <= width;
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(" ");
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (fits(candidate)) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = "";
      // The word alone does not fit: break it between characters.
      let piece = "";
      for (const ch of word) {
        if (fits(piece + ch) || piece === "") piece += ch;
        else {
          lines.push(piece);
          piece = ch;
        }
      }
      line = piece;
    }
    lines.push(line);
  }
  return lines;
}

function drawText(page: PDFPage, frame: VisualFrame, op: TextOp, font: PDFFont) {
  const size = Math.max(1, op.size);
  const text = replaceUnsupported(op.text, font);
  const lines = wrapText(text, font, size, Math.max(size, op.width));
  const ascent = font.heightAtSize(size, { descender: false });
  const full = font.heightAtSize(size);
  const lineHeight = size * LINE_HEIGHT;
  // Same baseline as a CSS line box: half the leading above the ascender.
  const firstBaseline = (lineHeight - full) / 2 + ascent;
  const color = hexToRgb(op.color);
  lines.forEach((line, i) => {
    if (!line) return;
    const v = op.y - firstBaseline - i * lineHeight;
    const p = toPageSpace(frame, op.x, v);
    page.drawText(line, { x: p.x, y: p.y, size, font, color, rotate: degrees(frame.rotation) });
  });
}

function drawRect(page: PDFPage, frame: VisualFrame, op: RectOp) {
  const p = toPageSpace(frame, op.x, op.y);
  page.drawRectangle({
    x: p.x,
    y: p.y,
    width: op.width,
    height: op.height,
    color: hexToRgb(op.fill),
    opacity: op.opacity ?? 1,
    blendMode: op.multiply ? BlendMode.Multiply : BlendMode.Normal,
    rotate: degrees(frame.rotation),
  });
}

function drawImage(page: PDFPage, frame: VisualFrame, op: ImageOp, image: PDFImage) {
  const p = toPageSpace(frame, op.x, op.y);
  page.drawImage(image, { x: p.x, y: p.y, width: op.width, height: op.height, rotate: degrees(frame.rotation) });
}

function drawPath(page: PDFPage, frame: VisualFrame, op: PathOp) {
  const c = hexToRgb(op.color);
  const ops = [
    pushGraphicsState(),
    setStrokingColor(c),
    setLineWidth(Math.max(0.1, op.width)),
    setLineCap(LineCapStyle.Round),
    setLineJoin(LineJoinStyle.Round),
  ];
  for (const strokePoints of op.points) {
    if (strokePoints.length === 0) continue;
    const first = toPageSpace(frame, strokePoints[0].x, strokePoints[0].y);
    ops.push(moveTo(first.x, first.y));
    if (strokePoints.length === 1) ops.push(lineTo(first.x, first.y));
    for (let i = 1; i < strokePoints.length; i++) {
      const p = toPageSpace(frame, strokePoints[i].x, strokePoints[i].y);
      ops.push(lineTo(p.x, p.y));
    }
    ops.push(stroke());
  }
  ops.push(popGraphicsState());
  page.pushOperators(...ops);
}

/** Draw every op on its page and save. Ops on pages that do not exist are skipped. */
export async function applyEdits(bytes: Uint8Array, edits: EditOp[], onProgress?: Progress): Promise<Uint8Array> {
  const doc = await loadPdf(bytes);
  const pages = doc.getPages();
  const fonts = new Map<EditFont, PDFFont>();
  const images = new Map<Uint8Array, PDFImage>();

  const fontFor = (name: EditFont) => {
    let font = fonts.get(name);
    if (!font) {
      font = doc.embedStandardFont(FONT_NAMES[name] ?? StandardFonts.Helvetica);
      fonts.set(name, font);
    }
    return font;
  };
  const imageFor = async (op: ImageOp) => {
    let image = images.get(op.data);
    if (!image) {
      try {
        image = op.mime === "image/jpeg" ? await doc.embedJpg(op.data) : await doc.embedPng(op.data);
      } catch {
        throw new PdfError("unsupported-image");
      }
      images.set(op.data, image);
    }
    return image;
  };

  for (let i = 0; i < edits.length; i++) {
    const op = edits[i];
    onProgress?.(i, edits.length, `Placing item ${i + 1} of ${edits.length}`);
    const page = pages[op.page];
    if (!page) continue;
    const frame = frameOf(page);
    switch (op.type) {
      case "text":
        drawText(page, frame, op, fontFor(op.font));
        break;
      case "rect":
        drawRect(page, frame, op);
        break;
      case "image":
        drawImage(page, frame, op, await imageFor(op));
        break;
      case "path":
        drawPath(page, frame, op);
        break;
    }
  }

  onProgress?.(edits.length, edits.length, "Saving");
  return saveStamped(doc);
}
