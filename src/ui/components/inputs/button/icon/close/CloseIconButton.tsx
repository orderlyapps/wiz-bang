import { useState } from "react";
import { IonButton, IonIcon, IonAlert } from "@ionic/react";
import { close } from "ionicons/icons";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface CloseIconButtonProps {
  color?: IonicColor;
  fill?: "clear" | "outline" | "solid" | "default";
  size?: "small" | "default" | "large";
  disabled?: boolean;
  alert_header?: string;
  alert_message?: string;
  confirm_text?: string;
  cancel_text?: string;
  on_click: () => void;
}

export function CloseIconButton({
  color,
  fill = "clear",
  size = "default",
  disabled = false,
  alert_header = "Confirm Close",
  alert_message = "Are you sure you want to close? Any unsaved changes will be lost.",
  confirm_text = "Close",
  cancel_text = "Cancel",
  on_click,
}: CloseIconButtonProps) {
  const [show_alert, set_show_alert] = useState(false);

  return (
    <>
      <IonButton
        color={color}
        fill={fill}
        size={size}
        disabled={disabled}
        onClick={() => set_show_alert(true)}
      >
        <IonIcon slot="icon-only" icon={close} />
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
