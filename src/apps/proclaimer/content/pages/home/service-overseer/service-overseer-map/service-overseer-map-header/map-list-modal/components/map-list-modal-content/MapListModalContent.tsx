import { IonContent, IonItem, IonLabel, IonList } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapMaster } from "@shared/database/schemas/map-master";

type MapListModalContentProps = {
  search_query: string;
  recent_maps: MapRow[];
  congregation_maps: MapRow[];
  search_filtered_maps: MapRow[];
  active_preset_name: string;
  master?: MapMaster;
  on_select_map: (map: MapRow) => void;
  on_select_master: (master: MapMaster) => void;
};

export function MapListModalContent({
  search_query,
  recent_maps,
  congregation_maps,
  search_filtered_maps,
  active_preset_name,
  master,
  on_select_map,
  on_select_master,
}: MapListModalContentProps) {
  return (
    <IonContent className="content-wide">
      <IonList>
        {search_query.trim() === "" && recent_maps.length > 0 && (
          <>
            <IonItem>
              <IonLabel>
                <Heading size="md" bold>
                  Recent Maps
                </Heading>
              </IonLabel>
            </IonItem>

            {recent_maps.map((map) => (
              <IonItem button key={`recent-${map.id}`} onClick={() => on_select_map(map)}>
                <IonLabel>
                  {map.name} {map.details ? `| ${map.details}` : ""}
                </IonLabel>
              </IonItem>
            ))}
          </>
        )}

        <Space></Space>

        <IonItem>
          <IonLabel>
            <Heading size="md" bold>
              {active_preset_name}
            </Heading>
          </IonLabel>
          <div slot="end">
            <Body size="sm">
              {search_filtered_maps.length} of {congregation_maps.length}
            </Body>
          </div>
        </IonItem>

        {master && (
          <IonItem button onClick={() => on_select_master(master)}>
            <IonLabel>Master Map</IonLabel>
          </IonItem>
        )}

        {search_filtered_maps.map((map) => (
          <IonItem button key={map.id ?? map.name} onClick={() => on_select_map(map)}>
            <IonLabel>
              {map.name} {map.details ? `| ${map.details}` : ""}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
}
