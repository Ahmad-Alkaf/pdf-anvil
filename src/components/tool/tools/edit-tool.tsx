"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight, Eraser, Highlighter, ImagePlus, MousePointer2, Pencil, Redo2, Type, Undo2, X } from "lucide-react";
import { Dropzone } from "../dropzone";
import { ActionBar } from "../action-bar";
import { ResultPanel } from "../result-panel";
import { ErrorBanner } from "../error-banner";
import { SizeWarning } from "../size-warning";
import { FileHeader } from "../file-header";
import { PageThumb } from "../page-thumb";
import { Button } from "@/components/ui/button";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { useToolRunner } from "@/hooks/use-tool-runner";
import { applyEdits, LINE_HEIGHT, type EditFont, type EditOp, type Point } from "@/lib/pdf/edit";
import { readPageSizes, renderPageToCanvas, type PageSize } from "@/lib/pdf/render-page";
import type { PDFDocumentProxy } from "@/lib/pdf/pdfjs";
import { bytesToBlob } from "@/lib/download";
import { outputName } from "@/lib/names";
import { useMessages } from "@/locales/context";
import { format, plural } from "@/locales/format";
import type { Messages, ToolPage } from "@/locales/types";
import { cn } from "@/lib/utils";

/*
 * Editor state lives in "visual points": PDF points on the page as the viewer
 * shows it, origin at the TOP-left corner, y growing downward (like CSS). One
 * scale factor turns them into CSS pixels. On save they are flipped into the
 * bottom-left frame that applyEdits expects; applyEdits handles /Rotate.
 */

type Mode = "select" | "text" | "whiteout" | "highlight" | "image" | "draw";

interface Base {
  id: string;
  /** 0-based page index. */
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
}
interface TextObj extends Base {
  type: "text";
  text: string;
  size: number;
  color: string;
  font: EditFont;
}
interface RectObj extends Base {
  type: "rect";
  kind: "whiteout" | "highlight";
}
interface ImageObj extends Base {
  type: "image";
  data: Uint8Array;
  mime: "image/png" | "image/jpeg";
  url: string;
}
interface PathObj extends Base {
  type: "path";
  /** Absolute visual points, top-left origin. */
  points: Point[][];
  color: string;
  width: number;
}
type EditObj = TextObj | RectObj | ImageObj | PathObj;

type Gesture =
  | { kind: "move"; id: string; px: number; py: number; ox: number; oy: number }
  | { kind: "resize"; id: string; px: number; py: number; ow: number; oh: number; snapshot: EditObj }
  | { kind: "rect"; id: string; ux: number; uy: number }
  | { kind: "draw"; points: Point[] };

const PAD = 16;
const MAX_FIT_SCALE = 2;
const HIGHLIGHT = "#ffff00";
const FONT_SIZES = [8, 10, 12, 14, 18, 24, 32, 48];
const PEN_WIDTHS = [1, 2, 3, 5];
const CSS_FONTS: Record<EditFont, string> = {
  Helvetica: "Helvetica, Arial, sans-serif",
  Times: "'Times New Roman', Times, serif",
  Courier: "'Courier New', Courier, monospace",
};
/** Strokes that start within this time join the previous stroke into one object (a signature). */
const STROKE_JOIN_MS = 1500;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
let nextId = 1;
const newId = () => `o${nextId++}`;

function pathBounds(points: Point[][], width: number): { x: number; y: number; w: number; h: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const stroke of points) {
    for (const p of stroke) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
  }
  if (!Number.isFinite(minX)) return { x: 0, y: 0, w: 1, h: 1 };
  const pad = width;
  return { x: minX - pad, y: minY - pad, w: maxX - minX + 2 * pad, h: maxY - minY + 2 * pad };
}

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  const tag = el?.tagName;
  return tag === "TEXTAREA" || tag === "INPUT" || tag === "SELECT";
}

export function EditTool({ tool }: { tool: ToolPage }) {
  const messages = useMessages();
  const m = messages.edit;
  const [file, setFile] = useState<File | null>(null);
  const pdf = usePdfDocument(file);
  const runner = useToolRunner();
  const [sizes, setSizes] = useState<PageSize[]>([]);
  const [current, setCurrent] = useState(0);
  const [mode, setMode] = useState<Mode>(tool.defaults?.tool ?? "select");
  const [objects, setObjects] = useState<EditObj[]>([]);
  const [past, setPast] = useState<EditObj[][]>([]);
  const [future, setFuture] = useState<EditObj[][]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [textSize, setTextSize] = useState(14);
  const [textColor, setTextColor] = useState("#000000");
  const [textFont, setTextFont] = useState<EditFont>("Helvetica");
  const [penColor, setPenColor] = useState("#1d4ed8");
  const [penWidth, setPenWidth] = useState(2);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [liveStroke, setLiveStroke] = useState<Point[] | null>(null);

  const gesture = useRef<Gesture | null>(null);
  const gestureDirty = useRef(false);
  /** Latest objects, readable inside pointer handlers before React re-renders. */
  const objectsRef = useRef(objects);
  const lastStrokeEnd = useRef(0);
  const imageInput = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);

  // Reset per-document state when a new document arrives (state adjusted during render).
  const [trackedDoc, setTrackedDoc] = useState(pdf.doc);
  if (pdf.doc !== trackedDoc) {
    setTrackedDoc(pdf.doc);
    setSizes([]);
    setCurrent(0);
    setObjects([]);
    setPast([]);
    setFuture([]);
    setSelectedId(null);
    setEditingId(null);
    setLiveStroke(null);
  }

  useEffect(() => {
    const doc = pdf.doc;
    if (!doc) return;
    const ac = new AbortController();
    readPageSizes(doc, ac.signal)
      .then((all) => {
        if (!ac.signal.aborted) setSizes(all);
      })
      .catch(() => {
        // aborted or document closed
      });
    return () => ac.abort();
  }, [pdf.doc]);

  useEffect(() => {
    if (!container) return;
    const ro = new ResizeObserver((entries) => setContainerWidth(entries[0]?.contentRect.width ?? container.clientWidth));
    ro.observe(container);
    return () => ro.disconnect();
  }, [container]);

  useEffect(
    () => () => {
      for (const url of urls.current) URL.revokeObjectURL(url);
      urls.current = [];
    },
    [],
  );

  // Backstop for state set outside the helpers below (document reset).
  useEffect(() => {
    objectsRef.current = objects;
  }, [objects]);

  const page = sizes[current];
  const scale = page && containerWidth > 0 ? Math.min(MAX_FIT_SCALE, (containerWidth - PAD * 2) / page.width) : 0;
  const ready = Boolean(pdf.doc) && sizes.length > 0 && scale > 0;
  const selected = objects.find((o) => o.id === selectedId) ?? null;

  // ---- history -------------------------------------------------------------

  const setAll = useCallback((value: EditObj[]) => {
    objectsRef.current = value;
    setObjects(value);
  }, []);

  /** Replace the objects and remember the previous state for Undo. */
  const commit = useCallback(
    (next: EditObj[] | ((prev: EditObj[]) => EditObj[])) => {
      const prev = objectsRef.current;
      const value = typeof next === "function" ? next(prev) : next;
      setPast((p) => [...p.slice(-49), prev]);
      setFuture([]);
      setAll(value);
    },
    [setAll],
  );

  /** Record the pre-gesture state once, on the first movement of a drag. */
  const markDirty = useCallback((snapshot: EditObj[]) => {
    if (gestureDirty.current) return;
    gestureDirty.current = true;
    setPast((p) => [...p.slice(-49), snapshot]);
    setFuture([]);
  }, []);

  const undo = () => {
    const last = past[past.length - 1];
    if (!last) return;
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [...f, objects]);
    setAll(last);
    setSelectedId(null);
    setEditingId(null);
  };
  const redo = () => {
    const next = future[future.length - 1];
    if (!next) return;
    setFuture((f) => f.slice(0, -1));
    setPast((p) => [...p, objects]);
    setAll(next);
    setSelectedId(null);
    setEditingId(null);
  };

  /** Change one object without an Undo entry (live drags, typing, measuring). */
  const patch = useCallback(
    (id: string, changes: Partial<EditObj>) => setAll(objectsRef.current.map((o) => (o.id === id ? ({ ...o, ...changes } as EditObj) : o))),
    [setAll],
  );

  const remove = (id: string) => {
    commit((prev) => prev.filter((o) => o.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (editingId === id) setEditingId(null);
  };

  // ---- pointer helpers -----------------------------------------------------

  const overlayRef = useRef<HTMLDivElement>(null);
  const toPoints = (e: { clientX: number; clientY: number }): Point => {
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect || !page) return { x: 0, y: 0 };
    return { x: clamp((e.clientX - rect.left) / scale, 0, page.width), y: clamp((e.clientY - rect.top) / scale, 0, page.height) };
  };

  const addText = (at: Point) => {
    if (!page) return;
    const w = Math.min(220, page.width - at.x);
    const id = newId();
    const obj: TextObj = {
      id,
      type: "text",
      page: current,
      x: at.x,
      y: at.y,
      w: Math.max(40, w),
      h: textSize * LINE_HEIGHT,
      text: "",
      size: textSize,
      color: textColor,
      font: textFont,
    };
    commit((prev) => [...prev, obj]);
    // The creation is already in the history; typing into the new box must not add another entry.
    gestureDirty.current = true;
    setSelectedId(id);
    setEditingId(id);
    setMode("select");
  };

  /** Start typing in an existing text box. The first focus records one Undo entry. */
  const beginEdit = (id: string) => {
    gestureDirty.current = false;
    setSelectedId(id);
    setEditingId(id);
  };

  const onOverlayPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!ready || runner.busy || e.button !== 0) return;
    const at = toPoints(e);
    if (mode === "select" || mode === "image") {
      setSelectedId(null);
      setEditingId(null);
      return;
    }
    e.preventDefault();
    setEditingId(null);
    if (mode === "text") {
      addText(at);
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    gestureDirty.current = false;
    if (mode === "whiteout" || mode === "highlight") {
      const id = newId();
      const obj: RectObj = { id, type: "rect", page: current, x: at.x, y: at.y, w: 0, h: 0, kind: mode };
      commit((prev) => [...prev, obj]);
      setSelectedId(id);
      gesture.current = { kind: "rect", id, ux: at.x, uy: at.y };
      return;
    }
    if (mode === "draw") {
      setSelectedId(null);
      gesture.current = { kind: "draw", points: [at] };
      setLiveStroke([at]);
    }
  };

  const onOverlayPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g) return;
    const at = toPoints(e);
    if (g.kind === "rect") {
      patch(g.id, { x: Math.min(g.ux, at.x), y: Math.min(g.uy, at.y), w: Math.abs(at.x - g.ux), h: Math.abs(at.y - g.uy) });
    } else if (g.kind === "draw") {
      g.points.push(at);
      setLiveStroke([...g.points]);
    }
  };

  const onOverlayPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g) return;
    gesture.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (g.kind === "rect") {
      const obj = objectsRef.current.find((o) => o.id === g.id);
      if (obj && obj.w < 3 && obj.h < 3 && page) {
        // A click without a drag: place a default-sized box.
        const w = Math.min(120, page.width - obj.x);
        const h = Math.min(obj.type === "rect" && obj.kind === "highlight" ? 16 : 22, page.height - obj.y);
        patch(g.id, { w, h });
      }
      return;
    }
    if (g.kind === "draw") {
      setLiveStroke(null);
      const points = g.points;
      const now = performance.now();
      const tail = objectsRef.current[objectsRef.current.length - 1];
      const last = tail && tail.type === "path" ? tail : null;
      const join = last !== null && last.page === current && last.color === penColor && last.width === penWidth && now - lastStrokeEnd.current < STROKE_JOIN_MS;
      lastStrokeEnd.current = now;
      if (join) {
        const strokes = [...last.points, points];
        commit((prev) => prev.map((o) => (o.id === last.id ? { ...last, points: strokes, ...pathBounds(strokes, penWidth) } : o)));
        setSelectedId(last.id);
      } else {
        const id = newId();
        const obj: PathObj = { id, type: "path", page: current, points: [points], color: penColor, width: penWidth, ...pathBounds([points], penWidth) };
        commit((prev) => [...prev, obj]);
        setSelectedId(id);
      }
    }
  };

  // Object drag and resize (select mode).
  const onObjectPointerDown = (e: ReactPointerEvent<HTMLElement>, obj: EditObj, kind: "move" | "resize") => {
    if (mode !== "select" || runner.busy || e.button !== 0) return;
    if (editingId === obj.id && kind === "move") return; // typing: let the textarea have the pointer
    e.stopPropagation();
    e.preventDefault();
    setSelectedId(obj.id);
    if (editingId !== obj.id) setEditingId(null);
    e.currentTarget.setPointerCapture(e.pointerId);
    gestureDirty.current = false;
    gesture.current =
      kind === "move"
        ? { kind, id: obj.id, px: e.clientX, py: e.clientY, ox: obj.x, oy: obj.y }
        : { kind, id: obj.id, px: e.clientX, py: e.clientY, ow: obj.w, oh: obj.h, snapshot: obj };
  };

  const onObjectPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (!g || (g.kind !== "move" && g.kind !== "resize") || !page) return;
    const dx = (e.clientX - g.px) / scale;
    const dy = (e.clientY - g.py) / scale;
    if (dx === 0 && dy === 0) return;
    markDirty(objectsRef.current);
    const obj = objectsRef.current.find((o) => o.id === g.id);
    if (!obj) return;
    if (g.kind === "move") {
      const x = clamp(g.ox + dx, 0, Math.max(0, page.width - obj.w));
      const y = clamp(g.oy + dy, 0, Math.max(0, page.height - obj.h));
      if (obj.type === "path") {
        const sx = x - obj.x;
        const sy = y - obj.y;
        patch(obj.id, { x, y, points: obj.points.map((s) => s.map((p) => ({ x: p.x + sx, y: p.y + sy }))) } as Partial<PathObj>);
      } else patch(obj.id, { x, y });
      return;
    }
    const min = obj.type === "text" ? obj.size * 2 : 4;
    let w = clamp(g.ow + dx, min, page.width - obj.x);
    let h = clamp(g.oh + dy, min, page.height - obj.y);
    if (obj.type === "image" || obj.type === "path") {
      // Keep the aspect ratio (signatures and photos).
      const ratio = g.oh / g.ow;
      h = w * ratio;
      if (obj.y + h > page.height) {
        h = page.height - obj.y;
        w = h / ratio;
      }
    }
    if (obj.type === "text") {
      patch(obj.id, { w }); // height follows the text
    } else if (obj.type === "path") {
      const snap = g.snapshot as PathObj;
      const fx = w / snap.w;
      const fy = h / snap.h;
      patch(obj.id, {
        w,
        h,
        points: snap.points.map((s) => s.map((p) => ({ x: snap.x + (p.x - snap.x) * fx, y: snap.y + (p.y - snap.y) * fy }))),
      } as Partial<PathObj>);
    } else patch(obj.id, { w, h });
  };

  const onObjectPointerUp = (e: ReactPointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (!g || (g.kind !== "move" && g.kind !== "resize")) return;
    gesture.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // ---- images ---------------------------------------------------------------

  const addImage = async (imageFile: File) => {
    if (!page) return;
    const mime = imageFile.type === "image/png" || imageFile.name.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
    const data = new Uint8Array(await imageFile.arrayBuffer());
    let iw = 200;
    let ih = 100;
    try {
      const bitmap = await createImageBitmap(imageFile);
      iw = bitmap.width;
      ih = bitmap.height;
      bitmap.close();
    } catch {
      // keep the default box
    }
    const w = Math.min(iw, page.width * 0.4);
    const h = (w * ih) / iw;
    const url = URL.createObjectURL(imageFile);
    urls.current.push(url);
    const id = newId();
    const obj: ImageObj = {
      id,
      type: "image",
      page: current,
      x: (page.width - w) / 2,
      y: Math.max(0, (page.height - h) / 2),
      w,
      h,
      data,
      mime,
      url,
    };
    commit((prev) => [...prev, obj]);
    setSelectedId(id);
    setMode("select");
  };

  // ---- keyboard ------------------------------------------------------------

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const typing = isTyping(e.target);
    if (e.key === "Escape") {
      if (editingId) {
        setEditingId(null);
        (e.target as HTMLElement).blur?.();
      } else if (selectedId) setSelectedId(null);
      else setMode("select");
      e.preventDefault();
      return;
    }
    if (typing) return;
    if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
      remove(selectedId);
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      if (e.shiftKey) redo();
      else undo();
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
      redo();
      e.preventDefault();
      return;
    }
    if (selected && page && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.shiftKey ? 10 : 1;
      const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
      const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
      const x = clamp(selected.x + dx, 0, Math.max(0, page.width - selected.w));
      const y = clamp(selected.y + dy, 0, Math.max(0, page.height - selected.h));
      commit((prev) =>
        prev.map((o) => {
          if (o.id !== selected.id) return o;
          if (o.type === "path") return { ...o, x, y, points: o.points.map((s) => s.map((p) => ({ x: p.x + (x - o.x), y: p.y + (y - o.y) }))) };
          return { ...o, x, y };
        }),
      );
      e.preventDefault();
      return;
    }
    if (e.key === "Enter" && selected?.type === "text" && !editingId) {
      beginEdit(selected.id);
      e.preventDefault();
    }
  };

  // ---- save ----------------------------------------------------------------

  const reset = () => {
    setFile(null);
    runner.reset();
  };

  async function run() {
    if (!file) return;
    const ops = objects.flatMap((o): EditOp[] => {
      const vh = sizes[o.page]?.height;
      if (vh === undefined) return [];
      switch (o.type) {
        case "text":
          return o.text.trim() ? [{ type: "text", page: o.page, x: o.x, y: vh - o.y, width: o.w, size: o.size, color: o.color, text: o.text, font: o.font }] : [];
        case "rect":
          return [
            o.kind === "whiteout"
              ? { type: "rect", page: o.page, x: o.x, y: vh - (o.y + o.h), width: o.w, height: o.h, fill: "#ffffff" }
              : { type: "rect", page: o.page, x: o.x, y: vh - (o.y + o.h), width: o.w, height: o.h, fill: HIGHLIGHT, opacity: 0.4, multiply: true },
          ];
        case "image":
          return [{ type: "image", page: o.page, x: o.x, y: vh - (o.y + o.h), width: o.w, height: o.h, data: o.data, mime: o.mime }];
        case "path":
          return [{ type: "path", page: o.page, points: o.points.map((s) => s.map((p) => ({ x: p.x, y: vh - p.y }))), color: o.color, width: o.width }];
      }
    });
    await runner.run(
      async (onProgress) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const out = await applyEdits(bytes, ops, onProgress);
        return [{ name: outputName(file.name), blob: bytesToBlob(out, "application/pdf") }];
      },
      { tool: tool.id, files: 1, pages: sizes.length, output: "pdf" },
    );
  }

  // ---- render --------------------------------------------------------------

  if (!file) return <Dropzone accept={tool.accept} multiple={false} onFiles={(f) => setFile(f[0])} />;

  if (runner.status === "done") {
    return (
      <ResultPanel
        results={runner.results}
        zipName="edited.zip"
        onStartOver={reset}
        note={m.note}
      />
    );
  }

  const doc = pdf.doc;
  const pageObjects = objects.filter((o) => o.page === current);
  const counts = objects.reduce<Record<number, number>>((m, o) => ({ ...m, [o.page]: (m[o.page] ?? 0) + 1 }), {});
  const pickMode = (m: Mode) => {
    setEditingId(null);
    if (m === "image") {
      imageInput.current?.click();
      return;
    }
    setMode(m);
    if (m !== "select") setSelectedId(null);
  };
  const hint: Record<Mode, string> = m.hints;
  const textTarget = selected?.type === "text" ? selected : null;
  const showTextControls = mode === "text" || textTarget !== null;
  const showPenControls = mode === "draw" || selected?.type === "path";

  const toolButton = (m: Mode, label: string, Icon: typeof Type) => (
    <Button
      key={m}
      variant={mode === m ? "secondary" : "ghost"}
      size="sm"
      aria-pressed={mode === m}
      onClick={() => pickMode(m)}
      disabled={!ready || runner.busy}
      title={label}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );

  return (
    <div className="space-y-4" onKeyDown={onKeyDown}>
      <FileHeader file={file} pageCount={pdf.pageCount} loading={pdf.loading} onRemove={reset} />
      <SizeWarning bytes={file.size} />
      {pdf.error && <ErrorBanner message={pdf.error} />}

      {!pdf.error && (
        <>
          <div role="toolbar" aria-label={m.toolbar} className="flex flex-wrap items-center gap-1 rounded-xl border bg-card p-2">
            {toolButton("select", m.select, MousePointer2)}
            {toolButton("text", m.text, Type)}
            {toolButton("whiteout", m.whiteout, Eraser)}
            {toolButton("highlight", m.highlight, Highlighter)}
            {toolButton("image", m.image, ImagePlus)}
            {toolButton("draw", m.draw, Pencil)}
            <input
              ref={imageInput}
              type="file"
              accept="image/png,image/jpeg,.png,.jpg,.jpeg"
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) void addImage(f);
              }}
            />

            {showTextControls && (
              <span className="flex items-center gap-1 border-s ps-2">
                <label className="sr-only" htmlFor="edit-font">
                  {m.font}
                </label>
                <select
                  id="edit-font"
                  value={textTarget?.font ?? textFont}
                  onChange={(e) => {
                    const font = e.target.value as EditFont;
                    setTextFont(font);
                    if (textTarget) commit((prev) => prev.map((o) => (o.id === textTarget.id ? { ...o, font } : o)));
                  }}
                  className="h-8 rounded-md border bg-background px-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times">Times</option>
                  <option value="Courier">Courier</option>
                </select>
                <label className="sr-only" htmlFor="edit-size">
                  {m.fontSize}
                </label>
                <select
                  id="edit-size"
                  value={textTarget?.size ?? textSize}
                  onChange={(e) => {
                    const size = Number(e.target.value);
                    setTextSize(size);
                    if (textTarget) commit((prev) => prev.map((o) => (o.id === textTarget.id ? { ...o, size } : o)));
                  }}
                  className="h-8 w-16 rounded-md border bg-background px-2 text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {FONT_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {format(m.pt, { n: s })}
                    </option>
                  ))}
                </select>
                <label className="sr-only" htmlFor="edit-color">
                  {m.textColor}
                </label>
                <input
                  id="edit-color"
                  type="color"
                  value={textTarget?.color ?? textColor}
                  onChange={(e) => {
                    const color = e.target.value;
                    setTextColor(color);
                    if (textTarget) patch(textTarget.id, { color });
                  }}
                  title={m.textColor}
                  className="size-8 cursor-pointer rounded-md border bg-background p-0.5"
                />
              </span>
            )}

            {showPenControls && (
              <span className="flex items-center gap-1 border-s ps-2">
                <label className="sr-only" htmlFor="pen-width">
                  {m.penWidth}
                </label>
                <select
                  id="pen-width"
                  value={selected?.type === "path" ? selected.width : penWidth}
                  onChange={(e) => {
                    const width = Number(e.target.value);
                    setPenWidth(width);
                    if (selected?.type === "path") commit((prev) => prev.map((o) => (o.id === selected.id ? { ...o, width } : o)));
                  }}
                  className="h-8 w-16 rounded-md border bg-background px-2 text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {PEN_WIDTHS.map((w) => (
                    <option key={w} value={w}>
                      {format(m.pt, { n: w })}
                    </option>
                  ))}
                </select>
                <label className="sr-only" htmlFor="pen-color">
                  {m.penColor}
                </label>
                <input
                  id="pen-color"
                  type="color"
                  value={selected?.type === "path" ? selected.color : penColor}
                  onChange={(e) => {
                    const color = e.target.value;
                    setPenColor(color);
                    if (selected?.type === "path") patch(selected.id, { color });
                  }}
                  title={m.penColor}
                  className="size-8 cursor-pointer rounded-md border bg-background p-0.5"
                />
              </span>
            )}

            <span className="ms-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label={messages.common.undo} title={m.undoTitle} onClick={undo} disabled={past.length === 0 || runner.busy}>
                <Undo2 className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" aria-label={m.redo} title={m.redoTitle} onClick={redo} disabled={future.length === 0 || runner.busy}>
                <Redo2 className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Button>
              <span className="mx-1 h-6 border-l" aria-hidden="true" />
              <Button variant="ghost" size="icon" aria-label={m.prev} onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={!ready || current === 0}>
                <ChevronLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Button>
              <span className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
                {ready ? `${current + 1} / ${sizes.length}` : "–"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={m.next}
                onClick={() => setCurrent((c) => Math.min(sizes.length - 1, c + 1))}
                disabled={!ready || current >= sizes.length - 1}
              >
                <ChevronRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Button>
            </span>
          </div>
          <p className="text-sm text-muted-foreground" role="status">
            {hint[mode]}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Page strip */}
            {doc && sizes.length > 0 && (
              <ol className="flex shrink-0 gap-2 overflow-auto sm:max-h-[75vh] sm:w-24 sm:flex-col" aria-label={m.pagesStrip}>
                {sizes.map((_, i) => (
                  <li key={i} className="relative w-16 shrink-0 sm:w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent(i);
                        setSelectedId(null);
                        setEditingId(null);
                      }}
                      aria-label={
                        counts[i]
                          ? `${format(messages.common.pageAlt, { page: i + 1 })}, ${plural(messages.common.itemCount, counts[i])}`
                          : format(messages.common.pageAlt, { page: i + 1 })
                      }
                      aria-current={i === current ? "page" : undefined}
                      className={cn(
                        "block w-full overflow-hidden rounded-md border-2 bg-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        i === current ? "border-primary" : "border-transparent hover:border-muted-foreground/40",
                      )}
                    >
                      <PageThumb doc={doc} pageNumber={i + 1} />
                    </button>
                    <span className="pointer-events-none absolute bottom-1 start-1 rounded bg-background/90 px-1 text-[10px] tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>
                    {counts[i] > 0 && (
                      <span className="pointer-events-none absolute top-1 end-1 rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {counts[i]}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}

            {/* Current page */}
            <div
              ref={setContainer}
              className="relative min-w-0 flex-1 overflow-auto rounded-xl border bg-muted/60 sm:max-h-[75vh]"
              style={{ padding: PAD }}
            >
              {ready && doc && page ? (
                <div className="relative mx-auto bg-white shadow-md ring-1 ring-black/10" style={{ width: page.width * scale, height: page.height * scale }}>
                  <PageCanvas doc={doc} pageNumber={current + 1} scale={scale} width={page.width * scale} height={page.height * scale} />
                  <div
                    ref={overlayRef}
                    className={cn(
                      "absolute inset-0 touch-none select-none",
                      mode === "draw" && "cursor-crosshair",
                      (mode === "whiteout" || mode === "highlight") && "cursor-crosshair",
                      mode === "text" && "cursor-text",
                    )}
                    onPointerDown={onOverlayPointerDown}
                    onPointerMove={onOverlayPointerMove}
                    onPointerUp={onOverlayPointerUp}
                    onPointerCancel={onOverlayPointerUp}
                  >
                    {pageObjects.map((o) => (
                      <ObjectView
                        key={o.id}
                        obj={o}
                        scale={scale}
                        selected={o.id === selectedId}
                        editing={o.id === editingId}
                        interactive={mode === "select" && !runner.busy}
                        onPointerDown={onObjectPointerDown}
                        onPointerMove={onObjectPointerMove}
                        onPointerUp={onObjectPointerUp}
                        onDelete={() => remove(o.id)}
                        onStartEdit={() => beginEdit(o.id)}
                        onText={(text) => patch(o.id, { text } as Partial<TextObj>)}
                        onMeasure={(h) => patch(o.id, { h })}
                        onEditFocus={() => markDirty(objectsRef.current)}
                      />
                    ))}
                    {liveStroke && (
                      <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" viewBox={`0 0 ${page.width} ${page.height}`} aria-hidden="true">
                        <polyline
                          points={liveStroke.map((p) => `${p.x},${p.y}`).join(" ")}
                          fill="none"
                          stroke={penColor}
                          strokeWidth={penWidth}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ) : (
                <p className="p-6 text-center text-sm text-muted-foreground">{pdf.loading ? messages.common.opening : ""}</p>
              )}
            </div>
          </div>
        </>
      )}

      {runner.error && <ErrorBanner message={runner.error} onDismiss={runner.reset} />}
      <ActionBar
        label={tool.actionLabel}
        onRun={run}
        onReset={reset}
        disabled={!ready || objects.length === 0}
        busy={runner.busy}
        progress={runner.progress}
        hint={
          objects.length === 0
            ? m.addSomething
            : format(m.summary, {
                items: plural(messages.common.itemCount, objects.length),
                pages: plural(messages.common.pageCount, Object.keys(counts).length),
              })
        }
      />
    </div>
  );
}

// ---- page canvas -------------------------------------------------------------

function PageCanvas({ doc, pageNumber, scale, width, height }: { doc: PDFDocumentProxy; pageNumber: number; scale: number; width: number; height: number }) {
  const messages = useMessages();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState<string | null>(null);
  const key = `${pageNumber}@${scale}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ac = new AbortController();
    void renderPageToCanvas(doc, pageNumber, scale, canvas, ac.signal).then((ok) => {
      if (ok && !ac.signal.aborted) setRendered(key);
    });
    return () => ac.abort();
  }, [doc, pageNumber, scale, key]);

  return (
    <>
      <canvas ref={canvasRef} role="img" aria-label={format(messages.common.pageAlt, { page: pageNumber })} className={cn("block", rendered !== key && "invisible")} style={{ width, height }} />
      {rendered !== key && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{pageNumber}</span>
        </div>
      )}
    </>
  );
}

// ---- one edit object ---------------------------------------------------------

interface ObjectViewProps {
  obj: EditObj;
  scale: number;
  selected: boolean;
  editing: boolean;
  interactive: boolean;
  onPointerDown: (e: ReactPointerEvent<HTMLElement>, obj: EditObj, kind: "move" | "resize") => void;
  onPointerMove: (e: ReactPointerEvent<HTMLElement>) => void;
  onPointerUp: (e: ReactPointerEvent<HTMLElement>) => void;
  onDelete: () => void;
  onStartEdit: () => void;
  onText: (text: string) => void;
  onMeasure: (h: number) => void;
  onEditFocus: () => void;
}

function labelOf(m: Messages["edit"], obj: EditObj): string {
  switch (obj.type) {
    case "text":
      return obj.text ? format(m.textBox, { text: obj.text.slice(0, 40) }) : m.emptyText;
    case "rect":
      return obj.kind === "whiteout" ? m.whiteoutRect : m.highlightLabel;
    case "image":
      return m.imageLabel;
    case "path":
      return m.drawing;
  }
}

function ObjectView({ obj, scale, selected, editing, interactive, onPointerDown, onPointerMove, onPointerUp, onDelete, onStartEdit, onText, onMeasure, onEditFocus }: ObjectViewProps) {
  const m = useMessages().edit;
  const textRef = useRef<HTMLTextAreaElement>(null);

  // A text box grows with its content. Measure the textarea and store the height in points.
  useLayoutEffect(() => {
    if (obj.type !== "text") return;
    const ta = textRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    const h = Math.max(obj.size * LINE_HEIGHT, ta.scrollHeight / scale);
    ta.style.height = "";
    if (Math.abs(h - obj.h) > 0.5) onMeasure(h);
  }, [obj, scale, onMeasure]);

  useEffect(() => {
    if (editing) textRef.current?.focus();
  }, [editing]);

  const style: CSSProperties = {
    left: obj.x * scale,
    top: obj.y * scale,
    width: obj.w * scale,
    height: obj.h * scale,
  };

  let body: React.ReactNode;
  if (obj.type === "text") {
    body = (
      <textarea
        ref={textRef}
        value={obj.text}
        readOnly={!editing}
        tabIndex={editing ? 0 : -1}
        aria-label={m.textArea}
        placeholder={editing ? m.typeHere : ""}
        spellCheck={false}
        onFocus={onEditFocus}
        onChange={(e) => onText(e.target.value)}
        onPointerDown={(e) => {
          if (editing) e.stopPropagation();
        }}
        className={cn("block size-full resize-none overflow-hidden border-0 bg-transparent p-0 outline-none select-text", !editing && "pointer-events-none")}
        style={{
          fontFamily: CSS_FONTS[obj.font],
          fontSize: obj.size * scale,
          lineHeight: LINE_HEIGHT,
          color: obj.color,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      />
    );
  } else if (obj.type === "rect") {
    body = (
      <div
        className="size-full"
        style={
          obj.kind === "whiteout"
            ? { background: "#ffffff", boxShadow: selected ? undefined : "inset 0 0 0 1px rgba(0,0,0,0.08)" }
            : { background: HIGHLIGHT, opacity: 0.4, mixBlendMode: "multiply" }
        }
      />
    );
  } else if (obj.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    body = <img src={obj.url} alt="" draggable={false} className="size-full object-fill" />;
  } else {
    body = (
      <svg className="size-full overflow-visible" viewBox={`0 0 ${obj.w} ${obj.h}`} preserveAspectRatio="none" aria-hidden="true">
        {obj.points.map((stroke, i) => (
          <polyline
            key={i}
            points={stroke.map((p) => `${p.x - obj.x},${p.y - obj.y}`).join(" ")}
            fill="none"
            stroke={obj.color}
            strokeWidth={obj.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    );
  }

  return (
    <div
      role="group"
      aria-label={labelOf(m, obj)}
      tabIndex={interactive ? 0 : -1}
      data-selected={selected || undefined}
      className={cn(
        "absolute",
        interactive ? "pointer-events-auto" : "pointer-events-none",
        interactive && !editing && "cursor-move",
        selected ? "outline-2 outline-primary" : interactive && "hover:outline-1 hover:outline-primary/50",
        selected && "z-10",
      )}
      style={style}
      onPointerDown={(e) => onPointerDown(e, obj, "move")}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={() => {
        if (obj.type === "text" && interactive) onStartEdit();
      }}
    >
      {body}
      {selected && interactive && (
        <>
          <button
            type="button"
            aria-label={m.deleteItem}
            title={m.delete}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onDelete}
            className="absolute -top-3 -end-3 z-20 flex size-6 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
          <span
            role="presentation"
            aria-hidden="true"
            onPointerDown={(e) => onPointerDown(e, obj, "resize")}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="absolute -end-1.5 -bottom-1.5 z-20 size-3.5 cursor-nwse-resize rounded-sm rtl:cursor-nesw-resize border border-primary bg-card"
          />
        </>
      )}
    </div>
  );
}
