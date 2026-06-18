import { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapView } from "@util/vendor/mapbox/MapView";
import { NotAtHomeLayer } from "./components/not-at-home-layer/NotAtHomeLayer";
import { useNotAtHomeMarkers } from "./components/not-at-home-layer/hooks/useNotAtHomeMarkers";
import { DoorToDoorModal } from "./components/door-to-door-modal/DoorToDoorModal";

export function DoorToDoorContent() {
  const geojson = useNotAtHomeMarkers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MapView style={{ position: "absolute", inset: 0 }} height="100%">
        <NotAtHomeLayer geojson={geojson} />
      </MapView>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setIsModalOpen(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <DoorToDoorModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)} />
    </>
  );
}
