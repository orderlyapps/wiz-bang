import { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import { Space } from "@ui/components/layout/space/Space";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { DeleteTextButton } from "@ui/components/inputs/button/text/delete/DeleteTextButton";
import { sortOrderLabels } from "@proclaimer-content/pages/home/clam-overseer/schedule/assignment-detail/assignment-detail-content/components/publisher-selector/hooks/use-publisher-sort/types";
import type { AvFilterSortPreset, AvPublisherFilter } from "../../hooks/use-av-presets/types";
import type { PublisherSortOrder } from "../../hooks/use-av-presets/types";
import { DEFAULT_AV_PRESET_ID } from "../../hooks/use-av-presets/defaultAvPresets";
import { getAvFilterInputItems } from "./AvFilterSection";

const sort_options: PublisherSortOrder[] = [
  "alphabetical",
  "weeks_away_closest",
  "avg_weeks_between",
];

interface AvFilterSelectModalProps {
  is_open: boolean;
  presets: AvFilterSortPreset[];
  active_preset: AvFilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: AvPublisherFilter, sort_order: PublisherSortOrder) => void;
  on_dismiss: () => void;
}

export function AvFilterSelectModal({
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
}: AvFilterSelectModalProps) {
  const [show_save_alert, set_show_save_alert] = useState(false);
  const [show_rename_alert, set_show_rename_alert] = useState(false);

  const preset_options = presets.map((p) => ({ label: p.name, value: p.id }));
  const has_custom_presets = presets.some((p) => p.id !== DEFAULT_AV_PRESET_ID);

  const preset_row_items = [
    {
      id: "select",
      node: (
        <Select
          key={`${active_preset.id}:${active_preset.name}`}
          label="Preset"
          value={active_preset.id}
          options={preset_options}
          interface_type="popover"
          on_change={(id) => on_select_preset(id as string)}
        />
      ),
    },
    {
      id: "actions",
      node: (
        <div className="flex-left" style={{ padding: "8px 16px" }}>
          <TextButton
            label="Duplicate"
            fill="clear"
            size="small"
            on_click={() => set_show_save_alert(true)}
          />
          {!is_default_active && (
            <TextButton
              label="Rename"
              fill="clear"
              size="small"
              on_click={() => set_show_rename_alert(true)}
            />
          )}
          {!is_default_active && (
            <DeleteTextButton
              label="Delete"
              fill="clear"
              size="small"
              alert_header="Delete preset"
              alert_message="Are you sure you want to delete this preset?"
              on_click={() => on_delete_preset(active_preset.id)}
            />
          )}
        </div>
      ),
    },
  ];

  const sort_item = {
    id: "sort",
    node: (
      <Select
        label="Sort"
        value={active_preset.sort_order}
        options={sort_options.map((o) => ({ value: o, label: sortOrderLabels[o] }))}
        disabled={is_default_active}
        on_change={(v) => on_change(active_preset.filter, v as PublisherSortOrder)}
      />
    ),
  };

  const filter_items = getAvFilterInputItems(active_preset.filter, is_default_active, (filter) =>
    on_change(filter, active_preset.sort_order),
  );

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
        <IonList>
          <MultiColumnList
            items={preset_row_items}
            get_id={(item) => item.id}
            render_item={(item) => item.node}
            gap="sm"
            column_offset={-1}
          />
          {!has_custom_presets && (
            <IonItem lines="none">
              <IonNote>
                NOTE: Save the current filters as a preset using the Duplicate button above.
              </IonNote>
            </IonItem>
          )}
        </IonList>
        <Space size="xl" />
        <MultiColumnList
          items={[sort_item, ...filter_items]}
          get_id={(item) => item.id}
          render_item={(item) => item.node}
          gap="md"
          max_columns={2}
          row_gap="lg"
        />
      </IonContent>

      <IonAlert
        isOpen={show_save_alert}
        header="Save preset"
        inputs={[{ name: "name", type: "text", placeholder: "Preset name" }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: { name: string }) => {
              if (data.name?.trim()) on_create_preset(data.name.trim());
              set_show_save_alert(false);
            },
          },
        ]}
        onDidDismiss={() => set_show_save_alert(false)}
      />
      <IonAlert
        isOpen={show_rename_alert}
        header="Rename preset"
        inputs={[
          {
            name: "name",
            type: "text",
            placeholder: "New name",
            value:
              presets.find((p) => p.id === active_preset.id && p.id !== DEFAULT_AV_PRESET_ID)
                ?.name ?? "",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Rename",
            handler: (data: { name: string }) => {
              if (data.name?.trim()) on_rename_preset(active_preset.id, data.name.trim());
              set_show_rename_alert(false);
            },
          },
        ]}
        onDidDismiss={() => set_show_rename_alert(false)}
      />
    </ResponsiveModal>
  );
}
