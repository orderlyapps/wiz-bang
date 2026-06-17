import { IonPage, IonHeader, IonContent, IonMenu, IonToolbar, IonTitle } from "@ionic/react";
import { ServiceOverseerMapHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader";
import { ServiceOverseerMapContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent";

function ServiceOverseerMapPage() {
  return (
    <>
      <IonMenu side="end" contentId="map-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="content-wide">{/* Menu content goes here */}</IonContent>
      </IonMenu>
      <IonPage id="map-content">
        <IonHeader>
          <ServiceOverseerMapHeader />
        </IonHeader>
        <IonContent className="content-full" scrollY={false}>
          <ServiceOverseerMapContent />
        </IonContent>
      </IonPage>
    </>
  );
}

export default ServiceOverseerMapPage;
