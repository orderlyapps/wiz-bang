import { z } from "zod";

export const reportSchema = z.object({
  confidential_id: z.uuid().optional(),
  congregation_id: z.uuid().optional(),
  date: z.string(),
  active: z.boolean(),
  hours: z.number().int().nullable().optional(),
  bible_studies: z.number().int().nullable().optional(),
  comments: z.string().nullable().optional(),
  group_id: z.uuid().nullable().optional(),
});

export type Report = z.infer<typeof reportSchema>;
