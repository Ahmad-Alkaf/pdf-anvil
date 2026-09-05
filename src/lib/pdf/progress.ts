// Progress reporting for the pure PDF functions.
//
// The functions in this folder run without React and without a locale, so
// they report *what* they are doing as a structured step, not as a sentence.
// The UI turns a step into text in the current language
// (`progressLabel` in src/locales/format.ts).

export type ProgressStep =
  | { key: "reading" }
  | { key: "saving" }
  | { key: "reading-file"; index: number; total: number }
  | { key: "image"; index: number; total: number }
  | { key: "placing"; index: number; total: number }
  | { key: "adding"; name: string }
  | { key: "rendering"; page: number }
  | { key: "writing"; label: string };

export type Progress = (done: number, total: number, step?: ProgressStep) => void;
