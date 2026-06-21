import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSkeletonText,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { suburbCollection } from "@shared/database/collections/suburb";
import { useLiveQuery } from "@tanstack/react-db";
import type { Suburb } from "@shared/database/schemas/suburb";

type SuburbSelectModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (suburb: Suburb) => void;
};

export function SuburbSelectModal({ isOpen, onDidDismiss, onSelect }: SuburbSelectModalProps) {
  const { data: suburbs, isLoading } = useLiveQuery((q) => q.from({ suburb: suburbCollection }));

  // Sort suburbs alphabetically by name
  const sortedSuburbs = suburbs ? [...suburbs].sort((a, b) => a.name.localeCompare(b.name)) : [];

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Suburb</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <IonList>
            {[1, 2, 3].map((i) => (
              <IonItem key={i}>
                <IonLabel>
                  <IonSkeletonText style={{ width: "50%" }} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : sortedSuburbs.length === 0 ? (
          <IonList>
            <IonItem>
              <IonLabel>No suburbs found.</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <IonList>
            {sortedSuburbs.map((suburb) => (
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
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
