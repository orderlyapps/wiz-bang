import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";

interface CleaningHeaderProps {
  on_add: () => void;
}

export function CleaningHeader({ on_add }: CleaningHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Cleaning</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={on_add} />
      </IonButtons>
    </IonToolbar>
  );
}
