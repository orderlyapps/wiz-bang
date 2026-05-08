import { HomeContent } from "@content/pages/home/home-content/HomeContent";
import { HomeHeader } from "@content/pages/home/home-header/HomeHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function HomePage() {
  return (
    <IonPage>
      <IonHeader>
        <HomeHeader />
      </IonHeader>
      <IonContent>
        <HomeContent />
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
