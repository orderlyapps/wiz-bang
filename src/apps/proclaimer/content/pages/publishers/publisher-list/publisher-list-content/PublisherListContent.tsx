import { IonItem, IonLabel, IonList } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import { useLiveQuery } from "@tanstack/react-db";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@ui/components/layout/space/Space";

type PublisherListContentProps = {
  filter: (publisher: Publisher) => boolean;
};

function sortPublishers(publishers: Publisher[]) {
  return publishers.sort((a, b) => {
    const lastNameCompare = a.last_name.localeCompare(b.last_name);
    if (lastNameCompare !== 0) return lastNameCompare;

    if (a.display_name && b.display_name) {
      const displayNameCompare = a.display_name.localeCompare(b.display_name);
      if (displayNameCompare !== 0) return displayNameCompare;
    } else if (a.display_name) {
      return -1;
    } else if (b.display_name) {
      return 1;
    }

    return a.first_name.localeCompare(b.first_name);
  });
}

export function PublisherListContent({ filter }: PublisherListContentProps) {
  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const filtered = sortPublishers(publishers?.filter(filter) || []);

  return (
    <IonList>
      <MultiColumnList
        items={filtered}
        get_id={(p) => p.id ?? ""}
        gap="sm"
        render_item={(p) => (
          <IonItem key={p.id}>
            <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
          </IonItem>
        )}
      />
      <Space />
    </IonList>
  );
}
