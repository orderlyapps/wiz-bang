import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";

interface SortSelectModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function SortSelectModal({ is_open, on_dismiss }: SortSelectModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sort</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" />
    </ResponsiveModal>
  );
}
