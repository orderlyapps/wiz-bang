import { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapView } from "@util/vendor/mapbox/MapView";
import { NotAtHomeLayer } from "./components/layers/not-at-home-layer/NotAtHomeLayer";
import { useNotAtHomeMarkers } from "./components/layers/not-at-home-layer/hooks/useNotAtHomeMarkers";
import { NotAtHomeActionSheet } from "./components/layers/not-at-home-layer/components/not-at-home-action-sheet/NotAtHomeActionSheet";
import { DoorToDoorModal } from "./components/door-to-door-modal/DoorToDoorModal";
import { MapZoomToController } from "./components/map-zoom-to-controller/MapZoomToController";
import { MapShareActionSheet } from "./components/map-share-action-sheet/MapShareActionSheet";
import { MapMasterLayer } from "./components/layers/map-master-layer/MapMasterLayer";
import { MapsLayer } from "./components/layers/maps-layer/MapsLayer";
import { BlocksLayer } from "./components/layers/blocks-layer/BlocksLayer";
import { useMapZoom } from "./context/mapZoomContext";

type SelectedNotAtHome = {
  id: string;
};

type ShareLocation = {
  lat: number;
  lng: number;
};

export function DoorToDoorContent() {
  const geojson = useNotAtHomeMarkers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotAtHome, setSelectedNotAtHome] = useState<SelectedNotAtHome | null>(null);
  const [shareLocation, setShareLocation] = useState<ShareLocation | null>(null);
  const { zoomToRef } = useMapZoom();

  function handleSelect(id: string) {
    setSelectedNotAtHome({ id });
  }

  function handleDismiss() {
    setSelectedNotAtHome(null);
  }

  return (
    <>
      <MapView
        style={{ position: "absolute", inset: 0 }}
        height="100%"
        on_long_press={(lngLat) => setShareLocation({ lat: lngLat.lat, lng: lngLat.lng })}
      >
        <MapMasterLayer />
        <MapsLayer />
        <BlocksLayer />
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

      <MapShareActionSheet
        lat={shareLocation?.lat ?? 0}
        lng={shareLocation?.lng ?? 0}
        is_open={shareLocation !== null}
        on_dismiss={() => setShareLocation(null)}
      />
    </>
  );
}
