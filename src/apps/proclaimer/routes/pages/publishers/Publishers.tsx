import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublishersHeader } from "@proclaimer-content/pages/publishers/publishers-header/PublishersHeader";
import { PublishersContent } from "@proclaimer-content/pages/publishers/publishers-content/PublishersContent";

function PublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <PublishersHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <PublishersContent />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
