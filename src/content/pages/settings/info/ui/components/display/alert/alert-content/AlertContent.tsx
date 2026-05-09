import { IonList } from "@ionic/react";
import { ConfirmationAlertSection } from "../confirmation-alert-section/ConfirmationAlertSection";

export function AlertContent() {
  return (
    <IonList>
      <ConfirmationAlertSection />
    </IonList>
  );
}
