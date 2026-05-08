import { SettingsContent } from "@content/pages/settings/settings-content/SettingsContent";
import { SettingsHeader } from "@content/pages/settings/settings-header/SettingsHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function SettingsPage() {
  return (
    <IonPage>
      <IonHeader>
        <SettingsHeader />
      </IonHeader>
      <IonContent>
        <SettingsContent />
      </IonContent>
    </IonPage>
  );
}

export default SettingsPage;
