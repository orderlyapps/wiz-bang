import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { layersOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { mapCollection } from "@shared/database/collections/map";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { MapRow } from "@shared/database/schemas/map";
import type { Publisher } from "@shared/database/schemas/publisher";

function formatDate(date_str: string | null | undefined): string {
  if (!date_str) return "—";
  const date = new Date(date_str);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getPublisherName(publisher_id: string, publishers: Publisher[]): string {
  const publisher = publishers.find((p) => p.id === publisher_id);
  return (
    publisher?.display_name ?? `${publisher?.first_name ?? ""} ${publisher?.last_name ?? ""}`.trim()
  );
}

function getMapName(map_id: string, maps: MapRow[]): string {
  return maps.find((m) => m.id === map_id)?.name ?? "Unknown map";
}

export function MapLogContent() {
  const { data: logs_data } = useLiveQuery((q) => q.from({ ml: mapLogCollection }));
  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const congregation_map_ids = new Set(
    all_maps.filter((m) => m.congregation_id === congregation_id && m.id).map((m) => m.id),
  );
  const filtered_logs = all_logs
    .filter((log) => log.map_id && congregation_map_ids.has(log.map_id))
    .sort((a, b) => (b.checked_out_at ?? "").localeCompare(a.checked_out_at ?? ""));

  function handleCheckIn(log_id: string) {
    mapLogCollection.update(log_id, (draft) => {
      draft.checked_in_at = new Date().toISOString();
    });
  }

  return (
    <IonList>
      <IonItem routerLink="/home/service-overseer/map-log/bulk-entry" button detail>
        <IonIcon icon={layersOutline} slot="start" color="primary" />
        <IonLabel>
          <h3>Bulk Entry</h3>
          <p>Add historical map logs</p>
        </IonLabel>
      </IonItem>
      {filtered_logs.length === 0 && (
        <IonItem>
          <IonLabel className="ion-text-center">
            <p>No map logs yet. Tap + to check out a map.</p>
          </IonLabel>
        </IonItem>
      )}
      {filtered_logs.map((log) => {
        const is_checked_out = !log.checked_in_at;
        return (
          <IonItem key={log.id} detail={false}>
            <IonLabel>
              <h3>{getMapName(log.map_id, all_maps)}</h3>
              <p>{getPublisherName(log.publisher_id, all_publishers)}</p>
              <p>
                Out: {formatDate(log.checked_out_at)} · In: {formatDate(log.checked_in_at)}
              </p>
              {log.notes && <p>{log.notes}</p>}
            </IonLabel>
            {is_checked_out && (
              <IonButton
                slot="end"
                fill="outline"
                size="small"
                onClick={() => log.id && handleCheckIn(log.id)}
              >
                Check In
              </IonButton>
            )}
          </IonItem>
        );
      })}
    </IonList>
  );
}
