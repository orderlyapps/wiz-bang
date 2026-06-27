import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import type { MapRow } from "@shared/database/schemas/map";
import { useSelectedMap } from "./useSelectedMapContext";

export function useSelectedMapName(): string | null {
  const { data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const publisher = useStoredPublisher();
  const congregation_id = publisher?.congregation_id;
  const { selectedMapId } = useSelectedMap();

  if (!selectedMapId) return null;

  const map = ((data ?? []) as MapRow[]).find(
    (row) => row.id === selectedMapId && row.congregation_id === congregation_id,
  );

  return map?.name ?? null;
}
