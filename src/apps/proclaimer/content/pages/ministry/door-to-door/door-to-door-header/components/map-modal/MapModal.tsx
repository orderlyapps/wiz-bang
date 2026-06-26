import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";

interface MapModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function MapModal({ is_open, on_dismiss }: MapModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent />
    </ResponsiveModal>
  );
}
