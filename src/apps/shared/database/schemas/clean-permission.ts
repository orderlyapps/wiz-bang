import { z } from "zod";

export const cleanPermissionSchema = z.object({
  id: z.uuid().optional(),
  auth_user_id: z.uuid(),
  congregation_id: z.uuid(),
  can_edit: z.boolean().optional(),
  granted_by: z.uuid().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export type CleanPermission = z.infer<typeof cleanPermissionSchema>;
