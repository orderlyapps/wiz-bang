import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { suburbSchema } from "@shared/database/schemas/suburb";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const suburbCollection = createPersistedQueryCollection({
  id: "suburb",
  queryKey: ["suburb"],
  queryClient,
  schema: suburbSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("suburb").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("suburb").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("suburb")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("suburb").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
