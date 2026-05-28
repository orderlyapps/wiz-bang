import { z } from "zod";

export const eventSchema = z.object({
  id: z.uuid().optional(),
  congregation_id: z.uuid(),
  name: z.string().optional(),
  description: z.string().optional(),
  type: z.string().nullable().optional(),
  address: z.string().optional(),
  start_time: z.string().nullable().optional(),
  end_time: z.string().nullable().optional(),
  all_day: z.boolean(),
  coordinates: z.array(z.number()).nullable().optional(),
  end_date: z.string().nullable().optional(),
  start_date: z.string(),
});

export type EventRow = z.infer<typeof eventSchema>;
