import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { congregationSchema } from "@shared/database/schemas/congregation";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

const congregationCollection = createPersistedQueryCollection({
  id: "congregation",
  queryKey: ["congregation"],
  queryClient,
  schema: congregationSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("congregation").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("congregation").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("congregation")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("congregation").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});

export { congregationCollection };
