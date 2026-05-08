import { NumberContent } from "@content/pages/settings/info/ui/components/inputs/number/number-content/NumberContent";
import { NumberHeader } from "@content/pages/settings/info/ui/components/inputs/number/number-header/NumberHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function NumberPage() {
  return (
    <IonPage>
      <IonHeader>
        <NumberHeader />
      </IonHeader>
      <IonContent>
        <NumberContent />
      </IonContent>
    </IonPage>
  );
}

export default NumberPage;
