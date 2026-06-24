import { MapView } from "@util/vendor/mapbox/MapView";
import { MapPolygonEditor } from "../components/map-polygon-editor/MapPolygonEditor";
import type { SelectedMap } from "../utils/types";
import { MapsLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/maps-layer/MapsLayer";
import { MapMasterLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/map-master-layer/MapMasterLayer";
import {
  MapFitBoundsController,
  type FitBoundsFn,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";

type Props = {
  fitBoundsRef: React.MutableRefObject<FitBoundsFn | null>;
  selectedMap: SelectedMap | null;
  onPendingChange: (boundary: GeoJSON.Position[] | null) => void;
};

export function ServiceOverseerMapContent({ fitBoundsRef, selectedMap, onPendingChange }: Props) {
  return (
    <MapView style={{ position: "absolute", inset: 0 }} height="100%">
      <MapFitBoundsController fitBoundsRef={fitBoundsRef} />
      <MapMasterLayer />
      <MapsLayer />
      {selectedMap && (
        <MapPolygonEditor
          key={selectedMap.type === "map" ? selectedMap.id : selectedMap.congregation_id}
          selection={selectedMap}
          onPendingChange={onPendingChange}
        />
      )}
    </MapView>
  );
}
