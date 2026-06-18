import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { suburbCollection } from "@shared/database/collections/suburb";
import { useLiveQuery } from "@tanstack/react-db";
import type { Suburb } from "@shared/database/schemas/suburb";

type SuburbSelectModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (suburb: Suburb) => void;
};

export function SuburbSelectModal({ isOpen, onDidDismiss, onSelect }: SuburbSelectModalProps) {
  const { data: suburbs } = useLiveQuery((q) => q.from({ suburb: suburbCollection }));

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Suburb</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {suburbs.map((suburb) => (
            <IonItem
              key={suburb.id}
              button
              onClick={() => {
                onSelect(suburb);
                onDidDismiss();
              }}
            >
              <IonLabel>{suburb.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
}
