// Registry of every tool page. Plain data: importable by server and client code.
// Routes, metadata, sitemap, header, footer, home grid, and related-tools
// links all read from here.
//
// Several pages can share one tool implementation (`kind`). Example: the
// image-to-PDF component serves /jpg-to-pdf, /png-to-pdf, /webp-to-pdf,
// /image-to-pdf, and /scan-to-pdf; /combine-pdf is a variant of merge and /extract-pdf-pages is
// a variant of split. Each page has its own title, H1, intro, and FAQ so search
// engines and AI answers can match the exact query. The client map from
// `kind` to component is src/components/tool/tool-registry.client.ts.

import { IMAGE_ACCEPT, PDF_ACCEPT } from "./files";

export type ToolKind =
  | "merge"
  | "split"
  | "rotate"
  | "organize"
  | "images-to-pdf"
  | "pdf-to-images"
  | "view"
  | "compress"
  | "unlock"
  | "protect";

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
  | "scan-to-pdf"
  | "pdf-to-jpg"
  | "pdf-to-png"
  | "pdf-to-image"
  | "pdf-viewer"
  | "compress-pdf"
  | "reduce-pdf-size"
  | "unlock-pdf"
  | "protect-pdf";

export type ToolIcon =
  | "Combine"
  | "Scissors"
  | "RotateCw"
  | "LayoutGrid"
  | "ImagePlus"
  | "Images"
  | "BookOpen"
  | "FileDown"
  | "LockOpen"
  | "Lock";

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
  /** "none" for tools that only show the file, such as the viewer. */
  output: "pdf" | "pdfs" | "images" | "none";
  actionLabel: string; // main button text
  steps: [string, string, string];
  faq: ToolFaq[];
  related: ToolSlug[];
  keywords: string[];
  /** Initial option values for the tool component. */
  defaults?: { format?: "jpg" | "png"; pageSize?: "fit" | "a4" | "letter" };
  /** Show a "Take a photo" button that opens the phone camera (image tools only). */
  capture?: boolean;
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

const PASSWORD_PRIVACY_FAQ: ToolFaq = {
  q: "Is my PDF or my password uploaded?",
  a: "No. The file and the password stay in your browser. The tool runs the open-source qpdf program as WebAssembly on your own device. No request carries your file or your password. You can turn off your internet connection after the page loads and the tool still works.",
};

const TWO_PASSWORDS_FAQ: ToolFaq = {
  q: "What is the difference between the user password and the owner password?",
  a: "A PDF can have two passwords. The user password opens the file. The owner password gives full access and removes the limits on printing, copying, and editing. A PDF viewer applies the permissions only to a person who opens the file with the user password.",
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
        a: "Not directly. Remove the password with the Unlock PDF tool first, then merge that copy. You need the password of the file.",
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

  // ---- images to PDF: one component, five pages ----
  {
    slug: "jpg-to-pdf",
    kind: "images-to-pdf",
    nav: false,
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
    nav: true,
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

  {
    slug: "scan-to-pdf",
    kind: "images-to-pdf",
    nav: false,
    name: "Scan to PDF",
    navLabel: "Scan to PDF",
    title: "Scan Documents to PDF Online – Use Your Phone Camera, Free",
    description:
      "Scan paper documents to PDF with your phone camera or existing photos. Put the pages in order and pick A4 or Letter. Free, private, nothing is uploaded.",
    h1: "Scan documents to PDF",
    intro:
      "Take a photo of each page with your phone camera, or add photos you already have. Put the pages in order and get one PDF. Nothing is uploaded.",
    icon: "ImagePlus",
    accept: IMAGE_ACCEPT,
    multiple: true,
    input: "images",
    output: "pdf",
    actionLabel: "Create PDF",
    steps: [
      "Tap Take a photo and photograph the first page. Or tap the box to add photos you already have.",
      "Repeat for each page. Drag the pages into order and pick a page size.",
      "Tap Create PDF. The file downloads at once.",
    ],
    faq: [
      {
        q: "How do I scan a document with my phone?",
        a: "Open this page on your phone. Tap Take a photo. The camera opens. Photograph the first page and confirm it. Tap Take a photo again for the next page. When all pages are in the list, tap Create PDF. The PDF is saved on your phone.",
      },
      {
        q: "Can I use this on a desktop computer?",
        a: "Yes. On a desktop, the Take a photo button opens the normal file picker. Choose photos or scans that are already on your computer, put them in order, and create the PDF.",
      },
      {
        q: "Are my photos uploaded to a server?",
        a: "No. The camera photo goes from your phone camera into the page in your browser. The PDF is built there too. Nothing is sent to us. You can turn off your internet connection after the page loads and the tool still works.",
      },
      {
        q: "How do I get straight, readable pages?",
        a: "Put the document on a flat surface with a plain background. Use good light and avoid shadows from your hand or phone. Hold the phone parallel to the page and fill the frame with the page. Tap the screen to focus before you take the photo. The tool does not crop or straighten the photo.",
      },
      {
        q: "Which page size should I choose?",
        a: "Choose A4 or Letter to get normal printable pages with the photo centered. A4 is the default. Choose \"Fit to image\" to make each page the exact size of the photo, with no margins.",
      },
      {
        q: "Can I scan many pages into one PDF?",
        a: "Yes. Take one photo per page. Each photo becomes one page in the order of the list. There is no page limit. Drag a page up or down to change the order.",
      },
      FREE_FAQ,
    ],
    related: ["image-to-pdf", "jpg-to-pdf", "compress-pdf", "organize-pdf"],
    keywords: ["scan to pdf", "scan documents to pdf", "how to scan documents to pdf", "phone scanner pdf", "camera to pdf"],
    defaults: { pageSize: "a4" },
    capture: true,
  },

  // ---- PDF to images: one component, three pages ----
  {
    slug: "pdf-to-jpg",
    kind: "pdf-to-images",
    nav: false,
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
    nav: true,
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
  // ---- compress: one component, two pages ----
  {
    slug: "compress-pdf",
    kind: "compress",
    nav: true,
    name: "Compress PDF",
    navLabel: "Compress",
    title: "Compress PDF Online – Reduce PDF File Size Free, No Upload",
    description:
      "Compress a PDF in your browser. Pick lossless, balanced, or smallest. Large photos are re-encoded, text stays sharp. Free, no upload, no account, no limit.",
    h1: "Compress PDF",
    intro:
      "Make a PDF smaller. Pick a level, click once, and download. Text and vector graphics stay sharp. Your file never leaves your device.",
    icon: "FileDown",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdf",
    actionLabel: "Compress PDF",
    steps: [
      "Drop a PDF into the box, or click to choose it.",
      "Pick a level. Lossless keeps every pixel. Balanced is the best choice for most files. Smallest gives the smallest file.",
      "Click Compress PDF. The tool shows the old size and the new size, and the file downloads at once.",
    ],
    faq: [
      {
        q: "How much smaller will my PDF get?",
        a: "It depends on what is in the file. A PDF full of large photos or scans can shrink by 50 to 90 percent with the Balanced level. A PDF that holds only text and vector graphics shrinks much less, often by 5 to 20 percent, because there is nothing large to re-encode. The tool shows the old size and the new size after each run.",
      },
      {
        q: "Which level should I choose?",
        a: "Balanced is the best choice for most files. It limits images to 1600 pixels on the long side, which is sharp on a screen and fine for normal printing. Choose Smallest for email attachments and upload limits. It limits images to 1100 pixels and uses stronger JPEG compression. Choose Lossless when the images must stay exactly as they are. It only cleans the file structure and removes unused data.",
      },
      {
        q: "Does compression lower the quality of the text?",
        a: "No. Text, fonts, lines, and vector graphics are not changed at any level. Only large photos and scans are re-encoded, and only in the Balanced and Smallest levels. If the new image is not smaller than the old one, the old one is kept.",
      },
      {
        q: "Why did my file not get smaller?",
        a: "Some files are already as small as they can be. The images in them are already small JPEGs, or the file has no images at all, only text and vector shapes. Files that another tool has already compressed also show little change. In that case the tool tells you that the file was already compact.",
      },
      {
        q: "Which images does the tool compress?",
        a: "JPEG images and uncompressed or Flate-compressed RGB and grayscale images that are at least 64 KB and at least 200 pixels wide or high. Images with transparency, indexed colors, CMYK, or unusual color spaces are kept as they are so the colors cannot go wrong.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["merge-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "compress pdf",
      "pdf compressor",
      "reduce pdf size",
      "pdf size reducer",
      "shrink pdf",
      "compress pdf online free",
    ],
  },
  {
    // Variant of "compress" for the query "reduce pdf size" / "pdf size reducer".
    slug: "reduce-pdf-size",
    kind: "compress",
    nav: false,
    name: "Reduce PDF Size",
    navLabel: "Reduce size",
    title: "Reduce PDF File Size Online – Free PDF Size Reducer, No Upload",
    description:
      "Reduce the size of a PDF for email and uploads. A free PDF size reducer that runs in your browser. Three levels, before and after sizes. No upload, no account.",
    h1: "Reduce PDF file size",
    intro:
      "Bring a PDF under an email or upload limit. Choose how small it must get, click once, and see the old and new size. The PDF stays on your device.",
    icon: "FileDown",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdf",
    actionLabel: "Reduce size",
    steps: [
      "Add your PDF. Drop it into the box, or click to choose it.",
      "Choose a level. Start with Balanced. If the file is still too large, run it again with Smallest.",
      "Click Reduce size. The tool shows how many percent it saved, and the smaller file downloads at once.",
    ],
    faq: [
      {
        q: "How do I reduce the size of a PDF?",
        a: "Add the PDF to this page and choose a level. Click Reduce size. The tool rewrites the file, removes unused data, and makes large photos smaller. The new PDF downloads at once, and the page shows the old and new size.",
      },
      {
        q: "How do I get a PDF under 1 MB or under 5 MB?",
        a: "Run the file with the Balanced level and read the new size. If it is still above the limit, run it again with Smallest. If the file is still too large, it contains many pages of images. Split it into parts with the Split PDF tool and send each part.",
      },
      {
        q: "Does the PDF size reducer change the text?",
        a: "No. Text and vector graphics are copied as they are. Only large photos and scans are made smaller. Text stays sharp on screen and in print.",
      },
      {
        q: "Why is my PDF so large?",
        a: "In most cases, the file holds photos or scanned pages at a very high resolution. A scanned page at 600 DPI can take several megabytes. The Balanced level limits images to 1600 pixels on the long side, which is enough for reading and normal printing.",
      },
      {
        q: "Is this PDF size reducer free?",
        a: "Yes. There is no cost, no account, no watermark, and no limit on the number of files. The PDF is processed in your browser and is never uploaded.",
      },
      PRIVACY_FAQ,
      LIMIT_FAQ,
    ],
    related: ["compress-pdf", "split-pdf", "pdf-to-jpg"],
    keywords: [
      "reduce pdf size",
      "pdf size reducer",
      "reduce pdf file size",
      "make pdf smaller",
      "pdf reducer",
      "reduce pdf size online free",
    ],
  },
  // ---- passwords: qpdf compiled to WebAssembly ----
  {
    slug: "unlock-pdf",
    kind: "unlock",
    nav: true,
    name: "Unlock PDF",
    navLabel: "Unlock",
    title: "Unlock PDF – Remove Password from PDF Online, Free, No Upload",
    description:
      "Remove the password from a PDF when you know it. Type the password, click once, and get a copy that opens with no password. Free, in your browser, no upload.",
    h1: "Unlock a PDF",
    intro:
      "Remove the password from a PDF. Type the password you know, click once, and download a copy that opens with no password. The file stays on your device.",
    icon: "LockOpen",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdf",
    actionLabel: "Unlock PDF",
    steps: [
      "Drop a password-protected PDF into the box, or click to choose it.",
      "Type the password of the file. The password that opens the file or the owner password both work.",
      "Click Unlock PDF. A copy with no password and no limits downloads at once.",
    ],
    faq: [
      {
        q: "I forgot the password. Can you remove it?",
        a: "No. The tool needs the password. It does not guess, crack, or bypass passwords. A PDF with AES encryption cannot be opened without the correct password. If you do not know it, ask the person who made the file.",
      },
      PASSWORD_PRIVACY_FAQ,
      TWO_PASSWORDS_FAQ,
      {
        q: "Which password do I type here?",
        a: "Either one. If you know only the password that opens the file, type that one. If you know the owner password, type that one. The result has no password and no limits.",
      },
      {
        q: "Why does my PDF not open here?",
        a: "Three causes are common. The password is not correct: check for capital letters and spaces, and try again. The file is damaged: open it in a PDF viewer to check. The file uses a certificate or a digital rights system instead of a password: the tool cannot open those files.",
      },
      {
        q: "Can I remove only the limits and keep the open password?",
        a: "No. The result has no password at all. To set a new password, open the result in the Protect PDF tool.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["protect-pdf", "merge-pdf", "compress-pdf"],
    keywords: [
      "unlock pdf",
      "remove password from pdf",
      "pdf password remover",
      "decrypt pdf",
      "remove pdf password",
      "unlock pdf online free",
    ],
  },
  {
    slug: "protect-pdf",
    kind: "protect",
    nav: true,
    name: "Protect PDF",
    navLabel: "Protect",
    title: "Protect PDF – Add a Password to a PDF Online, Free, No Upload",
    description:
      "Add a password to a PDF with AES-256 encryption in your browser. Set who can print, copy, or edit the file. Free, no upload, no account, no watermark.",
    h1: "Protect a PDF with a password",
    intro:
      "Add a password to a PDF. The file is encrypted with AES-256 in your browser, and only a person with the password can open it. Nothing is uploaded.",
    icon: "Lock",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "pdf",
    actionLabel: "Protect PDF",
    steps: [
      "Drop a PDF into the box, or click to choose it.",
      "Type the password that opens the file. Set an owner password and the permissions if you need them.",
      "Click Protect PDF. The encrypted file downloads at once.",
    ],
    faq: [
      {
        q: "Which encryption does the tool use?",
        a: "AES-256, the strongest encryption in the PDF standard (PDF 2.0). Every current PDF viewer opens it: Adobe Reader, Chrome, Edge, Firefox, Safari, and Preview on a Mac.",
      },
      TWO_PASSWORDS_FAQ,
      {
        q: "What happens if I leave the owner password empty?",
        a: "The tool uses the password that opens the file for both. Then the permissions do not limit a person who knows that password. Set a different owner password when the permissions must apply.",
      },
      {
        q: "What do the permissions do?",
        a: "They tell a PDF viewer what a person with the user password may do: print the file, copy text and images, and edit the file. A person with the owner password can do everything. Most viewers obey the permissions, but they are a signal, not a lock. The password is the real protection.",
      },
      {
        q: "Can I remove the password later?",
        a: "Yes. Open the file in the Unlock PDF tool and type the password. You get a copy with no password. Keep the password in a safe place. Without it, the file cannot be opened.",
      },
      PASSWORD_PRIVACY_FAQ,
      {
        q: "How long should the password be?",
        a: "Use at least 12 characters with letters, digits, and symbols. AES-256 is strong, but a program can guess a short password. Do not send the password in the same email as the file.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["unlock-pdf", "compress-pdf", "merge-pdf"],
    keywords: [
      "protect pdf",
      "password protect pdf",
      "encrypt pdf",
      "lock pdf",
      "add password to pdf",
      "protect pdf online free",
    ],
  },
  // ---- viewer: shows the file, makes no output ----
  {
    slug: "pdf-viewer",
    kind: "view",
    nav: true,
    name: "PDF Viewer",
    navLabel: "View",
    title: "Open PDF File Online – Free PDF Viewer, No Upload",
    description:
      "Open and read a PDF file in your browser. Scroll the pages, zoom in, and print. Free PDF viewer with no upload, no account, and no Adobe software to install.",
    h1: "Open and read a PDF",
    intro:
      "Open a PDF file and read it in your browser. Scroll through the pages, zoom in, and print. The file stays on your device.",
    icon: "BookOpen",
    accept: PDF_ACCEPT,
    multiple: false,
    input: "pdf",
    output: "none",
    actionLabel: "Print",
    steps: [
      "Drop a PDF into the box, or click to choose it.",
      "Scroll through the pages. Use the toolbar to go to a page, zoom in, zoom out, or fit the page to the width of the window.",
      "Click Print to open the file in a new tab and print it from your browser. Click the X next to the file name to open a different file.",
    ],
    faq: [
      {
        q: "How do I open a PDF file without Adobe?",
        a: "Drop the file on this page, or click the box and choose it. You do not need Adobe Acrobat or Adobe Reader. The page draws the PDF with the same open-source engine that Firefox uses. It works in Chrome, Edge, Firefox, and Safari. There is nothing to install.",
      },
      {
        q: "What is a PDF reader?",
        a: "A PDF reader is a program that opens PDF files and shows the pages on your screen. Adobe Reader is one example. Most browsers also have one built in. This page is a PDF reader that runs as a web page. It draws each page in your browser and does not send the file anywhere.",
      },
      {
        q: "Is my PDF uploaded when I open it?",
        a: "No. The file is read by JavaScript on your own device and drawn on your screen there. Nothing is sent to a server. You can check this in the network panel of your browser: no request carries your file.",
      },
      {
        q: "Does the viewer work offline?",
        a: "Mostly. The file is opened in your browser, and no data goes to a server. The viewer code and some fonts load from our site when they are needed for the first time. Open the page and one file while you are online. After that, you can open more files without a connection until you close the tab.",
      },
      {
        q: "Can I print the PDF?",
        a: "Yes. Click Print in the toolbar. The file opens in a new tab in the PDF viewer of your browser. Press Ctrl+P (Cmd+P on a Mac) there to print it. The browser prints the original file, so the text stays sharp on paper.",
      },
      {
        q: "Can I zoom in?",
        a: "Yes. Use the plus and minus buttons in the toolbar, or click Fit width to make the page as wide as the window. Each page is drawn again at the new size, so the text stays sharp at every zoom level.",
      },
      {
        q: "Can I edit the PDF here?",
        a: "No. This tool only shows the file. To change the file, use the other tools on this site: rotate pages, reorder or delete pages, split, merge, or convert pages to images.",
      },
      LIMIT_FAQ,
      FREE_FAQ,
    ],
    related: ["rotate-pdf", "organize-pdf", "pdf-to-jpg"],
    keywords: [
      "open pdf file",
      "pdf viewer",
      "pdf reader",
      "pdf reader online",
      "view pdf online",
      "read pdf without adobe",
      "open pdf online free",
    ],
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
