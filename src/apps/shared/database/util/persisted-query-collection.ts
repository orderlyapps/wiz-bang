import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions, type QueryCollectionConfig } from "@tanstack/query-db-collection";
import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import type { z } from "zod";
import { persistence } from "@shared/database/persistence";

/**
 * Wraps `queryCollectionOptions` with `persistedCollectionOptions` and feeds the
 * result into `createCollection`, preserving zod schema-based type inference.
 *
 * The intermediate cast is required because `persistedCollectionOptions`
 * widens the `schema` field to optional in its return type, which prevents
 * TypeScript from selecting the schema-aware `createCollection` overload.
 */
export function createPersistedQueryCollection<
  TSchema extends z.ZodType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TConfig extends QueryCollectionConfig<any, any, any, any, any, TSchema>,
>(config: TConfig & { schema: TSchema }, schemaVersion = 1) {
  const persistedOptions = persistedCollectionOptions({
    ...queryCollectionOptions(config),
    persistence,
    schemaVersion,
  });

  // Re-assert schema as required to satisfy createCollection's schema-aware
  // overload (otherwise TS picks the no-schema overload).
  const optionsWithSchema = {
    ...persistedOptions,
    schema: config.schema,
  } as typeof persistedOptions & { schema: TSchema };

  return createCollection(optionsWithSchema);
}
