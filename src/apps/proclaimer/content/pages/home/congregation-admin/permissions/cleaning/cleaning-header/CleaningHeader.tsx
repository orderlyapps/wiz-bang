import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CleaningHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Cleaning</IonTitle>
    </IonToolbar>
  );
}
