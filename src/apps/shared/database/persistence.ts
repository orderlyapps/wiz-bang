import {
  BrowserCollectionCoordinator,
  createBrowserWASQLitePersistence,
  openBrowserWASQLiteOPFSDatabase,
} from "@tanstack/browser-db-sqlite-persistence";

const database = await openBrowserWASQLiteOPFSDatabase({
  databaseName: "wiz-bang.sqlite",
});

const coordinator = new BrowserCollectionCoordinator({ dbName: "wiz-bang" });

export const persistence = createBrowserWASQLitePersistence({ database, coordinator });
