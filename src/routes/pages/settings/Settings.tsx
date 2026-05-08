import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function SettingsPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Settings page content goes here.</p>
      </IonContent>
    </IonPage>
  );
}

export default SettingsPage;
