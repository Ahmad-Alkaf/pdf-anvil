"use client";

import { createContext, useContext } from "react";
import { Dropzone } from "./dropzone";
import type { ToolPage } from "@/locales/types";

/** The tool of the current page, for the placeholder below (next/dynamic gives `loading` no props). */
export const ToolPageContext = createContext<ToolPage | null>(null);

const ignoreFiles = () => {};

/**
 * Shown while the tool chunk loads. The tools render only in the browser, so this is also what the
 * static HTML contains. Every tool starts with the same full dropzone; showing it here keeps the
 * page below in place when the tool appears (a layout shift of about 0.15 on phones before).
 * `inert` blocks clicks, focus, and the accessibility tree until the real dropzone replaces it.
 */
export function ToolPlaceholder() {
  const tool = useContext(ToolPageContext);
  if (!tool) return null;
  return (
    <div inert>
      <Dropzone accept={tool.accept} multiple={tool.multiple} capture={tool.capture} onFiles={ignoreFiles} />
    </div>
  );
}
