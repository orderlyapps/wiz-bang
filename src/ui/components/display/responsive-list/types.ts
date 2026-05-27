import type { ReactNode } from "react";

export interface ResponsiveListColumn<T> {
  key: string;
  header: ReactNode;
  render: (item: T) => ReactNode;
  align?: "start" | "center" | "end";
  width?: string;
}

export interface ResponsiveListProps<T> {
  items: T[];
  columns: ResponsiveListColumn<T>[];
  get_id: (item: T) => string;
  on_select?: (item: T) => void;
  render_card?: (item: T) => ReactNode;
  empty?: ReactNode;
}
