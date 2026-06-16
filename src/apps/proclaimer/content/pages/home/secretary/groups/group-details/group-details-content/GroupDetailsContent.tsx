import { IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { Publisher } from "@shared/database/schemas/publisher";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export function GroupDetailsContent({ group_id }: { group_id: string }) {
  const { data: group_data, isLoading: is_group_loading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const { data: publishers_data, isLoading: is_publishers_loading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.group_id, group_id)),
  );

  const publishers = (publishers_data ?? []) as Publisher[];

  const group = group_data?.[0];
  const overseer = publishers?.find((p) => p.id === group?.overseer_id);
  const assistant = publishers?.find((p) => p.id === group?.assistant_id);

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
        <IonItem>
          <IonLabel>
            <h2>Name</h2>
            <p>{group.name}</p>
          </IonLabel>
        </IonItem>
        {overseer && (
          <IonItem>
            <IonLabel>
              <h2>Overseer</h2>
              <p>{getPublisherDisplayName(overseer)}</p>
            </IonLabel>
          </IonItem>
        )}
        {assistant && (
          <IonItem>
            <IonLabel>
              <h2>Assistant</h2>
              <p>{getPublisherDisplayName(assistant)}</p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>

      <IonItem lines="none">
        <IonLabel>
          <h2>Publishers</h2>
        </IonLabel>
        <div slot="end">
          <Body color="medium">{publishers.length}</Body>
        </div>
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
              <IonItem routerLink={`/home/secretary/publishers/${p.id}`} button>
                {getPublisherDisplayName(p)}
              </IonItem>
            )}
          />
        </IonList>
      )}
    </IonContent>
  );
}
