import { useState } from "react";
import {
  IonAlert,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import { mapTagCollection } from "@shared/database/collections/map-tag";
import { mapTagAssignmentCollection } from "@shared/database/collections/map-tag-assignment";
import { mapCollection } from "@shared/database/collections/map";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { MapTagRow } from "@shared/database/schemas/map-tag";
import type { MapTagAssignmentRow } from "@shared/database/schemas/map-tag-assignment";
import type { MapRow } from "@shared/database/schemas/map";

type MapTagsContentProps = {
  showAddAlert: boolean;
  onAddAlertDismiss: () => void;
};

export function MapTagsContent({ showAddAlert, onAddAlertDismiss }: MapTagsContentProps) {
  const [rename_tag, set_rename_tag] = useState<MapTagRow | null>(null);
  const [delete_tag, set_delete_tag] = useState<MapTagRow | null>(null);
  const [expanded_tag_id, set_expanded_tag_id] = useState<string | null>(null);

  const { data: tags_data } = useLiveQuery((q) =>
    q.from({ t: mapTagCollection }).orderBy(({ t }) => t.name),
  );
  const { data: assignments_data } = useLiveQuery((q) => q.from({ a: mapTagAssignmentCollection }));
  const { data: maps_data } = useLiveQuery((q) => q.from({ m: mapCollection }));
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const all_tags = (tags_data as MapTagRow[] | undefined) ?? [];
  const congregation_tags = all_tags.filter((t) => t.congregation_id === congregation_id);
  const all_assignments = (assignments_data as MapTagAssignmentRow[] | undefined) ?? [];
  const all_maps = (maps_data as MapRow[] | undefined) ?? [];

  function getMapsForTag(tag_id: string): MapRow[] {
    const map_ids = new Set(
      all_assignments.filter((a) => a.tag_id === tag_id).map((a) => a.map_id),
    );
    return all_maps.filter((m) => m.id && map_ids.has(m.id));
  }

  function getTagCount(tag_id: string): number {
    return all_assignments.filter((a) => a.tag_id === tag_id).length;
  }

  function handleCreateTag(name: string) {
    if (!name.trim() || !congregation_id) return;
    mapTagCollection.insert({
      id: crypto.randomUUID(),
      congregation_id,
      name: name.trim(),
    });
  }

  function handleRenameTag(tag: MapTagRow, new_name: string) {
    if (!new_name.trim() || !tag.id) return;
    mapTagCollection.update(tag.id, (draft) => {
      draft.name = new_name.trim();
    });
  }

  function handleDeleteTag(tag: MapTagRow) {
    if (!tag.id) return;
    const tag_assignments = all_assignments.filter((a) => a.tag_id === tag.id);
    for (const assignment of tag_assignments) {
      if (assignment.id) mapTagAssignmentCollection.delete(assignment.id);
    }
    mapTagCollection.delete(tag.id);
  }

  function handleToggleExpand(tag_id: string) {
    set_expanded_tag_id((current) => (current === tag_id ? null : tag_id));
  }

  return (
    <>
      <IonList>
        {congregation_tags.length === 0 && (
          <IonItem>
            <IonLabel className="ion-text-center">
              <p>No tags yet. Tap + to create one.</p>
            </IonLabel>
          </IonItem>
        )}
        {congregation_tags.map((tag) => {
          const is_expanded = expanded_tag_id === tag.id;
          const tagged_maps = getMapsForTag(tag.id ?? "");
          const count = getTagCount(tag.id ?? "");
          return (
            <IonItemSliding key={tag.id}>
              <IonItem button detail={false} onClick={() => tag.id && handleToggleExpand(tag.id)}>
                <IonLabel>
                  <h3>{tag.name}</h3>
                  <p>
                    {count} map{count !== 1 ? "s" : ""}
                  </p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => set_rename_tag(tag)}>
                  <IonIcon slot="icon-only" icon={createOutline} />
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => set_delete_tag(tag)}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
              {is_expanded && tagged_maps.length > 0 && (
                <div className="ion-padding-start ion-padding-end">
                  {tagged_maps.map((map) => (
                    <p key={map.id} className="ion-text-color-secondary">
                      {map.name}
                    </p>
                  ))}
                </div>
              )}
            </IonItemSliding>
          );
        })}
      </IonList>

      <IonAlert
        isOpen={showAddAlert}
        header="New Tag"
        inputs={[{ name: "name", type: "text", placeholder: "Tag name" }]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Create",
            handler: (data: { name: string }) => {
              const name = data.name.trim();
              if (name) handleCreateTag(name);
            },
          },
        ]}
        onDidDismiss={onAddAlertDismiss}
      />

      <IonAlert
        isOpen={rename_tag !== null}
        header="Rename Tag"
        inputs={[
          {
            name: "name",
            type: "text",
            value: rename_tag?.name ?? "",
            placeholder: "Tag name",
          },
        ]}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Save",
            handler: (data: { name: string }) => {
              if (rename_tag) handleRenameTag(rename_tag, data.name);
            },
          },
        ]}
        onDidDismiss={() => set_rename_tag(null)}
      />

      <IonAlert
        isOpen={delete_tag !== null}
        header="Delete Tag"
        message={`Delete "${delete_tag?.name ?? ""}"? This will remove it from all maps.`}
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              if (delete_tag) handleDeleteTag(delete_tag);
            },
          },
        ]}
        onDidDismiss={() => set_delete_tag(null)}
      />
    </>
  );
}
