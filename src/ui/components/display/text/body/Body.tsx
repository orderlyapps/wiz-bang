import { IonText } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

type TextSize = "sm" | "md" | "lg";

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
  const getTextClass = () => {
    const classes = [];

    if (size === "sm") classes.push("ion-text-sm");
    if (size === "lg") classes.push("ion-text-lg");

    if (bold) classes.push("ion-text-bold");
    if (italic) classes.push("ion-text-italic");

    return classes.join(" ");
  };

  return (
    <IonText color={color} className={`${getTextClass()} ${className || ""}`}>
      {children}
    </IonText>
  );
}
