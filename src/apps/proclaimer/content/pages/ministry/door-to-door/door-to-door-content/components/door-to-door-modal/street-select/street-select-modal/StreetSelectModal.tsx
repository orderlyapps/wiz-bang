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
import { streetCollection } from "@shared/database/collections/street";
import { useLiveQuery, eq } from "@tanstack/react-db";
import type { Street } from "@shared/database/schemas/street";

type StreetSelectModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (street: Street) => void;
  suburbId?: string;
};

export function StreetSelectModal({
  isOpen,
  onDidDismiss,
  onSelect,
  suburbId,
}: StreetSelectModalProps) {
  const { data: streets, isLoading } = useLiveQuery(
    (q) => {
      if (!suburbId) return undefined;
      return q
        .from({ street: streetCollection })
        .where(({ street }) => eq(street.suburb_id, suburbId));
    },
    [suburbId],
  );

  const sortedStreets = streets ? [...streets].sort((a, b) => a.name.localeCompare(b.name)) : [];

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Street</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!suburbId ? (
          <IonList>
            <IonItem>
              <IonLabel>Please select a suburb first</IonLabel>
            </IonItem>
          </IonList>
        ) : isLoading ? (
          <IonList>
            {[1, 2, 3].map((i) => (
              <IonItem key={i}>
                <IonLabel>
                  <IonSkeletonText style={{ width: "50%" }} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : sortedStreets.length === 0 ? (
          <IonList>
            <IonItem>
              <IonLabel>No streets found for this suburb</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <IonList>
            {sortedStreets.map((street) => (
              <IonItem
                key={street.id}
                button
                onClick={() => {
                  onSelect(street);
                  onDidDismiss();
                }}
              >
                <IonLabel>{street.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
