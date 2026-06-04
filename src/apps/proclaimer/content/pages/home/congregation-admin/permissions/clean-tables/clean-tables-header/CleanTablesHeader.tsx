import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CleanTablesHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Clean Tables</IonTitle>
    </IonToolbar>
  );
}
