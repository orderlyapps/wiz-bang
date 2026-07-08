import { useState, useCallback } from "react";
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

function loadFilters(): MapModalFilters {
  try {
    const stored = localStorage.getItem(localStorageKeys.mapModalFilters);
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

export function useMapFilters() {
  const [filters, set_filters] = useState<MapModalFilters>(loadFilters);

  const update = useCallback((next: MapModalFilters) => {
    set_filters(next);
    try {
      localStorage.setItem(localStorageKeys.mapModalFilters, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const reset = useCallback(() => {
    set_filters(DEFAULT_FILTERS);
    try {
      localStorage.removeItem(localStorageKeys.mapModalFilters);
    } catch {
      /* ignore */
    }
  }, []);

  const has_active_filters =
    filters.checked_out_only || filters.untagged_only || filters.tag_ids.length > 0;

  return { filters, update, reset, has_active_filters };
}
