import { z } from "zod";

export const clamOverseerPermissionSchema = z.object({
  id: z.uuid().optional(),
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type ClamOverseerPermission = z.infer<typeof clamOverseerPermissionSchema>;
