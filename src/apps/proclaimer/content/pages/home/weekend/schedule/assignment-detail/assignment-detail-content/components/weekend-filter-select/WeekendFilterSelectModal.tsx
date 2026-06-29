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
import { CopyIconButton } from "@ui/components/inputs/button/icon/copy/CopyIconButton";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { IncrementInput } from "@ui/components/inputs/increment-input/IncrementInput";
import { AlertMultiSelect } from "@ui/components/inputs/alert-multi-select/AlertMultiSelect";
import {
  weekendAssignmentIDs,
  weekendAssignmentLabels,
} from "@shared/database/schemas/weekend-assignment";
import type {
  WeekendFilterSortPreset,
  WeekendPublisherFilter,
  PublisherSortOrder,
} from "../../hooks/use-weekend-presets/types";
import { sortOrderLabels } from "../../hooks/use-weekend-presets/types";
import { DEFAULT_WEEKEND_PRESET_ID } from "../../hooks/use-weekend-presets/defaultWeekendPreset";

const weekendAssignmentOptions = weekendAssignmentIDs.map((id) => ({
  label: weekendAssignmentLabels[id],
  value: id,
}));

interface WeekendFilterSelectModalProps {
  is_open: boolean;
  presets: WeekendFilterSortPreset[];
  active_preset: WeekendFilterSortPreset;
  is_default_active: boolean;
  on_select_preset: (id: string) => void;
  on_create_preset: (name: string) => void;
  on_rename_preset: (id: string, name: string) => void;
  on_delete_preset: (id: string) => void;
  on_change: (filter: WeekendPublisherFilter, sort_order: PublisherSortOrder) => void;
  on_dismiss: () => void;
}

export function WeekendFilterSelectModal({
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
}: WeekendFilterSelectModalProps) {
  const [show_save_alert, set_show_save_alert] = useState(false);
  const [show_rename_alert, set_show_rename_alert] = useState(false);

  const preset_options = presets.map((p) => ({ label: p.name, value: p.id }));
  const has_custom_presets = presets.some((p) => p.id !== DEFAULT_WEEKEND_PRESET_ID);

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
        <IonItem className="flex-left" lines="none">
          <CopyIconButton on_click={() => set_show_save_alert(true)} />
          <EditIconButton
            disabled={is_default_active}
            on_click={() => set_show_rename_alert(true)}
          />
          <DeleteIconButton
            disabled={is_default_active}
            alert_header="Delete preset"
            alert_message="Are you sure you want to delete this preset?"
            on_click={() => on_delete_preset(active_preset.id)}
          />
        </IonItem>
      ),
    },
  ];

  const sort_options: PublisherSortOrder[] = [
    "alphabetical",
    "weeks_away_closest",
    "avg_weeks_between",
  ];

  const filter_items = [
    {
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
    },
    {
      id: "min_weeks_away",
      node: (
        <IncrementInput
          label="Minimum Weeks From Closest Assignment"
          value={active_preset.filter.min_weeks_away_closest}
          min={0}
          disabled={is_default_active}
          on_change={(value) =>
            on_change(
              { ...active_preset.filter, min_weeks_away_closest: value },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
    {
      id: "min_avg_weeks",
      node: (
        <IncrementInput
          label="Average Weeks Between Assignments"
          value={active_preset.filter.min_avg_weeks_between}
          min={0}
          disabled={is_default_active}
          on_change={(value) =>
            on_change(
              { ...active_preset.filter, min_avg_weeks_between: value },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
    {
      id: "participation_types",
      node: (
        <AlertMultiSelect
          label="Participant Assignment Types"
          options={weekendAssignmentOptions}
          selected={active_preset.filter.participation_types}
          disabled={is_default_active}
          on_change={(values) =>
            on_change(
              { ...active_preset.filter, participation_types: values as string[] },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
    {
      id: "stat_participation_types",
      node: (
        <AlertMultiSelect
          label="Statistics Included Assignment Types"
          options={weekendAssignmentOptions}
          selected={active_preset.filter.stat_participation_types}
          disabled={is_default_active}
          on_change={(values) =>
            on_change(
              { ...active_preset.filter, stat_participation_types: values as string[] },
              active_preset.sort_order,
            )
          }
        />
      ),
    },
  ];

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
                NOTE: Save the current filters as a preset using the copy icon above.
              </IonNote>
            </IonItem>
          )}
        </IonList>
        <Space size="xl" />
        <MultiColumnList
          items={filter_items}
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
          { text: "Cancel", role: "cancel", handler: () => set_show_save_alert(false) },
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
              presets.find((p) => p.id === active_preset.id && p.id !== DEFAULT_WEEKEND_PRESET_ID)
                ?.name ?? "",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel", handler: () => set_show_rename_alert(false) },
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
