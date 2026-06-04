import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { CleanTablesHeader } from "@proclaimer-content/pages/home/congregation-admin/permissions/clean-tables/clean-tables-header/CleanTablesHeader";
import { CleanTablesContent } from "@proclaimer-content/pages/home/congregation-admin/permissions/clean-tables/clean-tables-content/CleanTablesContent";

function CleanTablesPage() {
  return (
    <IonPage>
      <IonHeader>
        <CleanTablesHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <CleanTablesContent />
      </IonContent>
    </IonPage>
  );
}

export default CleanTablesPage;
