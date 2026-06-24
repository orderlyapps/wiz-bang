import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { useStoredPublisher } from "@proclaimer-shared/publisher/useStoredPublisher";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { boundaryToBounds } from "../../utils/boundary";
import { getRecentMapIds } from "../../utils/useRecentMaps";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapMaster } from "@shared/database/schemas/map-master";
import type { SelectedMap } from "../../utils/types";

type MapListModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (selection: SelectedMap) => void;
};

export function MapListModal({ isOpen, onDidDismiss, onSelect }: MapListModalProps) {
  const { data: maps } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: masters } = useLiveQuery((q) => q.from({ mm: mapMasterCollection }));
  const publisher = useStoredPublisher();
  const congregation_id = publisher?.congregation_id;

  const filtered_maps = maps?.filter((map) => map.congregation_id === congregation_id);
  const recent_ids = getRecentMapIds();
  const recent_maps = recent_ids
    .map((id) => filtered_maps?.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m != null);
  const filtered_masters = masters?.filter((master) => master.congregation_id === congregation_id);
  const master = filtered_masters?.[0];

  function handleSelectMap(map: MapRow) {
    if (!map.id) return;
    const bounds = boundaryToBounds(map.boundary);
    if (!bounds) return;
    onSelect({ type: "map", id: map.id, boundary: map.boundary, bounds, blocks: map.blocks });
    onDidDismiss();
  }

  function handleSelectMaster(master: MapMaster) {
    const bounds = boundaryToBounds(master.boundary);
    if (!bounds) return;
    onSelect({
      type: "master",
      congregation_id: master.congregation_id,
      boundary: master.boundary,
      bounds,
    });
    onDidDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Maps</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <IonList>
          {recent_maps.length > 0 && (
            <>
              <IonListHeader>
                <IonLabel>Recently Edited</IonLabel>
              </IonListHeader>
              {recent_maps.map((map) => (
                <IonItem button key={`recent-${map.id}`} onClick={() => handleSelectMap(map)}>
                  <IonLabel>{map.name}</IonLabel>
                </IonItem>
              ))}
              <IonItemDivider />
            </>
          )}
          {master && (
            <IonItem button onClick={() => handleSelectMaster(master)}>
              <IonLabel>The master map</IonLabel>
            </IonItem>
          )}
          {filtered_maps?.map((map) => (
            <IonItem button key={map.id ?? map.name} onClick={() => handleSelectMap(map)}>
              <IonLabel>{map.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
