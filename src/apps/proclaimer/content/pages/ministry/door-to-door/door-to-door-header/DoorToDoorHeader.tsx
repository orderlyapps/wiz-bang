import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function DoorToDoorHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Door To Door</IonTitle>
    </IonToolbar>
  );
}
