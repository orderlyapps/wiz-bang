import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import { Select } from "@ui/components/inputs/select/Select";
import { NumberInput } from "@ui/components/inputs/number/NumberInput";
import { ToggleInput } from "@ui/components/inputs/toggle/ToggleInput";
import { mapTagCollection } from "@shared/database/collections/map-tag";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapTagRow } from "@shared/database/schemas/map-tag";
import { checkoutFilterLabels } from "../use-map-log-filters/useMapLogFilters";
import type { MapLogFilters, CheckoutFilter } from "../use-map-log-filters/useMapLogFilters";

type Props = {
  is_open: boolean;
  filters: MapLogFilters;
  on_change: (filters: MapLogFilters) => void;
  on_dismiss: () => void;
};

export function MapLogFilterModal({ is_open, filters, on_change, on_dismiss }: Props) {
  const { data: tags_data } = useLiveQuery((q) =>
    q.from({ t: mapTagCollection }).orderBy(({ t }) => t.name),
  );
  const congregation = useStoredCongregation();

  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const congregation_tags = all_tags.filter((t) => t.congregation_id === congregation?.id);
  const tag_options = congregation_tags.map((t) => ({ label: t.name, value: t.id ?? "" }));

  const checkout_options = (Object.keys(checkoutFilterLabels) as CheckoutFilter[]).map((o) => ({
    value: o,
    label: checkoutFilterLabels[o],
  }));

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter &amp; Sort</IonTitle>
          <IonButtons slot="end">
            <CloseIconButton on_click={on_dismiss} skip_confirmation />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <Select
            label="Checked Out"
            value={filters.checkout_filter}
            options={checkout_options}
            on_change={(v) => on_change({ ...filters, checkout_filter: v as CheckoutFilter })}
          />
          <NumberInput
            label="Min Weeks Since Activity"
            value={filters.min_weeks_since_activity?.toString() ?? ""}
            placeholder="Any"
            on_change={(v) =>
              on_change({
                ...filters,
                min_weeks_since_activity:
                  v.trim() === "" ? null : Math.max(0, parseInt(v, 10) || 0),
              })
            }
          />
          <ToggleInput
            label="Untagged Only"
            checked={filters.untagged_only}
            on_change={(checked) =>
              on_change({
                ...filters,
                untagged_only: checked,
                tag_ids: checked ? [] : filters.tag_ids,
              })
            }
          />
        </IonList>
        {!filters.untagged_only && (
          <AlertMultiSelect
            label="Tags"
            options={tag_options}
            selected={filters.tag_ids}
            placeholder="Filter by tag..."
            on_change={(tag_ids) => on_change({ ...filters, tag_ids })}
          />
        )}
        <TextButton fill="clear" label="Done" on_click={on_dismiss} style={{ marginTop: 16 }} />
      </IonContent>
    </ResponsiveModal>
  );
}
