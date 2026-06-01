import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { MidweekMeetingHeader } from "@proclaimer-content/pages/schedules/midweek-meeting/midweek-meeting-header/MidweekMeetingHeader";
import { MidweekMeetingContent } from "@proclaimer-content/pages/schedules/midweek-meeting/midweek-meeting-content/MidweekMeetingContent";

function MidweekMeetingPage() {
  return (
    <IonPage>
      <IonHeader>
        <MidweekMeetingHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <MidweekMeetingContent />
      </IonContent>
    </IonPage>
  );
}

export default MidweekMeetingPage;
