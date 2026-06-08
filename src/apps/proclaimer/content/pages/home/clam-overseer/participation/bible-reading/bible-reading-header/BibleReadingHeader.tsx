import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function BibleReadingHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Bible Reading</IonTitle>
    </IonToolbar>
  );
}
