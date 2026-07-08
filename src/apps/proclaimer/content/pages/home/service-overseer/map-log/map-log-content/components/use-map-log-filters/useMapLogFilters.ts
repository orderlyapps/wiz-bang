import { useState, useCallback } from "react";
import { localStorageKeys } from "@util/constants/localStorageKeys";

export type CheckoutFilter = "any" | "checked_out_only" | "hide_checked_out";

export const checkoutFilterLabels: Record<CheckoutFilter, string> = {
  any: "All",
  checked_out_only: "Checked Out",
  hide_checked_out: "Checked In",
};

export type MapLogFilters = {
  checkout_filter: CheckoutFilter;
  untagged_only: boolean;
  tag_ids: string[];
  min_weeks_since_activity: number | null;
};

const DEFAULT_FILTERS: MapLogFilters = {
  checkout_filter: "any",
  untagged_only: false,
  tag_ids: [],
  min_weeks_since_activity: null,
};

function loadFilters(): MapLogFilters {
  try {
    const stored = localStorage.getItem(localStorageKeys.mapLogFilters);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<MapLogFilters>;
      return {
        checkout_filter: parsed.checkout_filter ?? "any",
        untagged_only: parsed.untagged_only ?? false,
        tag_ids: parsed.tag_ids ?? [],
        min_weeks_since_activity: parsed.min_weeks_since_activity ?? null,
      };
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_FILTERS;
}

export function useMapLogFilters() {
  const [filters, set_filters] = useState<MapLogFilters>(() => loadFilters());

  const update = useCallback((next: MapLogFilters) => {
    set_filters(next);
    try {
      localStorage.setItem(localStorageKeys.mapLogFilters, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const reset = useCallback(() => {
    set_filters(DEFAULT_FILTERS);
    try {
      localStorage.removeItem(localStorageKeys.mapLogFilters);
    } catch {
      /* ignore */
    }
  }, []);

  const has_active_filters =
    filters.checkout_filter !== "any" ||
    filters.untagged_only ||
    (!filters.untagged_only && filters.tag_ids.length > 0) ||
    filters.min_weeks_since_activity != null;

  return { filters, update, reset, has_active_filters };
}
