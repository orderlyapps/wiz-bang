import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function CongregationDetailHeader() {
  return (
    <IonToolbar>
      <IonButtons>
        <IonBackButton defaultHref="/tables/congregation" text="Congregations" />
      </IonButtons>
      <IonTitle>Congregation Details</IonTitle>
    </IonToolbar>
  );
}
