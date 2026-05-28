import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { mapMasterSchema } from "@shared/database/schemas/map-master";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const mapMasterCollection = createPersistedQueryCollection({
  id: "map_master",
  queryKey: ["map_master"],
  queryClient,
  schema: mapMasterSchema,
  getKey: (row) => row.congregation_id,
  queryFn: async () => {
    const { data, error } = await supabase.from("map_master").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("map_master").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("map_master")
        .update(mutation.modified)
        .eq("congregation_id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("map_master")
        .delete()
        .eq("congregation_id", mutation.key);
      if (error) throw error;
    }
  },
});
