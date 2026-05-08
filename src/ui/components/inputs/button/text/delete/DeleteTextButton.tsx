import { useState } from "react";
import { IonButton, IonAlert } from "@ionic/react";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface DeleteTextButtonProps {
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

export function DeleteTextButton({
  label = "Delete",
  color = "danger",
  fill = "solid",
  size = "default",
  expand = "block",
  disabled = false,
  alert_header = "Confirm Delete",
  alert_message = "Are you sure you want to delete this item?",
  confirm_text = "Delete",
  cancel_text = "Cancel",
  on_click,
}: DeleteTextButtonProps) {
  const [show_alert, set_show_alert] = useState(false);

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
        {label}
      </IonButton>
      <IonAlert
        isOpen={show_alert}
        onDidDismiss={() => set_show_alert(false)}
        header={alert_header}
        message={alert_message}
        buttons={[
          { text: cancel_text, role: "cancel" },
          { text: confirm_text, handler: on_click },
        ]}
      />
    </>
  );
}
