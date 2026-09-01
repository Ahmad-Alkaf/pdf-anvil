"use client";

import { TOOL_COMPONENTS } from "./tool-registry.client";
import type { ToolDef } from "@/lib/tools";

export function ToolShell({ tool }: { tool: ToolDef }) {
  const Tool = TOOL_COMPONENTS[tool.slug];
  return (
    <section aria-label={tool.name} className="mx-auto w-full max-w-5xl">
      <Tool tool={tool} />
    </section>
  );
}
