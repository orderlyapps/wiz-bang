import { useState, useRef } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import { AlertIconButton } from "@ui/components/inputs/button/icon/alert/AlertIconButton";
import { create, camera, cameraOutline } from "ionicons/icons";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddBlockFlow } from "./components/add-block-flow/AddBlockFlow";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";
import type { ScreenshotSettings } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import { RangeInput } from "@ui/components/inputs/range/RangeInput";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { AlertTextInput } from "@ui/components/inputs/alert-text/AlertTextInput";
import { RenameIconButton } from "@ui/components/inputs/button/icon/rename/RenameIconButton";
import { MapStyleSelect } from "@util/vendor/mapbox/MapStyleSelect";
import type { SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

type Props = {
  hasPendingChanges: boolean;
  onSave: () => void;
  selectedMap: SelectedMap | null;
  onDeselect: () => void;
  onEditBoundary: () => void;
  onUpdateMap: (name: string, details: string) => void;
  onDeleteMap: () => void;
  onRenameBlock: (blockId: string, name: string) => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (type: "block" | "face", name: string) => void;
  screenshotMode: boolean;
  screenshotSettings: ScreenshotSettings;
  onScreenshotSettingsChange: (settings: ScreenshotSettings) => void;
  onToggleScreenshot: () => void;
  styleId: SelectableStyleId;
  onStyleIdChange: (styleId: SelectableStyleId) => void;
  customLocalStyleSettings: CustomLocalStyleSettings;
  onCustomLocalStyleSettingsChange: (settings: CustomLocalStyleSettings) => void;
};

function MapMenu({
  hasPendingChanges,
  onSave,
  selectedMap,
  onDeselect,
  onEditBoundary,
  onUpdateMap,
  onDeleteMap,
  onRenameBlock,
  onEditBlock,
  onDeleteBlock,
  onAddBlock,
  screenshotMode,
  screenshotSettings,
  onScreenshotSettingsChange,
  onToggleScreenshot,
  styleId,
  onStyleIdChange,
  customLocalStyleSettings,
  onCustomLocalStyleSettingsChange,
}: Props) {
  const menu_ref = useRef<HTMLIonMenuElement>(null);
  const [show_add_flow, set_show_add_flow] = useState(false);
  const blocks = selectedMap?.type === "map" ? selectedMap.blocks : null;
  const can_add = selectedMap?.type === "map";
  const is_map = selectedMap?.type === "map";

  return (
    <IonMenu ref={menu_ref} side="end" contentId="map-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
          <IonButtons slot="end">
            {is_map && (
              <IonButton
                fill="clear"
                color={screenshotMode ? "primary" : "medium"}
                onClick={() => {
                  onToggleScreenshot();
                  if (!screenshotMode) void menu_ref.current?.close();
                }}
              >
                <IonIcon slot="icon-only" icon={screenshotMode ? camera : cameraOutline} />
              </IonButton>
            )}
            {can_add && !screenshotMode && (
              <AddIconButton on_click={() => set_show_add_flow(true)} />
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <AddBlockFlow
        is_open={show_add_flow}
        on_dismiss={() => set_show_add_flow(false)}
        on_add={(type, name) => {
          onAddBlock(type, name);
          set_show_add_flow(false);
        }}
      />
      <IonContent className="content-wide">
        <MapStyleSelect value={styleId} on_change={onStyleIdChange} />

        {screenshotMode && is_map && (
          <>
            {styleId === "custom-local" && (
              <>
                <RangeInput
                  label="Road Width"
                  value={customLocalStyleSettings.road_width_multiplier}
                  min={0.5}
                  max={3}
                  step={0.1}
                  on_change={(v) =>
                    onCustomLocalStyleSettingsChange({
                      ...customLocalStyleSettings,
                      road_width_multiplier: v,
                    })
                  }
                />
                <RangeInput
                  label="Road Label Size"
                  value={customLocalStyleSettings.road_label_size_multiplier}
                  min={0.6}
                  max={1.4}
                  step={0.02}
                  on_change={(v) =>
                    onCustomLocalStyleSettingsChange({
                      ...customLocalStyleSettings,
                      road_label_size_multiplier: v,
                    })
                  }
                />
              </>
            )}
            <RangeInput
              label="Label Font Size"
              value={screenshotSettings.overlay_font_size}
              min={8}
              max={48}
              step={1}
              on_change={(v) =>
                onScreenshotSettingsChange({ ...screenshotSettings, overlay_font_size: v })
              }
            />
            <RangeInput
              label="Boundary Line Width"
              value={screenshotSettings.boundary_line_width}
              min={0.5}
              max={8}
              step={0.5}
              on_change={(v) =>
                onScreenshotSettingsChange({ ...screenshotSettings, boundary_line_width: v })
              }
            />
            <RangeInput
              label="Block Line Width"
              value={screenshotSettings.block_line_width}
              min={0.5}
              max={8}
              step={0.5}
              on_change={(v) =>
                onScreenshotSettingsChange({ ...screenshotSettings, block_line_width: v })
              }
            />
            <RangeInput
              label="Block Text Size"
              value={screenshotSettings.block_text_size}
              min={8}
              max={32}
              step={1}
              on_change={(v) =>
                onScreenshotSettingsChange({ ...screenshotSettings, block_text_size: v })
              }
            />
            <RangeInput
              label="Block Opacity"
              value={screenshotSettings.block_opacity}
              min={0}
              max={1}
              step={0.1}
              on_change={(v) =>
                onScreenshotSettingsChange({ ...screenshotSettings, block_opacity: v })
              }
            />
          </>
        )}
        {!screenshotMode && is_map && selectedMap?.type === "map" && (
          <>
            <AlertTextInput
              label="Name"
              value={selectedMap.name}
              on_change={(name) => onUpdateMap(name, selectedMap.details ?? "")}
            />
            <AlertTextInput
              label="Details"
              value={selectedMap.details ?? ""}
              placeholder="Add details..."
              on_change={(details) => onUpdateMap(selectedMap.name, details)}
            />
            <Space />
          </>
        )}
        {!screenshotMode && (
          <IonList>
            <TextButton label="Save Changes" disabled={!hasPendingChanges} on_click={onSave} />

            <Space />

            {is_map && (
              <IonItem>
                <IonLabel>
                  <Body>Boundary</Body>
                </IonLabel>
                <IonButtons slot="end">
                  {hasPendingChanges ? (
                    <AlertIconButton
                      alert_header="Unsaved Changes"
                      alert_message="You have unsaved changes. Are you sure you want to edit the boundary?"
                      confirm_text="Edit Boundary"
                      on_click={onEditBoundary}
                    >
                      <IonIcon icon={create} />
                    </AlertIconButton>
                  ) : (
                    <EditIconButton on_click={onEditBoundary} />
                  )}
                  <DeleteIconButton
                    alert_header="Delete Map"
                    alert_message="Are you sure you want to permanently delete this map?"
                    confirm_text="Delete Map"
                    on_click={onDeleteMap}
                  />
                </IonButtons>
              </IonItem>
            )}

            {blocks
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((block) => (
                <IonItem key={block.id}>
                  <IonLabel>
                    <Body>{block.name}</Body>
                    <Body color="medium" size="xs">
                      {" "}
                      {block.type}
                    </Body>
                  </IonLabel>

                  <IonButtons slot="end">
                    <RenameIconButton
                      alert_header="Rename Block"
                      current_value={block.name}
                      on_rename={(name) => onRenameBlock(block.id, name)}
                    />
                    {hasPendingChanges ? (
                      <AlertIconButton
                        alert_header="Unsaved Changes"
                        alert_message="You have unsaved changes. Are you sure you want to edit this block?"
                        confirm_text="Edit Block"
                        on_click={() => onEditBlock(block)}
                      >
                        <IonIcon icon={create} />
                      </AlertIconButton>
                    ) : (
                      <EditIconButton on_click={() => onEditBlock(block)} />
                    )}
                    <DeleteIconButton on_click={() => onDeleteBlock(block.id)} />
                  </IonButtons>
                </IonItem>
              ))}
          </IonList>
        )}

        <Space />

        {hasPendingChanges ? (
          <SaveTextButton
            label="Finished"
            color="medium"
            alert_header="Unsaved Changes"
            alert_message="You have unsaved changes. Are you sure you want to change map?"
            confirm_text="Finish"
            on_click={() => {
              void menu_ref.current?.close();
              onDeselect();
            }}
          />
        ) : (
          <TextButton
            label="Finished"
            color="medium"
            on_click={() => {
              void menu_ref.current?.close();
              onDeselect();
            }}
          />
        )}
      </IonContent>
    </IonMenu>
  );
}

export default MapMenu;
