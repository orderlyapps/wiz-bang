import { TextContent } from "@content/pages/settings/info/ui/components/display/text/text-content/TextContent";
import { TextHeader } from "@content/pages/settings/info/ui/components/display/text/text-header/TextHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function TextPage() {
  return (
    <IonPage>
      <IonHeader>
        <TextHeader />
      </IonHeader>
      <IonContent>
        <TextContent />
      </IonContent>
    </IonPage>
  );
}

export default TextPage;
