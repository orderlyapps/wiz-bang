import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";

interface ClamOverseerHeaderProps {
  on_add: () => void;
}

export function ClamOverseerHeader({ on_add }: ClamOverseerHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>CLAM Overseer</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={on_add} />
      </IonButtons>
    </IonToolbar>
  );
}
