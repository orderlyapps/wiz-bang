import {
  BrowserCollectionCoordinator,
  createBrowserWASQLitePersistence,
  openBrowserWASQLiteOPFSDatabase,
} from "@tanstack/browser-db-sqlite-persistence";

const DB_NAME = "tanstack";

// Shared OPFS-backed SQLite database used by all persisted TanStack DB
// collections in this app. Top-level await is supported by Vite + ESM.
//
// OPFS may be unavailable (older browsers, sandboxed iframes, some
// private-browsing modes). We surface the error to the console so the failure
// is visible during bootstrap and rethrow so callers fail fast rather than
// silently running without persistence.
let database: Awaited<ReturnType<typeof openBrowserWASQLiteOPFSDatabase>>;
try {
  database = await openBrowserWASQLiteOPFSDatabase({
    databaseName: `${DB_NAME}.sqlite`,
  });
} catch (error) {
  console.error(
    "Failed to open OPFS-backed SQLite database for TanStack DB persistence. " +
      "The current browser/context likely does not support OPFS.",
    error,
  );
  throw error;
}

// Multi-tab safe coordinator: uses BroadcastChannel + Web Locks so only one
// tab/process owns the SQLite writer. Without this, concurrent tabs would
// corrupt the shared OPFS database.
const coordinator = new BrowserCollectionCoordinator({ dbName: DB_NAME });

// Shared persistence instance reused across every collection that opts into
// persistence.
export const persistence = createBrowserWASQLitePersistence({
  database,
  coordinator,
});

/**
 * Clears all TanStack DB data by closing the database connection and deleting
 * the SQLite file from OPFS. This will be recreated on next app load.
 * Call before page reload.
 */
export async function clearAllTanstackData(): Promise<void> {
  try {
    await database.close!();
    const root = await navigator.storage.getDirectory();
    await root.removeEntry(`${DB_NAME}.sqlite`);
  } catch (error) {
    console.error("Failed to clear TanStack DB data from OPFS:", error);
  }
}
