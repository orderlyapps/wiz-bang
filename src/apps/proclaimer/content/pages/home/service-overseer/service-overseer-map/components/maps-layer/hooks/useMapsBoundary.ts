import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
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

function isValidPolygon(
  boundary: unknown,
): boundary is { type: "Polygon"; coordinates: number[][][] } {
  return Array.isArray(boundary) && boundary.length > 0 && Array.isArray(boundary[0]);
}

function toGeoJSONPolygon(boundary: unknown): { type: "Polygon"; coordinates: number[][][] } {
  const coords = boundary as number[][];
  return { type: "Polygon", coordinates: [coords] };
}

export function useMapsBoundary(): MapsGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));

  const features = ((data ?? []) as MapRow[])
    .filter((row) => isValidPolygon(row.boundary))
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
