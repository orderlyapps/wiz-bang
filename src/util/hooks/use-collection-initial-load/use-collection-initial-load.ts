import { useEffect, useState } from "react";
import { useIsFetching } from "@util/vendor/react-query";
import { getCollectionQueryKey } from "@shared/database/util/persisted-query-collection";

type LoadableCollection = {
  isLoadingSubset: boolean;
  on: (
    event: "loadingSubset:change",
    listener: (event: { isLoadingSubset: boolean }) => void,
  ) => () => void;
};

const NO_MATCH_QUERY_KEY = ["__persisted_collection_no_match__"] as const;

/**
 * Reports whether a persisted (on-demand) collection is performing its initial
 * data load, so callers can show a spinner instead of a premature empty state.
 *
 * Combines two signals:
 * - `isLoadingSubset`: the local SQLite hydration window (warm cache).
 * - React Query `isFetching` for the collection's queryKey: the background
 *   remote fetch, which covers a cold/empty cache with no local rows yet.
 */
export function useCollectionInitialLoad(collection: LoadableCollection): boolean {
  const [isLoadingSubset, setIsLoadingSubset] = useState(collection.isLoadingSubset);

  useEffect(() => {
    setIsLoadingSubset(collection.isLoadingSubset);
    const unsubscribe = collection.on("loadingSubset:change", (event) => {
      setIsLoadingSubset(event.isLoadingSubset);
    });
    return unsubscribe;
  }, [collection]);

  const queryKey = getCollectionQueryKey(collection);
  const isFetching =
    useIsFetching({ queryKey: queryKey ? [...queryKey] : [...NO_MATCH_QUERY_KEY] }) > 0;

  return isLoadingSubset || isFetching;
}
