import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapRow } from "@shared/database/schemas/map";
import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

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
      {congregation_maps.length === 0 && (
        <IonItem>
          <IonLabel className="ion-text-center">
            <p>No maps yet.</p>
          </IonLabel>
        </IonItem>
      )}
      {congregation_maps.map((map) => (
        <NavItem key={map.id} to={`/home/service-overseer/map-log/${map.id}`} label={map.name} />
      ))}
    </IonList>
  );
}
