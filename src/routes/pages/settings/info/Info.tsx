import { InfoContent } from "@content/pages/settings/info/info-content/InfoContent";
import { InfoHeader } from "@content/pages/settings/info/info-header/InfoHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function InfoPage() {
  return (
    <IonPage>
      <IonHeader>
        <InfoHeader />
      </IonHeader>
      <IonContent>
        <InfoContent />
      </IonContent>
    </IonPage>
  );
}

export default InfoPage;
