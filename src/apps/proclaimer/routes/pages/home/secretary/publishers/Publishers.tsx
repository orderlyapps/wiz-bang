import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { PublishersHeader } from "@proclaimer-content/pages/home/secretary/publishers/publishers-header/PublishersHeader";
import { PublishersContent } from "@proclaimer-content/pages/home/secretary/publishers/publishers-content/PublishersContent";
import { useState } from "react";

function PublishersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <PublishersHeader searchTerm={searchTerm} onSearch={setSearchTerm} />
      </IonHeader>
      <IonContent>
        <PublishersContent searchTerm={searchTerm} />
      </IonContent>
    </IonPage>
  );
}

export default PublishersPage;
