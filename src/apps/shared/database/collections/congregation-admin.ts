import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { congregationAdminSchema } from "@shared/database/schemas/congregation-admin";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const congregationAdminCollection = createPersistedQueryCollection({
  id: "congregation_admin",
  queryKey: ["congregation_admin"],
  queryClient,
  schema: congregationAdminSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("congregation_admin").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("congregation_admin").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("congregation_admin")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase.from("congregation_admin").delete().eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
