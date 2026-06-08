import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function TalkHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Talk</IonTitle>
    </IonToolbar>
  );
}
