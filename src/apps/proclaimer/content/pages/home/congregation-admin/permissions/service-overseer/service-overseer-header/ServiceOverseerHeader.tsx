import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";

interface ServiceOverseerHeaderProps {
  on_add: () => void;
}

export function ServiceOverseerHeader({ on_add }: ServiceOverseerHeaderProps) {
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>Service Overseer</IonTitle>
      <IonButtons slot="end">
        <AddIconButton on_click={on_add} />
      </IonButtons>
    </IonToolbar>
  );
}
