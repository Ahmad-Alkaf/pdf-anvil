// Registry of every tool page. Plain data: importable by server and client code.
// Routes, metadata, sitemap, header, footer, home grid, and related-tools
// links all read from here.
//
// Several pages can share one tool implementation (`kind`). Example: the
// image-to-PDF component serves /jpg-to-pdf, /png-to-pdf, /webp-to-pdf, and
// /image-to-pdf; /combine-pdf is a variant of merge and /extract-pdf-pages is
// a variant of split. Each page has its own title, H1, intro, and FAQ so search
// engines and AI answers can match the exact query. The client map from
// `kind` to component is src/components/tool/tool-registry.client.ts.

import { IMAGE_ACCEPT, PDF_ACCEPT } from "./files";

export type ToolKind = "merge" | "split" | "rotate" | "organize" | "images-to-pdf" | "pdf-to-images";

export type ToolSlug =
  | "merge-pdf"
  | "combine-pdf"
  | "split-pdf"
  | "extract-pdf-pages"
  | "rotate-pdf"
  | "organize-pdf"
  | "jpg-to-pdf"
  | "png-to-pdf"
  | "webp-to-pdf"
  | "image-to-pdf"
  | "pdf-to-jpg"
  | "pdf-to-png"
  | "pdf-to-image";

export type ToolIcon = "Combine" | "Scissors" | "RotateCw" | "LayoutGrid" | "ImagePlus" | "Images";

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolDef {
  slug: ToolSlug;
  kind: ToolKind;
  /** Shown in the header and as a home page card. Variants of a kind set this to false. */
  nav: boolean;
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
  /** Initial option values for the tool component. */
  defaults?: { format?: "jpg" | "png" };
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

const IMAGE_STEPS: [string, string, string] = [
  "Drop one or more images into the box, or click to choose them.",
  "Drag the images into order and pick a page size.",
  "Click Create PDF. The file downloads at once.",
];

const IMAGE_FIT_FAQ: ToolFaq = {
  q: "What does \"Fit to image\" mean?",
  a: "Each page gets the exact size of its image, with no margins. Use it for scans and screenshots. Choose A4 or Letter when you want normal printable pages with the image centered.",
};

const IMAGE_MANY_FAQ: ToolFaq = {
  q: "Can I put many images into one PDF?",
  a: "Yes. Add as many images as you want. Each image becomes one page, in the order of the list. Drag an image up or down to change the order.",
};

const PDF_TO_IMAGE_STEPS: [string, string, string] = [
  "Drop a PDF into the box, or click to choose it.",
  "Pick the image format and the resolution you need.",
  "Click Convert to images. A ZIP with all images downloads at once. You can also download each image on its own.",
];

const DPI_FAQ: ToolFaq = {
  q: "Which resolution should I use?",
  a: "72 DPI is small and good for the web. 150 DPI is a good default for screens and slides. 300 DPI is for print. Higher DPI makes larger files and takes longer.",
};

const SELECT_PAGES_FAQ: ToolFaq = {
  q: "Can I convert only one page?",
  a: "Yes. After the file loads, click the pages you want in the grid. Only the selected pages are converted.",
};

export const TOOLS: readonly ToolDef[] = [
  {
    slug: "merge-pdf",
    kind: "merge",
    nav: true,
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
      "Click Merge PDFs. The combined file downloads at once.",
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
    related: ["split-pdf", "organize-pdf", "image-to-pdf"],
    keywords: [
      "merge pdf",
      "pdf merger",
      "pdf merge",
      "combine pdf",
      "pdf combiner",
      "join pdf files",
      "pdf merger free",
      "merge pdf online",
    ],
  },
  {
    // Variant of "merge" for the query "combine pdf" / "pdf combiner".
    slug: "combine-pdf",
    kind: "merge",
    nav: false,
    name: "Combine PDF",
    navLabel: "Combine",
    title: "Combine PDF Files Online – Free PDF Combiner, No Upload",
    description:
      "Combine PDF files into one document with a free PDF combiner that runs in your browser. Set the file order, click once, download. No upload, no account.",
    h1: "Combine PDF files",
    intro:
      "Put two or more PDF files together into one document. Add the files, set the order, and download the result. Your files stay on your device.",
    icon: "Combine",
    accept: PDF_ACCEPT,
    multiple: true,
    input: "pdf",
    output: "pdf",
    actionLabel: "Combine PDFs",
    steps: [
      "Add the PDF files you want to combine. Drop them into the box, or click to choose them.",
      "Put the files in the correct order. Drag them, or use the arrow buttons.",
      "Click Combine PDFs. Your browser builds one PDF and downloads it.",
    ],
    faq: [
      {
        q: "How do I combine PDF files into one?",
        a: "Open this page and add your PDF files. Put them in order. Click Combine PDFs. The tool copies all pages into one new PDF and downloads it. There is no software to install.",
      },
      {
        q: "Is this PDF combiner free?",
        a: "Yes. There is no cost, no account, no watermark, and no limit on the number of files. Use it as often as you want.",
      },
      {
        q: "Can I combine PDF files on my phone?",
        a: "Yes. Open this page in the browser on your phone or tablet. Tap the box to choose files. The combined PDF is saved to your downloads.",
      },
      {
        q: "What is the difference between combine and merge?",
        a: "There is no difference. Combine, merge, and join all mean the same thing: put several PDF files into one. This page and the Merge PDF page use the same tool.",
      },
      {
        q: "Do the pages keep their size and quality?",
        a: "Yes. Each page is copied as it is. Nothing is re-rendered or compressed. Pages of different sizes can sit next to each other in one file.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["merge-pdf", "organize-pdf", "extract-pdf-pages"],
    keywords: [
      "combine pdf",
      "pdf combiner",
      "pdf combine",
      "combine pdf files",
      "combine pdf online free",
      "put pdf files together",
    ],
  },
  {
    slug: "split-pdf",
    kind: "split",
    nav: true,
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
      "Click Split PDF. A ZIP with all parts downloads at once. You can also download each part on its own.",
    ],
    faq: [
      {
        q: "How do I split a PDF into separate files?",
        a: "Add the PDF and choose \"Every page\". Click Split PDF. Each page becomes its own PDF file. You get all files in one ZIP, or you download each one on its own.",
      },
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
    keywords: [
      "split pdf",
      "pdf splitter",
      "pdf split",
      "how to split pdf files",
      "split pdf into separate files",
      "extract pdf pages",
      "separate pdf pages",
      "split pdf online free",
    ],
  },
  {
    // Variant of "split" for the query "extract pages from pdf" / "pdf splitter".
    slug: "extract-pdf-pages",
    kind: "split",
    nav: false,
    name: "Extract PDF Pages",
    navLabel: "Extract pages",
    title: "Extract Pages from PDF Online – Free PDF Splitter, No Upload",
    description:
      "Extract the pages you need from a PDF and save them as a new file. Type page numbers or ranges. Free PDF splitter in your browser. No upload, no account.",
    h1: "Extract pages from a PDF",
    intro:
      "Pull the pages you need out of a PDF and save them as a new file. Type the page numbers, click once, and download. The PDF does not leave your device.",
    icon: "Scissors",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdfs",
    actionLabel: "Extract pages",
    steps: [
      "Add your PDF. Drop it into the box, or click to choose it.",
      "Choose \"Page ranges\" and type the pages you want, for example 2, 5-7, 10-. Or choose \"Every page\" to get each page as its own file.",
      "Click Extract pages. Each range becomes one PDF. You get a ZIP, or you download each file on its own.",
    ],
    faq: [
      {
        q: "How do I extract pages from a PDF?",
        a: "Add the PDF and choose \"Page ranges\". Type the page numbers you want. Click Extract pages. Only those pages go into the new file. The original PDF is not changed.",
      },
      {
        q: "Can I extract one page from a PDF?",
        a: "Yes. Type one page number, for example 4. The tool saves that page as a new one-page PDF.",
      },
      {
        q: "Can I save each page as a separate PDF?",
        a: "Yes. Choose \"Every page\". Each page becomes its own PDF file. All files come in one ZIP, and you can also download them one by one.",
      },
      {
        q: "Can I extract pages that are not next to each other?",
        a: "Yes. Separate the items with commas, for example 1, 4, 9-11. Each item becomes one file. If you want all of them in one file, extract them first and then put the files together with the Combine PDF tool.",
      },
      {
        q: "Is this PDF splitter free?",
        a: "Yes. There is no cost, no account, no watermark, and no page limit. The PDF is processed in your browser and is never uploaded.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["split-pdf", "organize-pdf", "combine-pdf"],
    keywords: [
      "extract pdf pages",
      "extract pages from pdf",
      "pdf splitter",
      "pdf page extractor",
      "save pdf pages as new file",
      "extract pdf pages online free",
    ],
  },
  {
    slug: "rotate-pdf",
    kind: "rotate",
    nav: true,
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
      "Click Save rotated PDF. The file downloads at once.",
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
    kind: "organize",
    nav: true,
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
      "Click Save organized PDF. The file downloads at once.",
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

  // ---- images to PDF: one component, four pages ----
  {
    slug: "jpg-to-pdf",
    kind: "images-to-pdf",
    nav: true,
    name: "JPG to PDF",
    navLabel: "JPG to PDF",
    title: "JPG to PDF – Convert JPG Images to PDF Online, Free",
    description:
      "Turn JPG photos and scans into one PDF in your browser. Choose A4, Letter, or fit-to-image pages. Free, no upload, no account, no watermark.",
    h1: "Convert JPG to PDF",
    intro:
      "Turn one JPG or a whole set of photos into a single PDF. Pick the page size and drag the images into order. Your photos never leave your device.",
    icon: "ImagePlus",
    accept: IMAGE_ACCEPT,
    multiple: true,
    input: "images",
    output: "pdf",
    actionLabel: "Create PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Does the PDF keep the full quality of my JPG?",
        a: "Yes. The JPG data is placed into the PDF exactly as it is, with no re-compression. A 12-megapixel photo stays a 12-megapixel photo. The PDF is about as large as the images together.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "My phone photo comes out sideways. Why?",
        a: "Some phones store the rotation as a hidden tag instead of rotating the pixels. This version does not read that tag yet. Open the photo in any editor, save it once, and add it again.",
      },
      {
        q: "Can I mix JPG with PNG or WebP files?",
        a: "Yes. The same tool accepts JPG, PNG, and WebP together. Each image becomes one page.",
      },
      PRIVACY_FAQ,
      {
        q: "Is it free to convert JPG to PDF here?",
        a: "Yes. It is free, with no limit on the number of images and no watermark. The PDF is built in your browser, so your photos are not uploaded. You do not need an account.",
      },
    ],
    related: ["png-to-pdf", "pdf-to-jpg", "merge-pdf"],
    keywords: [
      "jpg to pdf",
      "jpg to pdf converter",
      "convert jpg to pdf",
      "convert jpg to pdf free",
      "jpeg to pdf",
      "photo to pdf",
      "jpg to pdf online free",
    ],
  },
  {
    slug: "png-to-pdf",
    kind: "images-to-pdf",
    nav: false,
    name: "PNG to PDF",
    navLabel: "PNG to PDF",
    title: "PNG to PDF – Convert PNG Images to PDF Online, Free",
    description:
      "Convert PNG screenshots, diagrams, and graphics into one PDF without losing quality. Transparency is kept. Free, in your browser, no upload, no watermark.",
    h1: "Convert PNG to PDF",
    intro:
      "Turn PNG images into a PDF with no quality loss. Screenshots, charts, and logos with transparency all work. Everything runs in your browser.",
    icon: "ImagePlus",
    accept: IMAGE_ACCEPT,
    multiple: true,
    input: "images",
    output: "pdf",
    actionLabel: "Create PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Is PNG to PDF lossless?",
        a: "Yes. PNG is a lossless format and the PDF embeds the PNG data without changing it. Text in screenshots stays sharp, and colors do not shift.",
      },
      {
        q: "What happens to transparency?",
        a: "The PDF keeps the alpha channel. Transparent areas show the page background, which is white in most viewers. Nothing is flattened or filled in.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Which page size is best for screenshots?",
        a: "Use \"Fit to image\" so each page has the exact pixel size of the screenshot and no margins. Use A4 or Letter if you want to print the pages.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf"],
    keywords: ["png to pdf", "convert png to pdf", "png to pdf online free", "screenshot to pdf", "image to pdf lossless"],
  },
  {
    slug: "webp-to-pdf",
    kind: "images-to-pdf",
    nav: false,
    name: "WebP to PDF",
    navLabel: "WebP to PDF",
    title: "WebP to PDF – Convert WebP Images to PDF Online, Free",
    description:
      "Convert WebP images to a PDF in your browser. No software, no upload, no account. Combine many WebP files into one document for free.",
    h1: "Convert WebP to PDF",
    intro:
      "WebP images from the web do not open in many PDF tools. This one converts them in your browser and combines them into a single PDF.",
    icon: "ImagePlus",
    accept: IMAGE_ACCEPT,
    multiple: true,
    input: "images",
    output: "pdf",
    actionLabel: "Create PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "How is WebP converted?",
        a: "Your browser decodes the WebP image and the tool stores the pixels as PNG inside the PDF. That step is lossless, so the PDF looks exactly like the original WebP.",
      },
      {
        q: "Why do other tools reject my WebP files?",
        a: "PDF has no native WebP support, and many converters only handle JPG and PNG. PDF Anvil uses the browser's own decoder, which supports WebP in every modern browser.",
      },
      {
        q: "Does animated WebP work?",
        a: "Only the first frame is used. A PDF page is a still image.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["png-to-pdf", "jpg-to-pdf", "image-to-pdf"],
    keywords: ["webp to pdf", "convert webp to pdf", "webp to pdf online free", "webp converter pdf"],
  },
  {
    slug: "image-to-pdf",
    kind: "images-to-pdf",
    nav: false,
    name: "Image to PDF",
    navLabel: "Image to PDF",
    title: "Image to PDF – Convert JPG, PNG, WebP Images to PDF Free",
    description:
      "Convert any images to one PDF: JPG, PNG, and WebP, mixed together. Choose page size and order. Free, private, runs in your browser, no upload.",
    h1: "Convert images to PDF",
    intro:
      "Combine JPG, PNG, and WebP images into a single PDF. Mix formats freely, pick a page size, and drag the images into order. Nothing leaves your device.",
    icon: "ImagePlus",
    accept: IMAGE_ACCEPT,
    multiple: true,
    input: "images",
    output: "pdf",
    actionLabel: "Create PDF",
    steps: IMAGE_STEPS,
    faq: [
      {
        q: "Which image formats work?",
        a: "JPG, PNG, and WebP. JPG and PNG are embedded directly. WebP is decoded and converted to PNG before it is added. You can mix all three in one PDF.",
      },
      {
        q: "Can I make a PDF from photos on my phone?",
        a: "Yes. Open this page on your phone, tap the box, and choose photos from your gallery. The PDF is built on the phone and saved to your downloads.",
      },
      IMAGE_MANY_FAQ,
      IMAGE_FIT_FAQ,
      {
        q: "Does the PDF keep the full resolution of my images?",
        a: "Yes. The image data is embedded without resampling. That also means the PDF is about as large as the images together.",
      },
      PRIVACY_FAQ,
      FREE_FAQ,
    ],
    related: ["jpg-to-pdf", "png-to-pdf", "pdf-to-image"],
    keywords: [
      "image to pdf",
      "convert image to pdf",
      "convert to pdf",
      "pdf creator",
      "pdf maker",
      "picture to pdf",
      "photos to pdf",
      "images to pdf online free",
    ],
  },

  // ---- PDF to images: one component, three pages ----
  {
    slug: "pdf-to-jpg",
    kind: "pdf-to-images",
    nav: true,
    name: "PDF to JPG",
    navLabel: "PDF to JPG",
    title: "PDF to JPG – Convert PDF Pages to JPG Images Online",
    description:
      "Export every page of a PDF as a JPG image at 72, 150, or 300 DPI. Runs in your browser. Free, private, no upload, no watermark, no limits.",
    h1: "Convert PDF to JPG",
    intro:
      "Save each page of a PDF as a JPG image. Choose the resolution, pick the pages, and download one image or all of them as a ZIP.",
    icon: "Images",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "images",
    actionLabel: "Convert to images",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "How do I save a PDF as a JPG?",
        a: "Add the PDF to this page. Keep JPG as the format and choose a resolution. Click Convert to images. Each page is saved as a JPG file. Download them one by one or all together in a ZIP.",
      },
      DPI_FAQ,
      {
        q: "When should I pick JPG over PNG?",
        a: "JPG is smaller and best for photos and scanned pages. Switch to PNG for text, diagrams, and screenshots where sharp edges matter.",
      },
      SELECT_PAGES_FAQ,
      {
        q: "Does the JPG contain the whole page?",
        a: "Yes. The full page is rendered, including images, vector graphics, and text, exactly as a PDF viewer shows it. Form fields and annotations are included as they appear.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-png", "jpg-to-pdf", "split-pdf"],
    defaults: { format: "jpg" },
    keywords: [
      "pdf to jpg",
      "convert pdf to jpg",
      "pdf to jpg converter",
      "save pdf as jpg",
      "how to save pdf as jpg",
      "pdf to jpeg",
      "pdf to jpg online free",
      "pdf page to jpg",
    ],
  },
  {
    slug: "pdf-to-png",
    kind: "pdf-to-images",
    nav: false,
    name: "PDF to PNG",
    navLabel: "PDF to PNG",
    title: "PDF to PNG – Convert PDF Pages to PNG Images Online",
    description:
      "Export PDF pages as lossless PNG images at 72, 150, or 300 DPI. Sharp text and diagrams. Runs in your browser. Free, private, no upload, no watermark.",
    h1: "Convert PDF to PNG",
    intro:
      "Save PDF pages as lossless PNG images. Text, diagrams, and screenshots stay sharp. Choose the resolution and the pages, then download them.",
    icon: "Images",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "images",
    actionLabel: "Convert to images",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "Why choose PNG instead of JPG?",
        a: "PNG is lossless. Text edges, thin lines, and flat colors stay exact, with no compression artifacts. It is the right choice for slides, diagrams, forms, and anything you plan to edit further.",
      },
      DPI_FAQ,
      {
        q: "Is the PNG background transparent?",
        a: "No. PDF pages have a white background by definition, and the PNG keeps it. Use an image editor if you need to remove it.",
      },
      SELECT_PAGES_FAQ,
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "png-to-pdf", "split-pdf"],
    defaults: { format: "png" },
    keywords: ["pdf to png", "convert pdf to png", "pdf to png online free", "pdf page to png", "pdf to png high resolution"],
  },
  {
    slug: "pdf-to-image",
    kind: "pdf-to-images",
    nav: false,
    name: "PDF to Image",
    navLabel: "PDF to Image",
    title: "PDF to Image – Convert PDF Pages to JPG or PNG Online",
    description:
      "Convert PDF pages to images. Pick JPG or PNG and 72, 150, or 300 DPI. Select the pages you need. Free, in your browser, no upload, no limits.",
    h1: "Convert PDF to images",
    intro:
      "Turn PDF pages into image files. Pick JPG for photos and scans or PNG for text and diagrams, choose the resolution, and download the pages you need.",
    icon: "Images",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "images",
    actionLabel: "Convert to images",
    steps: PDF_TO_IMAGE_STEPS,
    faq: [
      {
        q: "JPG or PNG?",
        a: "JPG is smaller and best for photos and scanned pages. PNG is lossless and best for text, diagrams, and screenshots where sharp edges matter.",
      },
      DPI_FAQ,
      SELECT_PAGES_FAQ,
      {
        q: "Can I get one image of the whole document?",
        a: "Each page becomes its own image. If you need one tall image, convert the pages and stitch them in an image editor.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["pdf-to-jpg", "pdf-to-png", "image-to-pdf"],
    defaults: { format: "jpg" },
    keywords: ["pdf to image", "convert pdf to image", "pdf to picture", "pdf page to image", "pdf to image online free"],
  },
];

export const NAV_TOOLS: readonly ToolDef[] = TOOLS.filter((t) => t.nav);
export const VARIANT_TOOLS: readonly ToolDef[] = TOOLS.filter((t) => !t.nav);

export function getTool(slug: string): ToolDef | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function isToolSlug(slug: string): slug is ToolSlug {
  return TOOLS.some((t) => t.slug === slug);
}
