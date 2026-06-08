import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { TreasuresHeader } from "@proclaimer-content/pages/home/clam-overseer/participation/treasures/treasures-header/TreasuresHeader";
import { TreasuresContent } from "@proclaimer-content/pages/home/clam-overseer/participation/treasures/treasures-content/TreasuresContent";

function TreasuresPage() {
  return (
    <IonPage>
      <IonHeader>
        <TreasuresHeader />
      </IonHeader>
      <IonContent>
        <TreasuresContent />
      </IonContent>
    </IonPage>
  );
}

export default TreasuresPage;
