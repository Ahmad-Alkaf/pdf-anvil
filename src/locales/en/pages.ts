// English tool pages. The copy stays in src/lib/tools.ts (the registry); this
// adapter only gives each entry its cross-locale id, which is the slug.

import { TOOLS, type ToolDef } from "@/lib/tools";
import type { LocalePage } from "../types";

export function toLocalePage(tool: ToolDef): LocalePage {
  const { slug, kind, nav, priority, name, navLabel, title, description, h1, intro, actionLabel, steps, faq, related, keywords, capture, defaults } = tool;
  const page: LocalePage = { id: slug, slug, kind, nav, priority, name, navLabel, title, description, h1, intro, actionLabel, steps, faq, related, keywords };
  if (capture !== undefined) page.capture = capture;
  if (defaults !== undefined) page.defaults = defaults;
  return page;
}

export const pages: readonly LocalePage[] = TOOLS.map(toLocalePage);
