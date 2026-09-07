// Types of the locale framework. One folder under src/locales/<code>/ holds one
// language. Read src/locales/README.md before you add a locale.

import type { ToolFaq, ToolIcon, ToolKind } from "@/lib/tools";
import type { PdfErrorCode, PdfErrorDetail } from "@/lib/pdf/errors";

/**
 * Locale code as used in URLs: "en", "es", "pt-br", "ar". "en" is the
 * reference locale and lives at the root URLs. Other codes get autocomplete
 * here once they are registered in src/locales/index.ts; the registry, not
 * this union, decides which codes exist.
 */
export type Locale = "en" | (string & {});

export interface LocaleMeta {
  /** URL segment, lowercase. */
  code: Locale;
  /** Name of the language in that language: "Español". */
  name: string;
  /** Name in English: "Spanish". */
  englishName: string;
  dir: "ltr" | "rtl";
  /** "latin" when the language is written with the Latin alphabet, otherwise "other". Decides the slug rule. */
  script: "latin" | "other";
  /** BCP 47 tag for `<html lang>` and hreflang: "es", "pt-BR". */
  htmlLang: string;
  /** Open Graph locale, "es_ES". Defaults to `htmlLang` with "_" when missing. */
  ogLocale?: string;
}

/**
 * One tool page of one locale. `id` is the identity across locales: the
 * English slug when the page mirrors an English page ("merge-pdf"), or
 * "<kind>:<word>" for a page that exists only in this locale ("edit:tahrir").
 */
export interface LocalePage {
  id: string;
  /** URL segment inside the locale. Unique per locale. */
  slug: string;
  kind: ToolKind;
  /** The one page per kind that the header, the home grid, and the footer show first. */
  nav: boolean;
  /** Display order by local search demand. 1 is first. Unique per locale. */
  priority: number;
  name: string;
  navLabel: string;
  title: string;
  /** Meta description, 120 to 165 characters. */
  description: string;
  h1: string;
  /** One or two sentences under the h1. The first sentence is the card summary. */
  intro: string;
  actionLabel: string;
  steps: [string, string, string];
  faq: ToolFaq[];
  /** Page ids. An id that does not exist in the locale falls back to the nav page of its kind. */
  related: string[];
  keywords: string[];
  /** Show a "Take a photo" button that opens the phone camera (image tools only). */
  capture?: boolean;
  /** Initial option values for the tool component. */
  defaults?: { format?: "jpg" | "png"; pageSize?: "fit" | "a4" | "letter"; tool?: "select" | "text" | "draw" };
}

/** Facts of a tool kind that every locale inherits from the English registry. */
export interface KindSpec {
  icon: ToolIcon;
  accept: Record<string, string[]>;
  multiple: boolean;
  input: "pdf" | "images";
  output: "pdf" | "pdfs" | "images" | "none";
}

/** What a tool component receives: the page identity, its labels, and the kind spec. */
export interface ToolPage extends KindSpec {
  id: string;
  slug: string;
  kind: ToolKind;
  name: string;
  actionLabel: string;
  capture?: boolean;
  defaults?: LocalePage["defaults"];
}

/** A string that changes with a count. `{n}` is the count. */
export interface Plural {
  one: string;
  other: string;
}

export interface TitledText {
  title: string;
  text: string;
}

/**
 * Every user-visible UI string of the site. Placeholders look like `{name}`
 * and must be kept verbatim in a translation. Copy that belongs to a tool page
 * (title, intro, FAQ, ...) is not here; it lives in the locale's pages.ts.
 */
export interface Messages {
  common: {
    /** Site tagline, also the home h1 and the default <title>. */
    tagline: string;
    /** Default meta description. */
    description: string;
    /** Root meta keywords. */
    keywords: string[];
    /** Subtitle of the site Open Graph image. */
    ogSubtitle: string;
    /** Footer line of every Open Graph image. */
    ogFooter: string;
    pageCount: Plural;
    fileCount: Plural;
    imageCount: Plural;
    itemCount: Plural;
    startOver: string;
    dismiss: string;
    reset: string;
    undo: string;
    /** Shown while a file opens. */
    opening: string;
    /** Alt text of a page image and label of a page thumbnail. */
    pageAlt: string;
  };
  header: {
    toolsNav: string;
    allTools: string;
    morePages: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    switchToLight: string;
    switchToDark: string;
    /** Label of the language switcher. */
    language: string;
    /** Link of the language suggestion bar, in the suggested language. */
    suggestionOpen: string;
    /** Dismiss button of the language suggestion bar, in the suggested language. */
    suggestionDismiss: string;
  };
  footer: {
    blurb: string;
    /** `{brand}` is the KafLabs link. */
    byline: string;
    tools: string;
    /** `{year}` and `{brand}` (KafLabs link). */
    copyright: string;
    about: string;
    privacy: string;
    terms: string;
    support: string;
  };
  home: {
    hero: string;
    trust: [string, string, string];
    toolsHeading: string;
    openTool: string;
    also: string;
    whyHeading: string;
    why: [TitledText, TitledText, TitledText];
    faq: ToolFaq[];
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    /** `{kaflabs}` is the KafLabs link. */
    intro: string;
    files: { heading: string; p1: string; p2: string };
    privacy: { heading: string; p: string; sourceLink: string };
    limits: { heading: string; items: [string, string, string, string, string] };
    contact: {
      heading: string;
      /** `{email}` is the support mail link. */
      p: string;
      /** `{toolList}`, `{privacy}`, `{terms}` are links. */
      links: string;
      toolList: string;
      privacy: string;
      terms: string;
    };
  };
  notFound: { code: string; title: string; text: string };
  errorPage: { title: string; text: string; retry: string };
  toolShell: {
    dropzone: {
      dropFiles: string;
      dropFile: string;
      filesStay: string;
      takePhoto: string;
      /** `{n}` files, `{list}` accepted extensions. */
      skipped: Plural;
    };
    fileList: { drag: string; moveUp: string; moveDown: string; remove: string };
    fileHeader: { reading: string; remove: string };
    pageGrid: { tile: string; rotateLeft: string; rotateRight: string; delete: string };
    sizeWarning: string;
    actionBar: { working: string; percent: string };
    progress: {
      starting: string;
      reading: string;
      saving: string;
      readingFile: string;
      image: string;
      placing: string;
      adding: string;
      rendering: string;
      writing: string;
    };
    result: {
      done: string;
      starting: string;
      packing: string;
      started: string;
      failed: string;
      download: string;
      downloadAll: string;
      downloadAgain: string;
      downloadZipAgain: string;
      downloadFile: string;
      pdfBadge: string;
    };
    howItWorks: string;
    /** `{h1}` is the page h1 as written, `{h1Lower}` with its first letter lowercased. */
    howToName: string;
    privacy: { heading: string; points: [TitledText, TitledText, TitledText] };
    related: string;
    faq: string;
    password: { show: string; hide: string };
  };
  errors: Record<PdfErrorCode, string>;
  errorDetails: Record<Exclude<PdfErrorDetail["key"], "text">, string>;
  merge: { addMore: string; atLeastTwo: string; summary: string };
  split: {
    splitBy: string;
    everyPage: string;
    everyPageHint: string;
    pageRanges: string;
    pageRangesHint: string;
    pagesLabel: string;
    makes: Plural;
  };
  rotate: { allLeft: string; allRight: string; hint: string; rotateOne: string };
  organize: { hint: string; willRemove: Plural; moveHint: string; output: string };
  imagesToPdf: {
    pageSize: string;
    a4: string;
    letter: string;
    fit: string;
    fitHint: string;
    orientation: string;
    auto: string;
    portrait: string;
    landscape: string;
    margin: string;
    none: string;
    small: string;
    large: string;
    addMore: string;
    summary: string;
  };
  pdfToImages: {
    format: string;
    jpgHint: string;
    pngHint: string;
    resolution: string;
    dpi: string;
    web: string;
    screen: string;
    print: string;
    selectAll: string;
    clear: string;
    clickPages: string;
    selectOne: string;
    summary: string;
    capped: string;
  };
  view: {
    controls: string;
    prev: string;
    next: string;
    page: string;
    currentPage: string;
    zoomOut: string;
    zoomIn: string;
    fitWidth: string;
    pages: string;
    printed: string;
    blocked: string;
  };
  compress: {
    level: string;
    lossless: string;
    losslessHint: string;
    balanced: string;
    balancedHint: string;
    smallest: string;
    smallestHint: string;
    before: string;
    after: string;
    saved: string;
    noteCompact: string;
    noteLossless: string;
    noteReencoded: Plural;
    noteNone: string;
  };
  unlock: {
    protected: string;
    legend: string;
    label: string;
    hint: string;
    note: string;
    checking: string;
    chooseProtected: string;
    typePassword: string;
  };
  protect: {
    passwords: string;
    openPassword: string;
    openHint: string;
    ownerPassword: string;
    optional: string;
    ownerHintEmpty: string;
    ownerHintSet: string;
    permissions: string;
    allowPrinting: string;
    allowPrintingHint: string;
    allowCopying: string;
    allowCopyingHint: string;
    allowEditing: string;
    allowEditingHint: string;
    permissionsNote: string;
    note: string;
    typeFirst: string;
    aes: string;
  };
  edit: {
    toolbar: string;
    select: string;
    text: string;
    whiteout: string;
    highlight: string;
    image: string;
    draw: string;
    font: string;
    fontSize: string;
    pt: string;
    textColor: string;
    penWidth: string;
    penColor: string;
    undoTitle: string;
    redo: string;
    redoTitle: string;
    prev: string;
    next: string;
    pagesStrip: string;
    hints: { select: string; text: string; whiteout: string; highlight: string; image: string; draw: string };
    textBox: string;
    emptyText: string;
    whiteoutRect: string;
    highlightLabel: string;
    imageLabel: string;
    drawing: string;
    textArea: string;
    typeHere: string;
    deleteItem: string;
    delete: string;
    note: string;
    addSomething: string;
    summary: string;
  };
}

export interface LocaleBundle {
  meta: LocaleMeta;
  messages: Messages;
  pages: readonly LocalePage[];
  /** "This page exists in Spanish", written in that language. Shown to visitors of another locale. */
  suggestion: string;
}
