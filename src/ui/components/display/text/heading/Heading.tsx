import { Body } from "@ui/components/display/text/body/Body";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import type { TextSize } from "@ui/components/display/text/body/Body";

interface HeadingProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: TextSize;
  bold?: boolean;
  italic?: boolean;
  className?: string;
}

export function Heading({
  children,
  color,
  size = "lg",
  bold = true,
  italic = false,
  className,
}: HeadingProps) {
  return (
    <Body color={color} size={size} bold={bold} italic={italic} className={className}>
      {children}
    </Body>
  );
}
