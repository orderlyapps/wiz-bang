import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Proclaimer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to Proclaimer</h1>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
