import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { speakerAvailabilitySchema } from "@shared/database/schemas/speaker-availability";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const speakerAvailabilityCollection = createPersistedQueryCollection({
  id: "speaker_availability",
  queryKey: ["speaker_availability"],
  queryClient,
  schema: speakerAvailabilitySchema,
  getKey: (row) => row.speaker_id,
  queryFn: async () => {
    const { data, error } = await supabase.from("speaker_availability").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("speaker_availability").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("speaker_availability")
        .update(mutation.modified)
        .eq("speaker_id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("speaker_availability")
        .delete()
        .eq("speaker_id", mutation.key);
      if (error) throw error;
    }
  },
});
