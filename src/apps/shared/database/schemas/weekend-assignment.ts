import { z } from "zod";

export const weekendAssignmentSchema = z.object({
  participant_id: z.uuid(),
  assignment_id: z.string(),
  congregation_id: z.uuid(),
  week_id: z.string(),
});

export type WeekendAssignment = z.infer<typeof weekendAssignmentSchema>;
