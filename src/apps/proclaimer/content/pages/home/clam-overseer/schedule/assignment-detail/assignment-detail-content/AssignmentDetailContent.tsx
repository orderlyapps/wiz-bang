import { useLiveQuery } from "@tanstack/react-db";
import { IonList } from "@ionic/react";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { format, parseISO } from "date-fns";

interface AssignmentDetailContentProps {
  week_id: string;
  assignment_id: string;
}

export function AssignmentDetailContent({ week_id, assignment_id }: AssignmentDetailContentProps) {
  const { data: allAssignments, isLoading: isLoadingAssignments } = useLiveQuery((q) =>
    q.from({ ma: midweekAssignmentCollection }),
  );

  const { data: allPublishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }),
  );

  const assignment = (allAssignments as MidweekAssignment[] | undefined)?.find(
    (a) => a.week_id === week_id && a.assignment_id === assignment_id,
  );

  const publisher = (allPublishers as Publisher[] | undefined)?.find(
    (p) => p.id === assignment?.participant_id,
  );

  if (isLoadingAssignments || isLoadingPublishers) {
    return <Spinner centered />;
  }

  if (!assignment) {
    return <p>Assignment not found.</p>;
  }

  const publisherName = publisher ? getPublisherDisplayName(publisher) : undefined;

  const formattedWeek = (() => {
    try {
      return format(parseISO(week_id), "d MMMM yyyy");
    } catch {
      return week_id;
    }
  })();

  return (
    <IonList className="ion-margin" inset>
      <LabelValueItem label="Week" value={formattedWeek} />
      <LabelValueItem label="Assignment" value={assignment_id.replace(/_/g, " ")} />
      <LabelValueItem label="Publisher" value={publisherName ?? "Unassigned"} />
    </IonList>
  );
}
