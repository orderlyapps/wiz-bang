import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function PublishersHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary" />
      </IonButtons>
      <IonTitle>Publishers</IonTitle>
    </IonToolbar>
  );
}
