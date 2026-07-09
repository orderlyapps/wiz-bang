import { useState } from "react";
import { IonContent } from "@ionic/react";
import { MapStyleSelect } from "@util/vendor/mapbox/MapStyleSelect";
import { Space } from "@ui/components/layout/space/Space";
import type { SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";
import type { ScreenshotSettings } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import { ScreenshotSettingsSection } from "./components/screenshot-settings-section/ScreenshotSettingsSection";
import { MapDetailsSection } from "./components/map-details-section/MapDetailsSection";
import { MapActionsSection } from "./components/map-actions-section/MapActionsSection";
import { MapLogModal } from "./components/map-log-modal/MapLogModal";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";

type Props = {
  styleId: SelectableStyleId;
  onStyleIdChange: (styleId: SelectableStyleId) => void;
  screenshotMode: boolean;
  is_map: boolean;
  customLocalStyleSettings: CustomLocalStyleSettings;
  onCustomLocalStyleSettingsChange: (settings: CustomLocalStyleSettings) => void;
  screenshotSettings: ScreenshotSettings;
  onScreenshotSettingsChange: (settings: ScreenshotSettings) => void;
  selectedMap: SelectedMap | null;
  onUpdateMap: (name: string, details: string, url: string) => void;
  hasPendingChanges: boolean;
  onSave: () => void;
  onEditBoundary: () => void;
  onDeleteMap: () => void;
  blocks: Block[] | null;
  onRenameBlock: (blockId: string, name: string) => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
};

export function MapMenuContent({
  styleId,
  onStyleIdChange,
  screenshotMode,
  is_map,
  customLocalStyleSettings,
  onCustomLocalStyleSettingsChange,
  screenshotSettings,
  onScreenshotSettingsChange,
  selectedMap,
  onUpdateMap,
  hasPendingChanges,
  onSave,
  onEditBoundary,
  onDeleteMap,
  blocks,
  onRenameBlock,
  onEditBlock,
  onDeleteBlock,
}: Props) {
  const [show_logs, set_show_logs] = useState(false);

  const map_id = selectedMap?.type === "map" ? selectedMap.id : null;

  return (
    <IonContent className="content-wide">
      {is_map && map_id && (
        <TextButton label="Records" fill="clear" on_click={() => set_show_logs(true)} />
      )}

      {map_id && (
        <MapLogModal isOpen={show_logs} onDidDismiss={() => set_show_logs(false)} map_id={map_id} />
      )}

      <MapStyleSelect value={styleId} on_change={onStyleIdChange} />

      {screenshotMode && is_map && (
        <ScreenshotSettingsSection
          styleId={styleId}
          customLocalStyleSettings={customLocalStyleSettings}
          onCustomLocalStyleSettingsChange={onCustomLocalStyleSettingsChange}
          screenshotSettings={screenshotSettings}
          onScreenshotSettingsChange={onScreenshotSettingsChange}
        />
      )}

      {!screenshotMode && is_map && selectedMap?.type === "map" && (
        <MapDetailsSection selectedMap={selectedMap} onUpdateMap={onUpdateMap} />
      )}

      {!screenshotMode && (
        <MapActionsSection
          is_map={is_map}
          hasPendingChanges={hasPendingChanges}
          onSave={onSave}
          onEditBoundary={onEditBoundary}
          onDeleteMap={onDeleteMap}
          blocks={blocks}
          onRenameBlock={onRenameBlock}
          onEditBlock={onEditBlock}
          onDeleteBlock={onDeleteBlock}
        />
      )}

      <Space />
    </IonContent>
  );
}
