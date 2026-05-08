import { PasswordContent } from "@content/pages/settings/info/ui/components/inputs/password/password-content/PasswordContent";
import { PasswordHeader } from "@content/pages/settings/info/ui/components/inputs/password/password-header/PasswordHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function PasswordPage() {
  return (
    <IonPage>
      <IonHeader>
        <PasswordHeader />
      </IonHeader>
      <IonContent>
        <PasswordContent />
      </IonContent>
    </IonPage>
  );
}

export default PasswordPage;
