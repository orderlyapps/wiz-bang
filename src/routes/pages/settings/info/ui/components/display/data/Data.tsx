import { DataContent } from "@content/pages/settings/info/ui/components/display/data/data-content/DataContent";
import { DataHeader } from "@content/pages/settings/info/ui/components/display/data/data-header/DataHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function DataPage() {
  return (
    <IonPage>
      <IonHeader>
        <DataHeader />
      </IonHeader>
      <IonContent>
        <DataContent />
      </IonContent>
    </IonPage>
  );
}

export default DataPage;
