import { useState } from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonItem } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MapList } from "./components/MapList";
import { RecentMapsList } from "./components/RecentMapsList";
import { MapImagePreview } from "./components/map-image-preview/MapImagePreview";
import { useRecentMaps } from "./hooks/useRecentMaps";
import type { MapRow } from "@shared/database/schemas/map";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  onMapSelect?: (map: MapWithBoundary) => void;
}

export function MapModal({ is_open, on_dismiss, onMapSelect }: MapModalProps) {
  const { recentMaps, addToRecentMaps } = useRecentMaps();
  const [preview_url, set_preview_url] = useState<string | null>(null);

  function handleMapSelect(map: MapWithBoundary) {
    // Persist the selected map to recent maps
    addToRecentMaps(map);
    onMapSelect?.(map);
    on_dismiss();
  }

  return (
    <>
      <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Maps</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton on_click={on_dismiss} skip_confirmation />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <RecentMapsList
            recentMapIds={recentMaps.map((m) => m.id)}
            onMapSelect={handleMapSelect}
            onPreviewImage={set_preview_url}
          />

          <Space />

          <IonItem>
            <Heading>All Maps</Heading>
          </IonItem>
          <MapList onMapSelect={handleMapSelect} onPreviewImage={set_preview_url} />
        </IonContent>
      </ResponsiveModal>
      {preview_url && (
        <MapImagePreview url={preview_url} on_dismiss={() => set_preview_url(null)} />
      )}
    </>
  );
}
