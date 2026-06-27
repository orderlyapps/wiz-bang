import { Source, Layer } from "react-map-gl/mapbox";
import { useSelectedMapBlocks } from "./hooks/useSelectedMapBlocks";

export function BlocksLayer() {
  const { polygons, lines, lineEndpoints } = useSelectedMapBlocks();
  const hasPolygons = polygons.features.length > 0;
  const hasLines = lines.features.length > 0;
  const hasEndpoints = lineEndpoints.features.length > 0;

  if (!hasPolygons && !hasLines && !hasEndpoints) return null;

  return (
    <>
      {hasPolygons && (
        <Source id="selected-map-blocks-polygons" type="geojson" data={polygons}>
          <Layer
            id="selected-map-blocks-polygons-line"
            type="line"
            paint={{
              "line-color": "#4f46e5",
              "line-width": 2,
              "line-opacity": 0.3,
              "line-dasharray": [4, 2],
            }}
          />
          <Layer
            id="selected-map-blocks-polygons-label"
            type="symbol"
            minzoom={15}
            layout={{
              "text-field": ["get", "name"],
              "text-size": 20,
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
      )}
      {hasLines && (
        <Source id="selected-map-blocks-lines" type="geojson" data={lines}>
          <Layer
            id="selected-map-blocks-lines-line"
            type="line"
            minzoom={15}
            paint={{
              "line-color": "#4f46e5",
              "line-width": 2,
              "line-opacity": 0.3,
              "line-dasharray": [4, 2],
            }}
          />
        </Source>
      )}
      {hasEndpoints && (
        <Source id="selected-map-blocks-line-endpoints" type="geojson" data={lineEndpoints}>
          <Layer
            id="selected-map-blocks-line-endpoints-label"
            type="symbol"
            minzoom={15}
            layout={{
              "text-field": ["get", "name"],
              "text-size": 20,
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
      )}
    </>
  );
}
