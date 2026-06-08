import { useLiveQuery } from "@tanstack/react-db";
import { WeekNavigation } from "@proclaimer-shared/components/navigation/week-navigation/WeekNavigation";
import { MultiColumnList } from "@ui/components/display/multi-column-list/MultiColumnList";
import { IonList } from "@ionic/react";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { Publisher } from "@shared/database/schemas/publisher";
import { AssignmentCard } from "./components/assignment-card/AssignmentCard";
import { getMeetingParts } from "./helper/get-meeting-parts";
import { useAssignmentRows } from "./helper/use-assignment-rows";
import type { ScheduleContentProps, AssignmentRow } from "./helper/types";

export function ScheduleContent({ week_id }: ScheduleContentProps) {
  const { data: allMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );

  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));

  const { data: publishers } = useLiveQuery((q) => q.from({ p: publisherCollection }));

  const meetingData = (allMeetingData as MidweekMeetingData[] | undefined)?.filter(
    (m) => m.week_id === week_id,
  );
  const weekData = meetingData?.[0];
  const assignments = (allAssignments as MidweekAssignment[] | undefined)?.filter(
    (a) => a.week_id === week_id,
  );

  const meetingParts = weekData ? getMeetingParts(weekData, assignments) : [];

  const rows = useAssignmentRows(
    meetingParts,
    assignments,
    publishers as Publisher[] | undefined,
    week_id,
  );

  return (
    <>
      <WeekNavigation week_id={week_id} />
      <IonList className="ion-margin" inset>
        <MultiColumnList<AssignmentRow>
          items={rows}
          get_id={(row) => row.id}
          render_item={(row) => <AssignmentCard {...row} />}
        />
      </IonList>
    </>
  );
}
