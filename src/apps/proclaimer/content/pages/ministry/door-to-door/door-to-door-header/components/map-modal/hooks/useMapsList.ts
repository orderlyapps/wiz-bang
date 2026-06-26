import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import type { MapRow } from "@shared/database/schemas/map";
import { isValidBoundary } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/boundary";

export function useMapsList(): (MapRow & { boundary: number[][] })[] {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const publisher = useStoredPublisher();
  const congregation_id = publisher?.congregation_id;

  return ((data ?? []) as MapRow[])
    .filter(
      (row): row is MapRow & { boundary: number[][] } =>
        row.congregation_id === congregation_id && isValidBoundary(row.boundary),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}
