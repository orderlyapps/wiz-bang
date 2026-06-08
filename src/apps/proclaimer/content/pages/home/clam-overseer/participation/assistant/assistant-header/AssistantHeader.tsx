import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function AssistantHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/clam-overseer/participation" />
      </IonButtons>
      <IonTitle>Assistant</IonTitle>
    </IonToolbar>
  );
}
