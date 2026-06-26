import { IonList, IonItem, IonLabel } from "@ionic/react";
import { useMapsList } from "../hooks/useMapsList";
import type { MapRow } from "@shared/database/schemas/map";

type MapWithBoundary = MapRow & { boundary: number[][] };

interface MapListProps {
  onMapSelect: (map: MapWithBoundary) => void;
}

export function MapList({ onMapSelect }: MapListProps) {
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
        </IonItem>
      ))}
    </IonList>
  );
}
