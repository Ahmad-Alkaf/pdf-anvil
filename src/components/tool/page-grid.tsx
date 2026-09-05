"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RotateCcw, RotateCw, Trash2 } from "lucide-react";
import { PageThumb } from "./page-thumb";
import type { PDFDocumentProxy } from "@/lib/pdf/pdfjs";
import { useMessages } from "@/locales/context";
import { format } from "@/locales/format";
import { cn } from "@/lib/utils";

interface Props {
  doc: PDFDocumentProxy;
  /** 0-based source page indices in display order. */
  order: number[];
  sortable?: boolean;
  onReorder?: (order: number[]) => void;
  rotations?: Record<number, number>; // delta per source index
  onRotate?: (index: number, delta: 90 | -90) => void;
  onDelete?: (index: number) => void;
  selectable?: boolean;
  selected?: Set<number>;
  onToggle?: (index: number) => void;
  disabled?: boolean;
}

export function PageGrid({
  doc,
  order,
  sortable,
  onReorder,
  rotations,
  onRotate,
  onDelete,
  selectable,
  selected,
  onToggle,
  disabled,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id || !onReorder) return;
    const from = order.indexOf(Number(active.id));
    const to = order.indexOf(Number(over.id));
    onReorder(arrayMove(order, from, to));
  }

  const grid = (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {order.map((index, position) => (
        <Tile
          key={index}
          doc={doc}
          index={index}
          position={position}
          sortable={!!sortable && !disabled}
          rotation={rotations?.[index] ?? 0}
          onRotate={onRotate}
          onDelete={onDelete && order.length > 1 ? onDelete : undefined}
          selectable={selectable}
          selected={selected?.has(index) ?? false}
          onToggle={onToggle}
          disabled={disabled}
        />
      ))}
    </ol>
  );

  if (!sortable) return grid;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        {grid}
      </SortableContext>
    </DndContext>
  );
}

function Tile({
  doc,
  index,
  position,
  sortable,
  rotation,
  onRotate,
  onDelete,
  selectable,
  selected,
  onToggle,
  disabled,
}: {
  doc: PDFDocumentProxy;
  index: number;
  position: number;
  sortable: boolean;
  rotation: number;
  onRotate?: (index: number, delta: 90 | -90) => void;
  onDelete?: (index: number) => void;
  selectable?: boolean;
  selected: boolean;
  onToggle?: (index: number) => void;
  disabled?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: index,
    disabled: !sortable,
  });
  const m = useMessages().toolShell.pageGrid;

  const hasActions = Boolean(onRotate || onDelete);

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group relative rounded-xl border bg-card p-1.5 transition-shadow",
        sortable && "cursor-grab touch-none active:cursor-grabbing",
        isDragging && "z-10 shadow-xl ring-2 ring-primary/50",
        selectable && selected && "ring-2 ring-primary",
        selectable && "cursor-pointer",
      )}
      {...(sortable ? { ...attributes, ...listeners } : {})}
      aria-label={format(m.tile, { page: index + 1, position: position + 1 })}
      onClick={selectable && onToggle ? () => onToggle(index) : undefined}
    >
      <PageThumb doc={doc} pageNumber={index + 1} rotation={rotation} className="rounded-md border" />

      <span className="absolute top-2.5 start-2.5 rounded-md bg-background/90 px-1.5 py-0.5 text-xs font-semibold shadow-sm">
        {position + 1}
      </span>

      {selectable && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-2.5 end-2.5 flex size-5 items-center justify-center rounded-full border-2 bg-background text-[10px] font-bold",
            selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40",
          )}
        >
          {selected ? "✓" : ""}
        </span>
      )}

      {hasActions && !disabled && (
        <span className="absolute inset-x-1.5 bottom-1.5 flex justify-center gap-1 rounded-md bg-background/90 p-1 opacity-0 shadow-sm transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          {onRotate && (
            <>
              <IconBtn label={format(m.rotateLeft, { page: index + 1 })} onClick={() => onRotate(index, -90)}>
                <RotateCcw className="size-4" />
              </IconBtn>
              <IconBtn label={format(m.rotateRight, { page: index + 1 })} onClick={() => onRotate(index, 90)}>
                <RotateCw className="size-4" />
              </IconBtn>
            </>
          )}
          {onDelete && (
            <IconBtn label={format(m.delete, { page: index + 1 })} onClick={() => onDelete(index)} danger>
              <Trash2 className="size-4" />
            </IconBtn>
          )}
        </span>
      )}
    </li>
  );
}

function IconBtn({
  label,
  onClick,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "rounded p-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        danger ? "hover:bg-destructive/10 hover:text-destructive" : "hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}
