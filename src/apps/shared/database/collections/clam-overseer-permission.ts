import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { clamOverseerPermissionSchema } from "@shared/database/schemas/clam-overseer-permission";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const clamOverseerPermissionCollection = createPersistedQueryCollection({
  id: "clam_overseer_permission",
  queryKey: ["clam_overseer_permission"],
  queryClient,
  schema: clamOverseerPermissionSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("clam_overseer_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("clam_overseer_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("clam_overseer_permission")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("clam_overseer_permission")
        .delete()
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
