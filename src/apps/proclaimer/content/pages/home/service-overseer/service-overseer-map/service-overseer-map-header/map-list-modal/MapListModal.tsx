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
  IonSearchbar,
  IonIcon,
} from "@ionic/react";
import { addOutline, documentAttachOutline, filterOutline } from "ionicons/icons";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { useLiveQuery } from "@tanstack/react-db";
import { mapCollection } from "@shared/database/collections/map";
import { mapMasterCollection } from "@shared/database/collections/map-master";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import { localStorageKeys } from "@util/constants/localStorageKeys";
import { useMapLogPresets } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-map-log-presets/useMapLogPresets";
import { useFilteredMapLogMaps } from "@proclaimer-content/pages/home/service-overseer/map-log/map-log-content/components/use-filtered-map-log-maps/useFilteredMapLogMaps";
import { MapListFilterModal } from "./components/map-list-filter-modal/MapListFilterModal";
import { boundaryToBounds } from "../../utils/boundary";
import { kmlToGeoJSON } from "../../utils/kml-to-geojson";
import { getRecentMapIds, recordRecentMap } from "../../utils/useRecentMaps";
import type { MapRow } from "@shared/database/schemas/map";
import type { MapMaster } from "@shared/database/schemas/map-master";
import type { SelectedMap } from "../../utils/types";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";
import { Body } from "@ui/components/display/text/body/Body";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";

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
  const [search_query, set_search_query] = useState("");
  const [show_filters, set_show_filters] = useState(false);
  const file_input_ref = useRef<HTMLInputElement>(null);
  const presets_api = useMapLogPresets(
    localStorageKeys.soMapListFilterSortPresets,
    localStorageKeys.soMapListFilterSortActivePreset,
  );

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

  const congregation_maps = maps?.filter((map) => map.congregation_id === congregation_id) ?? [];
  const { maps: filtered_maps, checked_out_name_by_map_id } = useFilteredMapLogMaps(
    congregation_maps,
    presets_api.active_preset.filter,
    presets_api.active_preset.sort_order,
  );
  const has_active_filters = presets_api.has_active_filters;

  const search_filtered_maps = search_query.trim()
    ? filtered_maps.filter((map) => {
        const q = search_query.toLowerCase();
        const checked_out_name = checked_out_name_by_map_id.get(map.id ?? "") ?? "";
        return (
          map.name.toLowerCase().includes(q) ||
          (map.details ?? "").toLowerCase().includes(q) ||
          checked_out_name.toLowerCase().includes(q)
        );
      })
    : filtered_maps;
  const recent_ids = getRecentMapIds();
  const recent_maps = recent_ids
    .map((id) => congregation_maps.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => m != null);
  const filtered_masters = masters?.filter((master) => master.congregation_id === congregation_id);
  const master = filtered_masters?.[0];

  function handleSelectMap(map: MapRow) {
    if (!map.id) return;
    const bounds = boundaryToBounds(map.boundary);
    if (!bounds) return;
    recordRecentMap(map.id);
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
            <CloseIconButton on_click={onDidDismiss} />
          </IonButtons>
          <IonTitle>Maps</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              color={has_active_filters ? "primary" : "medium"}
              onClick={() => set_show_filters(true)}
            >
              <IonIcon slot="icon-only" icon={filterOutline} />
            </IonButton>
            <AddIconButton on_click={() => set_show_add_action_sheet(true)} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={search_query}
            onIonInput={(e) => set_search_query(e.detail.value ?? "")}
            debounce={100}
            placeholder="Search maps..."
          />
        </IonToolbar>
      </IonHeader>
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
            <div slot="end">
              <Body size="sm">
                {search_filtered_maps.length} of {congregation_maps.length}
              </Body>
            </div>
          </IonItem>

          {master && (
            <IonItem button onClick={() => handleSelectMaster(master)}>
              <IonLabel>Master Map</IonLabel>
            </IonItem>
          )}

          {search_filtered_maps.map((map) => (
            <IonItem button key={map.id ?? map.name} onClick={() => handleSelectMap(map)}>
              <IonLabel>
                {map.name} {map.details ? `| ${map.details}` : ""}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <MapListFilterModal
        is_open={show_filters}
        on_dismiss={() => set_show_filters(false)}
        presets={presets_api.presets}
        active_preset={presets_api.active_preset}
        is_default_active={presets_api.is_default_active}
        on_select_preset={presets_api.selectPreset}
        on_create_preset={presets_api.createPreset}
        on_rename_preset={presets_api.renamePreset}
        on_delete_preset={presets_api.deletePreset}
        on_change={presets_api.updatePreset}
      />
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
              recordRecentMap(id);
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
