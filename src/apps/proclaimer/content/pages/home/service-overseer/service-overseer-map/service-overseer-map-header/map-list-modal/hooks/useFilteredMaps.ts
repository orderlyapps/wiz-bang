import { useLiveQuery } from "@tanstack/react-db";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { mapTagAssignmentCollection } from "@shared/database/collections/map-tag-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { MapTagAssignmentRow } from "@shared/database/schemas/map-tag-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MapModalFilters } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-header/components/map-modal/hooks/useMapFilters";

export function useFilteredMaps<T extends MapRow>(
  maps: T[],
  search_query: string,
  filters: MapModalFilters,
): T[] {
  const { data: logs_data } = useLiveQuery((q) => q.from({ l: mapLogCollection }));
  const { data: assignments_data } = useLiveQuery((q) => q.from({ a: mapTagAssignmentCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_assignments = (assignments_data as MapTagAssignmentRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const publisher_name_by_id = new Map(
    all_publishers.map((p) => [p.id ?? "", getPublisherDisplayName(p)]),
  );

  const checked_out_map_ids = new Set(
    all_logs.filter((log) => log.checked_out_at && !log.checked_in_at).map((log) => log.map_id),
  );

  const checked_out_name_by_map_id = new Map(
    all_logs
      .filter((log) => log.checked_out_at && !log.checked_in_at)
      .map((log) => [log.map_id, publisher_name_by_id.get(log.publisher_id) ?? ""]),
  );

  const tag_map_ids = new Set(
    all_assignments.filter((a) => filters.tag_ids.includes(a.tag_id)).map((a) => a.map_id),
  );

  const all_tagged_map_ids = new Set(all_assignments.map((a) => a.map_id));

  return maps.filter((map) => {
    if (search_query) {
      const q = search_query.toLowerCase();
      const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
      if (
        !map.name.toLowerCase().includes(q) &&
        !(map.details ?? "").toLowerCase().includes(q) &&
        !checked_out_name.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (filters.checked_out_only && !checked_out_map_ids.has(map.id!)) {
      return false;
    }
    if (filters.untagged_only && all_tagged_map_ids.has(map.id!)) {
      return false;
    }
    if (filters.tag_ids.length > 0 && !tag_map_ids.has(map.id!)) {
      return false;
    }
    return true;
  });
}
