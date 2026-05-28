import { z } from "zod";

export const notAtHomeSchema = z.object({
  id: z.uuid().optional(),
  created_at: z.string().optional(),
  coordinates: z.array(z.number()),
  congregation_id: z.uuid(),
  suburb_id: z.uuid(),
  street_id: z.uuid(),
  house_number: z.string(),
  unit_number: z.string().nullable().optional(),
  visit_log: z.array(z.string()),
  write: z.boolean(),
  match_data: z.unknown(),
});

export type NotAtHome = z.infer<typeof notAtHomeSchema>;
