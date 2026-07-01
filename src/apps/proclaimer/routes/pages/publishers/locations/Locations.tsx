import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { LocationsHeader } from "@proclaimer-content/pages/publishers/locations/locations-header/LocationsHeader";
import { LocationsContent } from "@proclaimer-content/pages/publishers/locations/locations-content/LocationsContent";

function LocationsPage() {
  return (
    <IonPage>
      <IonHeader>
        <LocationsHeader />
      </IonHeader>
      <IonContent className="content-full" scrollY={false}>
        <LocationsContent />
      </IonContent>
    </IonPage>
  );
}

export default LocationsPage;
