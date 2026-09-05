// Small helpers for message strings. No locale data here, so client
// components can import this file without pulling in the registry.

import { Fragment, type ReactNode } from "react";
import type { PdfError } from "@/lib/pdf/errors";
import { detailText } from "@/lib/pdf/errors";
import type { ProgressStep } from "@/lib/pdf/progress";
import type { Messages, Plural } from "./types";

export type Vars = Record<string, string | number>;

/** Replace `{name}` placeholders. Unknown placeholders stay as they are. */
export function format(message: string, vars: Vars = {}): string {
  return message.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
}

/** Pick the form for `n` and fill `{n}` plus any other placeholders. */
export function plural(forms: Plural, n: number, vars: Vars = {}): string {
  return format(n === 1 ? forms.one : forms.other, { n, ...vars });
}

/**
 * Like `format`, but a placeholder can be a React node (a link inside a
 * sentence). Text around the nodes stays one string.
 */
export function formatJsx(message: string, nodes: Record<string, ReactNode>): ReactNode[] {
  const parts = message.split(/(\{\w+\})/);
  return parts
    .filter((part) => part !== "")
    .map((part, i) => {
      const match = /^\{(\w+)\}$/.exec(part);
      if (match && match[1] in nodes) return <Fragment key={i}>{nodes[match[1]]}</Fragment>;
      return part;
    });
}

/** Text for a progress step of the PDF functions. */
export function progressLabel(m: Messages, step: ProgressStep | undefined): string | undefined {
  if (!step) return undefined;
  const p = m.toolShell.progress;
  switch (step.key) {
    case "reading":
      return p.reading;
    case "saving":
      return p.saving;
    case "reading-file":
      return format(p.readingFile, { i: step.index, total: step.total });
    case "image":
      return format(p.image, { i: step.index, total: step.total });
    case "placing":
      return format(p.placing, { i: step.index, total: step.total });
    case "adding":
      return format(p.adding, { name: step.name });
    case "rendering":
      return format(p.rendering, { page: step.page });
    case "writing":
      return format(p.writing, { label: step.label });
  }
}

/** User message of a PdfError in the current language. */
export function errorMessage(m: Messages, err: PdfError): string {
  const base = m.errors[err.code];
  return err.detail ? `${base} (${detailText(m.errorDetails, err.detail)})` : base;
}

/**
 * The first sentence of an intro, for cards. A Latin stop (". ", "! ", "? ")
 * must be followed by a space or the end; a CJK stop (。！？) ends the sentence
 * on its own. Like the English cards, a Latin sentence always ends in ".".
 */
export function firstSentence(text: string): string {
  const match = /^(.*?)(?:([.!?؟])(?=\s|$)|([。！？]))/.exec(text);
  if (!match) return text;
  return match[3] ? `${match[1]}${match[3]}` : `${match[1]}.`;
}

/** First character lowercased, unless the word starts with an acronym such as "PDF". */
export function lowerFirst(text: string): string {
  if (text.length > 1 && text[1] === text[1].toUpperCase() && text[1] !== text[1].toLowerCase()) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}
