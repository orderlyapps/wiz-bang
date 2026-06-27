import { Source, Layer } from "react-map-gl/mapbox";
import { useDoNotCallMarkers } from "./hooks/useDoNotCallMarkers";
import { getHousePointLayer } from "./house-layers/point";
import { getHouseLabelLayer } from "./house-layers/label";
import { getUnitPointLayer } from "./unit-layers/point";
import { getUnitLabelLayer } from "./unit-layers/label";
import { DoNotCallClickHandler } from "./components/do-not-call-click-handler/DoNotCallClickHandler";
import type { DoNotCall } from "./types";

export const SOURCE_ID = "do-not-calls";

type DoNotCallWithCoordinates = DoNotCall & { coordinates: [number, number] };

type DoNotCallFeature = {
  type: "Feature";
  id?: string;
  properties: DoNotCallWithCoordinates & { unit_count: number };
  geometry: { type: "Point"; coordinates: [number, number] };
};

type DoNotCallSourceProps = {
  onSelect: (doNotCall: DoNotCall) => void;
};

export function DoNotCallSource({ onSelect }: DoNotCallSourceProps) {
  const groupedByAddress = useDoNotCallMarkers();
  if (!groupedByAddress) return null;

  const features: DoNotCallFeature[] = Object.values(groupedByAddress).map((group) => {
    const firstItem = group[0];
    return {
      type: "Feature",
      id: firstItem.id,
      properties: {
        ...firstItem,
        unit_count: group.length,
      },
      geometry: {
        type: "Point",
        coordinates: firstItem.coordinates,
      },
    };
  });

  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features,
  };

  return (
    <Source id={SOURCE_ID} type="geojson" data={geojson}>
      <Layer {...getUnitPointLayer()} />
      <Layer {...getUnitLabelLayer()} />
      <Layer {...getHousePointLayer()} />
      <Layer {...getHouseLabelLayer()} />
      <DoNotCallClickHandler onSelect={onSelect} />
    </Source>
  );
}
