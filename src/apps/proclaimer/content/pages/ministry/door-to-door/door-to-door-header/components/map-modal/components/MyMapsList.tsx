import { IonList, IonItem, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { imageOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { useMapsList } from "../hooks/useMapsList";
import { mapLogCollection } from "@shared/database/collections/map-log";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Heading } from "@ui/components/display/text/heading/Heading";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapLogRow } from "@shared/database/schemas/map-log";
import type { Publisher } from "@shared/database/schemas/publisher";

interface MyMapsListProps {
  onMapSelect: (map: MapRow & { boundary: number[][] }) => void;
  onPreviewImage: (url: string) => void;
}

export function MyMapsList({ onMapSelect, onPreviewImage }: MyMapsListProps) {
  const session = useAuthSession();
  const auth_user_id = session?.user?.id;
  const allMaps = useMapsList();
  const { data: logs_data } = useLiveQuery((q) => q.from({ l: mapLogCollection }));
  const { data: publishers_data } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const all_logs = (logs_data as MapLogRow[] | undefined) ?? [];
  const all_publishers = (publishers_data as Publisher[] | undefined) ?? [];

  const my_publisher = all_publishers.find((p) => p.auth_id === auth_user_id);
  const my_publisher_id = my_publisher?.id;

  const my_checked_out_map_ids = new Set(
    all_logs
      .filter(
        (log) => log.checked_out_at && !log.checked_in_at && log.publisher_id === my_publisher_id,
      )
      .map((log) => log.map_id),
  );

  const myMaps = allMaps.filter((map) => map.id && my_checked_out_map_ids.has(map.id));

  if (myMaps.length === 0) {
    return null;
  }

  return (
    <>
      <IonItem>
        <Heading>My Maps</Heading>
      </IonItem>

      <IonList>
        {myMaps.map((map) => (
          <LabelValueItem
            key={map.id}
            label={map.name}
            label_color="success"
            value={map.details ?? undefined}
            on_click={() => onMapSelect(map)}
            end_detail={
              map.url ? (
                <IonButtons slot="end">
                  <IonButton
                    fill="clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreviewImage(map.url!);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={imageOutline} size="large" />
                  </IonButton>
                </IonButtons>
              ) : undefined
            }
          />
        ))}
      </IonList>
    </>
  );
}
