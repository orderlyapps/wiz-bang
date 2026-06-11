import { useLiveQuery } from "@tanstack/react-db";
import { IonItem, IonList, IonListHeader, IonLabel } from "@ionic/react";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import { midweekMeetingDataCollection } from "@shared/database/collections/midweek-meeting-data";
import { publisherCollection } from "@shared/database/collections/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { MidweekMeetingData } from "@shared/database/schemas/midweek-meeting-data";
import type { Publisher } from "@shared/database/schemas/publisher";
import { getMeetingParts } from "@proclaimer-content/pages/home/clam-overseer/schedule/schedule-content/helper/get-meeting-parts";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { Label } from "@ui/components/display/text/label/Label";
import { Body } from "@ui/components/display/text/body/Body";
import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { getStoredCongregation } from "@util/app/congregation/utils";
import { PublisherList } from "./components/publisher-list/PublisherList";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";

function getAssignmentContext(id: string, data: MidweekMeetingData): string | undefined {
  if (
    id === "school_1_bible_reading" ||
    id === "school_2_bible_reading" ||
    id === "school_3_bible_reading"
  ) {
    return data.mwb_tgw_bread ?? undefined;
  }
  const applyMatch = id.match(/^school_\d_apply_(\d)$/) ?? id.match(/^school_\d_assistant_(\d)$/);
  if (applyMatch) {
    const n = applyMatch[1] as "1" | "2" | "3" | "4";
    return (data[`mwb_ayf_part${n}`] as string | undefined | null) ?? undefined;
  }
  if (id === "living_1") return data.mwb_lc_part1_content ?? undefined;
  if (id === "living_2") return data.mwb_lc_part2_content ?? undefined;
  if (id === "cbs_conductor" || id === "cbs_reader") return data.mwb_lc_cbs ?? undefined;
  return undefined;
}

interface AssignmentDetailContentProps {
  week_id: string;
  assignment_id: string;
}

export function AssignmentDetailContent({ week_id, assignment_id }: AssignmentDetailContentProps) {
  const congregation_id = getStoredCongregation()?.id;

  const { data: allAssignments, isLoading: isLoadingAssignments } = useLiveQuery((q) =>
    q.from({ ma: midweekAssignmentCollection }),
  );

  const { data: allMeetingData, isLoading: isLoadingMeetingData } = useLiveQuery((q) =>
    q.from({ mmd: midweekMeetingDataCollection }),
  );

  const { data: allPublishers, isLoading: isLoadingPublishers } = useLiveQuery((q) =>
    q.from({ p: publisherCollection }).orderBy(({ p }) => p.last_name),
  );

  const assignment = (allAssignments as MidweekAssignment[] | undefined)?.find(
    (a) => a.week_id === week_id && a.assignment_id === assignment_id,
  );

  const weekData = (allMeetingData as MidweekMeetingData[] | undefined)?.find(
    (m) => m.week_id === week_id,
  );

  const show_school_2 =
    (allAssignments as MidweekAssignment[] | undefined)?.some(
      (a) => a.week_id === week_id && a.assignment_id === "chairman_2",
    ) ?? false;

  const assignmentTitle = weekData
    ? (getMeetingParts(
        weekData,
        allAssignments as MidweekAssignment[] | undefined,
        show_school_2,
      ).find((p) => p.assignmentId === assignment_id)?.title ?? assignment_id.replace(/_/g, " "))
    : assignment_id.replace(/_/g, " ");

  const assignmentContext = weekData ? getAssignmentContext(assignment_id, weekData) : undefined;

  const publishers = ((allPublishers as Publisher[] | undefined) ?? []).filter(
    (p) => p.congregation_id === congregation_id,
  );

  const assignee = publishers.find((p) => p.id === assignment?.participant_id);

  if (isLoadingAssignments || isLoadingPublishers || isLoadingMeetingData) {
    return <Spinner centered />;
  }

  const handleDelete = () => {
    if (!congregation_id || !assignment) return;
    const key = makeCompositeKey(assignment_id, congregation_id, week_id);
    midweekAssignmentCollection.delete(key);
  };

  const handleSelect = (publisher_id: string) => {
    if (!congregation_id) return;
    if (assignment) {
      const key = makeCompositeKey(assignment_id, congregation_id, week_id);
      midweekAssignmentCollection.update(key, (draft) => {
        draft.participant_id = publisher_id;
      });
    } else {
      midweekAssignmentCollection.insert({
        assignment_id: assignment_id as MidweekAssignment["assignment_id"],
        congregation_id,
        week_id,
        participant_id: publisher_id,
      });
    }
  };

  return (
    <>
      <IonList className="ion-margin" inset>
        <LabelValueItem label="Week" value={getTheocraticWeekLabel(week_id)} />
        <LabelValueItem label="Assignment" value={assignmentTitle} />
        {assignmentContext && <LabelValueItem label="Material" value={assignmentContext} />}
        <IonItem className="Label-value-item">
          <IonLabel>
            <div style={{ paddingLeft: "1rem", textIndent: "-1rem" }}>
              <Label color="medium" size="sm">
                Publisher
              </Label>
            </div>
            <div style={{ paddingLeft: "1rem" }}>
              <Body>{assignee ? getPublisherDisplayName(assignee) : "Unassigned"}</Body>
            </div>
          </IonLabel>
          {assignment && (
            <DeleteIconButton
              alert_header="Remove Assignment"
              alert_message="Remove this publisher from the assignment?"
              confirm_text="Remove"
              on_click={handleDelete}
            />
          )}
        </IonItem>
      </IonList>
      <IonListHeader className="ion-margin-start">
        <IonLabel>Assign Publisher</IonLabel>
      </IonListHeader>
      <PublisherList
        publishers={publishers}
        selected_id={assignment?.participant_id}
        on_select={handleSelect}
      />
    </>
  );
}
