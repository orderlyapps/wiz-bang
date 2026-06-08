import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function GemsHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Gems</IonTitle>
    </IonToolbar>
  );
}
