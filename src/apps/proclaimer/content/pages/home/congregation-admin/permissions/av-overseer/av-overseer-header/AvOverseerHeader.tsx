import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";

interface AvOverseerHeaderProps {
  on_add: () => void;
}

export function AvOverseerHeader({ on_add }: AvOverseerHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>AV Overseer</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={on_add} />
      </IonButtons>
    </IonToolbar>
  );
}
