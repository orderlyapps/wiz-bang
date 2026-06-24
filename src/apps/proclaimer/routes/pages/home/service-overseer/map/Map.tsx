import { useRef } from "react";
import { IonPage, IonHeader, IonContent, IonMenu, IonToolbar, IonTitle } from "@ionic/react";
import { ServiceOverseerMapHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader";
import { ServiceOverseerMapContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent";
import type { FitBoundsFn } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";

function ServiceOverseerMapPage() {
  const fitBoundsRef = useRef<FitBoundsFn | null>(null);

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
          <ServiceOverseerMapHeader onSelectBounds={(bounds) => fitBoundsRef.current?.(bounds)} />
        </IonHeader>
        <IonContent className="content-full" scrollY={false}>
          <ServiceOverseerMapContent fitBoundsRef={fitBoundsRef} />
        </IonContent>
      </IonPage>
    </>
  );
}

export default ServiceOverseerMapPage;
