import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function LocationsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Locations</IonTitle>
    </IonToolbar>
  );
}
