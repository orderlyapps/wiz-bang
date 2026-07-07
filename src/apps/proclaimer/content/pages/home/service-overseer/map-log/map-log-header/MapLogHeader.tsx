import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function MapLogHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer" />
      </IonButtons>
      <IonTitle>Map Log</IonTitle>
    </IonToolbar>
  );
}
