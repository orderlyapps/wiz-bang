import { IonList, IonItem, IonLabel, IonNote } from "@ionic/react";
import { useMapsList } from "../hooks/useMapsList";
import type { MapRow } from "@shared/database/schemas/map";

interface RecentMapsListProps {
  recentMapIds: string[];
  onMapSelect: (map: MapRow & { boundary: number[][] }) => void;
}

export function RecentMapsList({ recentMapIds, onMapSelect }: RecentMapsListProps) {
  const allMaps = useMapsList();

  // Filter maps to only include recent ones, maintaining the order from recentMapIds
  const recentMaps = recentMapIds
    .map((id) => allMaps.find((map) => map.id === id))
    .filter(Boolean) as (MapRow & { boundary: number[][] })[];

  if (recentMaps.length === 0) {
    return null;
  }

  return (
    <>
      <div style={{ padding: "16px 16px 8px 16px" }}>
        <h3
          style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "var(--ion-color-dark)" }}
        >
          Recently Selected
        </h3>
      </div>
      <IonList>
        {recentMaps.map((map) => (
          <IonItem key={map.id} button onClick={() => onMapSelect(map)}>
            <IonLabel>
              <h2>{map.name}</h2>
              {map.details && <p>{map.details}</p>}
            </IonLabel>
            <IonNote slot="end" color="medium">
              Recent
            </IonNote>
          </IonItem>
        ))}
      </IonList>
    </>
  );
}
