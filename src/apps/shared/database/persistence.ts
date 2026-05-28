import {
  createBrowserWASQLitePersistence,
  openBrowserWASQLiteOPFSDatabase,
} from "@tanstack/browser-db-sqlite-persistence";

const database = await openBrowserWASQLiteOPFSDatabase({
  databaseName: "wiz-bang.sqlite",
});

export const persistence = createBrowserWASQLitePersistence({ database });
