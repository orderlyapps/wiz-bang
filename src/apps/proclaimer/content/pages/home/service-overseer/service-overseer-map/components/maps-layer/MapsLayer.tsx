import { Source, Layer } from "react-map-gl/mapbox";
import { useMapsBoundary } from "./hooks/useMapsBoundary";
import { MIN_VERTEX_ZOOM } from "../mapLayerConstants";

export function MapsLayer() {
  const geojson = useMapsBoundary();

  return (
    <Source id="maps" type="geojson" data={geojson}>
      <Layer
        id="maps-fill"
        type="fill"
        paint={{
          "fill-color": "#10b981",
          "fill-opacity": 0.1,
        }}
      />
      <Layer
        id="maps-line"
        type="line"
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
