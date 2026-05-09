import { IonItem, IonLabel } from "@ionic/react";
import { Label } from "@ui/components/display/text/label/Label";

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
}

export function InputWrapper({ label, children }: InputWrapperProps) {
  return (
    <IonItem>
      <IonLabel>
        <Label>{label}</Label>
      </IonLabel>
      <div className="ion-text-end">{children}</div>
    </IonItem>
  );
}
