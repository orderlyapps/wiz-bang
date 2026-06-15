import { IonPage, IonHeader } from "@ionic/react";
import { useParams } from "react-router-dom";
import { PublisherDetailsHeader } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-header/PublisherDetailsHeader";
import { PublisherDetailsContent } from "@proclaimer-content/pages/home/secretary/publishers/publisher-details/publisher-details-content/PublisherDetailsContent";

function PublisherDetailsPage() {
  const { publisher_id } = useParams<{ publisher_id: string }>();

  return (
    <IonPage>
      <IonHeader>
        <PublisherDetailsHeader publisher_id={publisher_id} />
      </IonHeader>
      <PublisherDetailsContent publisher_id={publisher_id} />
    </IonPage>
  );
}

export default PublisherDetailsPage;
