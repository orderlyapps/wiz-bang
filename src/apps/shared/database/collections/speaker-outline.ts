import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { speakerOutlineSchema } from "@shared/database/schemas/speaker-outline";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export const speakerOutlineCollection = createPersistedQueryCollection({
  id: "speaker_outline",
  queryKey: ["speaker_outline"],
  queryClient,
  schema: speakerOutlineSchema,
  getKey: (row) => makeCompositeKey(row.speaker_id, row.outline_id ?? ""),
  queryFn: async () => {
    const { data, error } = await supabase.from("speaker_outline").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("speaker_outline").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { speaker_id, outline_id } = mutation.original;
      const { error } = await supabase
        .from("speaker_outline")
        .update(mutation.modified)
        .match({ speaker_id, outline_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { speaker_id, outline_id } = mutation.original;
      const { error } = await supabase
        .from("speaker_outline")
        .delete()
        .match({ speaker_id, outline_id });
      if (error) throw error;
    }
  },
});
