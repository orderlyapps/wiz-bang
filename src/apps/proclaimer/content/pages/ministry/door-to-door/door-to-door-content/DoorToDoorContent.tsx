import { MapView } from "@util/vendor/mapbox/MapView";
import { NotAtHomeLayer } from "./components/not-at-home-layer/NotAtHomeLayer";
import { useNotAtHomeMarkers } from "./components/not-at-home-layer/hooks/useNotAtHomeMarkers";

export function DoorToDoorContent() {
  const geojson = useNotAtHomeMarkers();

  return (
    <MapView style={{ position: "absolute", inset: 0 }} height="100%">
      <NotAtHomeLayer geojson={geojson} />
    </MapView>
  );
}
