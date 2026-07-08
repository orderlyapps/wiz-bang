import {
  IonButton,
  IonIcon,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonList,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";
import { MapNavigation } from "./components/map-navigation/MapNavigation";

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

interface MapLogDetailContentProps {
  map_id: string;
}

export function MapLogDetailContent({ map_id }: MapLogDetailContentProps) {
  const { data: logs_data } = useLiveQuery((q) => q.from({ ml: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const map_logs = all_logs
    .filter((log) => log.map_id === map_id)
    .sort((a, b) => (b.checked_out_at ?? "").localeCompare(a.checked_out_at ?? ""));

  function handleCheckIn(log_id: string) {
    mapLogCollection.update(log_id, (draft) => {
      draft.checked_in_at = new Date().toISOString();
    });
  }

  function handleDeleteLog(log_id: string) {
    mapLogCollection.delete(log_id);
  }

  return (
    <>
      <MapNavigation map_id={map_id} />
      <IonList>
        {map_logs.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>No logs for this map yet.</p>
            </IonLabel>
          </IonItem>
        )}
        {map_logs.map((log) => {
          const is_checked_out = !log.checked_in_at;
          return (
            <IonItemSliding key={log.id}>
              <IonItem detail={false}>
                <IonLabel>
                  <h3>{getPublisherName(log.publisher_id, all_publishers)}</h3>
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
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => log.id && handleDeleteLog(log.id)}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          );
        })}
      </IonList>
    </>
  );
}
