import { Fragment, useState } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { Label } from "@ui/components/display/text/label/Label";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { CheckoutModal } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/checkout-modal/CheckoutModal";

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
  if (!publisher) return "Unknown";
  return getPublisherDisplayName(publisher);
}

interface MapLogListProps {
  map_id: string;
}

export function MapLogList({ map_id }: MapLogListProps) {
  const [editing_log, set_editing_log] = useState<MapLogRow | undefined>(undefined);
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

  return (
    <IonList>
      <Space size="sm" />
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
          <Fragment key={log.id}>
            {is_checked_out && (
              <>
                <SaveTextButton
                  on_click={() => log.id && handleCheckIn(log.id)}
                  label="Check In"
                  confirm_text="Check In"
                  alert_message="Are you sure you want check in this map?"
                />
                <Space size="sm" />
              </>
            )}
            <IonItem button detail={false} onClick={() => set_editing_log(log)}>
              <IonLabel>
                <Label>{getPublisherName(log.publisher_id, all_publishers)}</Label>
                <br />
                <Body>Out: {formatDate(log.checked_out_at)}</Body>
                <br />
                <Body>In: {formatDate(log.checked_in_at)}</Body>
                {log.notes && (
                  <>
                    <br />
                    <Body>{log.notes}</Body>
                  </>
                )}
              </IonLabel>
            </IonItem>
          </Fragment>
        );
      })}
      {editing_log && (
        <CheckoutModal
          key={editing_log.id}
          isOpen
          onDidDismiss={() => set_editing_log(undefined)}
          existing_log={editing_log}
        />
      )}
    </IonList>
  );
}
