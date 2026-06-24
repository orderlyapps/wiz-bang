import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { isValidBoundary } from "../../../utils/boundary";
import type { MapRow } from "@shared/database/schemas/map";

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { id: string | null; name: string; details: string | null };
};

export type MapsGeoJSON = {
  type: "FeatureCollection";
  features: PolygonFeature[];
};

function toGeoJSONPolygon(boundary: number[][]): { type: "Polygon"; coordinates: number[][][] } {
  return { type: "Polygon", coordinates: [boundary] };
}

export function useMapsBoundary(): MapsGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const publisher = useStoredPublisher();
  const congregation_id = publisher?.congregation_id;

  const features = ((data ?? []) as MapRow[])
    .filter(
      (row): row is MapRow & { boundary: number[][] } =>
        row.congregation_id === congregation_id && isValidBoundary(row.boundary),
    )
    .map((row) => ({
      type: "Feature" as const,
      geometry: toGeoJSONPolygon(row.boundary),
      properties: {
        id: row.id ?? null,
        name: row.name,
        details: row.details ?? null,
      },
    }));

  return { type: "FeatureCollection", features };
}
