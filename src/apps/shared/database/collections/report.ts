import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { queryClient } from "@util/vendor/react-query";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { reportSchema } from "@shared/database/schemas/report";
import { makeCompositeKey } from "@shared/database/util/composite-key";
import { persistence } from "@shared/database/persistence";

const baseOptions = queryCollectionOptions({
  id: "report",
  queryKey: ["report"],
  queryClient,
  schema: reportSchema,
  getKey: (row) => makeCompositeKey(row.confidential_id ?? "", row.congregation_id ?? "", row.date),
  queryFn: async () => {
    const { data, error } = await supabase.from("report").select("*");
    if (error) throw error;
    return data ?? [];
  },
  onInsert: async ({ transaction }) => {
    const rows = transaction.mutations.map((mutation) => mutation.modified);
    const { error } = await supabase.from("report").insert(rows);
    if (error) throw error;
  },
  onUpdate: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { confidential_id, congregation_id, date } = mutation.original;
      const { error } = await supabase
        .from("report")
        .update(mutation.modified)
        .match({ confidential_id, congregation_id, date });
      if (error) throw error;
    }
  },
  onDelete: async ({ transaction }) => {
    for (const mutation of transaction.mutations) {
      const { confidential_id, congregation_id, date } = mutation.original;
      const { error } = await supabase
        .from("report")
        .delete()
        .match({ confidential_id, congregation_id, date });
      if (error) throw error;
    }
  },
});

const persistedOptions = persistedCollectionOptions({
  ...baseOptions,
  persistence,
  schemaVersion: 2,
});

export const reportCollection = createCollection({
  ...persistedOptions,
  schema: reportSchema,
});
