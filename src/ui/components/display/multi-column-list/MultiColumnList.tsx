import type { CSSProperties, ReactNode } from "react";
import { useBreakpoint } from "@util/hooks/use-breakpoint/use-breakpoint";
import type { Breakpoint } from "@util/hooks/use-breakpoint/breakpoints";
import type { Size } from "@util/types/Size";
import "./MultiColumnList.css";

interface MultiColumnListProps<T> {
  items: T[];
  get_id: (item: T) => string;
  render_item: (item: T) => ReactNode;
  /** Horizontal gap between columns. Uses the shared Size scale, or "none" for no gap. Defaults to "sm". */
  gap?: Size | "none";
}

const gapMap: Record<Size | "none", string> = {
  none: "0",
  xs: "0.5rem",
  sm: "1rem",
  md: "2.5rem",
  lg: "4rem",
  xl: "6rem",
  "2xl": "8rem",
};

const breakpointCols: Record<Breakpoint | "xs", number> = {
  xs: 1,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 4,
};

function get_cols(count: number, breakpoint: Breakpoint | "xs"): number {
  const max = breakpointCols[breakpoint];
  if (count < max) return Math.max(1, count);
  return max;
}

export function MultiColumnList<T>({
  items,
  get_id,
  render_item,
  gap = "sm",
}: MultiColumnListProps<T>) {
  const { breakpoint } = useBreakpoint();
  const cols = get_cols(items.length, breakpoint);

  return (
    <ul
      className="multi-column-list"
      style={
        {
          "--multi-column-list-cols": cols,
          "--multi-column-list-gap": gapMap[gap],
        } as CSSProperties
      }
    >
      {items.map((item) => (
        <li key={get_id(item)} className="multi-column-list__item">
          {render_item(item)}
        </li>
      ))}
    </ul>
  );
}
