import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function PrayerHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Prayer</IonTitle>
    </IonToolbar>
  );
}
