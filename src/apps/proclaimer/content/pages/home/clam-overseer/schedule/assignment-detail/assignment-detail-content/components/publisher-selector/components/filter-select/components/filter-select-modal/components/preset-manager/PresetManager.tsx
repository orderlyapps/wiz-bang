import { useState } from "react";
import { IonAlert, IonItem, IonList, IonNote } from "@ionic/react";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Select } from "@ui/components/inputs/select/Select";
import { CopyIconButton } from "@ui/components/inputs/button/icon/copy/CopyIconButton";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import type { FilterSortPreset } from "../../../../../../hooks/use-presets/usePresets";
import { DEFAULT_PRESET_ID } from "../../../../../../hooks/use-presets/defaultPresets";

interface PresetManagerProps {
  presets: FilterSortPreset[];
  active_preset_id: string;
  is_default_active: boolean;
  on_select: (id: string) => void;
  on_create: (name: string) => void;
  on_rename: (id: string, name: string) => void;
  on_delete: (id: string) => void;
}

export function PresetManager({
  presets,
  active_preset_id,
  is_default_active,
  on_select,
  on_create,
  on_rename,
  on_delete,
}: PresetManagerProps) {
  const [show_save_alert, set_show_save_alert] = useState(false);
  const [show_rename_alert, set_show_rename_alert] = useState(false);

  const preset_options = presets.map((p) => ({ label: p.name, value: p.id }));
  const active_preset_name = presets.find((p) => p.id === active_preset_id)?.name ?? "";
  const has_custom_presets = presets.some((p) => p.id !== DEFAULT_PRESET_ID);

  const row_items = [
    {
      id: "select",
      node: (
        <Select
          key={`${active_preset_id}:${active_preset_name}`}
          label="Preset"
          value={active_preset_id}
          options={preset_options}
          interface_type="popover"
          on_change={(id) => on_select(id as string)}
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
            on_click={() => on_delete(active_preset_id)}
          />
        </IonItem>
      ),
    },
  ];

  return (
    <IonList>
      <MultiColumnList
        items={row_items}
        get_id={(item) => item.id}
        render_item={(item) => item.node}
        gap="sm"
        column_offset={-1}
      />

      {!has_custom_presets && (
        <IonItem lines="none">
          <IonNote>NOTE: Save the current filters as a preset using the copy icon above.</IonNote>
        </IonItem>
      )}

      <IonAlert
        isOpen={show_save_alert}
        header="Save preset"
        inputs={[{ name: "name", type: "text", placeholder: "Preset name" }]}
        buttons={[
          { text: "Cancel", role: "cancel", handler: () => set_show_save_alert(false) },
          {
            text: "Save",
            handler: (data: { name: string }) => {
              if (data.name?.trim()) on_create(data.name.trim());
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
              presets.find((p) => p.id === active_preset_id && p.id !== DEFAULT_PRESET_ID)?.name ??
              "",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel", handler: () => set_show_rename_alert(false) },
          {
            text: "Rename",
            handler: (data: { name: string }) => {
              if (data.name?.trim()) on_rename(active_preset_id, data.name.trim());
              set_show_rename_alert(false);
            },
          },
        ]}
        onDidDismiss={() => set_show_rename_alert(false)}
      />
    </IonList>
  );
}
