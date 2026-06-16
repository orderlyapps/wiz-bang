import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { Select } from "@ui/components/inputs/select/Select";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { useState } from "react";

export function GroupDetailsContent({ group_id }: { group_id: string }) {
  const congregation_id = getStoredCongregation()?.id;
  const [is_add_modal_open, set_is_add_modal_open] = useState(false);

  const { data: group_data, isLoading: is_group_loading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const { data: publishers_data, isLoading: is_publishers_loading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.group_id, group_id)),
  );

  const { data: all_publishers_data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const publishers = (publishers_data ?? []) as Publisher[];
  const all_publishers = (all_publishers_data ?? []).filter(
    (p) => p.congregation_id === congregation_id && p.group_id !== group_id,
  ) as Publisher[];

  const group = group_data?.[0];

  const overseer_options = [
    { label: "None", value: "" },
    ...publishers.map((p) => ({
      label: getPublisherDisplayName(p),
      value: p.id ?? "",
    })),
  ];

  const assistant_options = [
    { label: "None", value: "" },
    ...publishers.map((p) => ({
      label: getPublisherDisplayName(p),
      value: p.id ?? "",
    })),
  ];

  if (is_group_loading || is_publishers_loading) {
    return (
      <IonContent>
        <Spinner />
      </IonContent>
    );
  }

  if (!group) {
    return (
      <IonContent>
        <div className="ion-padding ion-text-center">
          <Body color="medium">Group not found.</Body>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent>
      <IonList>
        <TextInput
          label="Name"
          value={group.name}
          on_change={(value) => {
            groupCollection.update(group_id, (draft) => {
              draft.name = value;
            });
          }}
        />
        <Select
          label="Overseer"
          value={group.overseer_id ?? ""}
          options={overseer_options}
          on_change={(value) => {
            if (Array.isArray(value)) return;
            groupCollection.update(group_id, (draft) => {
              draft.overseer_id = value || null;
            });
          }}
        />
        <Select
          label="Assistant"
          value={group.assistant_id ?? ""}
          options={assistant_options}
          on_change={(value) => {
            if (Array.isArray(value)) return;
            groupCollection.update(group_id, (draft) => {
              draft.assistant_id = value || null;
            });
          }}
        />
      </IonList>

      <IonItem lines="none">
        <IonLabel>
          <h2>Publishers</h2>
        </IonLabel>
        <div slot="end">
          <Body color="medium">{publishers.length}</Body>
        </div>
        <TextButton
          slot="end"
          label="Add"
          fill="clear"
          on_click={() => set_is_add_modal_open(true)}
        />
      </IonItem>

      {publishers.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <Body color="medium">No publishers in this group.</Body>
        </div>
      ) : (
        <IonList>
          <MultiColumnList
            items={publishers}
            get_id={(p) => p.id ?? ""}
            gap="sm"
            render_item={(p) => (
              <IonItem>
                <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
                <TextButton
                  slot="end"
                  label="Remove"
                  fill="clear"
                  color="danger"
                  on_click={() => {
                    publisherCollection.update(p.id ?? "", (draft) => {
                      draft.group_id = null;
                    });
                  }}
                />
              </IonItem>
            )}
          />
        </IonList>
      )}

      <ResponsiveModal isOpen={is_add_modal_open} onDidDismiss={() => set_is_add_modal_open(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Publishers</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => set_is_add_modal_open(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {all_publishers.length === 0 ? (
              <div className="ion-padding ion-text-center">
                <Body color="medium">No publishers available to add.</Body>
              </div>
            ) : (
              <MultiColumnList
                items={all_publishers}
                get_id={(p) => p.id ?? ""}
                gap="sm"
                render_item={(p) => (
                  <IonItem
                    button
                    onClick={() => {
                      publisherCollection.update(p.id ?? "", (draft) => {
                        draft.group_id = group_id;
                      });
                      set_is_add_modal_open(false);
                    }}
                  >
                    {getPublisherDisplayName(p)}
                  </IonItem>
                )}
              />
            )}
          </IonList>
        </IonContent>
      </ResponsiveModal>
    </IonContent>
  );
}
