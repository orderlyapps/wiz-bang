import { z } from "zod";

export const avAssignmentSchema = z.object({
  participant_id: z.uuid(),
  assignment_id: z.string(),
  congregation_id: z.uuid(),
  week_id: z.string(),
});

export type AvAssignment = z.infer<typeof avAssignmentSchema>;
