import { Body } from "@ui/components/display/text/body/Body";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import type { Size } from "@util/types/Size";

interface LabelProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: Size;
  bold?: boolean;
  italic?: boolean;
  className?: string;
}

export function Label({
  children,
  color,
  size = "sm",
  bold = true,
  italic = false,
  className,
}: LabelProps) {
  return (
    <Body color={color} size={size} bold={bold} italic={italic} className={className}>
      {children}
    </Body>
  );
}
