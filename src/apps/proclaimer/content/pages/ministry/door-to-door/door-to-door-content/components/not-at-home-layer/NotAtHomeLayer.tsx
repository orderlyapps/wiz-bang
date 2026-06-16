import { Source, Layer } from "react-map-gl/mapbox";
import type { NotAtHomeGeoJSON } from "./hooks/useNotAtHomeMarkers";

type Props = {
  geojson: NotAtHomeGeoJSON;
};

export function NotAtHomeLayer({ geojson }: Props) {
  return (
    <Source
      id="not-at-home"
      type="geojson"
      data={geojson}
      cluster
      clusterMaxZoom={14}
      clusterRadius={50}
    >
      <Layer
        id="clusters"
        type="circle"
        filter={["has", "point_count"]}
        paint={{
          "circle-color": "#6b7280",
          "circle-radius": ["step", ["get", "point_count"], 16, 10, 22, 50, 28],
          "circle-opacity": 0.85,
        }}
      />
      <Layer
        id="cluster-count"
        type="symbol"
        filter={["has", "point_count"]}
        layout={{
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        }}
        paint={{ "text-color": "#ffffff" }}
      />
      <Layer
        id="unclustered-point"
        type="circle"
        filter={["!", ["has", "point_count"]]}
        paint={{
          "circle-radius": 8,
          "circle-color": ["case", ["==", ["get", "write"], true], "#22c55e", "#ef4444"],
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#ffffff",
        }}
      />
    </Source>
  );
}
