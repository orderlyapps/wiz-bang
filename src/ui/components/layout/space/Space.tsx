import type { Size } from "@util/types/Size";

const sizeMap: Record<Size, string> = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
};

interface SpaceProps {
  size?: Size;
  horizontal?: boolean;
}

export function Space({ size = "md", horizontal = false }: SpaceProps) {
  const value = sizeMap[size];
  const style = horizontal ? { display: "inline-block", width: value } : { height: value };
  return <div style={style} aria-hidden />;
}
