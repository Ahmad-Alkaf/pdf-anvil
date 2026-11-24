"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ToolKind } from "@/lib/tools";
import type { ToolPage } from "@/locales/types";
import { ToolPlaceholder } from "./tool-placeholder";

export interface ToolProps {
  tool: ToolPage;
}

// One component per tool kind. Several registry pages share a kind (for
// example /jpg-to-pdf, /png-to-pdf, /webp-to-pdf, /image-to-pdf all use
// "images-to-pdf"). Each component is its own chunk and never renders on the
// server: pdf.js touches DOM globals at module scope. Until a chunk loads
// (and in the static HTML), ToolPlaceholder shows the same first dropzone, so
// the page does not shift. next/dynamic needs a literal options object.
export const TOOL_COMPONENTS: Record<ToolKind, ComponentType<ToolProps>> = {
  merge: dynamic(() => import("./tools/merge-tool").then((m) => m.MergeTool), { ssr: false, loading: ToolPlaceholder }),
  split: dynamic(() => import("./tools/split-tool").then((m) => m.SplitTool), { ssr: false, loading: ToolPlaceholder }),
  rotate: dynamic(() => import("./tools/rotate-tool").then((m) => m.RotateTool), { ssr: false, loading: ToolPlaceholder }),
  organize: dynamic(() => import("./tools/organize-tool").then((m) => m.OrganizeTool), { ssr: false, loading: ToolPlaceholder }),
  "images-to-pdf": dynamic(() => import("./tools/images-to-pdf-tool").then((m) => m.ImagesToPdfTool), { ssr: false, loading: ToolPlaceholder }),
  "pdf-to-images": dynamic(() => import("./tools/pdf-to-images-tool").then((m) => m.PdfToImagesTool), { ssr: false, loading: ToolPlaceholder }),
  view: dynamic(() => import("./tools/view-tool").then((m) => m.ViewTool), { ssr: false, loading: ToolPlaceholder }),
  compress: dynamic(() => import("./tools/compress-tool").then((m) => m.CompressTool), { ssr: false, loading: ToolPlaceholder }),
  unlock: dynamic(() => import("./tools/unlock-tool").then((m) => m.UnlockTool), { ssr: false, loading: ToolPlaceholder }),
  protect: dynamic(() => import("./tools/protect-tool").then((m) => m.ProtectTool), { ssr: false, loading: ToolPlaceholder }),
  edit: dynamic(() => import("./tools/edit-tool").then((m) => m.EditTool), { ssr: false, loading: ToolPlaceholder }),
};
