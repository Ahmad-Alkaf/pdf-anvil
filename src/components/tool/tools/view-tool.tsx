"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal, Printer, ZoomIn, ZoomOut } from "lucide-react";
import { Dropzone } from "../dropzone";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { Button } from "@/components/ui/button";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { track } from "@/lib/analytics";
import { getPageSize, readPageSizes, renderPageToCanvas, type PageSize } from "@/lib/pdf/render-page";
import type { PDFDocumentProxy } from "@/lib/pdf/pdfjs";
import { useMessages } from "@/locales/context";
import { format } from "@/locales/format";
import type { ToolPage } from "@/locales/types";
import { cn } from "@/lib/utils";

const ZOOM_STEP = 1.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 4;
/** Fit width never blows a page up past this, even on a wide screen. */
const MAX_FIT_SCALE = 2;
/** Padding of the scroll area, in CSS px. Matches the Tailwind `p-4` below. */
const PAD = 16;

type Zoom = { mode: "fit" } | { mode: "custom"; scale: number };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Viewer. Shows the pages of one PDF in a scrollable column. Each page is a
 * canvas that renders when it comes near the viewport and is released when it
 * scrolls away, so memory stays bounded for long documents.
 *
 * Print opens the original file (as a blob URL) in a new tab, where the
 * browser's own PDF viewer prints it. That keeps text sharp and needs no
 * print stylesheet for lazily rendered canvases.
 */
export function ViewTool({ tool }: { tool: ToolPage }) {
  const messages = useMessages();
  const m = messages.view;
  const [file, setFile] = useState<File | null>(null);
  const pdf = usePdfDocument(file);
  const [sizes, setSizes] = useState<PageSize[]>([]);
  const [zoom, setZoom] = useState<Zoom>({ mode: "fit" });
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [printNote, setPrintNote] = useState<string | null>(null);
  const pageEls = useRef<(HTMLDivElement | null)[]>([]);
  const printUrl = useRef<string | null>(null);
  const anchorPage = useRef<number | null>(null);
  const scrollFrame = useRef(0);

  // Reset per-document state when a new document arrives (state adjusted during render).
  const [trackedDoc, setTrackedDoc] = useState(pdf.doc);
  if (pdf.doc !== trackedDoc) {
    setTrackedDoc(pdf.doc);
    setSizes([]);
    setZoom({ mode: "fit" });
    setCurrent(1);
    setPageInput("1");
    setPrintNote(null);
  }

  // Keep the page box in sync with the current page.
  const [trackedCurrent, setTrackedCurrent] = useState(current);
  if (current !== trackedCurrent) {
    setTrackedCurrent(current);
    setPageInput(String(current));
  }

  // Page sizes. The first page arrives fast and stands in for every page, so
  // the column has its final shape early; exact sizes follow.
  useEffect(() => {
    const doc = pdf.doc;
    if (!doc) return;
    const ac = new AbortController();
    (async () => {
      const first = await getPageSize(doc, 1);
      if (ac.signal.aborted) return;
      setSizes(Array.from({ length: doc.numPages }, () => first));
      track("tool_run", { tool: tool.id, files: 1, pages: doc.numPages, output: "none" });
      if (doc.numPages === 1) return;
      const all = await readPageSizes(doc, ac.signal);
      if (!ac.signal.aborted) setSizes(all);
    })().catch(() => {
      // aborted or document closed
    });
    return () => ac.abort();
  }, [pdf.doc, tool.id]);

  // Width of the scroll area, for fit-width.
  useEffect(() => {
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? container.clientWidth;
      setContainerWidth(width);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [container]);

  // The print URL lives as long as the file. Revoke it on change and unmount.
  useEffect(
    () => () => {
      if (printUrl.current) {
        URL.revokeObjectURL(printUrl.current);
        printUrl.current = null;
      }
    },
    [file],
  );

  useEffect(() => () => cancelAnimationFrame(scrollFrame.current), []);

  const pageCount = sizes.length;
  const maxPageWidth = sizes.reduce((m, s) => Math.max(m, s.width), 0);
  const fitScale =
    maxPageWidth > 0 && containerWidth > 0 ? Math.min(MAX_FIT_SCALE, (containerWidth - PAD * 2) / maxPageWidth) : 0;
  const scale = zoom.mode === "fit" ? fitScale : zoom.scale;

  const scrollToPage = useCallback(
    (n: number) => {
      const el = pageEls.current[n - 1];
      if (!el || !container) return;
      container.scrollTo({ top: el.offsetTop - PAD });
    },
    [container],
  );

  // After a zoom change, keep the page the reader was on at the top.
  useLayoutEffect(() => {
    const page = anchorPage.current;
    anchorPage.current = null;
    if (page !== null) scrollToPage(page);
  }, [scale, scrollToPage]);

  const updateCurrent = useCallback(() => {
    if (!container) return;
    const mid = container.scrollTop + container.clientHeight / 2;
    const els = pageEls.current;
    let page = els.length || 1;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el && el.offsetTop + el.offsetHeight >= mid) {
        page = i + 1;
        break;
      }
    }
    setCurrent(page);
  }, [container]);

  const onScroll = () => {
    if (scrollFrame.current) return;
    scrollFrame.current = requestAnimationFrame(() => {
      scrollFrame.current = 0;
      updateCurrent();
    });
  };

  const goTo = (n: number) => {
    if (pageCount === 0) return;
    const page = clamp(Math.round(n), 1, pageCount);
    scrollToPage(page);
    setCurrent(page);
  };

  const zoomTo = (next: Zoom) => {
    anchorPage.current = current;
    setZoom(next);
  };

  const commitPageInput = () => {
    const n = Number(pageInput);
    if (Number.isFinite(n) && n >= 1) goTo(n);
    else setPageInput(String(current));
  };

  const reset = () => {
    setFile(null);
    setPrintNote(null);
  };

  const print = () => {
    if (!file) return;
    printUrl.current ??= URL.createObjectURL(new Blob([file], { type: "application/pdf" }));
    const win = window.open(printUrl.current, "_blank");
    if (win) {
      win.opener = null;
      setPrintNote(m.printed);
      track("tool_print", { tool: tool.id, pages: pageCount });
    } else {
      setPrintNote(m.blocked);
    }
  };

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  const doc = pdf.doc;
  const ready = Boolean(doc) && pageCount > 0 && scale > 0;

  return (
    <div className="space-y-4">
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset} />
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}

      {!pdf.error && (
        <>
          <div role="toolbar" aria-label={m.controls} className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label={m.prev} onClick={() => goTo(current - 1)} disabled={!ready || current <= 1}>
                <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Button>
              <label className="flex items-center gap-1 text-sm">
                <span className="sr-only">{m.page}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={pageCount || 1}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onBlur={commitPageInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      commitPageInput();
                    }
                  }}
                  disabled={!ready}
                  aria-label={m.currentPage}
                  className="h-8 w-14 rounded-md border bg-background px-2 text-center text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                <span className="text-muted-foreground tabular-nums" aria-live="polite">
                  / {pdf.pageCount || "–"}
                </span>
              </label>
              <Button variant="ghost" size="icon" aria-label={m.next} onClick={() => goTo(current + 1)} disabled={!ready || current >= pageCount}>
                <ChevronRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Button>
            </div>

            <div className="ms-auto flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label={m.zoomOut}
                onClick={() => zoomTo({ mode: "custom", scale: clamp(scale / ZOOM_STEP, MIN_SCALE, MAX_SCALE) })}
                disabled={!ready || scale <= MIN_SCALE}
              >
                <ZoomOut className="size-4" aria-hidden="true" />
              </Button>
              <span className="w-12 text-center text-sm tabular-nums text-muted-foreground" aria-live="polite">
                {ready ? `${Math.round(scale * 100)}%` : "–"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={m.zoomIn}
                onClick={() => zoomTo({ mode: "custom", scale: clamp(scale * ZOOM_STEP, MIN_SCALE, MAX_SCALE) })}
                disabled={!ready || scale >= MAX_SCALE}
              >
                <ZoomIn className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant={zoom.mode === "fit" ? "secondary" : "ghost"}
                size="sm"
                aria-pressed={zoom.mode === "fit"}
                onClick={() => zoomTo({ mode: "fit" })}
                disabled={!ready}
              >
                <MoveHorizontal className="size-4" aria-hidden="true" />
                {m.fitWidth}
              </Button>
            </div>

            <Button size="sm" onClick={print} disabled={!doc}>
              <Printer className="size-4" aria-hidden="true" />
              {tool.actionLabel}
            </Button>
          </div>

          {printNote && (
            <p role="status" className="text-sm text-muted-foreground">
              {printNote}
            </p>
          )}

          <div
            ref={setContainer}
            onScroll={onScroll}
            tabIndex={0}
            aria-label={m.pages}
            className="relative h-[70vh] min-h-96 overflow-auto rounded-xl border bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {ready && doc ? (
              <div className="flex flex-col items-center gap-4 p-4">
                {sizes.map((size, i) => (
                  <PageView
                    key={i}
                    doc={doc}
                    pageNumber={i + 1}
                    width={size.width * scale}
                    height={size.height * scale}
                    scale={scale}
                    root={container}
                    elRef={(el) => {
                      pageEls.current[i] = el;
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="p-6 text-center text-sm text-muted-foreground">{pdf.loading ? messages.common.opening : ""}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface PageViewProps {
  doc: PDFDocumentProxy;
  pageNumber: number;
  width: number;
  height: number;
  scale: number;
  root: HTMLDivElement | null;
  elRef: (el: HTMLDivElement | null) => void;
}

/** One page. Renders when near the viewport, releases its bitmap when far away. */
function PageView({ doc, pageNumber, width, height, scale, root, elRef }: PageViewProps) {
  const messages = useMessages();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const on = entries.some((e) => e.isIntersecting);
        setVisible(on);
        if (!on) setRenderedScale(null);
      },
      { root, rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!visible) {
      // Release the bitmap; the CSS size keeps the layout stable.
      canvas.width = 0;
      canvas.height = 0;
      return;
    }
    const ac = new AbortController();
    void renderPageToCanvas(doc, pageNumber, scale, canvas, ac.signal).then((ok) => {
      if (ok && !ac.signal.aborted) setRenderedScale(scale);
    });
    return () => ac.abort();
  }, [doc, pageNumber, scale, visible]);

  const ready = visible && renderedScale === scale;

  return (
    <div
      ref={(el) => {
        wrapRef.current = el;
        elRef(el);
      }}
      data-page={pageNumber}
      className="relative shrink-0 bg-white shadow-md ring-1 ring-black/10"
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={format(messages.common.pageAlt, { page: pageNumber })}
        className={cn("block", !ready && "invisible")}
        style={{ width, height }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{pageNumber}</span>
        </div>
      )}
    </div>
  );
}
