import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";

type DoorToDoorModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

export function DoorToDoorModal({ isOpen, onDidDismiss }: DoorToDoorModalProps) {
  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Modal Title</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <p>This is the modal that opens when the FAB button is clicked.</p>
        </div>
      </IonContent>
    </ResponsiveModal>
  );
}
