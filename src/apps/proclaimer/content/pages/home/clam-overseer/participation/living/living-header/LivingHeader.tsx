import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function LivingHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Living</IonTitle>
    </IonToolbar>
  );
}
