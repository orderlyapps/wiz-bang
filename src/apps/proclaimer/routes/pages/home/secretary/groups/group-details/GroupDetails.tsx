import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { GroupDetailsHeader } from "@proclaimer-content/pages/home/secretary/groups/group-details/group-details-header/GroupDetailsHeader";
import { GroupDetailsContent } from "@proclaimer-content/pages/home/secretary/groups/group-details/group-details-content/GroupDetailsContent";

function GroupDetailsPage() {
  const { group_id } = useParams<{ group_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <GroupDetailsHeader group_id={group_id} />
      </IonHeader>
      <GroupDetailsContent group_id={group_id} />
    </IonPage>
  );
}

export default GroupDetailsPage;
