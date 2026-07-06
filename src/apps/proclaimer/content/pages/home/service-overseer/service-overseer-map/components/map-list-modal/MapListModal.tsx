import { useRef, useState } from "react";
import {
  IonActionSheet,
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline, documentAttachOutline } from "ionicons/icons";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { boundaryToBounds } from "../../utils/boundary";
import { kmlToGeoJSON } from "../../utils/kml-to-geojson";
import { getRecentMapIds } from "../../utils/useRecentMaps";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapMaster } from "@shared/database/schemas/map-master";
import type { SelectedMap } from "../../utils/types";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

type MapListModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
  onSelect: (selection: SelectedMap) => void;
  onImportKml: (geojson: GeoJSON.FeatureCollection) => void;
};

export function MapListModal({ isOpen, onDidDismiss, onSelect, onImportKml }: MapListModalProps) {
  const [show_add_alert, set_show_add_alert] = useState(false);
  const [show_add_action_sheet, set_show_add_action_sheet] = useState(false);
  const [show_error_alert, set_show_error_alert] = useState(false);
  const file_input_ref = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const geojson = kmlToGeoJSON(text);
        if (geojson.features.length === 0) {
          set_show_error_alert(true);
          return;
        }
        onImportKml(geojson);
        onDidDismiss();
      } catch {
        set_show_error_alert(true);
      }
    };
    reader.onerror = () => {
      set_show_error_alert(true);
    };
    reader.readAsText(file);
    event.target.value = "";
  }
  const { data: maps } = useLiveQuery((q) =>
    q.from({ m: mapCollection }).orderBy(({ m }) => m.name),
  );
  const { data: masters } = useLiveQuery((q) => q.from({ mm: mapMasterCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

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
    onSelect({
      type: "map",
      id: map.id,
      name: map.name,
      details: map.details,
      url: map.url,
      boundary: map.boundary,
      bounds,
      blocks: map.blocks,
    });
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
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
          <IonTitle>Maps</IonTitle>
          <IonButtons slot="end">
            <AddIconButton on_click={() => set_show_add_action_sheet(true)} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <IonList>
          {recent_maps.length > 0 && (
            <>
              <IonItem>
                <IonLabel>
                  <Heading size="md" bold>
                    Recent Maps
                  </Heading>
                </IonLabel>
              </IonItem>

              {recent_maps.map((map) => (
                <IonItem button key={`recent-${map.id}`} onClick={() => handleSelectMap(map)}>
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
                All Maps
              </Heading>
            </IonLabel>
          </IonItem>

          {master && (
            <IonItem button onClick={() => handleSelectMaster(master)}>
              <IonLabel>Master Map</IonLabel>
            </IonItem>
          )}

          {filtered_maps?.map((map) => (
            <IonItem button key={map.id ?? map.name} onClick={() => handleSelectMap(map)}>
              <IonLabel>
                {map.name} {map.details ? `| ${map.details}` : ""}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={show_add_alert}
        header="New Map"
        inputs={[{ name: "name", type: "text", placeholder: "Map name" }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Create",
            handler: (data: { name: string }) => {
              const name = data.name.trim();
              if (!name || !congregation_id) return;
              const id = crypto.randomUUID();
              mapCollection.insert({
                id,
                congregation_id,
                name,
                boundary: null,
                blocks: null,
              });
              onSelect({
                type: "map",
                id,
                name,
                details: null,
                url: null,
                boundary: null,
                blocks: null,
              });
              onDidDismiss();
            },
          },
        ]}
        onDidDismiss={() => set_show_add_alert(false)}
      />
      <IonActionSheet
        isOpen={show_add_action_sheet}
        onDidDismiss={() => set_show_add_action_sheet(false)}
        buttons={[
          {
            text: "Add Map",
            icon: addOutline,
            handler: () => set_show_add_alert(true),
          },
          {
            text: "Import KML File",
            icon: documentAttachOutline,
            handler: () => file_input_ref.current?.click(),
          },
          { text: "Cancel", role: "cancel" },
        ]}
      />
      <input
        ref={file_input_ref}
        type="file"
        accept=".kml"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <IonAlert
        isOpen={show_error_alert}
        header="Import Failed"
        message="Could not import the KML file. Please ensure it is a valid KML file with at least one placemark."
        buttons={["OK"]}
        onDidDismiss={() => set_show_error_alert(false)}
      />
    </IonModal>
  );
}
