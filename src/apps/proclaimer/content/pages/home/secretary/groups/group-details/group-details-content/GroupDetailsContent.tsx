import { IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";

export function GroupDetailsContent({ group_id }: { group_id: string }) {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const group = data?.[0];

  if (isLoading) {
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
        {group.overseer_id && (
          <IonItem>
            <IonLabel>
              <h2>Overseer ID</h2>
              <p>{group.overseer_id}</p>
            </IonLabel>
          </IonItem>
        )}
        {group.assistant_id && (
          <IonItem>
            <IonLabel>
              <h2>Assistant ID</h2>
              <p>{group.assistant_id}</p>
            </IonLabel>
          </IonItem>
        )}
      </IonList>
    </IonContent>
  );
}
