import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from "@ionic/react";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { MapList } from "./components/MapList";
import type { MapRow } from "@shared/database/schemas/map";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapModalProps {
  is_open: boolean;
  on_dismiss: () => void;
  onMapSelect?: (map: MapWithBoundary) => void;
}

export function MapModal({ is_open, on_dismiss, onMapSelect }: MapModalProps) {
  function handleMapSelect(map: MapWithBoundary) {
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
        <MapList onMapSelect={handleMapSelect} />
      </IonContent>
    </ResponsiveModal>
  );
}
