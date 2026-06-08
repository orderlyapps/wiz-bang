import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CbsConductorHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>CBS Conductor</IonTitle>
    </IonToolbar>
  );
}
