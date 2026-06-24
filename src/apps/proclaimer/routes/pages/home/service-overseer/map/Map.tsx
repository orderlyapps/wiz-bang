import { useRef, useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerMapHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader";
import { ServiceOverseerMapContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent";
import MapMenu from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-menu/MapMenu";
import type { FitBoundsFn } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";
import type { SelectedMap } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/types";

function ServiceOverseerMapPage() {
  const fitBoundsRef = useRef<FitBoundsFn | null>(null);
  const [selected_map, set_selected_map] = useState<SelectedMap | null>(null);

  function handleSelect(selection: SelectedMap) {
    set_selected_map(selection);
    fitBoundsRef.current?.(selection.bounds);
  }

  return (
    <>
      <MapMenu />
      <IonPage id="map-content">
        <IonHeader>
          <ServiceOverseerMapHeader onSelect={handleSelect} />
        </IonHeader>
        <IonContent className="content-full" scrollY={false}>
          <ServiceOverseerMapContent fitBoundsRef={fitBoundsRef} selectedMap={selected_map} />
        </IonContent>
      </IonPage>
    </>
  );
}

export default ServiceOverseerMapPage;
