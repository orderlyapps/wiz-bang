import { useLiveQuery } from "@tanstack/react-db";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { mapTagAssignmentCollection } from "@shared/database/collections/map-tag-assignment";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { MapTagAssignmentRow } from "@shared/database/schemas/map-tag-assignment";
import type { MapLogFilters } from "../use-map-log-filters/useMapLogFilters";

export function useFilteredMapLogMaps(
  maps: MapRow[],
  filters: MapLogFilters,
): { maps: MapRow[]; last_activity_by_map_id: Map<string, string> } {
  const { data: logs_data } = useLiveQuery((q) => q.from({ l: mapLogCollection }));
  const { data: assignments_data } = useLiveQuery((q) => q.from({ a: mapTagAssignmentCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_assignments = (assignments_data as MapTagAssignmentRow[] | undefined) ?? [];

  const checked_out_map_ids = new Set(
    all_logs.filter((log) => log.checked_out_at && !log.checked_in_at).map((log) => log.map_id),
  );

  const last_activity_by_map_id = new Map<string, string>();
  for (const log of all_logs) {
    const map_id = log.map_id;
    const activity = log.checked_in_at ?? log.checked_out_at ?? "";
    const current = last_activity_by_map_id.get(map_id) ?? "";
    if (activity > current) {
      last_activity_by_map_id.set(map_id, activity);
    }
  }

  const tag_map_ids = new Set(
    all_assignments.filter((a) => filters.tag_ids.includes(a.tag_id)).map((a) => a.map_id),
  );
  const all_tagged_map_ids = new Set(all_assignments.map((a) => a.map_id));

  const now_ms = Date.now();

  const filtered = maps.filter((map) => {
    if (filters.checkout_filter === "checked_out_only" && !checked_out_map_ids.has(map.id!))
      return false;
    if (filters.checkout_filter === "hide_checked_out" && checked_out_map_ids.has(map.id!))
      return false;
    if (filters.untagged_only && all_tagged_map_ids.has(map.id!)) return false;
    if (!filters.untagged_only && filters.tag_ids.length > 0 && !tag_map_ids.has(map.id!))
      return false;
    if (filters.min_weeks_since_activity != null) {
      const activity = last_activity_by_map_id.get(map.id ?? "");
      if (!activity) return true;
      const weeks = Math.floor((now_ms - new Date(activity).getTime()) / (1000 * 60 * 60 * 24 * 7));
      if (weeks < filters.min_weeks_since_activity) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filters.checkout_filter === "any") {
      return a.name.localeCompare(b.name);
    }
    const a_activity = last_activity_by_map_id.get(a.id ?? "") ?? "";
    const b_activity = last_activity_by_map_id.get(b.id ?? "") ?? "";
    return b_activity.localeCompare(a_activity) || a.name.localeCompare(b.name);
  });

  return { maps: sorted, last_activity_by_map_id };
}
