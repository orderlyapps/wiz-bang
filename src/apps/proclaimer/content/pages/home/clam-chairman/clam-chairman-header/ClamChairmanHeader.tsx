import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ClamChairmanHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
      <IonTitle>CLAM Chairman</IonTitle>
    </IonToolbar>
  );
}
