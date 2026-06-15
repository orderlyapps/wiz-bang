import { IonItem, IonLabel } from "@ionic/react";
import { Label } from "@ui/components/display/text/label/Label";

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
  disabled: boolean;
}

export function InputWrapper({ label, children, disabled }: InputWrapperProps) {
  return (
    <IonItem style={{ maxWidth: 480, marginInline: "auto", opacity: disabled ? 0.5 : 1 }}>
      <IonLabel>
        <Label color={disabled ? "medium" : undefined}>{label}</Label>
        <br />
        <div className="ion-text-end ion-display-flex ion-justify-content-end">{children}</div>
      </IonLabel>
    </IonItem>
  );
}
