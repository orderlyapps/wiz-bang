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
          "line-color": "#ef4444",
          "line-width": ["case", ["==", ["get", "is_selected"], true], 5, 1],
        }}
      />
      <Layer
        id="maps-labels"
        type="symbol"
        minzoom={12}
        maxzoom={15}
        layout={{
          "text-field": ["get", "name"],
          "text-size": 18,
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
