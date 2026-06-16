import { useLiveQuery } from "@tanstack/react-db";
import { notAtHomeCollection } from "@shared/database/collections/not-at-home";
import type { NotAtHome } from "@shared/database/schemas/not-at-home";

type PointFeature = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: { id: string; write: boolean };
};

export type NotAtHomeGeoJSON = {
  type: "FeatureCollection";
  features: PointFeature[];
};

export function useNotAtHomeMarkers(): NotAtHomeGeoJSON {
  const { data } = useLiveQuery((q) => q.from({ nah: notAtHomeCollection }));

  const features = ((data ?? []) as NotAtHome[])
    .filter((row) => row.coordinates.length >= 2)
    .map((row) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [row.coordinates[0], row.coordinates[1]] as [number, number],
      },
      properties: {
        id: row.id ?? "",
        write: row.write,
      },
    }));

  return { type: "FeatureCollection", features };
}
