import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLiveQuery } from "@tanstack/react-db";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { elderPermissionCollection } from "@shared/database/collections/elder-permission";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";

interface AddPublisherModalProps {
  is_open: boolean;
  on_dismiss: () => void;
}

export function AddPublisherModal({ is_open, on_dismiss }: AddPublisherModalProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: permissions } = useLiveQuery((q) => q.from({ ep: elderPermissionCollection }));

  const { data: publishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const permitted_auth_ids = new Set(
    (permissions ?? [])
      .filter((ep) => !congregation_id || ep.congregation_id === congregation_id)
      .map((ep) => ep.auth_user_id),
  );

  const available_publishers = (publishers ?? []).filter(
    (p) =>
      p.congregation_id === congregation_id &&
      p.auth_id &&
      p.gender === "male" &&
      !permitted_auth_ids.has(p.auth_id),
  );

  const handleAdd = (publisher: Publisher) => {
    if (!publisher.auth_id || !congregation_id) return;
    elderPermissionCollection.insert({
      id: crypto.randomUUID(),
      auth_user_id: publisher.auth_id,
      congregation_id,
    });
    on_dismiss();
  };

  return (
    <ResponsiveModal isOpen={is_open} onDidDismiss={on_dismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Publisher</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={on_dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          {available_publishers.length === 0 ? (
            <IonItem>
              <IonLabel>All publishers already have elder permission.</IonLabel>
            </IonItem>
          ) : (
            available_publishers.map((p) => (
              <IonItem key={p.id} button onClick={() => handleAdd(p)}>
                <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </ResponsiveModal>
  );
}
