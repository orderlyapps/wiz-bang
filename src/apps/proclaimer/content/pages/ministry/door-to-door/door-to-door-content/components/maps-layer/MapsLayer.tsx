import { Source, Layer } from "react-map-gl/mapbox";
import { useMapsBoundary } from "./hooks/useMapsBoundary";

export function MapsLayer() {
  const geojson = useMapsBoundary();

  return (
    <Source id="maps" type="geojson" data={geojson}>
      <Layer
        id="maps-line"
        type="line"
        paint={{
          "line-color": "#10b981",
          "line-width": 2,
        }}
      />
      <Layer
        id="maps-fill"
        type="fill"
        paint={{
          "fill-color": "#10b981",
          "fill-opacity": 0.1,
        }}
      />
      <Layer
        id="maps-labels"
        type="symbol"
        layout={{
          "text-field": ["get", "name"],
          "text-size": 13,
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-anchor": "center",
          "symbol-placement": "point",
        }}
        paint={{
          "text-color": "#10b981",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        }}
      />
    </Source>
  );
}
