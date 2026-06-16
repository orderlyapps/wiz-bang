import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { DoorToDoorHeader } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-header/DoorToDoorHeader";
import { DoorToDoorContent } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/DoorToDoorContent";

function DoorToDoorPage() {
  return (
    <IonPage>
      <IonHeader>
        <DoorToDoorHeader />
      </IonHeader>
      <IonContent className="content-full" scrollY={false}>
        <DoorToDoorContent />
      </IonContent>
    </IonPage>
  );
}

export default DoorToDoorPage;
