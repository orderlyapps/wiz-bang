import { IonItem, IonLabel, IonList, IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";

interface PublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  on_select: (publisher_id: string) => void;
}

export function PublisherList({ publishers, selected_id, on_select }: PublisherListProps) {
  if (publishers.length === 0) {
    return (
      <IonList className="ion-margin" inset>
        <IonItem>
          <IonLabel color="medium">No publishers found.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  return (
    <IonList className="ion-margin" inset>
      {publishers.map((publisher) => (
        <IonItem key={publisher.id} button onClick={() => on_select(publisher.id ?? "")}>
          <IonLabel>{getPublisherDisplayName(publisher)}</IonLabel>
          {selected_id === publisher.id && <IonIcon icon={checkmark} slot="end" color="primary" />}
        </IonItem>
      ))}
    </IonList>
  );
}
