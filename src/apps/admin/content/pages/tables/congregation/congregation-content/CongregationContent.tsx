import { IonList, IonItem, IonLabel } from "@ionic/react";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { useLiveQuery } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";

export function CongregationContent() {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).orderBy(({ c }) => c.name),
  );

  if (!data || data.length === 0) {
    return isLoading ? <Spinner centered /> : <p>No congregations found.</p>;
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
