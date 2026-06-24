import { MapView } from "@util/vendor/mapbox/MapView";
import { MapPolygonEditor } from "../components/map-polygon-editor/MapPolygonEditor";
import { MapBlockEditor } from "../components/map-block-editor/MapBlockEditor";
import type { Block, SelectedMap } from "../utils/types";
import { MapsLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/maps-layer/MapsLayer";
import { MapMasterLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/map-master-layer/MapMasterLayer";
import { MapBlocksLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/map-blocks-layer/MapBlocksLayer";
import {
  MapFitBoundsController,
  type FitBoundsFn,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";

type Props = {
  fitBoundsRef: React.MutableRefObject<FitBoundsFn | null>;
  selectedMap: SelectedMap | null;
  selectedBlock: Block | null;
  onPendingChange: (boundary: GeoJSON.Position[] | null) => void;
  onBlockPendingChange: (block: Block | null) => void;
};

export function ServiceOverseerMapContent({
  fitBoundsRef,
  selectedMap,
  selectedBlock,
  onPendingChange,
  onBlockPendingChange,
}: Props) {
  return (
    <MapView style={{ position: "absolute", inset: 0 }} height="100%">
      <MapFitBoundsController fitBoundsRef={fitBoundsRef} />
      <MapMasterLayer />
      <MapsLayer />
      {selectedMap && <MapBlocksLayer selectedMap={selectedMap} />}
      {selectedBlock && (
        <MapBlockEditor block={selectedBlock} onPendingChange={onBlockPendingChange} />
      )}
      {selectedMap && !selectedBlock && (
        <MapPolygonEditor
          key={selectedMap.type === "map" ? selectedMap.id : selectedMap.congregation_id}
          selection={selectedMap}
          onPendingChange={onPendingChange}
        />
      )}
    </MapView>
  );
}
