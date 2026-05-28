import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CongregationHeader() {
  return (
    <IonToolbar>
      <IonButtons>
        <IonBackButton defaultHref="/tables" text="Tables" />
      </IonButtons>
      <IonTitle>Congregation</IonTitle>
    </IonToolbar>
  );
}
