import type { CSSProperties, ReactNode } from "react";
import "./PageGrid.css";

interface PageGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  gap?: string;
  className?: string;
}

export function PageGrid({ children, cols = 2, gap, className }: PageGridProps) {
  const style = {
    "--page-grid-cols": cols,
    ...(gap ? { "--page-grid-gap": gap } : {}),
  } as CSSProperties;
  const classes = className ? `page-grid ${className}` : "page-grid";
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
