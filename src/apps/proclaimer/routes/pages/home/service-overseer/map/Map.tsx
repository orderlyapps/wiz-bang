import { useEffect, useRef, useState } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerMapHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader";
import { ServiceOverseerMapContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent";
import MapMenu from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-menu/MapMenu";
import type { FitBoundsFn } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";
import { useMapPage } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/useMapPage";
import {
  type ScreenshotSettings,
  DEFAULT_SCREENSHOT_SETTINGS,
  screenshotSettingsSchema,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { selectableStyles, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

function isSelectableStyleId(value: string): value is SelectableStyleId {
  return selectableStyles.some((s) => s.id === value);
}

function ServiceOverseerMapPage() {
  const fitBoundsRef = useRef<FitBoundsFn | null>(null);
  const save_settings_timeout_ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const save_style_timeout_ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [style_id, set_style_id] = useState<SelectableStyleId>(() => {
    try {
      const stored = localStorage.getItem(localStorageKeys.mapStyle);
      if (stored && isSelectableStyleId(stored)) {
        return stored;
      }
    } catch {
      /* ignore */
    }
    return "custom-local";
  });
  const [screenshot_settings, set_screenshot_settings] = useState<ScreenshotSettings>(() => {
    try {
      const stored = localStorage.getItem(localStorageKeys.screenshotSettings);
      if (stored) {
        return screenshotSettingsSchema.parse({
          ...DEFAULT_SCREENSHOT_SETTINGS,
          ...(JSON.parse(stored) as Record<string, unknown>),
        });
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_SCREENSHOT_SETTINGS;
  });

  function handleScreenshotSettingsChange(settings: ScreenshotSettings) {
    set_screenshot_settings(settings);
    if (save_settings_timeout_ref.current) clearTimeout(save_settings_timeout_ref.current);
    save_settings_timeout_ref.current = setTimeout(() => {
      try {
        localStorage.setItem(localStorageKeys.screenshotSettings, JSON.stringify(settings));
      } catch {
        /* ignore */
      }
    }, 500);
  }

  function handleStyleIdChange(nextStyleId: SelectableStyleId) {
    set_style_id(nextStyleId);
    if (save_style_timeout_ref.current) clearTimeout(save_style_timeout_ref.current);
    save_style_timeout_ref.current = setTimeout(() => {
      try {
        localStorage.setItem(localStorageKeys.mapStyle, nextStyleId);
      } catch {
        /* ignore */
      }
    }, 500);
  }

  useEffect(() => {
    return () => {
      if (save_settings_timeout_ref.current) clearTimeout(save_settings_timeout_ref.current);
      if (save_style_timeout_ref.current) clearTimeout(save_style_timeout_ref.current);
    };
  }, []);

  const {
    selected_map,
    selected_block,
    has_pending_changes,
    handleSelect,
    handleDeselect,
    handlePendingChange,
    handleBlockPendingChange,
    screenshot_mode,
    handleToggleScreenshot,
    handleEditBoundary,
    handleRenameBlock,
    handleUpdateMap,
    handleEditBlock,
    handleDeleteBlock,
    handleDeleteMap,
    handleAddBlock,
    handleSave,
  } = useMapPage((bounds) => bounds && fitBoundsRef.current?.(bounds));

  return (
    <>
      <MapMenu
        hasPendingChanges={has_pending_changes}
        onSave={handleSave}
        selectedMap={selected_map}
        onDeselect={handleDeselect}
        screenshotMode={screenshot_mode}
        screenshotSettings={screenshot_settings}
        onScreenshotSettingsChange={handleScreenshotSettingsChange}
        onToggleScreenshot={handleToggleScreenshot}
        onEditBoundary={handleEditBoundary}
        onUpdateMap={handleUpdateMap}
        onRenameBlock={handleRenameBlock}
        onDeleteMap={handleDeleteMap}
        onEditBlock={handleEditBlock}
        onDeleteBlock={handleDeleteBlock}
        onAddBlock={handleAddBlock}
        styleId={style_id}
        onStyleIdChange={handleStyleIdChange}
      />
      <IonPage id="map-content">
        <IonHeader>
          <ServiceOverseerMapHeader onSelect={handleSelect} selected_map={selected_map} />
        </IonHeader>
        <IonContent className="content-full" scrollY={false}>
          <ServiceOverseerMapContent
            fitBoundsRef={fitBoundsRef}
            selectedMap={selected_map}
            selectedBlock={selected_block}
            screenshotMode={screenshot_mode}
            screenshotSettings={screenshot_settings}
            onPendingChange={handlePendingChange}
            onBlockPendingChange={handleBlockPendingChange}
            styleId={style_id}
          />
        </IonContent>
      </IonPage>
    </>
  );
}

export default ServiceOverseerMapPage;
