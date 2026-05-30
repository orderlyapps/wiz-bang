import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { useLiveQuery, isNull } from "@tanstack/react-db";
import { congregationCollection } from "@shared/database/collections/congregation";
import { useCollectionInitialLoad } from "@util/hooks/use-collection-initial-load/use-collection-initial-load";
import type { Congregation } from "@shared/database/schemas/congregation";

export function CongregationContent() {
  const { data } = useLiveQuery((q) =>
    q
      .from({ c: congregationCollection })
      .where(({ c }) => isNull(c.congregation_id))
      .orderBy(({ c }) => c.name),
  );
  const isInitialLoad = useCollectionInitialLoad(congregationCollection);

  if (!data || data.length === 0) {
    return isInitialLoad ? <Spinner centered /> : <p>No congregations found.</p>;
  }

  return (
    <IonList>
      <MultiColumnList<Congregation>
        items={data}
        get_id={(c) => c.id ?? ""}
        gap="sm"
        render_item={(c) => (
          <IonItem lines="full" routerLink={`/tables/congregation/${c.id}`} button>
            <IonLabel>{c.name}</IonLabel>
          </IonItem>
        )}
      />
    </IonList>
  );
}
