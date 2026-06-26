import { Source, Layer } from "react-map-gl/mapbox";
import { useSelectedMapBlocks } from "./hooks/useSelectedMapBlocks";

export function BlocksLayer() {
  const geojson = useSelectedMapBlocks();

  if (geojson.features.length === 0) return null;

  return (
    <Source id="selected-map-blocks" type="geojson" data={geojson}>
      <Layer
        id="selected-map-blocks-line"
        type="line"
        paint={{
          "line-color": "#4f46e5",
          "line-width": 2,
        }}
      />
      <Layer
        id="selected-map-blocks-label"
        type="symbol"
        layout={{
          "text-field": ["get", "name"],
          "text-size": 14,
          "text-anchor": "center",
          "text-allow-overlap": true,
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
        }}
        paint={{
          "text-color": "#1f2937",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        }}
      />
    </Source>
  );
}
