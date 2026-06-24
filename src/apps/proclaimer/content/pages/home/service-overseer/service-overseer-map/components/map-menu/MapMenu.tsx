import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function MapMenu() {
  return (
    <IonMenu side="end" contentId="map-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">{/* Menu content goes here */}</IonContent>
    </IonMenu>
  );
}

export default MapMenu;
