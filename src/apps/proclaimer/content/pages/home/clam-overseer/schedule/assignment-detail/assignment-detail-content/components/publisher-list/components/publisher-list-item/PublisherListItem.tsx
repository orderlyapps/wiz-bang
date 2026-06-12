import { IonItem, IonLabel, IonChip } from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { Body } from "@ui/components/display/text/body/Body";

interface PublisherListItemProps {
  publisher: Publisher;
  selected: boolean;
  stat_label: string | undefined;
  on_select: () => void;
}

export function PublisherListItem({
  publisher,
  selected,
  stat_label,
  on_select,
}: PublisherListItemProps) {
  return (
    <IonItem color={selected ? "primary" : undefined} onClick={on_select}>
      <IonLabel>
        <Body>{getPublisherDisplayName(publisher)}</Body>
      </IonLabel>
      {stat_label && <IonChip color="medium">{stat_label}</IonChip>}
    </IonItem>
  );
}
