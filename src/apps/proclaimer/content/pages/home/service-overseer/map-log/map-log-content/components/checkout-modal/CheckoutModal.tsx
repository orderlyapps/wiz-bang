import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";

type CheckoutModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

export function CheckoutModal({ isOpen, onDidDismiss }: CheckoutModalProps) {
  const [selected_map_id, set_selected_map_id] = useState<string | undefined>(undefined);
  const [selected_publisher_id, set_selected_publisher_id] = useState<string | undefined>(
    undefined,
  );
  const [notes, set_notes] = useState("");

  const { data: maps_data } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: logs_data } = useLiveQuery((q) => q.from({ ml: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps.filter((m) => m.congregation_id === congregation_id);
  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const checked_out_map_ids = new Set(
    all_logs.filter((log) => !log.checked_in_at && log.map_id).map((log) => log.map_id),
  );
  const available_maps = congregation_maps.filter((m) => m.id && !checked_out_map_ids.has(m.id));

  const publishers = ((publishers_data as Publisher[] | undefined) ?? []).filter(
    (p) => p.congregation_id === congregation_id && !p.archived_at,
  );

  function handleCheckout() {
    if (!selected_map_id || !selected_publisher_id) return;
    mapLogCollection.insert({
      id: crypto.randomUUID(),
      map_id: selected_map_id,
      publisher_id: selected_publisher_id,
      checked_out_at: new Date().toISOString(),
      checked_in_at: null,
      notes: notes.trim() || null,
    });
    onDidDismiss();
  }

  function handleDismiss() {
    set_selected_map_id(undefined);
    set_selected_publisher_id(undefined);
    set_notes("");
    onDidDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleDismiss}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Check Out Map</IonTitle>
          <IonButtons slot="end">
            <IonButton
              strong
              onClick={handleCheckout}
              disabled={!selected_map_id || !selected_publisher_id}
            >
              Check Out
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonSelect
              label="Map"
              labelPlacement="stacked"
              value={selected_map_id}
              onIonChange={(e) => set_selected_map_id(e.detail.value as string | undefined)}
              placeholder="Select a map"
            >
              {available_maps.map((map) => (
                <IonSelectOption key={map.id} value={map.id}>
                  {map.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              label="Publisher"
              labelPlacement="stacked"
              value={selected_publisher_id}
              onIonChange={(e) => set_selected_publisher_id(e.detail.value as string | undefined)}
              placeholder="Select a publisher"
            >
              {publishers.map((p) => (
                <IonSelectOption key={p.id} value={p.id}>
                  {p.display_name ?? `${p.first_name} ${p.last_name}`}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonTextarea
              label="Notes"
              labelPlacement="stacked"
              value={notes}
              onIonInput={(e) => set_notes((e.target as HTMLIonTextareaElement).value as string)}
              placeholder="Optional notes"
              autoGrow
            />
          </IonItem>
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
