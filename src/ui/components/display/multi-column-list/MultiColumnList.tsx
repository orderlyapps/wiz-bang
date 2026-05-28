import type { CSSProperties, ReactNode } from "react";
import { useBreakpoint } from "@util/hooks/use-breakpoint/use-breakpoint";
import type { Breakpoint } from "@util/hooks/use-breakpoint/breakpoints";
import { useFontSize } from "@util/app/font-size/hooks/use-font-size";
import type { Size } from "@util/types/Size";
import type { FontSize } from "@util/app/font-size/types";
import "./MultiColumnList.css";

interface MultiColumnListProps<T> {
  items: T[];
  get_id: (item: T) => string;
  render_item: (item: T) => ReactNode;
  /** Horizontal gap between columns. Uses the shared Size scale, or "none" for no gap. Defaults to "sm". */
  gap?: Size | "none";
  /** Optional offset to add or subtract from the calculated column count. Positive values add columns, negative values reduce columns. */
  column_offset?: number;
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

const fontSizeAdjustment: Record<FontSize, number> = {
  xs: 1,
  sm: 0,
  md: 0,
  lg: -1,
  xl: -1,
  "2xl": -2,
};

function get_cols(
  count: number,
  breakpoint: Breakpoint | "xs",
  font_size: FontSize,
  column_offset: number,
): number {
  // Always single column on mobile (xs/sm), ignoring adjustments
  if (breakpoint === "xs" || breakpoint === "sm") {
    return 1;
  }
  const base_max = breakpointCols[breakpoint];
  const adjustment = fontSizeAdjustment[font_size];
  const max = Math.max(1, base_max + adjustment + column_offset);
  if (count < max) return Math.max(1, count);
  return max;
}

export function MultiColumnList<T>({
  items,
  get_id,
  render_item,
  gap = "sm",
  column_offset = 0,
}: MultiColumnListProps<T>) {
  const { breakpoint } = useBreakpoint();
  const { font_size } = useFontSize();
  const cols = get_cols(items.length, breakpoint, font_size, column_offset);

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
