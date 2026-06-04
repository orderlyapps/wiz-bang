import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { elderPermissionSchema } from "@shared/database/schemas/elder-permission";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const elderPermissionCollection = createPersistedQueryCollection({
  id: "elder_permission",
  queryKey: ["elder_permission"],
  queryClient,
  schema: elderPermissionSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("elder_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("elder_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("elder_permission")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("elder_permission").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
