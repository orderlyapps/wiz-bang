import { IonItem, IonLabel, IonList, IonIcon } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { Space } from "@ui/components/layout/space/Space";

interface PublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  on_select: (publisher_id: string) => void;
}

type LetterDivider = { type: "divider"; letter: string; id: string };
type ListItem = Publisher | LetterDivider;

function isDivider(item: ListItem): item is LetterDivider {
  return "type" in item && item.type === "divider";
}

function buildItems(publishers: Publisher[]): { items: ListItem[]; pinned_ids: Set<string> } {
  if (publishers.length <= 20) {
    return { items: publishers, pinned_ids: new Set() };
  }

  const result: ListItem[] = [];
  const pinned_ids = new Set<string>();
  let current_letter = "";

  for (const publisher of publishers) {
    const letter = publisher.last_name.charAt(0).toUpperCase();
    if (letter !== current_letter) {
      current_letter = letter;
      const divider_id = `__divider__${letter}`;
      result.push({ type: "divider", letter, id: divider_id });
      pinned_ids.add(divider_id);
      if (publisher.id) pinned_ids.add(publisher.id);
    }
    result.push(publisher);
  }

  return { items: result, pinned_ids };
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

  const { items, pinned_ids } = buildItems(publishers);

  return (
    <>
      <MultiColumnList<ListItem>
        items={items}
        get_id={(item) => (isDivider(item) ? item.id : (item.id ?? ""))}
        pin_to_first_column={
          pinned_ids.size > 0
            ? (item) => pinned_ids.has(isDivider(item) ? item.id : (item.id ?? ""))
            : undefined
        }
        render_item={(item) => {
          if (isDivider(item)) {
            return (
              <IonItem lines="none" className="ion-margin">
                <IonLabel>
                  <Heading>{item.letter}</Heading>
                </IonLabel>
              </IonItem>
            );
          }
          return (
            <IonItem
              color={selected_id === item.id ? "primary" : undefined}
              onClick={() => on_select(item.id ?? "")}
            >
              <IonLabel>
                <Body>{getPublisherDisplayName(item)}</Body>
              </IonLabel>
              {selected_id === item.id && <IonIcon icon={checkmark} slot="end" />}
            </IonItem>
          );
        }}
      />

      <Space size="2xl" />
    </>
  );
}
