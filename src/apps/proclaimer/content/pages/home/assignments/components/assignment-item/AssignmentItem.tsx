import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { getTheocraticWeekLabel } from "@proclaimer-shared/util/date/getTheocraticWeekLabel";
import type { Assignment } from "../../useAssignments";

interface AssignmentItemProps {
  assignment: Assignment;
}

export function AssignmentItem({ assignment }: AssignmentItemProps) {
  return (
    <LabelValueItem
      label={getTheocraticWeekLabel(assignment.week_id, {
        format: "week-range",
        useRelativeWeek: true,
        relativeWeekStyle: "append",
      })}
      value={assignment.label}
    />
  );
}
