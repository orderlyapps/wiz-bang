import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export function PublisherDetailsHeader({ publisher_id }: { publisher_id: string }) {
  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).where(({ p }) => eq(p.id, publisher_id)),
  );

  const publisher = data?.[0];

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton />
      </IonButtons>
      <IonTitle>{publisher ? getPublisherDisplayName(publisher) : "Publisher"}</IonTitle>
    </IonToolbar>
  );
}
