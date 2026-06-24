import { MapView } from "@util/vendor/mapbox/MapView";
import { MapMasterLayer } from "../components/map-master-layer/MapMasterLayer";
import { MapsLayer } from "../components/maps-layer/MapsLayer";
import {
  MapFitBoundsController,
  type FitBoundsFn,
} from "../components/map-fit-bounds-controller/MapFitBoundsController";

type Props = {
  fitBoundsRef: React.MutableRefObject<FitBoundsFn | null>;
};

export function ServiceOverseerMapContent({ fitBoundsRef }: Props) {
  return (
    <MapView style={{ position: "absolute", inset: 0 }} height="100%">
      <MapFitBoundsController fitBoundsRef={fitBoundsRef} />
      <MapMasterLayer />
      <MapsLayer />
    </MapView>
  );
}
