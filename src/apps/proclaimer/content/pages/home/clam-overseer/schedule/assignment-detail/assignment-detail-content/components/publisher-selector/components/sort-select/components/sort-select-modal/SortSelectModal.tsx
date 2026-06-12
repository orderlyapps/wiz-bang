import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface SortSelectModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function SortSelectModal({ is_open, on_dismiss }: SortSelectModalProps) {
  return (
    <IonModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sort</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" />
    </IonModal>
  );
}
