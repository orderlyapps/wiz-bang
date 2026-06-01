import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { WeekendMeetingHeader } from "@proclaimer-content/pages/schedules/weekend-meeting/weekend-meeting-header/WeekendMeetingHeader";
import { WeekendMeetingContent } from "@proclaimer-content/pages/schedules/weekend-meeting/weekend-meeting-content/WeekendMeetingContent";

function WeekendMeetingPage() {
  return (
    <IonPage>
      <IonHeader>
        <WeekendMeetingHeader />
      </IonHeader>
      <IonContent className="ion-padding">
        <WeekendMeetingContent />
      </IonContent>
    </IonPage>
  );
}

export default WeekendMeetingPage;
