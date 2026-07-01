import { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { MapView } from "@util/vendor/mapbox/MapView";
import { MapPolygonEditor } from "../components/map-polygon-editor/MapPolygonEditor";
import { MapBlockEditor } from "../components/map-block-editor/MapBlockEditor";
import type { Block, SelectedMap } from "../utils/types";
import { MapsLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/maps-layer/MapsLayer";
import { MapMasterLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/map-master-layer/MapMasterLayer";
import { MapBlocksLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/map-blocks-layer/MapBlocksLayer";
import { ScreenshotMapLayer } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/layers/screenshot-map-layer/ScreenshotMapLayer";
import { ScreenshotOverlay } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/screenshot-overlay/ScreenshotOverlay";
import {
  MapFitBoundsController,
  type FitBoundsFn,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";
import { doNotCallCollection } from "@shared/database/collections/do-not-call";
import { DoNotCallSource } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/do-not-call-source/DoNotCallSource";
import { DoNotCallAlert } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/do-not-call-source/components/do-not-call-alert/DoNotCallAlert";
import type { DoNotCall } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/layers/do-not-call-source/types";
import { DoNotCallModal } from "../components/do-not-call-modal/DoNotCallModal";
import { DoNotCallUnitModal } from "../components/do-not-call-unit-modal/DoNotCallUnitModal";
import type { ScreenshotSettings } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/screenshotSettings";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import type { SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";

type Props = {
  fitBoundsRef: React.MutableRefObject<FitBoundsFn | null>;
  selectedMap: SelectedMap | null;
  selectedBlock: Block | null;
  screenshotMode: boolean;
  screenshotSettings: ScreenshotSettings;
  onPendingChange: (boundary: GeoJSON.Position[] | null) => void;
  onBlockPendingChange: (block: Block | null) => void;
  styleId: SelectableStyleId;
  customLocalStyleSettings: CustomLocalStyleSettings;
};

export function ServiceOverseerMapContent({
  fitBoundsRef,
  selectedMap,
  selectedBlock,
  screenshotMode,
  screenshotSettings,
  onPendingChange,
  onBlockPendingChange,
  styleId,
  customLocalStyleSettings,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoNotCall, setSelectedDoNotCall] = useState<DoNotCall | null>(null);
  const [selectedDoNotCallGroupKey, setSelectedDoNotCallGroupKey] = useState<string | null>(null);

  return (
    <>
      <MapView
        id="service-overseer-map"
        style={{ position: "absolute", inset: 0 }}
        height="100%"
        styleId={styleId}
        customLocalStyleSettings={customLocalStyleSettings}
      >
        <MapFitBoundsController fitBoundsRef={fitBoundsRef} />
        {screenshotMode && selectedMap ? (
          <>
            <ScreenshotMapLayer selectedMap={selectedMap} settings={screenshotSettings} />
            {selectedMap.type === "map" && (
              <ScreenshotOverlay
                name={selectedMap.name}
                details={selectedMap.details}
                fontSize={screenshotSettings.overlay_font_size}
              />
            )}
          </>
        ) : (
          <>
            <MapMasterLayer />
            <MapsLayer />
            <DoNotCallSource
              onSelect={setSelectedDoNotCall}
              onSelectGroup={setSelectedDoNotCallGroupKey}
            />
            {selectedMap && <MapBlocksLayer selectedMap={selectedMap} />}
            {selectedBlock && (
              <MapBlockEditor block={selectedBlock} onPendingChange={onBlockPendingChange} />
            )}
            {selectedMap && !selectedBlock && (
              <MapPolygonEditor
                key={selectedMap.type === "map" ? selectedMap.id : selectedMap.congregation_id}
                selection={selectedMap}
                onPendingChange={onPendingChange}
              />
            )}
          </>
        )}
      </MapView>

      {!screenshotMode && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsModalOpen(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      )}

      <DoNotCallModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        onSave={(coordinates) => {
          setIsModalOpen(false);
          const [lng, lat] = coordinates;
          fitBoundsRef.current?.([
            [lng - 0.001, lat - 0.001],
            [lng + 0.001, lat + 0.001],
          ]);
        }}
      />

      <DoNotCallAlert
        selected={selectedDoNotCall}
        onDismiss={() => setSelectedDoNotCall(null)}
        onDelete={(id) => doNotCallCollection.delete(id)}
      />

      <DoNotCallUnitModal
        groupKey={selectedDoNotCallGroupKey}
        onDismiss={() => setSelectedDoNotCallGroupKey(null)}
      />
    </>
  );
}
