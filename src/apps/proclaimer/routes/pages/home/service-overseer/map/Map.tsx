import { useRef } from "react";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { ServiceOverseerMapHeader } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-header/ServiceOverseerMapHeader";
import { ServiceOverseerMapContent } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/service-overseer-map-content/ServiceOverseerMapContent";
import MapMenu from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-menu/MapMenu";
import type { FitBoundsFn } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/components/map-fit-bounds-controller/MapFitBoundsController";
import { useMapPage } from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/useMapPage";

function ServiceOverseerMapPage() {
  const fitBoundsRef = useRef<FitBoundsFn | null>(null);
  const {
    selected_map,
    selected_block,
    has_pending_changes,
    handleSelect,
    handleDeselect,
    handlePendingChange,
    handleBlockPendingChange,
    handleEditBoundary,
    handleRenameBlock,
    handleUpdateMap,
    handleEditBlock,
    handleDeleteBlock,
    handleDeleteMap,
    handleAddBlock,
    handleSave,
  } = useMapPage((bounds) => fitBoundsRef.current?.(bounds));

  return (
    <>
      <MapMenu
        hasPendingChanges={has_pending_changes}
        onSave={handleSave}
        selectedMap={selected_map}
        onDeselect={handleDeselect}
        onEditBoundary={handleEditBoundary}
        onUpdateMap={handleUpdateMap}
        onRenameBlock={handleRenameBlock}
        onDeleteMap={handleDeleteMap}
        onEditBlock={handleEditBlock}
        onDeleteBlock={handleDeleteBlock}
        onAddBlock={handleAddBlock}
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
            onPendingChange={handlePendingChange}
            onBlockPendingChange={handleBlockPendingChange}
          />
        </IonContent>
      </IonPage>
    </>
  );
}

export default ServiceOverseerMapPage;
