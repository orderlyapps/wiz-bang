import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { SearchInput } from "@ui/components/inputs/search/SearchInput";
import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { useStoredCongregation } from "@util/app/congregation/useStoredCongregation";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PublisherSelectModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onSelect: (publisher: Publisher) => void;
  selectedId?: string;
}

export function PublisherSelectModal({
  isOpen,
  onDismiss,
  onSelect,
  selectedId,
}: PublisherSelectModalProps) {
  const [query, set_query] = useState("");
  const congregation = useStoredCongregation();
  const congregation_id = congregation?.id;

  const { data } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const publishers = ((data as Publisher[] | undefined) ?? []).filter(
    (p) => p.congregation_id === congregation_id && !p.archived_at,
  );

  const filtered = publishers.filter((p) =>
    getPublisherDisplayName(p).toLowerCase().includes(query.toLowerCase()),
  );

  function handleSelect(publisher: Publisher) {
    onSelect(publisher);
    set_query("");
    onDismiss();
  }

  function handleDismiss() {
    set_query("");
    onDismiss();
  }

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Publisher</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding content-wide">
        <SearchInput value={query} placeholder="Search publishers..." on_change={set_query} />
        {filtered.length === 0 ? (
          <IonList inset>
            <IonItem>
              <IonLabel>No publishers found.</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <IonList inset>
            {filtered.map((p) => (
              <IonItem key={p.id} button detail={false} onClick={() => handleSelect(p)}>
                <IonLabel>{getPublisherDisplayName(p)}</IonLabel>
                {selectedId === p.id && <IonIcon icon={checkmark} slot="end" color="primary" />}
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </ResponsiveModal>
  );
}
