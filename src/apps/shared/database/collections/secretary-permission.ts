import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { secretaryPermissionSchema } from "@shared/database/schemas/secretary-permission";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const secretaryPermissionCollection = createPersistedQueryCollection({
  id: "secretary_permission",
  queryKey: ["secretary_permission"],
  queryClient,
  schema: secretaryPermissionSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("secretary_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("secretary_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("secretary_permission")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("secretary_permission").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
