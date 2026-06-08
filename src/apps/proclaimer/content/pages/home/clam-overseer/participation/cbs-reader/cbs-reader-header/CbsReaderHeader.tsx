import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CbsReaderHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>CBS Reader</IonTitle>
    </IonToolbar>
  );
}
