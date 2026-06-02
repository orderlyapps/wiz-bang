import { IonText } from "@ionic/react";
import type { Size } from "@util/types/Size";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import styles from "./Body.module.css";

interface BodyProps {
  children: React.ReactNode;
  color?: IonicColor;
  size?: Size;
  bold?: boolean;
  italic?: boolean;
  balance?: boolean;
  pretty?: boolean;
  className?: string;
}

export function Body({
  children,
  color,
  size = "md",
  bold = false,
  italic = false,
  balance = false,
  pretty = false,
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

  const needsWrapper = balance || pretty;
  const wrapClass = balance ? styles.balance : pretty ? styles.pretty : "";

  return (
    <IonText {...(color && { color })} style={getTextStyle()} className={className}>
      {needsWrapper ? <span className={wrapClass}>{children}</span> : children}
    </IonText>
  );
}
