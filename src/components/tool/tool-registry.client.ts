"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ToolKind } from "@/lib/tools";
import type { ToolPage } from "@/locales/types";

export interface ToolProps {
  tool: ToolPage;
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
  view: dynamic(() => import("./tools/view-tool").then((m) => m.ViewTool), { ssr: false }),
  compress: dynamic(() => import("./tools/compress-tool").then((m) => m.CompressTool), { ssr: false }),
  unlock: dynamic(() => import("./tools/unlock-tool").then((m) => m.UnlockTool), { ssr: false }),
  protect: dynamic(() => import("./tools/protect-tool").then((m) => m.ProtectTool), { ssr: false }),
  edit: dynamic(() => import("./tools/edit-tool").then((m) => m.EditTool), { ssr: false }),
};
