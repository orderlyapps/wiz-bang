import { useRef, useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapView } from "@util/vendor/mapbox/MapView";
import { NotAtHomeLayer } from "./components/not-at-home-layer/NotAtHomeLayer";
import { useNotAtHomeMarkers } from "./components/not-at-home-layer/hooks/useNotAtHomeMarkers";
import { NotAtHomeActionSheet } from "./components/not-at-home-layer/components/not-at-home-action-sheet/NotAtHomeActionSheet";
import { DoorToDoorModal } from "./components/door-to-door-modal/DoorToDoorModal";
import {
  MapZoomToController,
  type ZoomToFn,
} from "./components/map-zoom-to-controller/MapZoomToController";

type SelectedNotAtHome = {
  id: string;
};

export function DoorToDoorContent() {
  const geojson = useNotAtHomeMarkers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotAtHome, setSelectedNotAtHome] = useState<SelectedNotAtHome | null>(null);
  const zoomToRef = useRef<ZoomToFn | null>(null);

  function handleSelect(id: string) {
    setSelectedNotAtHome({ id });
  }

  function handleDismiss() {
    setSelectedNotAtHome(null);
  }

  return (
    <>
      <MapView style={{ position: "absolute", inset: 0 }} height="100%">
        <NotAtHomeLayer geojson={geojson} onSelect={handleSelect} />
        <MapZoomToController zoomToRef={zoomToRef} />
      </MapView>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setIsModalOpen(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <DoorToDoorModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        onSave={(coordinates) => {
          setIsModalOpen(false);
          zoomToRef.current?.(coordinates);
        }}
      />

      {selectedNotAtHome && (
        <NotAtHomeActionSheet id={selectedNotAtHome.id} is_open={true} on_dismiss={handleDismiss} />
      )}
    </>
  );
}
