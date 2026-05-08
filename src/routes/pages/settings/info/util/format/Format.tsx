import { FormatContent } from "@content/pages/settings/info/util/format/format-content/FormatContent";
import { FormatHeader } from "@content/pages/settings/info/util/format/format-header/FormatHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function FormatPage() {
  return (
    <IonPage>
      <IonHeader>
        <FormatHeader />
      </IonHeader>
      <IonContent>
        <FormatContent />
      </IonContent>
    </IonPage>
  );
}

export default FormatPage;
