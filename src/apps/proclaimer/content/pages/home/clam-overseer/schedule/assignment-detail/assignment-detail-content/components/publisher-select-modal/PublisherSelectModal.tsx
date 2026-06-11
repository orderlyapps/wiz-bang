import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PublisherSelectModalProps {
  is_open: boolean;
  publisher: Publisher | undefined;
  on_dismiss: () => void;
  on_confirm: () => void;
}

export function PublisherSelectModal({
  is_open,
  publisher,
  on_dismiss,
  on_confirm,
}: PublisherSelectModalProps) {
  function handleConfirm() {
    on_confirm();
    on_dismiss();
  }

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confirm Assignment</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Publisher: {publisher ? `${publisher.first_name} ${publisher.last_name}` : "Unknown"}</p>
        <IonButton expand="block" onClick={handleConfirm}>
          Assign to Schedule
        </IonButton>
      </IonContent>
    </ResponsiveModal>
  );
}
