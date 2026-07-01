import { IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { useMapsList } from "../hooks/useMapsList";
import type { MapRow } from "@shared/database/schemas/map";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapListProps {
  onMapSelect: (map: MapWithBoundary) => void;
  onPreviewImage: (url: string) => void;
}

export function MapList({ onMapSelect, onPreviewImage }: MapListProps) {
  const maps = useMapsList();

  if (maps.length === 0) {
    return (
      <div style={{ padding: "16px", textAlign: "center", color: "var(--ion-color-medium)" }}>
        No maps available
      </div>
    );
  }

  return (
    <IonList>
      {maps.map((map) => (
        <IonItem key={map.id} button onClick={() => onMapSelect(map)}>
          <IonLabel>
            <h2>{map.name}</h2>
            {map.details && <p>{map.details}</p>}
          </IonLabel>
          {map.url && (
            <IonButtons slot="end">
              <IonButton
                fill="clear"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviewImage(map.url!);
                }}
              >
                <IonIcon slot="icon-only" icon={imageOutline} />
              </IonButton>
            </IonButtons>
          )}
        </IonItem>
      ))}
    </IonList>
  );
}
