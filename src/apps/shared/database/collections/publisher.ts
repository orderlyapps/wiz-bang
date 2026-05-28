import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { publisherSchema } from "@shared/database/schemas/publisher";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const publisherCollection = createPersistedQueryCollection({
  id: "publisher",
  queryKey: ["publisher"],
  queryClient,
  schema: publisherSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("publisher").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("publisher").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("publisher")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("publisher").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
