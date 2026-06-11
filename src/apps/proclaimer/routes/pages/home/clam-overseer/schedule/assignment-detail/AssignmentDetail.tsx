import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import { AssignmentDetailHeader } from "@proclaimer-content/pages/home/clam-overseer/schedule/assignment-detail/assignment-detail-header/AssignmentDetailHeader";
import { AssignmentDetailContent } from "@proclaimer-content/pages/home/clam-overseer/schedule/assignment-detail/assignment-detail-content/AssignmentDetailContent";

function AssignmentDetailPage() {
  const { week_id, assignment_id } = useParams<{ week_id: string; assignment_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <AssignmentDetailHeader
          title={getTheocraticWeekLabel(week_id)}
          back_href={`/home/clam-overseer/schedule/${week_id}`}
        />
      </IonHeader>
      <IonContent className="content-wide remove-top-padding" scrollY={false}>
        <AssignmentDetailContent week_id={week_id} assignment_id={assignment_id} />
      </IonContent>
    </IonPage>
  );
}

export default AssignmentDetailPage;
