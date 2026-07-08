import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonItem,
  IonLabel,
  IonToggle,
  IonList,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { mapTagCollection } from "@shared/database/collections/map-tag";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapModalFilters } from "../../hooks/useMapFilters";
import type { MapTagRow } from "@shared/database/schemas/map-tag";

type Props = {
  is_open: boolean;
  on_dismiss: () => void;
  filters: MapModalFilters;
  on_change: (filters: MapModalFilters) => void;
};

export function MapFilterModal({ is_open, on_dismiss, filters, on_change }: Props) {
  const { data: tags_data } = useLiveQuery((q) =>
    q.from({ t: mapTagCollection }).orderBy(({ t }) => t.name),
  );
  const congregation = useStoredCongregation();

  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const congregation_tags = all_tags.filter((t) => t.congregation_id === congregation?.id);

  const tag_options = congregation_tags.map((t) => ({
    label: t.name,
    value: t.id ?? "",
  }));

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter Maps</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Checked Out Only</IonLabel>
            <IonToggle
              checked={filters.checked_out_only}
              onIonChange={(e) => on_change({ ...filters, checked_out_only: e.detail.checked })}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Untagged Only</IonLabel>
            <IonToggle
              checked={filters.untagged_only}
              onIonChange={(e) => on_change({ ...filters, untagged_only: e.detail.checked })}
            />
          </IonItem>
        </IonList>
        <AlertMultiSelect
          label="Tags"
          options={tag_options}
          selected={filters.tag_ids}
          placeholder="Filter by tag..."
          on_change={(tag_ids) => on_change({ ...filters, tag_ids })}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
