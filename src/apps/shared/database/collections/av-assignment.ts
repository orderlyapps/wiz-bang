import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { avAssignmentSchema } from "@shared/database/schemas/av-assignment";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export const avAssignmentCollection = createPersistedQueryCollection({
  id: "av_assignment",
  queryKey: ["av_assignment"],
  queryClient,
  schema: avAssignmentSchema,
  getKey: (row) => makeCompositeKey(row.assignment_id, row.congregation_id, row.week_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("av_assignment").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("av_assignment").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { assignment_id, congregation_id, week_id } = mutation.original;
      const { error } = await supabase
        .from("av_assignment")
        .update(mutation.modified)
        .match({ assignment_id, congregation_id, week_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { assignment_id, congregation_id, week_id } = mutation.original;
      const { error } = await supabase
        .from("av_assignment")
        .delete()
        .match({ assignment_id, congregation_id, week_id });
      if (error) throw error;
    }
  },
});
