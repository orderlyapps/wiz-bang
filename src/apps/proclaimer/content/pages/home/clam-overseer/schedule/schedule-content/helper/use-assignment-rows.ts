import { getPublisherDisplayName } from "@proclaimer-shared/publisher/publisherUtils";
import type { Publisher } from "@shared/database/schemas/publisher";
import type { MidweekAssignment } from "@shared/database/schemas/midweek-assignment";
import type { AssignmentItem, AssignmentRow } from "./types";

function getAssignedPublisherName(
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
  assignmentId: string,
): string | undefined {
  if (!assignments) return undefined;
  const assignment = assignments.find((a) => a.assignment_id === assignmentId);
  if (!assignment) return undefined;
  const publisher = publishers?.find((p) => p.id === assignment.participant_id);
  if (!publisher) return undefined;
  return getPublisherDisplayName(publisher);
}

export function useAssignmentRows(
  meetingParts: AssignmentItem[],
  assignments: MidweekAssignment[] | undefined,
  publishers: Publisher[] | undefined,
): AssignmentRow[] {
  return meetingParts.map((part) => {
    const assignedName = getAssignedPublisherName(assignments, publishers, part.assignmentId);
    const assistantName = part.assistantId
      ? getAssignedPublisherName(assignments, publishers, part.assistantId)
      : undefined;

    return {
      id: part.assignmentId,
      title: part.title,
      color: part.color,
      publisher: assignedName,
      assistant: assistantName,
    };
  });
}
