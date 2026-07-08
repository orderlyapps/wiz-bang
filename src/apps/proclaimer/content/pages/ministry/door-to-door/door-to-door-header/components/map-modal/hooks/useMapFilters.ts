import { useState, useCallback, useEffect } from "react";
import { localStorageKeys } from "@util/constants/localStorageKeys";

export type MapModalFilters = {
  checked_out_only: boolean;
  untagged_only: boolean;
  tag_ids: string[];
};

const DEFAULT_FILTERS: MapModalFilters = {
  checked_out_only: false,
  untagged_only: false,
  tag_ids: [],
};

const FILTER_EVENT = "map-filters-changed";

function loadFilters(storage_key: string): MapModalFilters {
  try {
    const stored = localStorage.getItem(storage_key);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<MapModalFilters>;
      return {
        checked_out_only: parsed.checked_out_only ?? false,
        untagged_only: parsed.untagged_only ?? false,
        tag_ids: parsed.tag_ids ?? [],
      };
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_FILTERS;
}

export function useMapFilters(storage_key: string = localStorageKeys.mapModalFilters) {
  const [filters, set_filters] = useState<MapModalFilters>(() => loadFilters(storage_key));

  useEffect(() => {
    function handleFilterChange(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.storage_key === storage_key) {
        set_filters(loadFilters(storage_key));
      }
    }
    window.addEventListener(FILTER_EVENT, handleFilterChange);
    return () => window.removeEventListener(FILTER_EVENT, handleFilterChange);
  }, [storage_key]);

  const update = useCallback(
    (next: MapModalFilters) => {
      set_filters(next);
      try {
        localStorage.setItem(storage_key, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: { storage_key } }));
    },
    [storage_key],
  );

  const reset = useCallback(() => {
    set_filters(DEFAULT_FILTERS);
    try {
      localStorage.removeItem(storage_key);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: { storage_key } }));
  }, [storage_key]);

  const has_active_filters =
    filters.checked_out_only || filters.untagged_only || filters.tag_ids.length > 0;

  return { filters, update, reset, has_active_filters };
}
