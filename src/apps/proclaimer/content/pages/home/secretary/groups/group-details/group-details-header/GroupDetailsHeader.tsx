import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { groupCollection } from "@shared/database/collections/group";

export function GroupDetailsHeader({ group_id }: { group_id: string }) {
  const { data } = useLiveQuery((q) =>
    q.from({ g: groupCollection }).where(({ g }) => eq(g.id, group_id)),
  );

  const group = data?.[0];

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home/secretary/groups" />
      </IonButtons>
      <IonTitle>{group ? group.name : "Group"}</IonTitle>
    </IonToolbar>
  );
}
