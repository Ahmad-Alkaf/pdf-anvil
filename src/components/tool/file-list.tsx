"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDown, ArrowUp, GripVertical, X } from "lucide-react";
import { formatBytes } from "@/lib/files";
import { useMessages } from "@/locales/context";
import { format } from "@/locales/format";
import { cn } from "@/lib/utils";

export interface FileItem {
  id: string;
  file: File;
  meta?: string; // "12 pages", "1920×1080"
  previewUrl?: string | null;
  error?: string | null;
}

interface Props {
  items: FileItem[];
  onReorder: (items: FileItem[]) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function FileList({ items, onReorder, onRemove, disabled }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = items.findIndex((i) => i.id === active.id);
    const to = items.findIndex((i) => i.id === over.id);
    onReorder(arrayMove(items, from, to));
  }

  function move(index: number, delta: number) {
    const to = index + delta;
    if (to < 0 || to >= items.length) return;
    onReorder(arrayMove(items, index, to));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <ol className="space-y-2">
          {items.map((item, index) => (
            <Row
              key={item.id}
              item={item}
              index={index}
              count={items.length}
              disabled={disabled}
              onRemove={() => onRemove(item.id)}
              onUp={() => move(index, -1)}
              onDown={() => move(index, 1)}
            />
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  );
}

function Row({
  item,
  index,
  count,
  disabled,
  onRemove,
  onUp,
  onDown,
}: {
  item: FileItem;
  index: number;
  count: number;
  disabled?: boolean;
  onRemove: () => void;
  onUp: () => void;
  onDown: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled,
  });
  const m = useMessages().toolShell.fileList;

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex items-center gap-2 rounded-xl border bg-card p-2 pe-1 sm:gap-3",
        isDragging && "relative z-10 shadow-lg ring-2 ring-primary/40",
        item.error && "border-destructive/50",
      )}
    >
      <button
        type="button"
        aria-label={format(m.drag, { name: item.file.name })}
        className="cursor-grab touch-none rounded p-1 text-muted-foreground hover:bg-muted active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-5" />
      </button>

      <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white text-xs font-bold text-accent-foreground">
        {item.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <span className="rounded bg-accent px-1.5 py-0.5">{index + 1}</span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{item.file.name}</span>
        <span className="block text-xs text-muted-foreground">
          {formatBytes(item.file.size)}
          {item.meta ? ` · ${item.meta}` : ""}
          {item.error ? <span className="text-destructive"> · {item.error}</span> : null}
        </span>
      </span>

      <span className="hidden items-center sm:flex">
        <button
          type="button"
          onClick={onUp}
          disabled={disabled || index === 0}
          aria-label={m.moveUp}
          className="rounded p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          <ArrowUp className="size-4" />
        </button>
        <button
          type="button"
          onClick={onDown}
          disabled={disabled || index === count - 1}
          aria-label={m.moveDown}
          className="rounded p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          <ArrowDown className="size-4" />
        </button>
      </span>
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label={format(m.remove, { name: item.file.name })}
        className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <X className="size-4" />
      </button>
    </li>
  );
}
