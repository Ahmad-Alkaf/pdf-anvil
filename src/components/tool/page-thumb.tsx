"use client";

import { useEffect, useRef, useState } from "react";
import { renderThumbnail } from "@/lib/pdf/thumbnails";
import type { PDFDocumentProxy } from "@/lib/pdf/pdfjs";
import { useMessages } from "@/locales/context";
import { format } from "@/locales/format";
import { cn } from "@/lib/utils";

interface Props {
  doc: PDFDocumentProxy;
  pageNumber: number; // 1-based
  rotation?: number; // preview only, CSS degrees
  className?: string;
}

/** Lazy page thumbnail. Renders only once it scrolls near the viewport. */
export function PageThumb({ doc, pageNumber, rotation = 0, className }: Props) {
  const m = useMessages();
  const ref = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    renderThumbnail(doc, pageNumber).then((u) => {
      if (!cancelled) setUrl(u);
    });
    return () => {
      cancelled = true;
    };
  }, [doc, pageNumber, visible]);

  return (
    <div
      ref={ref}
      className={cn("flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-white", className)}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={format(m.common.pageAlt, { page: pageNumber })}
          draggable={false}
          className="max-h-full max-w-full object-contain shadow-sm transition-transform duration-200"
          style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
        />
      ) : (
        <div className="size-full animate-pulse bg-muted" aria-hidden="true" />
      )}
    </div>
  );
}
