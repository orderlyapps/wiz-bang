import { IonList } from "@ionic/react";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import { differenceInWeeks, parseISO } from "date-fns";
import type { AvAssignment } from "@shared/database/schemas/av-assignment";
import { avAssignmentLabels } from "@shared/database/schemas/av-assignment";

interface AvAssignmentHistoryProps {
  publisher_id: string;
  week_id: string;
  all_assignments: AvAssignment[];
}

interface AssignmentRow {
  week_id: string;
  assignment_id: string;
  weeks_away: number;
  is_future: boolean;
  is_current: boolean;
}

export function AvAssignmentHistory({
  publisher_id,
  week_id,
  all_assignments,
}: AvAssignmentHistoryProps) {
  const current_date = parseISO(week_id);

  const publisher_assignments = all_assignments.filter((a) => a.participant_id === publisher_id);

  const past = publisher_assignments
    .filter((a) => a.week_id < week_id)
    .sort((a, b) => b.week_id.localeCompare(a.week_id))
    .slice(0, 5);

  const current = publisher_assignments.filter((a) => a.week_id === week_id);

  const future = publisher_assignments
    .filter((a) => a.week_id > week_id)
    .sort((a, b) => a.week_id.localeCompare(b.week_id));

  const rows: AssignmentRow[] = [...past.reverse(), ...current, ...future].map((a) => {
    const a_date = parseISO(a.week_id);
    const diff = differenceInWeeks(a_date, current_date);
    const is_current = a.week_id === week_id;
    const is_future = a.week_id > week_id;

    return {
      week_id: a.week_id,
      assignment_id: a.assignment_id,
      weeks_away: Math.abs(diff),
      is_future,
      is_current,
    };
  });

  if (rows.length === 0) return null;

  return (
    <IonList inset>
      {rows.map((row, i) => {
        const weeks_label = row.is_current
          ? "This week"
          : row.is_future
            ? `In ${row.weeks_away}w`
            : `${row.weeks_away}w ago`;

        const meeting = row.assignment_id.includes("midweek") ? "Midweek" : "Weekend";
        const assignment_label =
          avAssignmentLabels[row.assignment_id as keyof typeof avAssignmentLabels] ??
          row.assignment_id.replace(/_/g, " ");

        return (
          <LabelValueItem
            key={`${row.week_id}-${row.assignment_id}-${i}`}
            label={weeks_label}
            label_size={row.is_current ? "xl" : undefined}
            label_color={row.is_current ? "primary" : undefined}
            value={`${assignment_label} (${meeting})`}
          />
        );
      })}
    </IonList>
  );
}
