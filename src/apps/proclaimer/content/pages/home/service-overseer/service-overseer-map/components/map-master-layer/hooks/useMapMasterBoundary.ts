import { useLiveQuery } from "@tanstack/react-db";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { isValidBoundary } from "../../../utils/boundary";
import type { MapMaster } from "@shared/database/schemas/map-master";

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { congregation_id: string; details: string | null };
};

export type MapMasterGeoJSON = {
  type: "FeatureCollection";
  features: PolygonFeature[];
};

function toGeoJSONPolygon(boundary: number[][]): { type: "Polygon"; coordinates: number[][][] } {
  return { type: "Polygon", coordinates: [boundary] };
}

export function useMapMasterBoundary(): MapMasterGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ mm: mapMasterCollection }));
  const publisher = useStoredPublisher();
  const congregation_id = publisher?.congregation_id;

  const features = ((data ?? []) as MapMaster[])
    .filter(
      (row): row is MapMaster & { boundary: number[][] } =>
        row.congregation_id === congregation_id && isValidBoundary(row.boundary),
    )
    .map((row) => ({
      type: "Feature" as const,
      geometry: toGeoJSONPolygon(row.boundary),
      properties: {
        congregation_id: row.congregation_id,
        details: row.details ?? null,
      },
    }));

  return { type: "FeatureCollection", features };
}
