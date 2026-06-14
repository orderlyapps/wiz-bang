import { useState } from "react";
import {
  IonButton,
  IonAlert,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
} from "@ionic/react";
import { Select } from "@ui/components/inputs/select/Select";
import type { FilterSortPreset } from "../../../../../../hooks/use-presets/usePresets";
import { DEFAULT_PRESET_ID } from "../../../../../../hooks/use-presets/defaultPresets";

interface PresetManagerProps {
  presets: FilterSortPreset[];
  active_preset_id: string;
  is_default_active: boolean;
  on_select: (id: string) => void;
  on_create: (name: string) => void;
  on_rename: (id: string, name: string) => void;
  on_duplicate: (id: string) => void;
  on_delete: (id: string) => void;
}

export function PresetManager({
  presets,
  active_preset_id,
  is_default_active,
  on_select,
  on_create,
  on_rename,
  on_duplicate,
  on_delete,
}: PresetManagerProps) {
  const [show_save_alert, set_show_save_alert] = useState(false);
  const [show_rename_alert, set_show_rename_alert] = useState(false);
  const [show_delete_confirm, set_show_delete_confirm] = useState(false);

  const preset_options = presets.map((p) => ({ label: p.name, value: p.id }));
  const active_preset_name = presets.find((p) => p.id === active_preset_id)?.name ?? "";

  return (
    <IonList>
      <IonListHeader>
        <IonLabel>Preset</IonLabel>
      </IonListHeader>
      <Select
        key={`${active_preset_id}:${active_preset_name}`}
        label="Active preset"
        value={active_preset_id}
        options={preset_options}
        interface_type="popover"
        on_change={(id) => on_select(id as string)}
      />
      {is_default_active && (
        <IonItem lines="none">
          <IonNote color="medium">Duplicate to customise</IonNote>
        </IonItem>
      )}
      <IonItem lines="none">
        <IonButton fill="clear" size="small" onClick={() => set_show_save_alert(true)}>
          Save as new
        </IonButton>
        <IonButton fill="clear" size="small" onClick={() => on_duplicate(active_preset_id)}>
          Duplicate
        </IonButton>
        <IonButton
          fill="clear"
          size="small"
          disabled={is_default_active}
          onClick={() => set_show_rename_alert(true)}
        >
          Rename
        </IonButton>
        <IonButton
          fill="clear"
          size="small"
          color="danger"
          disabled={is_default_active}
          onClick={() => set_show_delete_confirm(true)}
        >
          Delete
        </IonButton>
      </IonItem>

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

      <IonAlert
        isOpen={show_delete_confirm}
        header="Delete preset"
        message="Are you sure you want to delete this preset?"
        buttons={[
          { text: "Cancel", role: "cancel", handler: () => set_show_delete_confirm(false) },
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              on_delete(active_preset_id);
              set_show_delete_confirm(false);
            },
          },
        ]}
        onDidDismiss={() => set_show_delete_confirm(false)}
      />
    </IonList>
  );
}
