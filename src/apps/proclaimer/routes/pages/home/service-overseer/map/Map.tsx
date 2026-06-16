import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerMapHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader";
import { ServiceOverseerMapContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent";

function ServiceOverseerMapPage() {
  return (
    <IonPage>
      <IonHeader>
        <ServiceOverseerMapHeader />
      </IonHeader>
      <IonContent className="content-full" scrollY={false}>
        <ServiceOverseerMapContent />
      </IonContent>
    </IonPage>
  );
}

export default ServiceOverseerMapPage;
