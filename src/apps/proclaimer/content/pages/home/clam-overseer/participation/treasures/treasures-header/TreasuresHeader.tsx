import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function TreasuresHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Treasures</IonTitle>
    </IonToolbar>
  );
}
