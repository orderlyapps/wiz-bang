import { InputsContent } from "@content/pages/settings/info/ui/components/inputs/inputs-content/InputsContent";
import { InputsHeader } from "@content/pages/settings/info/ui/components/inputs/inputs-header/InputsHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function InputsPage() {
  return (
    <IonPage>
      <IonHeader>
        <InputsHeader />
      </IonHeader>
      <IonContent>
        <InputsContent />
      </IonContent>
    </IonPage>
  );
}

export default InputsPage;
