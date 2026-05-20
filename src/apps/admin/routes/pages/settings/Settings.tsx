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
        <h1>Admin Settings</h1>
      </IonContent>
    </IonPage>
  );
}

export default SettingsPage;
