import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ChairmanHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Chairman</IonTitle>
    </IonToolbar>
  );
}
