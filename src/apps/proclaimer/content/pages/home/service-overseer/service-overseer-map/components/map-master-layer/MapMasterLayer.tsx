import { Source, Layer } from "react-map-gl/mapbox";
import { useMapMasterBoundary } from "./hooks/useMapMasterBoundary";

export function MapMasterLayer() {
  const geojson = useMapMasterBoundary();
  console.log("[MapMasterLayer] geojson:", geojson);
  return (
    <Source id="map-master" type="geojson" data={geojson}>
      <Layer
        id="boundary-fill"
        type="fill"
        paint={{
          "fill-color": "#3b82f6",
          "fill-opacity": 0.2,
        }}
      />
      <Layer
        id="boundary-line"
        type="line"
        paint={{
          "line-color": "#3b82f6",
          "line-width": 2,
        }}
      />
    </Source>
  );
}
