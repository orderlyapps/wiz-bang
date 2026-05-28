import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { midweekParticipationSchema } from "@shared/database/schemas/midweek-participation";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";
import { makeCompositeKey } from "@shared/database/util/composite-key";

export const midweekParticipationCollection = createPersistedQueryCollection({
  id: "midweek_participation",
  queryKey: ["midweek_participation"],
  queryClient,
  schema: midweekParticipationSchema,
  getKey: (row) => makeCompositeKey(row.participant_id, row.participation_id),
  queryFn: async () => {
    const { data, error } = await supabase.from("midweek_participation").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("midweek_participation").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("midweek_participation")
        .update(mutation.modified)
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { participant_id, participation_id } = mutation.original;
      const { error } = await supabase
        .from("midweek_participation")
        .delete()
        .match({ participant_id, participation_id });
      if (error) throw error;
    }
  },
});
