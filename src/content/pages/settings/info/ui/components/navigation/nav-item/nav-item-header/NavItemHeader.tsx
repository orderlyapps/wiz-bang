import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

export function NavItemHeader() {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/settings/info/ui/components/navigation" />
      </IonButtons>
      <IonTitle>Nav Item</IonTitle>
    </IonToolbar>
  );
}
