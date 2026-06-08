import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ScheduleHeader() {
  return (
    <IonToolbar>
      <IonButtons>
        <IonBackButton />
      </IonButtons>
      <IonTitle>Schedule</IonTitle>
    </IonToolbar>
  );
}
