import { z } from "zod";

export const congregationSchema = z.object({
  id: z.uuid().optional(),
  name: z.string(),
  congregation_id: z.uuid().nullable().optional(),
});

export type Congregation = z.infer<typeof congregationSchema>;
