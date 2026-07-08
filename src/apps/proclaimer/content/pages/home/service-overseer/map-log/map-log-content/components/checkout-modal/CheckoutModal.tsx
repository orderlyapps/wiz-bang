import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { ModalSelect } from "@ui/components/inputs/modal-select/ModalSelect";
import { DateInput } from "@ui/components/inputs/date/DateInput";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { PublisherSelectModal } from "@proclaimer-content/pages/home/service-overseer/map-log/bulk-entry/bulk-entry-content/components/bulk-checkout/components/publisher-select-modal/PublisherSelectModal";
import { MapSelectModal } from "./components/map-select-modal/MapSelectModal";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";

type CheckoutModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

export function CheckoutModal({ isOpen, onDidDismiss }: CheckoutModalProps) {
  const [selected_map_id, set_selected_map_id] = useState<string | undefined>(undefined);
  const [selected_map_name, set_selected_map_name] = useState("");
  const [show_map_modal, set_show_map_modal] = useState(false);
  const [selected_publisher_id, set_selected_publisher_id] = useState<string | undefined>(
    undefined,
  );
  const [selected_publisher_name, set_selected_publisher_name] = useState("");
  const [show_publisher_modal, set_show_publisher_modal] = useState(false);
  const [checked_out_date, set_checked_out_date] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const [notes, set_notes] = useState("");

  const { data: maps_data } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: logs_data } = useLiveQuery((q) => q.from({ ml: mapLogCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps.filter((m) => m.congregation_id === congregation_id);
  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const checked_out_map_ids = new Set(
    all_logs.filter((log) => !log.checked_in_at && log.map_id).map((log) => log.map_id),
  );
  const available_maps = congregation_maps.filter((m) => m.id && !checked_out_map_ids.has(m.id));

  function handleCheckout() {
    if (!selected_map_id || !selected_publisher_id) return;
    mapLogCollection.insert({
      id: crypto.randomUUID(),
      map_id: selected_map_id,
      publisher_id: selected_publisher_id,
      checked_out_at: new Date(checked_out_date + "T00:00:00").toISOString(),
      checked_in_at: null,
      notes: notes.trim() || null,
    });
    onDidDismiss();
  }

  function handleDismiss() {
    set_selected_map_id(undefined);
    set_selected_map_name("");
    set_selected_publisher_id(undefined);
    set_selected_publisher_name("");
    set_checked_out_date(new Date().toISOString().substring(0, 10));
    set_notes("");
    onDidDismiss();
  }

  function handlePublisherSelect(publisher: Publisher) {
    set_selected_publisher_id(publisher.id);
    set_selected_publisher_name(getPublisherDisplayName(publisher));
  }

  function handleMapSelect(map: MapRow) {
    set_selected_map_id(map.id);
    set_selected_map_name(map.name);
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
        <ModalSelect
          label="Map"
          display_value={selected_map_name}
          placeholder="Select a map"
          on_open={() => set_show_map_modal(true)}
        />
        <MapSelectModal
          isOpen={show_map_modal}
          onDismiss={() => set_show_map_modal(false)}
          onSelect={handleMapSelect}
          selectedId={selected_map_id}
          maps={available_maps}
        />
        <ModalSelect
          label="Publisher"
          display_value={selected_publisher_name}
          placeholder="Select a publisher"
          on_open={() => set_show_publisher_modal(true)}
        />
        <PublisherSelectModal
          isOpen={show_publisher_modal}
          onDismiss={() => set_show_publisher_modal(false)}
          onSelect={handlePublisherSelect}
          selectedId={selected_publisher_id}
        />
        <DateInput
          label="Check Out Date"
          value={checked_out_date}
          on_change={set_checked_out_date}
        />
        <IonList>
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
