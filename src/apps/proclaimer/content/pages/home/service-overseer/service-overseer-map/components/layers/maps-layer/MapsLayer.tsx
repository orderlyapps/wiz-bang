import { Source, Layer } from "react-map-gl/mapbox";
import { MIN_VERTEX_ZOOM } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/mapLayerConstants";
import { useMapsBoundary } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/maps-layer/hooks/useMapsBoundary";

export function MapsLayer() {
  const geojson = useMapsBoundary();

  return (
    <Source id="maps" type="geojson" data={geojson}>
      <Layer
        id="maps-line"
        type="line"
        minzoom={MIN_VERTEX_ZOOM - 2}
        paint={{
          "line-color": "#10b981",
          "line-width": 2,
        }}
      />
      <Layer
        id="maps-vertices"
        type="circle"
        minzoom={MIN_VERTEX_ZOOM}
        paint={{
          "circle-color": "#10b981",
          "circle-radius": 5,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
        }}
      />
    </Source>
  );
}
