import { ButtonContent } from "@content/pages/settings/info/ui/components/inputs/button/button-content/ButtonContent";
import { ButtonHeader } from "@content/pages/settings/info/ui/components/inputs/button/button-header/ButtonHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function ButtonPage() {
  return (
    <IonPage>
      <IonHeader>
        <ButtonHeader />
      </IonHeader>
      <IonContent>
        <ButtonContent />
      </IonContent>
    </IonPage>
  );
}

export default ButtonPage;
