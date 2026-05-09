import { useState } from "react";
import { IonButton } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";
import { ConfirmationAlert } from "@ui/components/display/alert/ConfirmationAlert";

interface SaveTextButtonProps {
  variant?: "save" | "update";
  label?: string;
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  expand?: "block" | "full";
  disabled?: boolean;
  alert_header?: string;
  alert_message?: string;
  confirm_text?: string;
  cancel_text?: string;
  on_click: () => void;
}

export function SaveTextButton({
  variant = "save",
  label,
  color = "primary",
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  alert_header,
  alert_message,
  confirm_text,
  cancel_text = "Cancel",
  on_click,
}: SaveTextButtonProps) {
  const [show_alert, set_show_alert] = useState(false);
  const resolved_label = label ?? (variant === "update" ? "Update" : "Save");
  const resolved_header =
    alert_header ?? (variant === "update" ? "Confirm Update" : "Confirm Save");
  const resolved_message =
    alert_message ??
    (variant === "update"
      ? "Are you sure you want to update this item?"
      : "Are you sure you want to save this item?");
  const resolved_confirm = confirm_text ?? resolved_label;

  return (
    <>
      <IonButton
        color={color}
        fill={fill}
        size={size}
        expand={expand}
        disabled={disabled}
        onClick={() => set_show_alert(true)}
        className="ion-margin-horizontal"
      >
        {resolved_label}
      </IonButton>
      <ConfirmationAlert
        is_open={show_alert}
        header={resolved_header}
        message={resolved_message}
        confirm_text={resolved_confirm}
        cancel_text={cancel_text}
        on_confirm={on_click}
        on_cancel={() => set_show_alert(false)}
      />
    </>
  );
}
