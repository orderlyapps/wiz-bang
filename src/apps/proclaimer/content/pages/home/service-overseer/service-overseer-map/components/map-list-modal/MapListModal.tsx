import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import type { LngLatBoundsLike } from "mapbox-gl";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";

type MapListModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelectBounds: (bounds: LngLatBoundsLike) => void;
};

function boundsFromCoords(coords: number[][]): LngLatBoundsLike | null {
  if (coords.length < 4 || typeof coords[0][0] !== "number") return null;
  let minLng = coords[0][0];
  let maxLng = coords[0][0];
  let minLat = coords[0][1];
  let maxLat = coords[0][1];
  for (const [lng, lat] of coords) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLng, minLat, maxLng, maxLat];
}

export function MapListModal({ isOpen, onDidDismiss, onSelectBounds }: MapListModalProps) {
  const { data: maps } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: masters } = useLiveQuery((q) => q.from({ mm: mapMasterCollection }));

  function handleSelect(boundary: unknown) {
    if (!Array.isArray(boundary) || boundary.length === 0) return;
    const bounds = boundsFromCoords(boundary as number[][]);
    if (!bounds) return;
    onSelectBounds(bounds);
    onDidDismiss();
  }

  const master = masters?.[0];

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
          {master && (
            <IonItem button onClick={() => handleSelect(master.boundary)}>
              <IonLabel>The master map</IonLabel>
            </IonItem>
          )}
          {maps?.map((map) => (
            <IonItem button key={map.id ?? map.name} onClick={() => handleSelect(map.boundary)}>
              <IonLabel>{map.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
