import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getTool, HEADER_LIMIT, HEADER_TOOLS, isToolSlug, NAV_TOOLS, TOOLS, TOOLS_BY_PRIORITY, VARIANT_TOOLS, type ToolKind } from "@/lib/tools";

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

  it("orders every list by a unique priority", () => {
    const priorities = TOOLS.map((t) => t.priority);
    expect(new Set(priorities).size).toBe(TOOLS.length);
    expect(priorities.every((p) => Number.isInteger(p) && p >= 1)).toBe(true);
    for (const list of [NAV_TOOLS, VARIANT_TOOLS, TOOLS_BY_PRIORITY]) {
      const got = list.map((t) => t.priority);
      expect(got).toEqual([...got].sort((a, b) => a - b));
    }
    expect(TOOLS_BY_PRIORITY.length).toBe(TOOLS.length);
    // Nav pages come before their variants so the footer and the "All tools" panel read top-down.
    expect(Math.max(...NAV_TOOLS.map((t) => t.priority))).toBeLessThan(Math.min(...VARIANT_TOOLS.map((t) => t.priority)));
  });

  it("keeps the header to a fixed budget of the most searched nav tools", () => {
    expect(HEADER_LIMIT).toBe(5);
    expect(HEADER_TOOLS.length).toBeLessThanOrEqual(HEADER_LIMIT);
    expect(HEADER_TOOLS).toEqual(NAV_TOOLS.slice(0, HEADER_LIMIT));
    expect(HEADER_TOOLS.map((t) => t.slug)).toEqual(["merge-pdf", "image-to-pdf", "pdf-to-image", "compress-pdf", "split-pdf"]);
    // Labels must stay short so five of them fit next to the logo at 1024 px.
    expect(HEADER_TOOLS.every((t) => t.navLabel.length <= 14)).toBe(true);
  });

  it("gives every variant a nav page of the same kind with different copy", () => {
    for (const variant of VARIANT_TOOLS) {
      const primary = NAV_TOOLS.find((t) => t.kind === variant.kind);
      expect(primary, variant.slug).toBeDefined();
      expect(variant.name, variant.slug).not.toBe(primary!.name);
      expect(variant.intro, variant.slug).not.toBe(primary!.intro);
      const primaryQuestions = new Set(primary!.faq.map((f) => f.q));
      const ownQuestions = variant.faq.filter((f) => !primaryQuestions.has(f.q));
      expect(ownQuestions.length, `${variant.slug} needs FAQ entries of its own`).toBeGreaterThan(0);
    }
  });

  it("registers the search-query variants of merge and split", () => {
    expect(getTool("combine-pdf")).toMatchObject({ kind: "merge", nav: false, input: "pdf", output: "pdf" });
    expect(getTool("extract-pdf-pages")).toMatchObject({ kind: "split", nav: false, input: "pdf", output: "pdfs" });
    expect(VARIANT_TOOLS.map((t) => t.slug)).toEqual(expect.arrayContaining(["combine-pdf", "extract-pdf-pages"]));
  });

  it("registers compress as a nav tool with a reduce-pdf-size variant", () => {
    const compress = getTool("compress-pdf");
    expect(compress).toMatchObject({ kind: "compress", nav: true, input: "pdf", output: "pdf", icon: "FileDown" });
    expect(compress!.keywords).toEqual(
      expect.arrayContaining(["compress pdf", "pdf compressor", "reduce pdf size", "pdf size reducer", "shrink pdf"]),
    );
    expect(compress!.faq.some((f) => /not get smaller/i.test(f.q))).toBe(true);
    expect(compress!.faq.some((f) => /quality of the text/i.test(f.q))).toBe(true);
    expect(getTool("reduce-pdf-size")).toMatchObject({ kind: "compress", nav: false, input: "pdf", output: "pdf" });
    expect(getTool("reduce-pdf-size")!.keywords).toEqual(expect.arrayContaining(["reduce pdf size", "pdf size reducer"]));
    expect(VARIANT_TOOLS.map((t) => t.slug)).toContain("reduce-pdf-size");
  });

  it("registers scan-to-pdf as the only image variant with camera capture", () => {
    const scan = getTool("scan-to-pdf");
    expect(scan).toMatchObject({ kind: "images-to-pdf", nav: false, input: "images", output: "pdf", capture: true });
    expect(scan!.defaults?.pageSize).toBe("a4");
    expect(scan!.keywords).toEqual(expect.arrayContaining(["scan to pdf", "scan documents to pdf", "how to scan documents to pdf"]));
    expect(scan!.faq.some((f) => /straight/i.test(f.q))).toBe(true);
    expect(VARIANT_TOOLS.map((t) => t.slug)).toContain("scan-to-pdf");
    for (const tool of TOOLS.filter((t) => t.slug !== "scan-to-pdf")) {
      expect(tool.capture, tool.slug).toBeUndefined();
    }
  });

  it("registers unlock and protect as nav tools that link to each other", () => {
    const unlock = getTool("unlock-pdf");
    expect(unlock).toMatchObject({ kind: "unlock", nav: true, input: "pdf", output: "pdf", icon: "LockOpen", actionLabel: "Unlock PDF" });
    expect(unlock!.keywords).toEqual(
      expect.arrayContaining(["unlock pdf", "remove password from pdf", "pdf password remover", "decrypt pdf"]),
    );
    expect(unlock!.faq.some((f) => /forgot the password/i.test(f.q))).toBe(true);
    expect(unlock!.related).toContain("protect-pdf");

    const protect = getTool("protect-pdf");
    expect(protect).toMatchObject({ kind: "protect", nav: true, input: "pdf", output: "pdf", icon: "Lock", actionLabel: "Protect PDF" });
    expect(protect!.keywords).toEqual(expect.arrayContaining(["protect pdf", "password protect pdf", "encrypt pdf", "lock pdf"]));
    expect(protect!.faq.some((f) => /AES-256/.test(f.a))).toBe(true);
    expect(protect!.faq.some((f) => /remove the password later/i.test(f.q))).toBe(true);
    expect(protect!.related).toContain("unlock-pdf");
  });

  it("registers the viewer as a nav tool with no output", () => {
    const viewer = getTool("pdf-viewer");
    expect(viewer).toMatchObject({ kind: "view", nav: true, input: "pdf", output: "none", icon: "BookOpen" });
    expect(TOOLS.filter((t) => t.kind === "view")).toHaveLength(1);
    expect(NAV_TOOLS.some((t) => t.slug === "pdf-viewer")).toBe(true);
    expect(viewer!.keywords).toEqual(expect.arrayContaining(["open pdf file", "pdf viewer", "pdf reader online"]));
    expect(viewer!.faq.some((f) => /what is a pdf reader/i.test(f.q))).toBe(true);
  });

  it("gives every tool with an output a download-style action label", () => {
    for (const tool of TOOLS) {
      if (tool.output === "none") expect(tool.actionLabel, tool.slug).toBe("Print");
      else expect(tool.actionLabel, tool.slug).not.toBe("Print");
    }
  });

  it("has no repeated keywords or FAQ questions inside one page", () => {
    for (const tool of TOOLS) {
      const keywords = tool.keywords.map((k) => k.toLowerCase());
      expect(new Set(keywords).size, `${tool.slug} keywords`).toBe(keywords.length);
      const questions = tool.faq.map((f) => f.q);
      expect(new Set(questions).size, `${tool.slug} faq`).toBe(questions.length);
    }
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
    expect(getTool("encrypt-pdf")).toBeUndefined();
    expect(isToolSlug("encrypt-pdf")).toBe(false);
    expect(isToolSlug("")).toBe(false);
  });
});
