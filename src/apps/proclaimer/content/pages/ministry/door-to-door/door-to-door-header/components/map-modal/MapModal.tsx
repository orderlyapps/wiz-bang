import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MapList } from "./components/MapList";
import { RecentMapsList } from "./components/RecentMapsList";
import { useRecentMaps } from "./hooks/useRecentMaps";
import type { MapRow } from "@shared/database/schemas/map";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  onMapSelect?: (map: MapWithBoundary) => void;
}

export function MapModal({ is_open, on_dismiss, onMapSelect }: MapModalProps) {
  const { recentMaps, addToRecentMaps } = useRecentMaps();

  function handleMapSelect(map: MapWithBoundary) {
    // Persist the selected map to recent maps
    addToRecentMaps(map);
    onMapSelect?.(map);
    on_dismiss();
  }

  return (
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
        <RecentMapsList recentMapIds={recentMaps.map((m) => m.id)} onMapSelect={handleMapSelect} />
        <div style={{ padding: "16px 16px 8px 16px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: "600",
              color: "var(--ion-color-dark)",
            }}
          >
            All Maps
          </h3>
        </div>
        <MapList onMapSelect={handleMapSelect} />
      </IonContent>
    </ResponsiveModal>
  );
}
