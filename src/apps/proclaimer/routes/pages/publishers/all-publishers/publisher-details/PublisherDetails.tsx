import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { AllPublishersDetailsHeader } from "@proclaimer-content/pages/publishers/all-publishers/all-publishers-details/all-publishers-details-header/AllPublishersDetailsHeader";
import { AllPublishersDetailsContent } from "@proclaimer-content/pages/publishers/all-publishers/all-publishers-details/all-publishers-details-content/AllPublishersDetailsContent";

function AllPublishersDetailsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <AllPublishersDetailsHeader publisher_id={publisher_id} />
      </IonHeader>
      <AllPublishersDetailsContent publisher_id={publisher_id} />
    </IonPage>
  );
}

export default AllPublishersDetailsPage;
