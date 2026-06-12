import { IonItem, IonLabel, IonList } from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { Space } from "@ui/components/layout/space/Space";
import type { PublisherSortOrder } from "../publisher-selector/hooks/use-publisher-sort/usePublisherSort";
import type { PublisherStats } from "../publisher-selector/hooks/use-publisher-stats/usePublisherStats";
import type { GenderFilter } from "../publisher-selector/hooks/use-publisher-filter/usePublisherFilter";
import { buildAlphabeticalItems, isDivider } from "./utils/buildAlphabeticalItems";
import type { ListItem } from "./utils/buildAlphabeticalItems";
import { sortPublishers } from "./utils/sortPublishers";
import { getStatLabel } from "./utils/getStatLabel";
import { PublisherLetterDivider } from "./components/publisher-letter-divider/PublisherLetterDivider";
import { PublisherListItem } from "./components/publisher-list-item/PublisherListItem";

interface PublisherListProps {
  publishers: Publisher[];
  selected_id: string | undefined;
  on_select: (publisher_id: string) => void;
  sort_order: PublisherSortOrder;
  stats: Map<string, PublisherStats>;
  gender_filter: GenderFilter;
}

export function PublisherList({
  publishers,
  selected_id,
  on_select,
  sort_order,
  stats,
  gender_filter,
}: PublisherListProps) {
  const filtered_publishers =
    gender_filter === "all" ? publishers : publishers.filter((p) => p.gender === gender_filter);

  if (filtered_publishers.length === 0) {
    return (
      <IonList className="ion-margin" inset>
        <IonItem>
          <IonLabel color="medium">No publishers found.</IonLabel>
        </IonItem>
      </IonList>
    );
  }

  const sorted = sortPublishers(filtered_publishers, sort_order, stats);

  const { items, pinned_ids } =
    sort_order === "alphabetical"
      ? buildAlphabeticalItems(sorted)
      : { items: sorted as ListItem[], pinned_ids: new Set<string>() };

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
            return <PublisherLetterDivider letter={item.letter} />;
          }
          return (
            <PublisherListItem
              publisher={item}
              selected={selected_id === item.id}
              stat_label={getStatLabel(item.id, sort_order, stats)}
              on_select={() => on_select(item.id ?? "")}
            />
          );
        }}
      />
      <Space size="2xl" />
    </>
  );
}
