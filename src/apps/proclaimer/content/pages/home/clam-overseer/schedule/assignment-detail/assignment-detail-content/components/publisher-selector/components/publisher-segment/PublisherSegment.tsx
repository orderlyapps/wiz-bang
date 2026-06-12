import {
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonLabel,
  IonItemDivider,
} from "@ionic/react";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import { PublisherList } from "../../../publisher-list/PublisherList";
import { PublisherControls } from "../publisher-controls/PublisherControls";
import type { PublisherSortOrder } from "../../hooks/use-publisher-sort/usePublisherSort";
import type { PublisherStats } from "../../hooks/use-publisher-stats/usePublisherStats";
import type { GenderFilter } from "../../hooks/use-publisher-filter/usePublisherFilter";

interface PublisherSegmentProps {
  publishers: Publisher[];
  assignment: MidweekAssignment | undefined;
  assistantAssignment: MidweekAssignment | undefined;
  assistant_label: string;
  assignee_sort: PublisherSortOrder;
  assistant_sort: PublisherSortOrder;
  assignee_stats: Map<string, PublisherStats>;
  assistant_stats: Map<string, PublisherStats>;
  assignee_filter: GenderFilter;
  assistant_filter: GenderFilter;
  setAssigneeSortOrder: (order: PublisherSortOrder) => void;
  setAssistantSortOrder: (order: PublisherSortOrder) => void;
  setAssigneeFilter: (filter: GenderFilter) => void;
  setAssistantFilter: (filter: GenderFilter) => void;
  onSelectAssignee: (id: string) => void;
  onSelectAssistant: (id: string) => void;
}

export function PublisherSegment({
  publishers,
  assignment,
  assistantAssignment,
  assistant_label,
  assignee_sort,
  assistant_sort,
  assignee_stats,
  assistant_stats,
  assignee_filter,
  assistant_filter,
  setAssigneeSortOrder,
  setAssistantSortOrder,
  setAssigneeFilter,
  setAssistantFilter,
  onSelectAssignee,
  onSelectAssistant,
}: PublisherSegmentProps) {
  return (
    <>
      <IonItemDivider sticky style={{ paddingBlock: "1rem" }}>
        <IonSegment value="assignee">
          <IonSegmentButton value="assignee" contentId="assignee">
            <IonLabel>Assignee</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="assistant" contentId="assistant">
            <IonLabel>{assistant_label}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonItemDivider>
      <IonSegmentView>
        <IonSegmentContent id="assignee">
          <PublisherControls
            sort_order={assignee_sort}
            on_sort_change={setAssigneeSortOrder}
            filter={assignee_filter}
            on_filter_change={setAssigneeFilter}
          />
          <PublisherList
            publishers={publishers}
            selected_id={assignment?.participant_id}
            on_select={onSelectAssignee}
            sort_order={assignee_sort}
            stats={assignee_stats}
            gender_filter={assignee_filter}
          />
        </IonSegmentContent>
        <IonSegmentContent id="assistant">
          <PublisherControls
            sort_order={assistant_sort}
            on_sort_change={setAssistantSortOrder}
            filter={assistant_filter}
            on_filter_change={setAssistantFilter}
          />
          <PublisherList
            publishers={publishers}
            selected_id={assistantAssignment?.participant_id}
            on_select={onSelectAssistant}
            sort_order={assistant_sort}
            stats={assistant_stats}
            gender_filter={assistant_filter}
          />
        </IonSegmentContent>
      </IonSegmentView>
    </>
  );
}
