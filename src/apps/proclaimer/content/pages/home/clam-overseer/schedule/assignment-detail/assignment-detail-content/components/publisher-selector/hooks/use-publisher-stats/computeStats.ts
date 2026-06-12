import { differenceInWeeks, parseISO } from "date-fns";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { ParticipationType } from "../../utils/participationTypeMap";
import { participationAssignmentIds } from "./participationAssignmentIds";

export interface PublisherStats {
  publisher_id: string;
  weeks_since_last: number | null;
  avg_weeks_between: number | null;
}

export function computeStats(
  assignments: MidweekAssignment[],
  participation_type: ParticipationType,
  current_week_id: string,
): Map<string, PublisherStats> {
  const relevant_ids = new Set(participationAssignmentIds[participation_type]);
  const current_date = parseISO(current_week_id);

  const by_publisher = new Map<string, string[]>();
  for (const a of assignments) {
    if (!relevant_ids.has(a.assignment_id)) continue;
    if (!by_publisher.has(a.participant_id)) by_publisher.set(a.participant_id, []);
    by_publisher.get(a.participant_id)!.push(a.week_id);
  }

  const stats = new Map<string, PublisherStats>();
  for (const [publisher_id, week_ids] of by_publisher) {
    const past_weeks = week_ids
      .filter((w) => w < current_week_id)
      .sort()
      .reverse();

    const weeks_since_last =
      past_weeks.length > 0 ? differenceInWeeks(current_date, parseISO(past_weeks[0])) : null;

    let avg_weeks_between: number | null = null;
    if (past_weeks.length >= 2) {
      const sorted = [...past_weeks].sort();
      let total_gap = 0;
      for (let i = 1; i < sorted.length; i++) {
        total_gap += differenceInWeeks(parseISO(sorted[i]), parseISO(sorted[i - 1]));
      }
      avg_weeks_between = total_gap / (sorted.length - 1);
    }

    stats.set(publisher_id, { publisher_id, weeks_since_last, avg_weeks_between });
  }

  return stats;
}
