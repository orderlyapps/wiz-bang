import { DateTimeContent } from "@content/pages/settings/info/ui/components/inputs/date-time/date-time-content/DateTimeContent";
import { DateTimeHeader } from "@content/pages/settings/info/ui/components/inputs/date-time/date-time-header/DateTimeHeader";
import { IonPage, IonHeader, IonContent } from "@ionic/react";

function DateTimePage() {
  return (
    <IonPage>
      <IonHeader>
        <DateTimeHeader />
      </IonHeader>
      <IonContent>
        <DateTimeContent />
      </IonContent>
    </IonPage>
  );
}

export default DateTimePage;
