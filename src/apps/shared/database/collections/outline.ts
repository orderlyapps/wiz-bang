import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { outlineSchema } from "@shared/database/schemas/outline";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const outlineCollection = createPersistedQueryCollection({
  id: "outline",
  queryKey: ["outline"],
  queryClient,
  schema: outlineSchema,
  getKey: (row) => row.id,
  queryFn: async () => {
    const { data, error } = await supabase.from("outline").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("outline").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("outline")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("outline").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
