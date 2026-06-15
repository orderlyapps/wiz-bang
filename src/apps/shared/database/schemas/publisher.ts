import { z } from "zod";

export const publisherSchema = z.object({
  id: z.uuid().optional(),
  first_name: z.string(),
  middle_name: z.string().nullable().optional(),
  last_name: z.string(),
  display_name: z.string().nullable().optional(),
  congregation_id: z.uuid(),
  standing: z.string(),
  type: z.string(),
  gender: z.enum(["male", "female"]),
  family_id: z.uuid().nullable().optional(),
  group_id: z.uuid().nullable().optional(),
  auth_id: z.uuid().nullable().optional(),
  archived_at: z.string().nullable().optional(),
});

export type Publisher = z.infer<typeof publisherSchema>;
