import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublishersHeader } from "@proclaimer-content/pages/home/secretary/publishers/publishers-header/PublishersHeader";
import { PublishersContent } from "@proclaimer-content/pages/home/secretary/publishers/publishers-content/PublishersContent";

function PublishersPage() {
  return (
    <IonPage>
      <IonHeader>
        <PublishersHeader />
      </IonHeader>
      <IonContent>
        <PublishersContent />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
