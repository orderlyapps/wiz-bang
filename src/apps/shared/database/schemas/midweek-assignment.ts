import { z } from "zod";

export const midweekAssignmentSchema = z.object({
  participant_id: z.uuid(),
  assignment_id: z.string(),
  congregation_id: z.uuid(),
  week_id: z.string(),
});

export type MidweekAssignment = z.infer<typeof midweekAssignmentSchema>;
