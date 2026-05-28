import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { speakerAssignmentSchema } from "@shared/database/schemas/speaker-assignment";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export const speakerAssignmentCollection = createPersistedQueryCollection({
  id: "speaker_assignment",
  queryKey: ["speaker_assignment"],
  queryClient,
  schema: speakerAssignmentSchema,
  getKey: (row) => makeCompositeKey(row.week_id, row.congregation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("speaker_assignment").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("speaker_assignment").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("speaker_assignment")
        .update(mutation.modified)
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { week_id, congregation_id } = mutation.original;
      const { error } = await supabase
        .from("speaker_assignment")
        .delete()
        .match({ week_id, congregation_id });
      if (error) throw error;
    }
  },
});
