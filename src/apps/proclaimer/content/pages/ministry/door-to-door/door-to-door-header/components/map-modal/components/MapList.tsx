import { IonList, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { useMapsList } from "../hooks/useMapsList";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { mapTagAssignmentCollection } from "@shared/database/collections/map-tag-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { MapTagAssignmentRow } from "@shared/database/schemas/map-tag-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MapModalFilters } from "../hooks/useMapFilters";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapListProps {
  onMapSelect: (map: MapWithBoundary) => void;
  onPreviewImage: (url: string) => void;
  search_query: string;
  filters: MapModalFilters;
}

export function MapList({ onMapSelect, onPreviewImage, search_query, filters }: MapListProps) {
  const maps = useMapsList();
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

  const filtered = maps.filter((map) => {
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

  if (filtered.length === 0) {
    return (
      <div style={{ padding: "16px", textAlign: "center", color: "var(--ion-color-medium)" }}>
        No maps found
      </div>
    );
  }

  return (
    <IonList>
      {filtered.map((map) => {
        const is_checked_out = checked_out_map_ids.has(map.id ?? "");
        const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
        return (
          <LabelValueItem
            key={map.id}
            label={map.name}
            label_color={is_checked_out ? "success" : undefined}
            value={map.details ?? undefined}
            value_2={checked_out_name || undefined}
            on_click={() => onMapSelect(map)}
            end_detail={
              map.url ? (
                <IonButtons slot="end">
                  <IonButton
                    fill="clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreviewImage(map.url!);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={imageOutline} size="large" />
                  </IonButton>
                </IonButtons>
              ) : undefined
            }
          />
        );
      })}
    </IonList>
  );
}
