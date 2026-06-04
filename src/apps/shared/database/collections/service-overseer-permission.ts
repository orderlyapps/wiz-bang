import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { serviceOverseerPermissionSchema } from "@shared/database/schemas/service-overseer-permission";
import { createPersistedQueryCollection } from "@shared/database/util/persisted-query-collection";

export const serviceOverseerPermissionCollection = createPersistedQueryCollection({
  id: "service_overseer_permission",
  queryKey: ["service_overseer_permission"],
  queryClient,
  schema: serviceOverseerPermissionSchema,
  getKey: (row) => row.id ?? "",
  queryFn: async () => {
    const { data, error } = await supabase.from("service_overseer_permission").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("service_overseer_permission").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("service_overseer_permission")
        .update(mutation.modified)
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { error } = await supabase
        .from("service_overseer_permission")
        .delete()
        .eq("id", mutation.key);
      if (error) throw error;
    }
  },
});
