import { MapView } from "@util/vendor/mapbox/MapView";
import { MapMasterLayer } from "../components/map-master-layer/MapMasterLayer";

export function ServiceOverseerMapContent() {
  return (
    <MapView style={{ position: "absolute", inset: 0 }} height="100%">
      <MapMasterLayer />
    </MapView>
  );
}
