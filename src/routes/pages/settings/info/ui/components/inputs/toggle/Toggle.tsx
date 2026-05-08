import { ToggleContent } from "@content/pages/settings/info/ui/components/inputs/toggle/toggle-content/ToggleContent";
import { ToggleHeader } from "@content/pages/settings/info/ui/components/inputs/toggle/toggle-header/ToggleHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function TogglePage() {
  return (
    <IonPage>
      <IonHeader>
        <ToggleHeader />
      </IonHeader>
      <IonContent>
        <ToggleContent />
      </IonContent>
    </IonPage>
  );
}

export default TogglePage;
