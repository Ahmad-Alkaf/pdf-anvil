import type { LocaleBundle } from "../types";
import { meta } from "./meta";
import { messages } from "./messages";
import { pages } from "./pages";

export const bundle: LocaleBundle = {
  meta,
  messages,
  pages,
  suggestion: "Cette page existe aussi en français",
};

export default bundle;
