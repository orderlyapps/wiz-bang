import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";

interface CobeHeaderProps {
  on_add: () => void;
}

export function CobeHeader({ on_add }: CobeHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>COBE</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={on_add} />
      </IonButtons>
    </IonToolbar>
  );
}
