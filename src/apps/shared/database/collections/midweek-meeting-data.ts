import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { midweekMeetingDataSchema } from "@shared/database/schemas/midweek-meeting-data";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const midweekMeetingDataCollection = createPersistedQueryCollection({
  id: "midweek_meeting_data",
  queryKey: ["midweek_meeting_data"],
  queryClient,
  schema: midweekMeetingDataSchema,
  getKey: (row) => row.week_id,
  queryFn: async () => {
    const { data, error } = await supabase.from("midweek_meeting_data").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("midweek_meeting_data").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("midweek_meeting_data")
        .update(mutation.modified)
        .eq("week_id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("midweek_meeting_data")
        .delete()
        .eq("week_id", mutation.key);
      if (error) throw error;
    }
  },
});
