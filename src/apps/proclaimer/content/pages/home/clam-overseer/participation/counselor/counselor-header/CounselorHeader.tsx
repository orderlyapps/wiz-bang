import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CounselorHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Counselor</IonTitle>
    </IonToolbar>
  );
}
