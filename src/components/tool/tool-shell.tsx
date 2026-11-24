"use client";

import { TOOL_COMPONENTS } from "./tool-registry.client";
import { ToolPageContext } from "./tool-placeholder";
import type { ToolPage } from "@/locales/types";

export function ToolShell({ tool }: { tool: ToolPage }) {
  const Tool = TOOL_COMPONENTS[tool.kind];
  return (
    <section aria-label={tool.name} className="mx-auto w-full max-w-5xl">
      <ToolPageContext value={tool}>
        <Tool tool={tool} />
      </ToolPageContext>
    </section>
  );
}
