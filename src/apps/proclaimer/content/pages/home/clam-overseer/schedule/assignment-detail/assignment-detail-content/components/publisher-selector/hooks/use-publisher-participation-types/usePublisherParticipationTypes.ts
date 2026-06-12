import { useLiveQuery } from "@tanstack/react-db";
import { midweekAssignmentCollection } from "@shared/database/collections/midweek-assignment";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import { participationTypeMap, type ParticipationType } from "../../utils/participationTypeMap";

export function usePublisherParticipationTypes(
  congregation_id: string | undefined,
): Map<string, Set<ParticipationType>> {
  const { data: allAssignments } = useLiveQuery((q) => q.from({ ma: midweekAssignmentCollection }));

  const filtered = ((allAssignments as MidweekAssignment[] | undefined) ?? []).filter(
    (a) => !congregation_id || a.congregation_id === congregation_id,
  );

  const by_publisher = new Map<string, Set<ParticipationType>>();

  for (const assignment of filtered) {
    const participation_type = participationTypeMap[assignment.assignment_id];
    if (!participation_type) continue;

    if (!by_publisher.has(assignment.participant_id)) {
      by_publisher.set(assignment.participant_id, new Set());
    }
    by_publisher.get(assignment.participant_id)!.add(participation_type);
  }

  return by_publisher;
}
