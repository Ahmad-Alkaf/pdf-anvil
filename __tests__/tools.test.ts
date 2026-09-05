import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getTool, isToolSlug, NAV_TOOLS, TOOLS, VARIANT_TOOLS, type ToolKind } from "@/lib/tools";

/** Keys of TOOL_COMPONENTS in the client registry, read from the source text. */
function clientRegistryKinds(): string[] {
  const path = fileURLToPath(new URL("../src/components/tool/tool-registry.client.ts", import.meta.url));
  const source = readFileSync(path, "utf8");
  const body = source.slice(source.indexOf("TOOL_COMPONENTS"));
  return [...body.matchAll(/^\s*"?([\w-]+)"?:\s*dynamic\(/gm)].map((m) => m[1]);
}

describe("TOOLS registry", () => {
  it("has unique slugs", () => {
    const slugs = TOOLS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has unique titles, H1s, and meta descriptions", () => {
    for (const field of ["title", "h1", "description"] as const) {
      const values = TOOLS.map((t) => t[field]);
      expect(new Set(values).size, field).toBe(values.length);
    }
  });

  it("only links to slugs that exist and never to itself", () => {
    for (const tool of TOOLS) {
      expect(tool.related.length, tool.slug).toBeGreaterThan(0);
      for (const slug of tool.related) {
        expect(isToolSlug(slug), `${tool.slug} -> ${slug}`).toBe(true);
        expect(slug, tool.slug).not.toBe(tool.slug);
      }
    }
  });

  it("has a component for every kind and no component without a tool", () => {
    const kindsInTools = new Set<ToolKind>(TOOLS.map((t) => t.kind));
    const kindsInClient = clientRegistryKinds();
    expect(kindsInClient.length).toBeGreaterThan(0);
    expect([...kindsInTools].sort()).toEqual([...kindsInClient].sort());
  });

  it("has exactly one nav entry per kind", () => {
    const navKinds = NAV_TOOLS.map((t) => t.kind);
    expect(new Set(navKinds).size).toBe(navKinds.length);
    expect(new Set(navKinds)).toEqual(new Set(TOOLS.map((t) => t.kind)));
  });

  it("splits into nav and variant tools without overlap", () => {
    expect(NAV_TOOLS.length + VARIANT_TOOLS.length).toBe(TOOLS.length);
    expect(NAV_TOOLS.every((t) => t.nav)).toBe(true);
    expect(VARIANT_TOOLS.every((t) => !t.nav)).toBe(true);
  });

  it("matches the accept list to the input type", () => {
    for (const tool of TOOLS) {
      const mimes = Object.keys(tool.accept);
      if (tool.input === "pdf") expect(mimes, tool.slug).toEqual(["application/pdf"]);
      else expect(mimes, tool.slug).toEqual(expect.arrayContaining(["image/jpeg", "image/png", "image/webp"]));
    }
  });

  it("gives every pdf-to-images page a default format", () => {
    for (const tool of TOOLS.filter((t) => t.kind === "pdf-to-images")) {
      expect(tool.defaults?.format, tool.slug).toMatch(/^(jpg|png)$/);
    }
  });

  it("has non-empty copy on every page", () => {
    for (const tool of TOOLS) {
      expect(tool.faq.length, tool.slug).toBeGreaterThan(0);
      expect(tool.keywords.length, tool.slug).toBeGreaterThan(0);
      expect(tool.steps.every((s) => s.length > 0), tool.slug).toBe(true);
      expect(tool.description.length, tool.slug).toBeLessThanOrEqual(160);
      for (const faq of tool.faq) {
        expect(faq.q.length, tool.slug).toBeGreaterThan(0);
        expect(faq.a.length, tool.slug).toBeGreaterThan(0);
      }
    }
  });
});

describe("getTool / isToolSlug", () => {
  it("looks up known slugs", () => {
    expect(getTool("merge-pdf")?.kind).toBe("merge");
    expect(isToolSlug("merge-pdf")).toBe(true);
  });

  it("returns undefined / false for unknown slugs", () => {
    expect(getTool("compress-pdf")).toBeUndefined();
    expect(isToolSlug("compress-pdf")).toBe(false);
    expect(isToolSlug("")).toBe(false);
  });
});
