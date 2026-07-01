import { IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { useMapsList } from "../hooks/useMapsList";
import type { MapRow } from "@shared/database/schemas/map";
import { Heading } from "@ui/components/display/text/heading/Heading";

interface RecentMapsListProps {
  recentMapIds: string[];
  onMapSelect: (map: MapRow & { boundary: number[][] }) => void;
  onPreviewImage: (url: string) => void;
}

export function RecentMapsList({ recentMapIds, onMapSelect, onPreviewImage }: RecentMapsListProps) {
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
      <IonItem>
        <Heading>Recent Maps</Heading>
      </IonItem>

      <IonList>
        {recentMaps.map((map) => (
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
    </>
  );
}
