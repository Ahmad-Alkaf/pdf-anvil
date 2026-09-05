import type { PDFDocumentProxy } from "./pdfjs";

export const THUMB_WIDTH = 160;

/** Bounded queue so many visible pages do not render at once. */
export class RenderQueue {
  private running = 0;
  private readonly waiting: (() => void)[] = [];
  constructor(private readonly limit: number) {}

  async run<T>(task: () => Promise<T>): Promise<T> {
    if (this.running >= this.limit) {
      await new Promise<void>((resolve) => this.waiting.push(resolve));
    }
    this.running++;
    try {
      return await task();
    } finally {
      this.running--;
      this.waiting.shift()?.();
    }
  }
}

export const thumbQueue = new RenderQueue(2);

/** Render one page to a data URL at THUMB_WIDTH. Returns null if the doc is gone. */
export async function renderThumbnail(
  doc: PDFDocumentProxy,
  pageNumber: number,
  width = THUMB_WIDTH,
): Promise<string | null> {
  return thumbQueue.run(async () => {
    try {
      const page = await doc.getPage(pageNumber);
      const base = page.getViewport({ scale: 1 });
      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const scale = (width / base.width) * dpr;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return null;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvas, canvasContext: ctx, viewport }).promise;
      const url = canvas.toDataURL("image/jpeg", 0.8);
      page.cleanup();
      canvas.width = 0;
      canvas.height = 0;
      return url;
    } catch {
      return null;
    }
  });
}
