import type { LocaleBundle } from "../types";
import { meta } from "./meta";
import { messages } from "./messages";
import { pages } from "./pages";

export const bundle: LocaleBundle = {
  meta,
  messages,
  pages,
  suggestion: "Halaman ini juga tersedia dalam Bahasa Indonesia.",
};

export default bundle;
