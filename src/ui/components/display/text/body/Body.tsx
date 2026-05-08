import { IonText } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface BodyProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: TextSize;
  bold?: boolean;
  italic?: boolean;
  className?: string;
}

export function Body({
  children,
  color,
  size = "md",
  bold = false,
  italic = false,
  className,
}: BodyProps) {
  const getTextStyle = () => {
    const style: React.CSSProperties = {};

    switch (size) {
      case "xs":
        style.fontSize = "0.75rem";
        break;
      case "sm":
        style.fontSize = "0.875rem";
        break;
      case "lg":
        style.fontSize = "1.125rem";
        break;
      case "xl":
        style.fontSize = "1.25rem";
        break;
      case "2xl":
        style.fontSize = "1.5rem";
        break;
      default: // md
        style.fontSize = "1rem";
    }

    if (bold) style.fontWeight = "bold";
    if (italic) style.fontStyle = "italic";

    return style;
  };

  return (
    <IonText color={color} style={getTextStyle()} className={className}>
      {children}
    </IonText>
  );
}
