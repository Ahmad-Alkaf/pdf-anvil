import { BookOpen, Combine, FileDown, ImagePlus, Images, LayoutGrid, RotateCw, Scissors } from "lucide-react";
import type { ToolIcon } from "@/lib/tools";

const ICONS = { Combine, Scissors, RotateCw, LayoutGrid, ImagePlus, Images, BookOpen, FileDown } as const;

export function ToolIconGlyph({ icon, className }: { icon: ToolIcon; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden="true" />;
}
