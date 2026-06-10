import { IonButton } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface TextButtonProps {
  label: string;
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  expand?: "block" | "full";
  disabled?: boolean;
  on_click: () => void;
}

export function TextButton({
  label,
  color,
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  on_click,
}: TextButtonProps) {
  return (
    <IonButton
      color={color}
      fill={fill}
      size={size}
      expand={expand}
      disabled={disabled}
      onClick={on_click}
      className="ion-margin-horizontal"
      style={{ maxWidth: 360, marginInline: "auto" }}
    >
      {label}
    </IonButton>
  );
}
