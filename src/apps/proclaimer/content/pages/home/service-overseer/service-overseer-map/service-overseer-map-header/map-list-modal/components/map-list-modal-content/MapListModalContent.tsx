import { IonContent, IonItem, IonLabel, IonList } from "@ionic/react";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapMaster } from "@shared/database/schemas/map-master";

type MapListModalContentProps = {
  search_query: string;
  recent_maps: MapRow[];
  congregation_maps: MapRow[];
  search_filtered_maps: MapRow[];
  active_preset_name: string;
  master?: MapMaster;
  checked_out_name_by_map_id: Map<string, string>;
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
  checked_out_name_by_map_id,
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

            {recent_maps.map((map) => {
              const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
              return (
                <LabelValueItem
                  key={`recent-${map.id}`}
                  label={map.name}
                  label_color={checked_out_name ? "success" : undefined}
                  value={map.details ?? undefined}
                  value_2={checked_out_name || undefined}
                  on_click={() => on_select_map(map)}
                />
              );
            })}
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

        {master && <LabelValueItem label="Master Map" on_click={() => on_select_master(master)} />}

        {search_filtered_maps.map((map) => {
          const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
          return (
            <LabelValueItem
              key={map.id ?? map.name}
              label={map.name}
              label_color={checked_out_name ? "success" : undefined}
              value={map.details ?? undefined}
              value_2={checked_out_name || undefined}
              on_click={() => on_select_map(map)}
            />
          );
        })}
      </IonList>
    </IonContent>
  );
}
