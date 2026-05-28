import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { mapSchema } from "@shared/database/schemas/map";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const mapCollection = createPersistedQueryCollection({
  id: "map",
  queryKey: ["map"],
  queryClient,
  schema: mapSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("map").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("map").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("map").update(mutation.modified).eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("map").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
