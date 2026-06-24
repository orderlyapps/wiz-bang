import { MapView } from "@util/vendor/mapbox/MapView";
import { MapMasterLayer } from "../components/map-master-layer/MapMasterLayer";
import { MapsLayer } from "../components/maps-layer/MapsLayer";
import {
  MapFitBoundsController,
  type FitBoundsFn,
} from "../components/map-fit-bounds-controller/MapFitBoundsController";
import { MapPolygonEditor } from "../components/map-polygon-editor/MapPolygonEditor";
import type { SelectedMap } from "../types";

type Props = {
  fitBoundsRef: React.MutableRefObject<FitBoundsFn | null>;
  selectedMap: SelectedMap | null;
};

export function ServiceOverseerMapContent({ fitBoundsRef, selectedMap }: Props) {
  return (
    <MapView style={{ position: "absolute", inset: 0 }} height="100%">
      <MapFitBoundsController fitBoundsRef={fitBoundsRef} />
      <MapMasterLayer />
      <MapsLayer />
      {selectedMap && (
        <MapPolygonEditor
          key={selectedMap.type === "map" ? selectedMap.id : selectedMap.congregation_id}
          selection={selectedMap}
        />
      )}
    </MapView>
  );
}
