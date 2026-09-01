// Registry of every tool. Plain data: importable by server and client code.
// Routes, metadata, sitemap, header, footer, home grid, and related-tools
// links all read from here. Client-only parts (options panel, run function)
// live in src/components/tool/tool-registry.client.ts.

import { IMAGE_ACCEPT, PDF_ACCEPT } from "./files";

export type ToolSlug =
  | "merge-pdf"
  | "split-pdf"
  | "rotate-pdf"
  | "organize-pdf"
  | "jpg-to-pdf"
  | "pdf-to-jpg";

export type ToolIcon = "Combine" | "Scissors" | "RotateCw" | "LayoutGrid" | "ImagePlus" | "Images";

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolDef {
  slug: ToolSlug;
  name: string; // "Merge PDF"
  navLabel: string; // "Merge"
  title: string; // <title>, goes through "%s | PDF Anvil"
  description: string; // meta description, 150-160 chars
  h1: string;
  intro: string; // one or two sentences under the h1
  icon: ToolIcon;
  accept: Record<string, string[]>;
  multiple: boolean;
  input: "pdf" | "images";
  output: "pdf" | "pdfs" | "images";
  actionLabel: string; // button text
  steps: [string, string, string];
  faq: ToolFaq[];
  related: ToolSlug[];
  keywords: string[];
}

const PRIVACY_FAQ: ToolFaq = {
  q: "Are my files uploaded to a server?",
  a: "No. PDF Anvil runs entirely in your browser. Your file is opened by JavaScript on your own device, and the result is built there too. Nothing is sent to us. You can turn off your internet connection after the page loads and the tool still works.",
};

const LIMIT_FAQ: ToolFaq = {
  q: "Is there a file size or daily limit?",
  a: "No. There is no page limit, no file count limit, and no daily quota. The only limit is the memory of your device. Files above 100 MB show a warning, but they still work on most computers.",
};

const FREE_FAQ: ToolFaq = {
  q: "Is it really free? Do I need an account?",
  a: "Yes, it is free, and there is no account. No sign-up, no email, no watermark, and no premium tier. PDF Anvil is a KafLabs side project that exists to be useful.",
};

export const TOOLS: readonly ToolDef[] = [
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    navLabel: "Merge",
    title: "Merge PDF Files Online – Free, Private, No Upload",
    description:
      "Combine multiple PDF files into one document in your browser. Drag to set the order. Free, no upload, no account, no page limit, no watermark.",
    h1: "Merge PDF files",
    intro:
      "Combine two or more PDFs into a single file. Drag the files into the order you want. Everything happens in your browser.",
    icon: "Combine",
    accept: PDF_ACCEPT,
    multiple: true,
    input: "pdf",
    output: "pdf",
    actionLabel: "Merge PDFs",
    steps: [
      "Drop two or more PDF files into the box, or click to choose them.",
      "Drag the files into the order you want them to appear.",
      "Click Merge PDFs and download the combined file.",
    ],
    faq: [
      {
        q: "How do I change the order of the files?",
        a: "Drag a file up or down in the list, or use the arrow buttons. The merged PDF follows the order of the list from top to bottom.",
      },
      {
        q: "Does merging change the quality of my pages?",
        a: "No. Pages are copied as they are. Fonts, images, and vector graphics stay exactly the same. The tool does not re-render or compress anything.",
      },
      {
        q: "Can I merge password-protected PDFs?",
        a: "Not yet. Remove the password in your PDF viewer first (open the file, enter the password, then print or save it as a new PDF), and merge that copy.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "jpg-to-pdf"],
    keywords: ["merge pdf", "combine pdf", "join pdf files", "pdf merger free", "merge pdf online"],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    navLabel: "Split",
    title: "Split PDF Online – Extract Pages or Split by Range",
    description:
      "Split a PDF into separate files, one per page, or extract page ranges like 1-3, 5, 8-. Runs in your browser. Free, private, no upload, no limits.",
    h1: "Split PDF",
    intro:
      "Turn one PDF into many. Save every page as its own file, or type the page ranges you need. Your file stays on your device.",
    icon: "Scissors",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdfs",
    actionLabel: "Split PDF",
    steps: [
      "Drop a PDF into the box, or click to choose it.",
      "Pick \"Every page\" or type page ranges such as 1-3, 5, 8-.",
      "Click Split PDF. Download each file, or all of them as a ZIP.",
    ],
    faq: [
      {
        q: "How do I write page ranges?",
        a: "Separate items with commas. \"3\" is one page. \"1-3\" is pages 1 to 3. \"8-\" is page 8 to the end. Each item becomes its own PDF file. Example: 1-3, 5, 8- makes three files.",
      },
      {
        q: "How do I extract only some pages from a PDF?",
        a: "Choose \"Page ranges\" and type the pages you want, for example 2, 7-9. Only those pages are saved. The original file is not changed.",
      },
      {
        q: "Why do I get a ZIP file?",
        a: "When the split makes more than one file, the browser cannot save many files at once without asking every time. The ZIP holds all of them. You can also download each file on its own from the result list.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: ["split pdf", "extract pdf pages", "pdf splitter", "separate pdf pages", "split pdf online free"],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    navLabel: "Rotate",
    title: "Rotate PDF Pages Online – Fix Sideways Pages Free",
    description:
      "Rotate all pages or single pages of a PDF by 90, 180, or 270 degrees and save the result. Works in your browser. Free, no upload, no watermark.",
    h1: "Rotate PDF pages",
    intro:
      "Fix sideways or upside-down pages. Rotate the whole document or only the pages you pick, then save a new PDF.",
    icon: "RotateCw",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdf",
    actionLabel: "Save rotated PDF",
    steps: [
      "Drop a PDF into the box, or click to choose it.",
      "Rotate all pages with the top buttons, or hover a page and rotate only that one.",
      "Click Save rotated PDF and download the file.",
    ],
    faq: [
      {
        q: "Is the rotation permanent?",
        a: "Yes. Unlike the rotate button in a PDF viewer, which only changes the view, this tool writes the rotation into the file. The page opens in the new orientation in every viewer and on every device.",
      },
      {
        q: "Can I rotate only one page?",
        a: "Yes. Hover over a page thumbnail and use its rotate buttons. Each page can have its own rotation. The top buttons rotate every page at once.",
      },
      {
        q: "Does rotating reduce quality?",
        a: "No. The tool changes one property of the page. The content is not re-rendered or compressed, so the quality is identical.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["organize-pdf", "split-pdf", "merge-pdf"],
    keywords: ["rotate pdf", "rotate pdf pages", "rotate pdf and save", "fix pdf orientation", "rotate pdf online free"],
  },
  {
    slug: "organize-pdf",
    name: "Organize PDF",
    navLabel: "Organize",
    title: "Organize PDF Pages – Reorder and Delete Pages Online",
    description:
      "Drag PDF pages into a new order, delete the pages you do not need, and download the result. Runs in your browser. Free, private, no upload, no limits.",
    h1: "Organize PDF pages",
    intro:
      "Reorder pages by dragging them, delete the ones you do not need, and save a clean new PDF. Nothing leaves your device.",
    icon: "LayoutGrid",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdf",
    actionLabel: "Save organized PDF",
    steps: [
      "Drop a PDF into the box, or click to choose it.",
      "Drag pages into a new order. Hover a page to delete or rotate it.",
      "Click Save organized PDF and download the file.",
    ],
    faq: [
      {
        q: "How do I delete pages from a PDF?",
        a: "Hover over the page and click the trash icon. The page is removed from the output. Deleted pages are not in the saved file at all, so the file gets smaller.",
      },
      {
        q: "Can I reorder pages on my phone?",
        a: "Yes. Press and hold a page, then drag it to its new place. Keyboard users can focus a page, press Space, move it with the arrow keys, and press Space again.",
      },
      {
        q: "I deleted the wrong page. Can I undo?",
        a: "Yes. Use the Undo button that appears after a delete, or click Reset to go back to the original order with all pages.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "split-pdf", "merge-pdf"],
    keywords: ["reorder pdf pages", "delete pdf pages", "organize pdf", "rearrange pdf pages", "remove pages from pdf"],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    navLabel: "JPG to PDF",
    title: "JPG to PDF – Convert JPG, PNG and WebP Images to PDF",
    description:
      "Turn photos and scans into one PDF. Supports JPG, PNG, and WebP. Choose A4, Letter, or fit-to-image pages. Free, in your browser, no upload.",
    h1: "Convert images to PDF",
    intro:
      "Combine JPG, PNG, and WebP images into a single PDF. Pick the page size and drag the images into order. Your photos never leave your device.",
    icon: "ImagePlus",
    accept: IMAGE_ACCEPT,
    multiple: true,
    input: "images",
    output: "pdf",
    actionLabel: "Create PDF",
    steps: [
      "Drop one or more images into the box, or click to choose them.",
      "Drag the images into order and pick a page size.",
      "Click Create PDF and download the file.",
    ],
    faq: [
      {
        q: "Which image formats work?",
        a: "JPG, PNG, and WebP. JPG and PNG are placed into the PDF as they are, with no quality loss. WebP is converted to PNG first, also without loss.",
      },
      {
        q: "What does \"Fit to image\" mean?",
        a: "Each page gets the exact size of its image, with no margins. Use it for scans and screenshots. Choose A4 or Letter when you want normal printable pages with the image centered.",
      },
      {
        q: "Does the PDF keep the full resolution of my photos?",
        a: "Yes. The image data is embedded without resampling. A 12-megapixel photo stays a 12-megapixel photo. That also means the PDF is about as large as the images together.",
      },
      {
        q: "My phone photo comes out sideways. Why?",
        a: "Some phones store the rotation as a hidden tag instead of rotating the pixels. This version does not read that tag yet. Open the photo in any editor, save it once, and add it again.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "merge-pdf", "organize-pdf"],
    keywords: ["jpg to pdf", "image to pdf", "png to pdf", "convert photos to pdf", "webp to pdf"],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    navLabel: "PDF to JPG",
    title: "PDF to JPG – Convert PDF Pages to JPG or PNG Images",
    description:
      "Export every page of a PDF as a JPG or PNG image at 72, 150, or 300 DPI. Runs in your browser. Free, private, no upload, no watermark.",
    h1: "Convert PDF to images",
    intro:
      "Save each page of a PDF as a JPG or PNG. Choose the resolution. Download one image or all of them as a ZIP.",
    icon: "Images",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "images",
    actionLabel: "Convert to images",
    steps: [
      "Drop a PDF into the box, or click to choose it.",
      "Pick JPG or PNG and the resolution you need.",
      "Click Convert to images. Download each image, or all of them as a ZIP.",
    ],
    faq: [
      {
        q: "Which resolution should I use?",
        a: "72 DPI is small and good for the web. 150 DPI is a good default for screens and slides. 300 DPI is for print. Higher DPI makes larger files and takes longer.",
      },
      {
        q: "JPG or PNG?",
        a: "JPG is smaller and best for photos and scanned pages. PNG is lossless and best for text, diagrams, and screenshots where sharp edges matter.",
      },
      {
        q: "Can I convert only one page?",
        a: "Yes. After the file loads, select the pages you want in the grid. Only the selected pages are converted.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "split-pdf", "rotate-pdf"],
    keywords: ["pdf to jpg", "pdf to png", "convert pdf to image", "pdf to jpg online free", "pdf page to image"],
  },
];

export function getTool(slug: string): ToolDef | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function isToolSlug(slug: string): slug is ToolSlug {
  return TOOLS.some((t) => t.slug === slug);
}
