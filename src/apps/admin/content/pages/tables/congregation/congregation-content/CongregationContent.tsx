import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { useLiveQuery } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";
import type { Congregation } from "@shared/database/schemas/congregation";

export function CongregationContent() {
  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ c: congregationCollection }).orderBy(({ c }) => c.name),
  );

  if (!data || data.length === 0) {
    return isLoading ? <Spinner centered /> : <p>No congregations found.</p>;
  }

  return (
    <IonList>
      <MultiColumnList<Congregation>
        items={data}
        get_id={(c) => c.id ?? ""}
        gap="sm"
        render_item={(c) => (
          <IonItem lines="full">
            <IonLabel>{c.name}</IonLabel>
          </IonItem>
        )}
      />
    </IonList>
  );
}
