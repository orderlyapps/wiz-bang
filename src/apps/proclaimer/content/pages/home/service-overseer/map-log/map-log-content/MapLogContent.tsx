import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { layersOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";

export function MapLogContent() {
  const { data: maps_data } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_maps = (maps_data as MapRow[] | undefined) ?? [];
  const congregation_maps = all_maps.filter((m) => m.congregation_id === congregation_id);

  return (
    <IonList>
      <IonItem routerLink="/home/service-overseer/map-log/bulk-entry" button detail>
        <IonIcon icon={layersOutline} slot="start" color="primary" />
        <IonLabel>
          <h3>Bulk Entry</h3>
          <p>Add historical map logs</p>
        </IonLabel>
      </IonItem>
      {congregation_maps.length === 0 && (
        <IonItem>
          <IonLabel className="ion-text-center">
            <p>No maps yet.</p>
          </IonLabel>
        </IonItem>
      )}
      {congregation_maps.map((map) => (
        <IonItem key={map.id} routerLink={`/home/service-overseer/map-log/${map.id}`} button detail>
          <IonLabel>
            <h3>{map.name}</h3>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
