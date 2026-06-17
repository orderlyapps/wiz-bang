import { IonToolbar, IonTitle, IonButtons, IonBackButton, IonMenuButton } from "@ionic/react";

export function ServiceOverseerMapHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/service-overseer" />
      </IonButtons>
      <IonTitle>Map</IonTitle>
      <IonButtons slot="end">
        <IonMenuButton />
      </IonButtons>
    </IonToolbar>
  );
}
