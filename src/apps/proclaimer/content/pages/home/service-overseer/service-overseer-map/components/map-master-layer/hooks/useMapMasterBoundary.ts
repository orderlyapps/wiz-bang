import { useLiveQuery } from "@tanstack/react-db";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import type { MapMaster } from "@shared/database/schemas/map-master";
import { useEffect } from "react";

type PolygonFeature = {
  type: "Feature";
  geometry: { type: "Polygon"; coordinates: number[][][] };
  properties: { congregation_id: string; details: string | null };
};

export type MapMasterGeoJSON = {
  type: "FeatureCollection";
  features: PolygonFeature[];
};

function isValidPolygon(
  boundary: unknown,
): boundary is { type: "Polygon"; coordinates: number[][][] } {
  // Data is stored as raw coordinates array, not GeoJSON object
  return Array.isArray(boundary) && boundary.length > 0 && Array.isArray(boundary[0]);
}

function toGeoJSONPolygon(boundary: unknown): { type: "Polygon"; coordinates: number[][][] } {
  // Wrap raw coordinates array in GeoJSON Polygon format
  // Polygon coordinates must be an array of linear rings (arrays of [lng, lat] pairs)
  const coords = boundary as number[][];
  return { type: "Polygon", coordinates: [coords] };
}

export function useMapMasterBoundary(): MapMasterGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ mm: mapMasterCollection }));

  useEffect(() => {
    console.log("[useMapMasterBoundary] raw data:", data);
    if (data && data.length > 0) {
      const row = data[0] as MapMaster;
      console.log("[useMapMasterBoundary] first row:", row);
      console.log("[useMapMasterBoundary] boundary value:", row.boundary);
      console.log("[useMapMasterBoundary] boundary type:", typeof row.boundary);
      if (row.boundary && typeof row.boundary === "object") {
        const b = row.boundary as Record<string, unknown>;
        console.log("[useMapMasterBoundary] boundary.type:", b.type);
        console.log("[useMapMasterBoundary] isValidPolygon:", isValidPolygon(row.boundary));
      }
    }
  }, [data]);

  const features = ((data ?? []) as MapMaster[])
    .filter((row) => isValidPolygon(row.boundary))
    .map((row) => ({
      type: "Feature" as const,
      geometry: toGeoJSONPolygon(row.boundary),
      properties: {
        congregation_id: row.congregation_id,
        details: row.details ?? null,
      },
    }));

  useEffect(() => {
    console.log("[useMapMasterBoundary] features:", features);
  }, [features]);

  return { type: "FeatureCollection", features };
}
