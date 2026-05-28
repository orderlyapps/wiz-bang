import { z } from "zod";

export const midweekParticipationSchema = z.object({
  participant_id: z.uuid(),
  participation_id: z.string(),
});

export type MidweekParticipation = z.infer<typeof midweekParticipationSchema>;
