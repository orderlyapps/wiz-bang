import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { reportSchema } from "@shared/database/schemas/report";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export const reportCollection = createPersistedQueryCollection({
  id: "report",
  queryKey: ["report"],
  queryClient,
  schema: reportSchema,
  getKey: (row) => makeCompositeKey(row.confidential_id ?? "", row.congregation_id ?? "", row.date),
  queryFn: async () => {
    const { data, error } = await supabase.from("report").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("report").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { confidential_id, congregation_id, date } = mutation.original;
      const { error } = await supabase
        .from("report")
        .update(mutation.modified)
        .match({ confidential_id, congregation_id, date });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { confidential_id, congregation_id, date } = mutation.original;
      const { error } = await supabase
        .from("report")
        .delete()
        .match({ confidential_id, congregation_id, date });
      if (error) throw error;
    }
  },
});
