import type { LocaleBundle } from "../types";
import { meta } from "./meta";
import { messages } from "./messages";
import { pages } from "./pages";

export const bundle: LocaleBundle = {
  meta,
  messages,
  pages,
  suggestion: "Questa pagina è disponibile anche in italiano",
};

export default bundle;
