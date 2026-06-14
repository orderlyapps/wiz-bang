import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import type {
  FilterSortPreset,
  PublisherFilter,
  PublisherSortOrder,
} from "../../../../hooks/use-presets/usePresets";
import { PresetManager } from "./components/preset-manager/PresetManager";
import { SortSection } from "./components/sort-section/SortSection";
import { FilterSection } from "./components/filter-section/FilterSection";

interface FilterSelectModalProps {
  is_open: boolean;
  presets: FilterSortPreset[];
  active_preset: FilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: PublisherFilter, sort_order: PublisherSortOrder) => void;
  on_dismiss: () => void;
}

export function FilterSelectModal({
  is_open,
  presets,
  active_preset,
  is_default_active,
  on_select_preset,
  on_create_preset,
  on_rename_preset,
  on_delete_preset,
  on_change,
  on_dismiss,
}: FilterSelectModalProps) {
  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter &amp; Sort</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PresetManager
          presets={presets}
          active_preset_id={active_preset.id}
          is_default_active={is_default_active}
          on_select={on_select_preset}
          on_create={on_create_preset}
          on_rename={on_rename_preset}
          on_delete={on_delete_preset}
        />
        <SortSection
          sort_order={active_preset.sort_order}
          disabled={is_default_active}
          on_change={(sort_order) => on_change(active_preset.filter, sort_order)}
        />
        <FilterSection
          filter={active_preset.filter}
          disabled={is_default_active}
          on_change={(filter) => on_change(filter, active_preset.sort_order)}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
