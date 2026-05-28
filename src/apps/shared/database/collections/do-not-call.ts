import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { doNotCallSchema } from "@shared/database/schemas/do-not-call";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const doNotCallCollection = createPersistedQueryCollection({
  id: "do_not_call",
  queryKey: ["do_not_call"],
  queryClient,
  schema: doNotCallSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("do_not_call").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("do_not_call").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("do_not_call")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("do_not_call").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
