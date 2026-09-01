"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ToolDef, ToolKind } from "@/lib/tools";

export interface ToolProps {
  tool: ToolDef;
}

// One component per tool kind. Several registry pages share a kind (for
// example /jpg-to-pdf, /png-to-pdf, /webp-to-pdf, /image-to-pdf all use
// "images-to-pdf"). Each component is its own chunk and never renders on the
// server: pdf.js touches DOM globals at module scope. next/dynamic needs a
// literal options object.
export const TOOL_COMPONENTS: Record<ToolKind, ComponentType<ToolProps>> = {
  merge: dynamic(() => import("./tools/merge-tool").then((m) => m.MergeTool), { ssr: false }),
  split: dynamic(() => import("./tools/split-tool").then((m) => m.SplitTool), { ssr: false }),
  rotate: dynamic(() => import("./tools/rotate-tool").then((m) => m.RotateTool), { ssr: false }),
  organize: dynamic(() => import("./tools/organize-tool").then((m) => m.OrganizeTool), { ssr: false }),
  "images-to-pdf": dynamic(() => import("./tools/images-to-pdf-tool").then((m) => m.ImagesToPdfTool), { ssr: false }),
  "pdf-to-images": dynamic(() => import("./tools/pdf-to-images-tool").then((m) => m.PdfToImagesTool), { ssr: false }),
};
