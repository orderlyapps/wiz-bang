import { IonItem, IonLabel } from "@ionic/react";
import { Label } from "@ui/components/display/text/label/Label";

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
}

export function InputWrapper({ label, children }: InputWrapperProps) {
  return (
    <IonItem style={{ maxWidth: 480, marginInline: "auto" }}>
      <IonLabel>
        <Label>{label}</Label>
        <br />
        <div className="ion-text-end ion-display-flex ion-justify-content-end">{children}</div>
      </IonLabel>
    </IonItem>
  );
}
