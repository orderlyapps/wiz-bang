import { CongregationContent } from "@admin-content/pages/tables/congregation/congregation-content/CongregationContent";
import { CongregationHeader } from "@admin-content/pages/tables/congregation/congregation-header/CongregationHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function CongregationPage() {
  return (
    <IonPage>
      <IonHeader>
        <CongregationHeader />
      </IonHeader>
      <IonContent className="content-wide">
        <CongregationContent />
      </IonContent>
    </IonPage>
  );
}

export default CongregationPage;
