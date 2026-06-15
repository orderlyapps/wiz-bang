import { useLiveQuery } from "@tanstack/react-db";
import { IonItem, IonList } from "@ionic/react";
import { publisherCollection } from "@shared/database/collections/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { Body } from "@ui/components/display/text/body/Body";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

export function PublishersContent() {
  const congregation_id = getStoredCongregation()?.id;

  const { data, isLoading } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  if (isLoading) {
    return <Spinner />;
  }

  const publishers = (data ?? []).filter((p) => p.congregation_id === congregation_id);

  if (publishers.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <Body color="medium">No publishers found.</Body>
      </div>
    );
  }

  return (
    <IonList>
      <MultiColumnList
        items={publishers}
        get_id={(p) => p.id ?? ""}
        gap="sm"
        render_item={(p) => <IonItem>{getPublisherDisplayName(p)}</IonItem>}
      />
    </IonList>
  );
}
