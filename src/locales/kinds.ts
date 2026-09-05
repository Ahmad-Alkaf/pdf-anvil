// Facts that every locale inherits from the English registry: which files a
// kind accepts, what it produces, and its icon. A locale page never sets them.

import { NAV_TOOLS, type ToolKind } from "@/lib/tools";
import type { KindSpec, LocalePage, ToolPage } from "./types";

export const KIND_SPEC: Record<ToolKind, KindSpec> = Object.fromEntries(
  NAV_TOOLS.map((t) => [t.kind, { icon: t.icon, accept: t.accept, multiple: t.multiple, input: t.input, output: t.output }]),
) as Record<ToolKind, KindSpec>;

export const KINDS: readonly ToolKind[] = NAV_TOOLS.map((t) => t.kind);

/** The slim object a tool component gets. Copy fields only; no FAQ or steps. */
export function toToolPage(page: LocalePage): ToolPage {
  const { id, slug, kind, name, actionLabel, capture, defaults } = page;
  return { id, slug, kind, name, actionLabel, capture, defaults, ...KIND_SPEC[kind] };
}
