import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { cleanMajorSchema } from "@shared/database/schemas/clean-major";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export const cleanMajorCollection = createPersistedQueryCollection({
  id: "clean_major",
  queryKey: ["clean_major"],
  queryClient,
  schema: cleanMajorSchema,
  getKey: (row) => makeCompositeKey(row.week_id, row.congregation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("clean_major").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("clean_major").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("clean_major")
        .update(mutation.modified)
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("clean_major")
        .delete()
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
});
