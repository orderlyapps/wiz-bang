import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { territoryServantPermissionSchema } from "@shared/database/schemas/territory-servant-permission";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const territoryServantPermissionCollection = createPersistedQueryCollection({
  id: "territory_servant_permission",
  queryKey: ["territory_servant_permission"],
  queryClient,
  schema: territoryServantPermissionSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("territory_servant_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("territory_servant_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("territory_servant_permission")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("territory_servant_permission")
        .delete()
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
