import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
} from "@ionic/react";

type Props = {
  hasPendingChanges: boolean;
  onSave: () => void;
};

function MapMenu({ hasPendingChanges, onSave }: Props) {
  return (
    <IonMenu side="end" contentId="map-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <IonList>
          <IonItem>
            <IonButton expand="block" disabled={!hasPendingChanges} onClick={onSave}>
              Save Changes
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default MapMenu;
