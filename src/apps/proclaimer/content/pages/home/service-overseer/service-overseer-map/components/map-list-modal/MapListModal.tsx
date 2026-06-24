import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";

type MapListModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

export function MapListModal({ isOpen, onDidDismiss }: MapListModalProps) {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }).orderBy(({ m }) => m.name));

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Maps</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <IonList>
          <IonItem>
            <IonLabel>The master map</IonLabel>
          </IonItem>
          {data?.map((map) => (
            <IonItem key={map.id ?? map.name}>
              <IonLabel>{map.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
