import { IonList, IonItem, IonLabel, IonSpinner } from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";

export function CongregationContent() {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).orderBy(({ c }) => c.name),
  );

  if (isLoading) {
    return <IonSpinner />;
  }

  if (!data || data.length === 0) {
    return <p>No congregations found.</p>;
  }

  return (
    <IonList>
      {data.map((congregation) => (
        <IonItem key={congregation.id}>
          <IonLabel>{congregation.name}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
