import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function ApplyHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Apply</IonTitle>
    </IonToolbar>
  );
}
