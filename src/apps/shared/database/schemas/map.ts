import { z } from "zod";

export const mapSchema = z.object({
  id: z.uuid().optional(),
  congregation_id: z.uuid(),
  name: z.string(),
  details: z.string().nullable().optional(),
  boundary: z.unknown().nullable().optional(),
  blocks: z.unknown().nullable().optional(),
});

export type MapRow = z.infer<typeof mapSchema>;
