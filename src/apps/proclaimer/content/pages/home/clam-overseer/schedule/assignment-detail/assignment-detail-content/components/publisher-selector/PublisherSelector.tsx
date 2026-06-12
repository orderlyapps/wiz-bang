import { PublisherList } from "../publisher-list/PublisherList";
import { PublisherControls } from "./components/publisher-controls/PublisherControls";
import { PublisherSelectModal } from "../publisher-select-modal/PublisherSelectModal";
import { PublisherSegment } from "./components/publisher-segment/PublisherSegment";
import type { Publisher } from "@shared/database/schemas/publisher";
import type {
  MidweekAssignment,
  MidweekAssignmentId,
} from "@shared/database/schemas/midweek-assignment";
import { participationTypeMap } from "./utils/participationTypeMap";
import { usePublisherSort } from "./hooks/use-publisher-sort/usePublisherSort";
import { usePublisherStats } from "./hooks/use-publisher-stats/usePublisherStats";
import { usePublisherParticipationTypes } from "./hooks/use-publisher-participation-types/usePublisherParticipationTypes";
import { usePublisherSelection } from "./hooks/use-publisher-selection/usePublisherSelection";
import { usePublisherFilter } from "./hooks/use-publisher-filter/usePublisherFilter";
import { getStoredCongregation } from "@util/app/congregation/utils";

interface PublisherSelectorProps {
  publishers: Publisher[];
  assignment: MidweekAssignment | undefined;
  assistantId: string | undefined;
  assistantAssignment: MidweekAssignment | undefined;
  onSelectAssignee: (publisher_id: string) => void;
  onSelectAssistant: (publisher_id: string) => void;
  assignment_id: string;
  week_id: string;
}

export function PublisherSelector({
  publishers,
  assignment,
  assistantId,
  assistantAssignment,
  onSelectAssignee,
  onSelectAssistant,
  assignment_id,
  week_id,
}: PublisherSelectorProps) {
  const congregation_id = getStoredCongregation()?.id;

  const participation_type = participationTypeMap[assignment_id as MidweekAssignmentId] ?? "prayer";
  const assistant_participation_type = assistantId
    ? (participationTypeMap[assistantId as MidweekAssignmentId] ?? "assistant")
    : null;

  const { sort_order: assignee_sort, setSortOrder: setAssigneeSortOrder } =
    usePublisherSort(participation_type);
  const { sort_order: assistant_sort, setSortOrder: setAssistantSortOrder } = usePublisherSort(
    assistant_participation_type,
  );

  const { filter: assignee_filter, setFilter: setAssigneeFilter } =
    usePublisherFilter(participation_type);
  const { filter: assistant_filter, setFilter: setAssistantFilter } = usePublisherFilter(
    assistant_participation_type,
  );

  const assignee_stats = usePublisherStats(participation_type, week_id, congregation_id);
  const assistant_stats = usePublisherStats(assistant_participation_type, week_id, congregation_id);
  const participation_types = usePublisherParticipationTypes(congregation_id);

  const { is_modal_open, selected_publisher, handleSelectPublisher, handleConfirm, handleDismiss } =
    usePublisherSelection({ publishers, onSelectAssignee, onSelectAssistant });

  if (!assistantId) {
    return (
      <>
        <PublisherControls
          sort_order={assignee_sort}
          on_sort_change={setAssigneeSortOrder}
          filter={assignee_filter}
          on_filter_change={setAssigneeFilter}
        />
        <PublisherList
          publishers={publishers}
          selected_id={assignment?.participant_id}
          on_select={(id) => handleSelectPublisher(id, "assignee")}
          sort_order={assignee_sort}
          stats={assignee_stats}
          filter={assignee_filter}
          participation_types={participation_types}
        />
        <PublisherSelectModal
          is_open={is_modal_open}
          publisher={selected_publisher}
          on_dismiss={handleDismiss}
          on_confirm={handleConfirm}
        />
      </>
    );
  }

  return (
    <>
      <PublisherSegment
        publishers={publishers}
        assignment={assignment}
        assistantAssignment={assistantAssignment}
        assistant_label={assistantId === "cbs_reader" ? "Reader" : "Assistant"}
        assignee_sort={assignee_sort}
        assistant_sort={assistant_sort}
        assignee_stats={assignee_stats}
        assistant_stats={assistant_stats}
        assignee_filter={assignee_filter}
        assistant_filter={assistant_filter}
        participation_types={participation_types}
        setAssigneeSortOrder={setAssigneeSortOrder}
        setAssistantSortOrder={setAssistantSortOrder}
        setAssigneeFilter={setAssigneeFilter}
        setAssistantFilter={setAssistantFilter}
        onSelectAssignee={(id) => handleSelectPublisher(id, "assignee")}
        onSelectAssistant={(id) => handleSelectPublisher(id, "assistant")}
      />
      <PublisherSelectModal
        is_open={is_modal_open}
        publisher={selected_publisher}
        on_dismiss={handleDismiss}
        on_confirm={handleConfirm}
      />
    </>
  );
}
