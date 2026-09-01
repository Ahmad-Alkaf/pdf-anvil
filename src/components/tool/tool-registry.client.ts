"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ToolDef, ToolSlug } from "@/lib/tools";

export interface ToolProps {
  tool: ToolDef;
}

// Each tool is its own chunk and never renders on the server: pdf.js touches
// DOM globals at module scope. next/dynamic needs a literal options object.
export const TOOL_COMPONENTS: Record<ToolSlug, ComponentType<ToolProps>> = {
  "merge-pdf": dynamic(() => import("./tools/merge-tool").then((m) => m.MergeTool), { ssr: false }),
  "split-pdf": dynamic(() => import("./tools/split-tool").then((m) => m.SplitTool), { ssr: false }),
  "rotate-pdf": dynamic(() => import("./tools/rotate-tool").then((m) => m.RotateTool), { ssr: false }),
  "organize-pdf": dynamic(() => import("./tools/organize-tool").then((m) => m.OrganizeTool), { ssr: false }),
  "jpg-to-pdf": dynamic(() => import("./tools/images-to-pdf-tool").then((m) => m.ImagesToPdfTool), { ssr: false }),
  "pdf-to-jpg": dynamic(() => import("./tools/pdf-to-images-tool").then((m) => m.PdfToImagesTool), { ssr: false }),
};
